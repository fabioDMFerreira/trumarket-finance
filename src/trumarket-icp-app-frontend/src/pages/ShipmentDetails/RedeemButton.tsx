import { ShippingDetails } from '@/types/shipment';
import React, { useEffect } from 'react';
import useDealOwnership from './useDealOwnership';
import useWallet from './useWallet';

interface RedeemButtonProps {
  deal: ShippingDetails;
}

const RedeemButton: React.FC<RedeemButtonProps> = ({ deal }) => {
  const { redeem, shares, fetchShares } = useDealOwnership(
    deal.vaultAddress.length ? deal.vaultAddress[0] : ''
  );
  const { wallet } = useWallet();

  useEffect(() => {
    fetchShares();
  });

  const onClick = () => {
    redeem();
  };

  return (
    <>
      <div className="mb-4">
        <div>Balance: {wallet?.balanceUnderlying} USDC</div>
      </div>
      {shares > 0 && (
        <>
          <div className="mb-4">
            <div>Shares: {shares}</div>
          </div>
          <button
            onClick={onClick}
            className="bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Redeem
          </button>
        </>
      )}
    </>
  );
};

export default RedeemButton;
