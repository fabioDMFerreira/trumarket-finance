import { BlockchainClient } from '@/lib/BlockchainClient';
import { useEffect, useState, useCallback } from 'react';
import { JsonRpcSigner, ethers } from 'ethers';
import { Wallet } from '@/types/global';
import { useConfig } from './useConfig';

const provider = window.ethereum
  ? new ethers.BrowserProvider(window.ethereum)
  : undefined;

const useWallet = () => {
  const config = useConfig();
  const [wallet, setWallet] = useState<Wallet>();
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [network, setNetwork] = useState<string>();

  if (!provider) {
    return { error: 'MetaMask not detected!' };
  }

  const refreshBalances = useCallback(async () => {
    if (!connectedAddress) {
      return;
    }

    const balance = await provider.getBalance(connectedAddress);
    const etherBalance = ethers.formatEther(balance);

    setWallet({
      label: 'Connected Wallet',
      address: connectedAddress,
      balance: +etherBalance.toString(),
      balanceUnderlying: await new BlockchainClient(
        config?.investmentTokenAddress || ''
      ).getBalance(connectedAddress),
    });
  }, [connectedAddress]);

  useEffect(() => {
    refreshBalances();
  }, [connectedAddress, refreshBalances]);

  const ensureNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: config?.evmChainId }],
        });
      } catch (switchError) {
        console.error('Failed to switch network:', switchError);
      }
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await ensureNetwork();
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const connectedAddress = await signer.getAddress();

        setConnectedAddress(connectedAddress);
        setSigner(signer);
      } catch (err) {
        console.warn(`did not connect: ${err}`);
      }
    } else {
      console.log('MetaMask not detected!');
    }
  };

  const getNetwork = async () => {
    if (provider) {
      const network = await provider.getNetwork();
      setNetwork(`0x${network.chainId.toString(16)}`);
    }
  };

  useEffect(() => {
    (async () => {
      if (window.ethereum && config) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (accounts.length) {
          await ensureNetwork();
          const signer = await provider.getSigner();
          const connectedAddress = await signer.getAddress();
          setConnectedAddress(connectedAddress);
          setSigner(signer);
        }

        getNetwork();

        window.ethereum.on('chainChanged', (chainId: string) => {
          setNetwork(chainId);
        });

        window.ethereum.on('accountsChanged', async (accounts: string[]) => {
          if (accounts.length) {
            const signer = await provider.getSigner();
            const connectedAddress = await signer.getAddress();
            setConnectedAddress(connectedAddress);
            setSigner(signer);
            refreshBalances();
          } else {
            setConnectedAddress(undefined);
            setSigner(undefined);
            setWallet(undefined);
          }
        });
      }
    })();
  }, [config]);

  return {
    wallet,
    signer,
    connectMetaMask,
    refreshBalances,
    network,
    ensureNetwork,
  };
};

export default useWallet;
