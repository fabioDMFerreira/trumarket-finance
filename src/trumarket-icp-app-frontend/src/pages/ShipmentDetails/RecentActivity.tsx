import { ChevronRight } from '@mui/icons-material';
import React from 'react';

const transactions = [
  {
    id: '0x7203...874a',
    type: 'Unstake',
    amount: '-168.46 FIDU',
    date: 'Oct 16, 2024',
  },
  {
    id: '0x2afc...3ade',
    type: 'Withdrawal',
    amount: '-$3,850.87 USDC',
    date: 'Oct 16, 2024',
  },
  {
    id: '0x2022...8c54',
    type: 'Withdrawal',
    amount: '-$391.14 USDC',
    date: 'Oct 16, 2024',
  },
  {
    id: '0xb7d9...16a5',
    type: 'Withdrawal',
    amount: '-$148.30 USDC',
    date: 'Oct 15, 2024',
  },
  {
    id: '0x0783...9986',
    type: 'Withdrawal',
    amount: '-$399.21 USDC',
    date: 'Oct 14, 2024',
  },
  {
    id: '0x9322...08d7',
    type: 'Unstake',
    amount: '-26,869.86 FIDU',
    date: 'Oct 14, 2024',
  },
  {
    id: 'Cauris',
    type: 'Repayment',
    amount: '+$82,192.00 USDC',
    date: 'Oct 13, 2024',
  },
  // Add more transactions to demonstrate scrolling
  {
    id: '0x1111...1111',
    type: 'Stake',
    amount: '+1000.00 FIDU',
    date: 'Oct 12, 2024',
  },
  {
    id: '0x2222...2222',
    type: 'Withdrawal',
    amount: '-$500.00 USDC',
    date: 'Oct 11, 2024',
  },
  {
    id: '0x3333...3333',
    type: 'Repayment',
    amount: '+$1500.00 USDC',
    date: 'Oct 10, 2024',
  },
];

const RecentActivityList = () => {
  return (
    <div className="mt-12 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Recent activity</h2>
      <div className="relative">
        <div
          className="max-h-96 overflow-y-auto pr-2"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 85%, transparent 100%)',
          }}
        >
          <div className="space-y-1 bg-white">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-medium">{tx.id}</div>
                    <div className="text-sm text-gray-500">{tx.type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div
                      className={`font-medium ${
                        tx.amount.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {tx.amount}
                    </div>
                    <div className="text-sm text-gray-500">{tx.date}</div>
                  </div>
                  <div className="text-gray-400">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default RecentActivityList;
