import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Button from '@/components/common/button';
import { CurrencyFormatter } from '@/lib/helpers';
import { AccountTypeEnum } from '@/interfaces/global';
import InformationRow from '@/components/common/information-row';
import InformationRowDivider from '@/components/common/information-row/information-row-divider';
import { AgreementPartyInfo } from '@/interfaces/shipment';
import MuiTooltip from '@/components/common/mui-tooltip';

interface ShipmentBoxFooterProps {
  accountType: AccountTypeEnum;
  contract: string;
  // action: () => void;
  // actionButtonText: string;
  entityId: string;
}

const ShipmentBoxFooter: React.FC<ShipmentBoxFooterProps> = ({
  accountType,
  contract,
  // actionButtonText,
  // action,
  entityId,
}) => {
  const isBuyer = accountType === AccountTypeEnum.BUYER;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center  px-[20px] py-[19px]">
          <InformationRow
            label={isBuyer ? 'Supplier:' : 'Buyer:'}
            underlined={false}
            value={<p></p>}
          />

          <InformationRowDivider />
          <InformationRowDivider />
          <InformationRow
            label="Identifier:"
            value={`#${entityId}` || '-'}
            showBoldValue={false}
            underlined={false}
            labelClassOverrides="opacity-80"
          />
        </div>
        <div className="pr-[20px]">
          {/* <Button
            classOverrides="!py-[7px] !px-[12px] !min-w-[156px]"
            onClick={() => action()}
          >
            <div className="flex w-full items-center justify-between gap-[13px]">
              <p className="text-[13px] font-bold uppercase leading-[1em] text-tm-white">
                {actionButtonText}
              </p>
              <ArrowForwardIcon className="!h-[17px] !w-[17px]" />
            </div>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default ShipmentBoxFooter;
