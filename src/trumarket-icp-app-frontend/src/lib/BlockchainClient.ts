import { ethers, formatEther } from 'ethers';
import ERC20Abi from './ERC20.abi';
import DealVaultAbi from './DealVault.abi';

export class BlockchainClient {
  erc20?: ethers.Contract;

  constructor(investmentTokenAddress: string) {
    if (!window.ethereum) {
      console.error('Metamask is not detected');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    this.erc20 = new ethers.Contract(
      investmentTokenAddress,
      ERC20Abi,
      provider
    );
  }

  async getBalance(address: string): Promise<number> {
    if (!this.erc20) {
      console.error('ERC20 contract is not initialized');
      return 0;
    }

    try {
      const balance = await this.erc20.balanceOf(address);

      return +formatEther(balance).toString();
    } catch (e) {
      console.error('Error getting balance', e);
      return 0;
    }
  }

  async getVaultAssets(address: string): Promise<number> {
    const vault = new ethers.Contract(
      address,
      DealVaultAbi,
      window.ethereum as any
    );

    const balance = await vault.totalAssets();

    return +ethers.formatEther(balance).toString();
  }
}
