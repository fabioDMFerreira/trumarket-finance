import { useCallback, useState } from 'react';
import { ethers, formatEther, parseEther } from 'ethers';
import useWallet from './useWallet';
import DealVaultAbi from '@/lib/DealVault.abi';
import ERC20Abi from '@/lib/ERC20.abi';
import { INVEST_TOKEN_ADDRESS } from '@/lib/BlockchainClient';
import DealsManagerAbi from '@/lib/DealsManager.abi';

const dealsManagerContractAddress = process.env
  .CANISTER_DEALS_MANAGER_CONTRACT as '0x';

const useDealOwnership = (vaultAddress: string, nftID: number) => {
  const [shares, setShares] = useState<number>(0);
  const [amountToReclaim, setAmounToReclaim] = useState<number>(0);
  const [amountFunded, setAmountFunded] = useState<number>(0);
  const [dealStatus, setDealStatus] = useState<number>(0);
  const { signer } = useWallet();

  const refresh = useCallback(async () => {
    if (vaultAddress && signer && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const manager = new ethers.Contract(
        dealsManagerContractAddress,
        DealsManagerAbi,
        provider
      );
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

      vault.maxWithdraw(signer.address).then((amount) => {
        setAmounToReclaim(+formatEther(amount));
      });

      manager.status(nftID).then((status: bigint) => {
        setDealStatus(Number(status.toString()));
      });
    }
  }, [vaultAddress, signer]);

  const redeem = async () => {
    if (window.ethereum && vaultAddress) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const connectedAddress = await signer.getAddress();
      const vault = new ethers.Contract(vaultAddress, DealVaultAbi, signer);
      const tx = await vault.redeem(
        parseEther('' + shares),
        connectedAddress,
        connectedAddress
      );
      await tx.wait();
    }
  };

  const invest = useCallback(
    async (amount: number) => {
      if (!signer || !vaultAddress) {
        alert('Please connect your wallet');
        return;
      }
      const vault = new ethers.Contract(vaultAddress, DealVaultAbi, signer);

      const erc20 = new ethers.Contract(INVEST_TOKEN_ADDRESS, ERC20Abi, signer);

      await erc20.approve(vaultAddress, parseEther('' + amount));

      const tx = await vault.deposit(parseEther('' + amount), signer.address);

      await tx.wait();
    },
    [vaultAddress, signer]
  );

  return {
    shares,
    signer,
    refresh,
    redeem,
    invest,
    amountFunded,
    amountToReclaim,
    dealStatus,
  };
};

export default useDealOwnership;
