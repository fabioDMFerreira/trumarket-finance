import { Info } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
  walletBalance: number;
  poolCapacity: number;
  invest: (amount: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const LiquidityPoolDeposit: React.FC<Props> = ({
  walletBalance,
  poolCapacity,
  invest,
  refresh,
}) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorInvesting, setErrorInvesting] = useState<string | null>(null);

  // Simulate wallet and pool constraints
  const minDeposit = 1;

  const handleMaxClick = () => {
    // Set to the lower of wallet balance or remaining pool capacity
    const maxAmount = Math.min(walletBalance, poolCapacity);
    setAmount(maxAmount.toString());
  };

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorInvesting(null);
    try {
      await invest(Number(amount));
      await refresh();
      await setAmount('');
    } catch (err) {
      console.error(err);
      setErrorInvesting('Failed submitting deposit. Please try again.');
    }
    setLoading(false);
  };

  const getErrorMessage = () => {
    const numAmount = Number(amount);
    if (!amount) return null;
    if (isNaN(numAmount)) return 'Please enter a valid number';
    if (numAmount > walletBalance) return 'Insufficient wallet balance';
    if (numAmount > poolCapacity) return 'Exceeds pool capacity';
    if (numAmount < minDeposit) return `Minimum deposit is ${minDeposit} USDC`;
    return null;
  };

  useEffect(() => {
    setError(getErrorMessage());
  }, [amount]);

  const isValid = amount && !error;

  return (
    <div className="w-full  space-y-4 bg-gray-50 rounded-lg p-3">
      <div className="flex justify-between items-center mb-6 text-gray-600 w-full">
        <div className="flex items-center gap-2">
          <span>Balance:</span>
          <span>{walletBalance} USDC</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Pool Capacity:</span>
          <span>{poolCapacity} USDC</span>
        </div>
      </div>

      <div className="flex flex-col rounded-lg w-full">
        <div className="flex items-center gap-2  w-full">
          <div className="relative w-full">
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              disabled={loading}
              onChange={(e) => setAmount(e.target.value)}
              className={`flex-1 block bg-white  px-3 py-2 rounded-md focus:outline-none w-full ${
                error ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                className="ml-2 text-sm font-medium text-blue-500 px-4 py-1"
                onClick={handleMaxClick}
              >
                MAX
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1 mb-4 w-full">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div className="text-xs text-gray-500">
            Min. Deposit: {minDeposit} USDC
          </div>
        </div>
        <button
          className="w-full text-white bg-primary mb-4"
          disabled={!isValid || loading}
          onClick={handleDeposit}
        >
          {loading ? (
            'Processing...'
          ) : (
            <span className="flex items-center justify-center">Deposit</span>
          )}
        </button>
        {errorInvesting && <ErrorMessage>{errorInvesting}</ErrorMessage>}
      </div>
    </div>
  );
};

export default LiquidityPoolDeposit;
