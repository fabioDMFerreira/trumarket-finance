import { AgreementPartyInfo } from '@/interfaces/shipment';
import CountryList from './country-list.json';

export const getCountryCode = (countryName: string) => {
  return CountryList.find((country) => country.name === countryName)?.code;
};

export const hasDocsWithLength = (milestones: any[]) => {
  return milestones.some((item) => item.docs.length > 0);
};

export const CurrencyFormatter = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(amount);
};

export const checkIfUserConfirmedAgreement = (
  agreementPartyInfo: AgreementPartyInfo[],
  userId: string
) => {
  return agreementPartyInfo.find((user) => user.id === userId)?.approved;
};

export const checkHowManyUserApprovedAgreement = (
  agreementPartyInfo: AgreementPartyInfo[]
) => {
  return agreementPartyInfo?.reduce((count, item) => {
    return count + (item.approved === true ? 1 : 0);
  }, 0);
};

export const isApprovedByAllUser = (
  agreementPartyInfo: AgreementPartyInfo[]
) => {
  return agreementPartyInfo?.every((item) => item.approved === true);
};

export const getFileExtension = (url: string) => {
  return url.split('.').pop() as string;
};
