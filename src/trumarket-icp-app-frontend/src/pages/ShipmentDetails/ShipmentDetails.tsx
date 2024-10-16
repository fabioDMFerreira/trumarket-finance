import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import { ShippingDetails } from '@/types/shipment';
import { milestones } from '@/lib/static';

const formatDate = (dateString: string) => {
  if (!dateString) {
    return '';
  }
  return new Date(dateString).toLocaleDateString();
};

const CustomStepper: React.FC<{
  stepsCompleted: number;
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}> = ({ currentStep, totalSteps, stepsCompleted, onStepClick }) => {
  const steps = milestones;

  return (
    <div className="flex justify-between w-full items-center">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick(index)}
                disabled={index > stepsCompleted}
                className={`rounded-full p-2 ${
                  index <= currentStep
                    ? 'bg-[#8aab3f] text-white'
                    : 'bg-gray-200 text-gray-500'
                } ${
                  index <= stepsCompleted
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
                title={step.label}
              >
                <Icon size={24} />
              </button>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300 mx-2">
                <div
                  className={`h-full ${
                    index < stepsCompleted ? 'bg-[#8aab3f]' : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {children}
  </div>
);

const ShipmentDetailsPage: React.FC<{ shipment: ShippingDetails }> = ({
  shipment,
}) => {
  const [activeStep, setActiveStep] = useState(shipment.currentMilestone);

  const handleStep = (step: number) => {
    if (step <= shipment.currentMilestone) {
      setActiveStep(step);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4  py-8">
      <div className="flex h-screen w-full">
        {/* Left Section - 40% */}
        <div className="w-2/5 p-6 overflow-auto mr-4">
          <h1 className="text-2xl font-bold mb-4">{shipment.name}</h1>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4">
            <p className="text-gray-700">
              <strong className="font-semibold">Origin:</strong>{' '}
              {shipment.origin} ({shipment.portOfOrigin})
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Destination:</strong>{' '}
              {shipment.destination} ({shipment.portOfDestination})
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Shipping Start Date:</strong>{' '}
              {formatDate(shipment.shippingStartDate)}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Expected End Date:</strong>{' '}
              {formatDate(shipment.expectedShippingEndDate)}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Quality:</strong>{' '}
              {shipment.quality}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Offer Unit Price:</strong> $
              {shipment.offerUnitPrice}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Quantity:</strong>{' '}
              {shipment.quantity}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Transport:</strong>{' '}
              {shipment.transport}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Description:</strong>{' '}
              {shipment.description}
            </p>
            {/* <p className="text-blue-500 hover:underline">
              <a
                target="_blank"
                href={`https://www.oklink.com/amoy/tx/${shipment.mintTxHash}`}
              >
                Creation Tx
              </a>
            </p> */}
            {shipment.createdAt && (
              <p className="text-gray-700">
                <strong className="font-semibold">Created At:</strong>{' '}
                {formatDate(shipment.createdAt)}
              </p>
            )}
            {shipment.updatedAt && (
              <p className="text-gray-700">
                <strong className="font-semibold">Updated At:</strong>{' '}
                {formatDate(shipment.updatedAt)}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {shipment.docs.map((doc) => (
              <Card key={doc._id}>
                {doc.url.endsWith('.pdf') ? (
                  <div className="p-4">
                    <p className="text-sm">{doc.description}</p>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                ) : (
                  <img
                    src={doc.url}
                    alt={doc.description}
                    className="w-full h-32 object-cover"
                  />
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Right Section - 60% */}
        <div className="w-3/5 p-6 overflow-auto ml-4">
          <CustomStepper
            stepsCompleted={shipment.currentMilestone}
            currentStep={activeStep}
            totalSteps={7}
            onStepClick={handleStep}
          />
          <h2 className="text-xl font-semibold mt-4 mb-2">
            {milestones[activeStep].label}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {shipment.milestones[activeStep]?.docs.map((doc) => (
              <Card key={doc._id}>
                {doc.url.endsWith('.pdf') ? (
                  <div className="p-4">
                    <p className="text-sm">{doc.description}</p>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                ) : (
                  <img
                    src={doc.url}
                    alt={doc.description}
                    className="w-full h-32 object-cover"
                  />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function ShipmentDetails() {
  const [shipmentDetails, setShipmentDetails] = useState<ShippingDetails>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    trumarket_icp_app_backend.getShipmentDetails(id).then((shipmentDetails) => {
      setShipmentDetails(shipmentDetails as any);
    });
  }, [id]);

  if (!shipmentDetails) return <></>;

  return <ShipmentDetailsPage shipment={shipmentDetails} />;
}

export default ShipmentDetails;
