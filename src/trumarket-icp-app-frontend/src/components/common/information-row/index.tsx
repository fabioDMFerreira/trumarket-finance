import classNames from "classnames";
import React from "react";

interface InformationRowProps {
  label: string;
  value: string | React.ReactNode;
  underlined?: boolean;
  icon?: React.ReactNode;
  showBoldValue?: boolean;
  labelClassOverrides?: string;
  containerClassOverrides?: string;
}

const InformationRow: React.FC<InformationRowProps> = ({
  label,
  value,
  icon,
  labelClassOverrides,
  containerClassOverrides,
  underlined = true,
  showBoldValue = true,
}) => {
  return (
    <div className={classNames("flex cursor-pointer items-center gap-[6px]", containerClassOverrides)}>
      <p className={classNames("text-[12px] font-medium leading-[1em] text-tm-black-80", labelClassOverrides)}>
        {label}
      </p>
      <span
        className={classNames("text-[12px]  leading-[1em] text-tm-black-80", underlined ? "underline" : "", {
          "font-bold": showBoldValue,
          "font-medium": !showBoldValue,
        })}
      >
        {value}
      </span>
    </div>
  );
};

export default InformationRow;
