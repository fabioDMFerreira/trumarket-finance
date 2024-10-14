import classNames from 'classnames';
import React from 'react';

import { MilestoneEnum } from '@/interfaces/global';
import { milestones } from '@/lib/static';

interface DocumentBoxHeaderProps {
  milestoneIndex: MilestoneEnum;
}

const DocumentBoxHeader: React.FC<DocumentBoxHeaderProps> = ({
  milestoneIndex,
}) => {
  return (
    <div className="rounded-tl-[4px] rounded-tr-[4px] border-b border-b-tm-black-20 bg-tm-white px-[20px] py-[11px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[12px]">
          <div
            className={classNames(
              'flex h-[39px] w-[39px] items-center justify-center'
            )}
          >
            {React.cloneElement(
              milestones[milestoneIndex as MilestoneEnum].icon,
              { className: '!h-[36px] !w-[36px]' }
            )}
          </div>
          <div>
            <p className="text-[18px] font-bold leading-[1.1em] text-tm-black-80">
              {milestones[milestoneIndex as MilestoneEnum]?.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentBoxHeader;
