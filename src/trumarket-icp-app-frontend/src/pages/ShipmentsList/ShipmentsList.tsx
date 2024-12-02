import { useEffect, useState } from 'react';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import { useNavigate } from 'react-router-dom';

import { ShippingDetails } from '@/types/shipment';

import deals from '../../deals.json';
import { milestones } from '@/lib/static';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const ActiveShipmentCard: React.FC<{
  shipment: ShippingDetails;
  onClick: (id: string) => void;
}> = ({ shipment, onClick }) => (
  <div
    onClick={() => onClick(shipment.id)}
    className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col transition-all duration-300 ease-in-out hover:bg-gray-100 cursor-pointer hover:shadow-lg"
  >
    <h3 className="text-lg font-semibold mb-2">{shipment.name}</h3>
    <p className="text-gray-600 mb-4 flex-grow">{shipment.description}</p>
    <div className="mt-2">
      <p className="text-sm">
        <strong>Origin:</strong> {shipment.origin}
      </p>
      <p className="text-sm">
        <strong>Start Date:</strong> {formatDate(shipment.shippingStartDate)}
      </p>
    </div>
    <div className="mt-2">
      <p className="text-sm">
        <strong>Destination:</strong> {shipment.destination}
      </p>
      <p className="text-sm">
        <strong>Expected End Date:</strong>{' '}
        {formatDate(shipment.expectedShippingEndDate)}
      </p>
    </div>
  </div>
);
const CustomStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = milestones;

  return (
    <div className="flex justify-between w-full items-center">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.label} className="flex flex-col items-center">
            <div
              className={`rounded-full p-2 ${
                index <= currentStep
                  ? 'bg-[#8aab3f] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              title={step.label}
            >
              <Icon size={16} />
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const InProgressShipmentRow: React.FC<{
  shipment: ShippingDetails;
  onClick: (id: string) => void;
}> = ({ shipment, onClick }) => (
  <div
    onClick={() => onClick(shipment.id)}
    className="py-6 px-4 border-b border-gray-200 transition-all duration-300 ease-in-out hover:bg-gray-100 cursor-pointer hover:shadow-lg"
  >
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-2">
        <h4 className="font-semibold">{shipment.name}</h4>
      </div>
      <div className="col-span-2">
        <p className="text-sm">
          <strong>Origin:</strong> {shipment.origin}
        </p>
        <p className="text-sm">
          <strong>Start:</strong> {formatDate(shipment.shippingStartDate)}
        </p>
      </div>
      <div className="col-span-6">
        <CustomStepper currentStep={shipment.currentMilestone} />
      </div>
      <div className="col-span-2">
        <p className="text-sm">
          <strong>Destination:</strong> {shipment.destination}
        </p>
        <p className="text-sm">
          <strong>Expected End:</strong>{' '}
          {formatDate(shipment.expectedShippingEndDate)}
        </p>
      </div>
    </div>
  </div>
);

const CompletedShipmentRow: React.FC<{
  shipment: ShippingDetails;
  onClick: (id: string) => void;
}> = ({ shipment, onClick }) => (
  <div
    onClick={() => onClick(shipment.id)}
    className="py-6 px-4 border-b border-gray-200 transition-all duration-300 ease-in-out hover:bg-gray-100 cursor-pointer hover:shadow-lg"
  >
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-4">
        <h4 className="font-semibold">{shipment.name}</h4>
      </div>
      <div className="col-span-4">
        <p className="text-sm">
          <strong>Origin:</strong> {shipment.origin}
        </p>
        <p className="text-sm">
          <strong>Start:</strong> {formatDate(shipment.shippingStartDate)}
        </p>
      </div>
      <div className="col-span-4">
        <p className="text-sm">
          <strong>Destination:</strong> {shipment.destination}
        </p>
        <p className="text-sm">
          <strong>End:</strong> {formatDate(shipment.expectedShippingEndDate)}
        </p>
      </div>
    </div>
  </div>
);

const ShipmentDashboard: React.FC<{
  activeShipments: ShippingDetails[];
  inProgressShipments: ShippingDetails[];
  completedShipments: ShippingDetails[];
  onClickShipment: (id: string) => void;
}> = ({
  activeShipments,
  inProgressShipments,
  completedShipments,
  onClickShipment,
}) => {
  // Distribute active shipments across three columns
  const activeShipmentColumns: ShippingDetails[][] = [[], [], []];
  activeShipments.forEach((shipment, index) => {
    activeShipmentColumns[index % 3].push(shipment);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Deals</h1>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Active</h2>
      {activeShipments.length > 0 ? (
        <div className="flex flex-col md:flex-row md:space-x-6">
          {activeShipmentColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex-1">
              {column.map((shipment) => (
                <ActiveShipmentCard
                  onClick={onClickShipment}
                  key={shipment.id}
                  shipment={shipment}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No active deals</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">In Progress</h2>
      {inProgressShipments.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {inProgressShipments.map((shipment) => (
            <InProgressShipmentRow
              onClick={onClickShipment}
              key={shipment.id}
              shipment={shipment}
            />
          ))}
        </div>
      ) : (
        <p>No in-progress deals</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Completed</h2>
      {completedShipments.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {completedShipments.map((shipment) => (
            <CompletedShipmentRow
              onClick={onClickShipment}
              key={shipment.id}
              shipment={shipment}
            />
          ))}
        </div>
      ) : (
        <p>No completed deals</p>
      )}
    </div>
  );
};

function ShipmentsList({ test }: { test: boolean }) {
  const [activeShipments, setActiveShipments] = useState<ShippingDetails[]>();
  const [inProgressShipments, setinProgressShipments] =
    useState<ShippingDetails[]>();
  const [completedShipments, setcompletedShipments] =
    useState<ShippingDetails[]>();

  useEffect(() => {
    trumarket_icp_app_backend.getShipmentsList().then((shipments) => {
      setActiveShipments(
        shipments.filter(
          (shipment) =>
            shipment.status === 'proposal' ||
            (shipment.status === 'confirmed' &&
              +shipment.currentMilestone === 0)
        ) as any
      );

      setinProgressShipments(
        shipments.filter(
          (shipment) =>
            shipment.status === 'confirmed' && +shipment.currentMilestone > 0
        ) as any
      );

      setcompletedShipments(
        shipments.filter((shipment) => shipment.status === 'finished') as any
      );
    });
  }, []);

  const loadSampleData = async () => {
    deals.forEach(async (deal) => {
      const newShipment: ShippingDetails = {
        ...deal,
        id: deal._id,
        description: deal.description || '',
        status: deal.status,
        milestones: deal.milestones.map((milestone) => ({
          id: milestone._id,
          fundsDistribution: milestone.fundsDistribution,
          description: milestone.description,
          docs: milestone.docs || [],
        })),
        nftID: deal.nftID || 0,
        mintTxHash: deal.mintTxHash || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        vaultAddress:
          'vaultAddress' in deal ? [deal.vaultAddress as string] : [],
      };

      await trumarket_icp_app_backend.createShipment(
        newShipment,
        '202a9e30f303a8ec8ed0a7d2143100728dae672e3cbcaf12eb7d484329f3e1b026751f93cded7b1a0540fb07d47b50e042f9ff443d9123d4a6a64156a585ef6782704240a9f5124c0682d231c7c12287b22cd96de9ca5f97e968ebb01f2505b8e6d0c617a8b30c65ab457f0ee4f2bed26aa4a0adbf4bf769a30b51291a274ae424f488a726528f9d45f38223db67dd12213ad0d34b96416edb22f676d099f9310b05f24540bb35c7b799d3fc03e3706fa6ed777d0e152c4bb97d5e8f6ca3fa6b37e4d959413e4de5a3330dbef508a44b5bd0371b0cf4114ebd83d0093937625062fcc14fe220a754eb4d6cb5d4063214068048b6c0177e958ad1dc76ca9ee54e'
      );

      window.location.reload();
    });
  };

  const navigate = useNavigate();

  const redirectToShipmentDetails = (shipmentId: string) => {
    navigate(`/shipments/${shipmentId}`);
  };

  if (!activeShipments && !inProgressShipments && !completedShipments) {
    return <></>;
  }

  return (
    <>
      {test ? (
        <button
          onClick={loadSampleData}
          className="mb-4 p-2 bg-[#8aab3f] text-white rounded"
        >
          Load data sample
        </button>
      ) : (
        <></>
      )}
      <ShipmentDashboard
        onClickShipment={redirectToShipmentDetails}
        activeShipments={activeShipments || []}
        inProgressShipments={inProgressShipments || []}
        completedShipments={completedShipments || []}
      />
    </>
  );
}

export default ShipmentsList;
