import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import {
  AccountTypeEnum,
  ITransportType,
  MilestoneEnum,
} from '@/interfaces/global';
import ShipmentInfo from '@/components/ShipmentInfo';
import { getCountryCode, hasDocsWithLength } from '@/lib/helpers';
import {
  AgreementPartyInfo,
  DealStatus,
  ShippingDetails,
} from '@/interfaces/shipment';

import ShipmentBoxHeader from './shipment-box-header';
import ShipmentBoxFooter from './shipment-box-footer';
import HorizontalMilestones from './horizontal-milestones';

interface ShipmentBoxProps {
  shipment: ShippingDetails;
  status: DealStatus;
  notStarted: boolean;
}

const ShipmentBox: React.FC<ShipmentBoxProps> = ({
  shipment,
  status,
  notStarted,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<boolean>(false);
  const actionButtonText =
    status === DealStatus.Proposal ? 'Review the agreement' : 'Details';

  const handleNavigate = () => {
    navigate(`/shipment/${shipment.id}`);
  };

  const generateMilestoneStatus = () => {
    //check if milestone is on first stage and has document uploaded
    if (
      shipment.currentMilestone === MilestoneEnum.M &&
      !hasDocsWithLength(shipment.milestones)
    ) {
      return undefined;
    } else {
      return shipment.currentMilestone;
    }
  };

  const detectIfDealIsUnseenByCurrentUser = () => {
    return false;
  };

  return (
    <div
      className="rounded-[5px] border border-tm-black-20 bg-tm-white cursor-pointer hover:shadow-lg hover:shadow-tm-black-50 transition-shadow duration-300"
      onClick={() => handleNavigate()}
    >
      <div className="flex">
        <div className="flex-1 flex-col">
          <ShipmentBoxHeader
            entityTitle={shipment.name}
            entityId={shipment.id}
            notStarted={notStarted}
            isNew={detectIfDealIsUnseenByCurrentUser()}
            accountType={AccountTypeEnum.INVESTOR}
            status={status}
            userId={''}
            active={active}
            milestones={shipment.milestones}
            currentMilestone={shipment.currentMilestone}
          />
          <div className="px-[20px] py-[28px]">
            <div className="flex items-center px-[40px]">
              <div className="flex justify-end text-right">
                <ShipmentInfo
                  title={`${shipment.portOfOrigin}, ${shipment.origin}`}
                  value={`${moment(shipment.shippingStartDate).format(
                    'DD.MM.YYYY'
                  )}`}
                  titleClassOverrides="text-left"
                  countryCode={getCountryCode(shipment.origin)}
                  subValue="ETD"
                  showFlag
                />
              </div>
              <div className="flex-1">
                <HorizontalMilestones
                  status={generateMilestoneStatus()}
                  milestones={shipment.milestones}
                  isBuyer={false}
                  transport={shipment.transport as ITransportType}
                  setActive={setActive}
                />
              </div>
              <ShipmentInfo
                title={`${shipment.portOfDestination}, ${shipment.destination}`}
                value={`${moment(shipment.expectedShippingEndDate).format(
                  'DD.MM.YYYY'
                )}`}
                countryCode={getCountryCode(shipment.destination)}
                valueClassOverrides="flex-row-reverse"
                titleClassOverrides="text-right"
                subValue="ETA"
                showFlag
              />
            </div>
          </div>
          <div className="border-t border-t-tm-black-20">
            <ShipmentBoxFooter
              accountType={AccountTypeEnum.INVESTOR}
              contract={`${shipment.contractId}` || '0'}
              entityId={shipment.id}
              // actionButtonText={actionButtonText}
              // action={() => handleNavigate()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentBox;
