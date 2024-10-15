import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

import InformationRow from '@/components/common/information-row';
import { AccountTypeEnum } from '@/interfaces/global';
import { CurrencyFormatter } from '@/lib/helpers';
import InformationRowDivider from '@/components/common/information-row/information-row-divider';
import MuiTooltip from '@/components/common/mui-tooltip';
import { AgreementPartyInfo } from '@/interfaces/shipment';
interface ShipmentBaseInfoProps {
  accountType: AccountTypeEnum;
  identifier: string;
  emailInfo?: AgreementPartyInfo[];
  handleShowAgreement: () => void;
}

const ShipmentBaseInfo: React.FC<ShipmentBaseInfoProps> = ({
  accountType,
  identifier,
  handleShowAgreement,
}) => {
  const isBuyer = accountType === AccountTypeEnum.BUYER;
  return (
    <div>
      <div className="flex items-center rounded-[4px] border border-tm-black-20 bg-[#ffffff80] px-[26px]">
        <InformationRow
          label={isBuyer ? 'Supplier:' : 'Buyer:'}
          value={<p></p>}
          underlined={false}
          showBoldValue={false}
          containerClassOverrides="py-[10px]"
        />
        <InformationRowDivider classOverrides="h-[30px]" />

        <InformationRowDivider classOverrides="h-[30px]" />
        <InformationRow
          label="Identifier:"
          value={`#${identifier}`}
          underlined={false}
          showBoldValue={false}
          containerClassOverrides="py-[10px]"
        />
        <InformationRowDivider classOverrides="h-[30px]" />

        <div
          onClick={handleShowAgreement}
          className="flex cursor-pointer items-center gap-[1px]"
        >
          <p className="text-[13px] font-medium capitalize leading-[1em] text-tm-black-80">
            Show Agreement
          </p>
          <LaunchIcon className="!h-[18px]" />
        </div>
      </div>
    </div>
  );
};

export default ShipmentBaseInfo;
