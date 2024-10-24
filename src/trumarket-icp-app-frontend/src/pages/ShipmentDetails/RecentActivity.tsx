import { ShipmentActivity } from '@/types/shipment';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';
import { useEffect, useState } from 'react';

const RecentActivityList = ({ id }: { id: string }) => {
  const [records, setRecords] = useState<ShipmentActivity[]>([]);

  useEffect(() => {
    if (!id) return;

    trumarket_icp_app_backend.getShipmentActivity(id).then((records) => {
      setRecords(records.map((record) => ({ ...(record as any) })));
    });
  }, [id]);

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
            {records.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No recent activity found.
              </div>
            ) : (
              records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-medium">{record.id}</div>
                      <div className="text-sm text-gray-500">
                        {record.activityType}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`font-medium`}>{record.description}</div>
                      <div className="text-sm text-gray-500">
                        {record.createdAt}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <a
                        target="_blank"
                        href={`https://www.oklink.com/amoy/tx/${record.txHash}`}
                      >
                        Tx
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default RecentActivityList;
