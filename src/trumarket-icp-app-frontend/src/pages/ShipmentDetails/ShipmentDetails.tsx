import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShipmentDetailsHeader from './ShipmentDetailsHeader';
import ShipmentBaseInfo from './ShipmentBaseInfo';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';
import {
  AccountTypeEnum,
  IMilestoneDetails,
  ITransportType,
  MilestoneEnum,
} from '@/interfaces/global';

import { useGetWindowDimension } from '@/lib/hooks/useGetWindowDimensions';
import Flag from 'react-world-flags';
import { getCountryCode } from '@/lib/helpers';
import ShipmentInfo from '@/components/ShipmentInfo';
import moment from 'moment';
import ShipmentMilestoneStatus from './shipment-milestone-status';
import { ShippingDetails } from '@/interfaces/shipment';
import DocumentBoxHeader from './document-box-header/header';
import classNames from 'classnames';

function ShipmentDetails() {
  const [currentMilestoneDetails, setCurrentMilestoneDetails] =
    useState<IMilestoneDetails>();
  const [shipmentDetails, setShipmentDetails] = useState<ShippingDetails>();
  const { windowHeight } = useGetWindowDimension();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    trumarket_icp_app_backend.getShipmentDetails(id).then((shipmentDetails) => {
      setShipmentDetails(shipmentDetails as any);

      setCurrentMilestoneDetails(
        (shipmentDetails as any).milestones[
          +shipmentDetails.currentMilestone.toString() || 0
        ]
      );
    });
  }, [id]);

  const handleSelectMilestone = (milestone: MilestoneEnum) => {
    if (shipmentDetails?.currentMilestone) {
      if (milestone <= shipmentDetails.currentMilestone) {
        setCurrentMilestoneDetails(
          (shipmentDetails as any).milestones[milestone]
        );
      }
    }
  };

  return (
    <div>
      <Container maxWidth={false} style={{ padding: 0 }}>
        <div className="mb-[30px] flex items-center justify-between">
          <ShipmentDetailsHeader productName={shipmentDetails?.name} />
          <ShipmentBaseInfo
            accountType={AccountTypeEnum.BUYER}
            identifier={(shipmentDetails?.id as string) || '-'}
            handleShowAgreement={() => {
              // TODO: open modal with more details
              // openModal(ShipmentDetailModalView.AGREEMENT_DETAILS)
            }}
          />
        </div>
        <div className="flex items-start gap-[10px]">
          <div className="w-[35%] ">
            <div className="rounded-tl-[4px] rounded-tr-[4px] border-b border-b-tm-black-20 bg-tm-white  px-[30px] py-[25px]">
              <p className="text-[17px] font-bold leading-[1em] text-tm-black-80">
                Milestone timeline
              </p>
            </div>
            <div
              className="rounded-bl-[4px] rounded-br-[4px] bg-tm-white px-[30px] pb-[44px] pt-[30px]"
              style={{ minHeight: `${windowHeight - 295}px` }}
            >
              <div className="flex items-start gap-[10px]">
                <div className="h-[20px] w-[20px]">
                  <Flag
                    code={getCountryCode(shipmentDetails?.origin as string)}
                  />
                </div>
                <ShipmentInfo
                  title={`${shipmentDetails?.portOfOrigin}, ${shipmentDetails?.origin}`}
                  value={`${moment(shipmentDetails?.shippingStartDate).format(
                    'DD.MM.YYYY'
                  )} | ${moment(shipmentDetails?.shippingStartDate)
                    .endOf('day')
                    .fromNow()}`}
                />
              </div>
              <div className="py-[8px]">
                <ShipmentMilestoneStatus
                  step={
                    (shipmentDetails && shipmentDetails.currentMilestone) || 0
                  }
                  milestoneInfo={shipmentDetails?.milestones || []}
                  currentActiveMilestoneDetails={currentMilestoneDetails as any}
                  isBuyer={false}
                  handleSelectMilestone={handleSelectMilestone}
                  transport={shipmentDetails?.transport as ITransportType}
                />
              </div>
              <div className="flex items-start gap-[10px]">
                <div className="h-[20px] w-[20px]">
                  <Flag
                    code={getCountryCode(
                      shipmentDetails?.destination as string
                    )}
                  />
                </div>
                <ShipmentInfo
                  title={`${shipmentDetails?.portOfDestination}, ${shipmentDetails?.destination}`}
                  value={`${moment(
                    shipmentDetails?.expectedShippingEndDate
                  ).format('DD.MM.YYYY')} | ${moment(
                    shipmentDetails?.expectedShippingEndDate
                  )
                    .endOf('day')
                    .fromNow()}`}
                />
              </div>
            </div>
          </div>
          <div className="w-[65%] rounded-[4px]">
            <DocumentBoxHeader
              milestoneIndex={shipmentDetails?.currentMilestone || 0}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ShipmentDetails;
