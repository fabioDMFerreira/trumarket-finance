import React, { useEffect, useState } from 'react';
import useWallet from './useWallet';
import useDealOwnership from './useDealOwnership';
import { ShippingDetails } from '@/types/shipment';

const targetNetwork = {
  chainId: process.env.CANISTER_TARGET_EVM_CHAINID,
};

interface DealOwnershipProps {
  deal: ShippingDetails;
}

const InvestButton: React.FC<DealOwnershipProps> = ({ deal }) => {
  const { wallet, connectMetaMask, network, ensureNetwork } = useWallet();
  const { invest, shares, amountFunded, fetchShares } = useDealOwnership(
    deal.vaultAddress.length ? deal.vaultAddress[0] : ''
  );
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  useEffect(() => {
    fetchShares();
  });

  const handleInvest = async () => {
    if (network !== targetNetwork.chainId) {
      alert('Please switch to the correct network');
      return;
    }

    try {
      await invest(investmentAmount);
    } catch (err) {
      console.warn(`failed investing: ${err}`);
    }
  };

  if (!deal.vaultAddress) {
    return (
      <div className="text-red-500 mb-2">
        No vault is associated with this deal.
      </div>
    );
  } else if (network !== targetNetwork.chainId) {
    return (
      <div className="text-red-500 mb-2">
        Warning: Please switch to the correct network
        <button
          className="ml-2 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
          onClick={ensureNetwork}
        >
          Switch Network
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Vault Address: {deal.vaultAddress[0]}
        </span>
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Total Amount Requested: {deal.investmentAmount} USDC
        </span>
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Amount Funded: {amountFunded} USDC
        </span>
        <span className="block text-gray-700 text-sm font-bold mb-2">
          Your Investment: {shares} USDC
        </span>
      </div>
      {wallet && (
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            <p>{wallet.address}</p>
            <p>{wallet.balance} ETH</p>
            <p>{wallet.balanceUnderlying} USDC</p>
          </span>
        </div>
      )}
      {wallet && (
        <div className="mb-4">
          <label
            htmlFor="investmentAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Investment Amount
          </label>
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          />
        </div>
      )}
      <button
        className={`w-full bg-primary text-white font-bold py-2 px-4 rounded ${
          wallet ? 'hover:bg-blue-700' : 'hover:bg-blue-500'
        } ${
          network !== targetNetwork.chainId || investmentAmount <= 0
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
        onClick={wallet ? handleInvest : connectMetaMask}
        disabled={network !== targetNetwork.chainId}
      >
        {wallet ? 'Invest' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default InvestButton;
