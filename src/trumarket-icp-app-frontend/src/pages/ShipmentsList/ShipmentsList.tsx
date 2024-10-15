import { useEffect, useState } from 'react';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import { DealStatus, ShippingDetails } from '@/interfaces/shipment';
import { ShipmentBox } from '@/components/ShipmentBox';
import { hasDocsWithLength } from '@/lib/helpers';
import { ITransportType } from '@/interfaces/global';

function ShipmentsList() {
  const [shipments, setShipments] = useState<ShippingDetails[]>([]);

  useEffect(() => {
    trumarket_icp_app_backend.getShipmentsList().then((shipments) => {
      setShipments(shipments as any);
    });
  }, []);

  const createShipment = async () => {
    const newShipment: ShippingDetails = {
      id: 'new-id' + Math.random(),
      name: 'New Shipment',
      status: 'Pending' as DealStatus,
      contractId: 'new-contract-id',
      origin: 'Origin',
      destination: 'Destination',
      presentation: 'Presentation',
      variety: 'Variety',
      docs: [],
      portOfDestination: 'Port of Destination',
      portOfOrigin: 'Port of Origin',
      buyerCompany: {
        name: 'Buyer Company',
        country: 'Peru',
        taxId: '123456789',
      },
      supplierCompany: {
        name: 'Supplier Company',
        country: 'Peru',
        taxId: '123456789',
      },
      shippingStartDate: new Date().toISOString(),
      expectedShippingEndDate: new Date().toISOString(),
      currentMilestone: 0,
      milestones: [],
      duration: 'Duration',
      daysLeft: 0,
      quality: 'Quality',
      offerUnitPrice: 0,
      quantity: 0,
      transport: ITransportType.BY_AIR as string,
      description: 'Description of the shipment',
      nftID: 0,
      mintTxHash: 'mint-tx-hash',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Add other fields as necessary
    };

    await trumarket_icp_app_backend.createShipment(newShipment);

    setShipments([...shipments, newShipment]);
  };

  return (
    <>
      <h4 className="mt-6 mb-8 text-2xl font-bold mb-4">Shipments</h4>
      <button
        onClick={createShipment}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Create Shipment
      </button>
      <>
        {shipments.map((shipment, i) => (
          <div className="mb-8" key={i}>
            <ShipmentBox
              notStarted={!hasDocsWithLength(shipment.milestones)}
              shipment={shipment}
              status={shipment.status as DealStatus}
            />
          </div>
        ))}
      </>
    </>
  );
}

export default ShipmentsList;
