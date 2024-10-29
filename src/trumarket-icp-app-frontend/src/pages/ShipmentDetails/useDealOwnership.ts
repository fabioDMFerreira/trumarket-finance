import { useCallback, useState } from 'react';
import { ethers, formatEther, parseEther } from 'ethers';
import useWallet from './useWallet';
import DealVaultAbi from '@/lib/DealVault.abi';
import ERC20Abi from '@/lib/ERC20.abi';
import { INVEST_TOKEN_ADDRESS } from '@/lib/BlockchainClient';

const useDealOwnership = (vaultAddress: string) => {
  const [shares, setShares] = useState<number>(0);
  const [amountFunded, setAmountFunded] = useState<number>(0);
  const { signer } = useWallet();

  const fetchShares = useCallback(async () => {
    if (vaultAddress && signer && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const vault = new ethers.Contract(vaultAddress, DealVaultAbi, provider);
      vault
        .maxRedeem(signer.address)
        .then((shares) => {
          setShares(+formatEther(shares));
        })
        .catch(console.error);

      vault
        .totalAssets()
        .then((balance) => {
          setAmountFunded(+formatEther(balance));
        })
        .catch(console.error);
    }
  }, [vaultAddress, signer]);

  const redeem = async () => {
    if (window.ethereum && vaultAddress) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const connectedAddress = await signer.getAddress();

        const vault = new ethers.Contract(vaultAddress, DealVaultAbi, signer);

        await vault.redeem(
          parseEther('' + shares),
          connectedAddress,
          connectedAddress
        );

        await new Promise((resolve) =>
          setTimeout(() => {
            return resolve(0);
          }, 3000)
        );

        setShares(0);
      } catch (err) {
        console.warn(`failed redeeming: ${err}`);
      }
    }
  };

  const invest = useCallback(
    async (amount: number) => {
      if (!signer || !vaultAddress) {
        alert('Please connect your wallet');
        return;
      }
      try {
        const vault = new ethers.Contract(vaultAddress, DealVaultAbi, signer);

        const erc20 = new ethers.Contract(
          INVEST_TOKEN_ADDRESS,
          ERC20Abi,
          signer
        );

        await erc20.approve(vaultAddress, parseEther('' + amount));

        await vault.deposit(parseEther('' + amount), signer.address);
      } catch (err) {
        console.warn(`failed investing: ${err}`);
      }
    },
    [vaultAddress, signer]
  );

  return { shares, signer, fetchShares, redeem, invest, amountFunded };
};

export default useDealOwnership;
