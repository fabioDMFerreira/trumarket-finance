import { useEffect, useState } from 'react';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import { DealStatus, ShippingDetails } from '@/interfaces/shipment';
import { ShipmentBox } from '@/components/ShipmentBox';
import { hasDocsWithLength } from '@/lib/helpers';

function ShipmentsList() {
  const [shipments, setShipments] = useState<ShippingDetails[]>([]);

  useEffect(() => {
    trumarket_icp_app_backend.getShipmentsList().then((shipments) => {
      setShipments(shipments as any);
    });
  }, []);

  return (
    <>
      <h4 className="mt-6 mb-8 text-2xl font-bold mb-4">Shipments</h4>
      <>
        {shipments.map((shipment, i) => (
          <div className="mb-8">
            <ShipmentBox
              supplierEmails={shipment.suppliers!}
              buyerEmails={shipment.buyers!}
              notStarted={!hasDocsWithLength(shipment.milestones)}
              isNew={shipment.newForBuyer!}
              newDocuments={shipment.newDocuments!}
              key={i}
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
