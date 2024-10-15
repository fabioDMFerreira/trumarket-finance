import {
  float32,
  float64,
  int16,
  int32,
  Record,
  Recursive,
  text,
  Vec,
} from 'azle/experimental';

export enum DealStatus {
  Proposal = 'proposal',
  Confirmed = 'confirmed',
  Finished = 'finished',
  Cancelled = 'cancelled',
  All = 'all',
}

export enum Event {
  DealMilestoneChanged = 'DealMilestoneChanged',
  DealCreated = 'DealCreated',
}

export const MilestoneDetails = Recursive(() =>
  Record({
    approvalStatus: text,
    docs: Vec(text),
    id: text,
    status: text,
    fundsDistribution: float64,
  })
);
export type MilestoneDetails = typeof MilestoneDetails.tsType;

export const CompanyInfo = Recursive(() =>
  Record({
    companyName: text,
    country: text,
    taxId: text,
    participants: text,
  })
);
export type CompanyInfo = typeof CompanyInfo.tsType;

export const CompanyBaseInfo = Recursive(() =>
  Record({
    name: text,
    country: text,
    taxId: text,
  })
);
export type CompanyBaseInfo = typeof CompanyBaseInfo.tsType;

export const PaymentValuesForm = Recursive(() =>
  Record({
    quantity: text,
    offerUnitPrice: text,
  })
);
export type PaymentValuesForm = typeof PaymentValuesForm.tsType;

export const OriginAndDestination = Recursive(() =>
  Record({
    origin: text,
    destination: text,
    port_origin: text,
    shippingStartDate: text, // Assuming Date is serialized as string
    port_destination: text,
    transport: text,
  })
);
export type OriginAndDestination = typeof OriginAndDestination.tsType;

export const ProductDetailsForm = Recursive(() =>
  Record({
    name: text,
    variety: text,
    quality: text,
    presentation: text,
  })
);
export type ProductDetailsForm = typeof ProductDetailsForm.tsType;

export const ShippingDetails = Recursive(() =>
  Record({
    id: text,
    name: text,
    status: text,
    contractId: text,
    origin: text,
    destination: text,
    presentation: text,
    variety: text,
    docs: Vec(text),
    portOfDestination: text,
    portOfOrigin: text,
    buyerCompany: CompanyBaseInfo,
    supplierCompany: CompanyBaseInfo,
    shippingStartDate: text,
    expectedShippingEndDate: text,
    currentMilestone: int16,
    milestones: Vec(MilestoneDetails),
    duration: text,
    daysLeft: int32,
    quality: text,
    offerUnitPrice: float32,
    quantity: int32,
    transport: text,
    description: text,
    nftID: int32,
    mintTxHash: text,
  })
);
export type ShippingDetails = typeof ShippingDetails.tsType;
