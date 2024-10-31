import { Card } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import useDealOwnership from './useDealOwnership';
import LiquidityPoolDeposit from './LiquidityPoolDeposit';
import useWallet from './useWallet';
import ErrorMessage from './ErrorMessage';

interface Props {
  vaultAddress: string;
  nftID: number;
  requestFundAmount: number;
  currentMilestone: number;
}

const CurrencyFormatter = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(amount);
};

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 30)}...${address.slice(-4)}`;
};

const targetNetwork = {
  chainId: process.env.CANISTER_TARGET_EVM_CHAINID,
};

const FinanceSection: React.FC<Props> = ({
  vaultAddress,
  nftID,
  requestFundAmount,
  currentMilestone,
}) => {
  const {
    invest,
    shares,
    amountFunded,
    refresh,
    amountToReclaim,
    redeem,
    dealStatus,
  } = useDealOwnership(vaultAddress, nftID);
  const { wallet, connectMetaMask, network, ensureNetwork } = useWallet();

  const [redeeming, setRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [showDepositForm, setShowDepositForm] = useState(false);

  useEffect(() => {
    refresh();
  });

  const reclaim = useCallback(async () => {
    try {
      setRedeeming(true);
      await redeem();
      await refresh();
    } catch (error) {
      console.error(error);
      setRedeemError('Failed to reclaim funds. Please try again.');
    }
    setRedeeming(false);
  }, [redeem, refresh]);

  const progressPercentage = (amountFunded / requestFundAmount) * 100;

  const renderLiquidityPoolDeposit = () => {
    if (currentMilestone === 0) {
      return (
        <div className="space-y-4 border-b pb-4 mb-2">
          <div className="text-gray-600 flex items-center gap-2">
            <span className="text-sm">Total pool assets</span>
          </div>
          <div className="text-gray-900 text-3xl font-semibold">
            {CurrencyFormatter(+amountFunded)}
          </div>
          {/* Progress bar */}
          <div>
            <div className="text-gray-600 mb-1 flex justify-between text-sm">
              <span>{progressPercentage.toFixed(1)}% filled</span>
              <span>Target: {CurrencyFormatter(requestFundAmount)}</span>
            </div>
            <div className="bg-gray-200 h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-full rounded-full bg-[#8aab3f] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <Card className="bg-white  w-full p-6">
      {/* Total Pool Assets */}
      {renderLiquidityPoolDeposit()}

      {/* Vault Address */}
      <div className="rounded-lg text-xs">
        <a
          href={`${process.env.CANISTER_BLOCKCHAIN_EXPLORER}/token/${vaultAddress}`}
          target="_blank"
          className="rounded font-mono flex items-center gap-2 text-gray-400"
        >
          Vault {truncateAddress(vaultAddress)}
        </a>
      </div>

      {/* Current Position Display */}
      {shares > 0 && (
        <div className="bg-gray-50 mt-2 flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Your Position</span>
          </div>
          <div className="text-2xl font-semibold">
            {(dealStatus === 8 ? amountToReclaim : shares).toFixed(2)} USDC
          </div>
        </div>
      )}

      {network && network !== targetNetwork.chainId && (
        <div className="text-red-500 mt-4 mb-2">
          Warning: Please switch to the correct network
          <button
            className="ml-2 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
            onClick={ensureNetwork}
          >
            Switch Network
          </button>
        </div>
      )}

      {currentMilestone === 0 && requestFundAmount - amountFunded > 0 && (
        <div className="mt-8">
          {!showDepositForm && (
            <div className="flex justify-center">
              <button
                onClick={() =>
                  wallet
                    ? setShowDepositForm(!showDepositForm)
                    : connectMetaMask && connectMetaMask()
                }
                className={`bg-primary text-white rounded px-6 py-2 w-full`}
                disabled={network !== targetNetwork.chainId}
              >
                {wallet ? 'Deposit' : 'Connect Wallet'}
              </button>
            </div>
          )}

          {showDepositForm && (
            <div className="w-50">
              <LiquidityPoolDeposit
                invest={invest}
                poolCapacity={requestFundAmount - amountFunded}
                walletBalance={wallet?.balanceUnderlying || 0}
                refresh={refresh}
              />
            </div>
          )}
        </div>
      )}
      {dealStatus === 8 && amountToReclaim !== 0 && (
        <div>
          <div className="flex justify-end">
            <button
              onClick={reclaim}
              disabled={redeeming}
              className="bg-primary text-white rounded px-6 py-2 mb-4"
            >
              Reclaim
            </button>
          </div>
          <div className="flex justify-end">
            {redeemError && <ErrorMessage>{redeemError}</ErrorMessage>}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FinanceSection;
