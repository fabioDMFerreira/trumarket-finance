import {
  ITransportType,
  MilestoneApprovalStatus,
  MilestoneStatus,
} from './global';
import { IDL } from 'azle';

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

export type MilestoneDetails = {
  approvalStatus: MilestoneApprovalStatus;
  docs: any[];
  id: string;
  status: MilestoneStatus;
  fundsDistribution?: number;
  description?: string;
};

export const MilestoneDetails = IDL.Rec();
MilestoneDetails.fill(
  IDL.Record({
    approvalStatus: IDL.Text,
    docs: IDL.Vec(IDL.Text),
    id: IDL.Text,
    status: IDL.Text,
    fundsDistribution: IDL.Float64,
    description: IDL.Text,
  })
);

export type ICompanyInfo = {
  companyName: string;
  country: any;
  taxId: string;
  participants?: any;
};

export const CompanyInfo = IDL.Rec();
CompanyInfo.fill(
  IDL.Record({
    companyName: IDL.Text,
    country: IDL.Text,
    taxId: IDL.Text,
    participants: IDL.Text,
  })
);

export type CompanyBaseInfo = {
  name: string;
  country: string;
  taxId: string;
};

export const CompanyBaseInfo = IDL.Rec();
CompanyBaseInfo.fill(
  IDL.Record({
    name: IDL.Text,
    country: IDL.Text,
    taxId: IDL.Text,
  })
);

export const PaymentValuesForm = IDL.Rec();
PaymentValuesForm.fill(
  IDL.Record({
    quantity: IDL.Text,
    offerUnitPrice: IDL.Text,
  })
);
export type PaymentValuesForm = {
  quantity: string;
  offerUnitPrice: string;
};

export const OriginAndDestination = IDL.Rec();
OriginAndDestination.fill(
  IDL.Record({
    origin: IDL.Text,
    destination: IDL.Text,
    port_origin: IDL.Text,
    shippingStartDate: IDL.Text, // Assuming Date is serialized as string
    port_destination: IDL.Text,
    transport: IDL.Text,
  })
);
export type OriginAndDestination = {
  origin: string;
  destination: string;
  port_origin?: string;
  shippingStartDate: string; // Assuming Date is serialized as string
  port_destination?: string;
  transport: string;
};

export const ProductDetailsForm = IDL.Rec();
ProductDetailsForm.fill(
  IDL.Record({
    name: IDL.Text,
    variety: IDL.Text,
    quality: IDL.Text,
    presentation: IDL.Text,
  })
);
export type ProductDetailsForm = {
  name: string;
  variety: string;
  quality: string;
  presentation: string;
};

export const SubmitAgreementForm = IDL.Rec();
SubmitAgreementForm.fill(
  IDL.Record({
    description: IDL.Text,
  })
);
export type SubmitAgreementForm = {
  description: string;
};

export const AgreementPartyInfo = IDL.Rec();
AgreementPartyInfo.fill(
  IDL.Record({
    approved: IDL.Bool,
    email: IDL.Text,
    id: IDL.Text,
    new: IDL.Bool,
  })
);
export type AgreementPartyInfo = {
  approved?: boolean;
  email: string;
  id: string;
  new: boolean;
};

export const ShippingDetails = IDL.Rec();
ShippingDetails.fill(
  IDL.Record({
    id: IDL.Text,
    name: IDL.Text,
    status: IDL.Text,
    contractId: IDL.Text,
    origin: IDL.Text,
    destination: IDL.Text,
    presentation: IDL.Text,
    variety: IDL.Text,
    docs: IDL.Vec(IDL.Text),
    portOfDestination: IDL.Text,
    portOfOrigin: IDL.Text,
    proposalSupplierEmail: IDL.Text,
    buyerCompany: CompanyBaseInfo,
    supplierCompany: CompanyBaseInfo,
    proposalBuyerEmail: IDL.Text,
    shippingStartDate: IDL.Text,
    expectedShippingEndDate: IDL.Text,
    currentMilestone: IDL.Int,
    suppliers: IDL.Vec(AgreementPartyInfo),
    buyers: IDL.Vec(AgreementPartyInfo),
    milestones: IDL.Vec(MilestoneDetails),
    investmentAmount: IDL.Float64,
    revenue: IDL.Float64,
    netBalance: IDL.Float64,
    roi: IDL.Float64,
    duration: IDL.Text,
    daysLeft: IDL.Int,
    quality: IDL.Text,
    offerUnitPrice: IDL.Float64,
    quantity: IDL.Float64,
    totalValue: IDL.Float64,
    transport: IDL.Text,
    description: IDL.Text,
    buyerConfirmed: IDL.Bool,
    supplierConfirmed: IDL.Bool,
    newDocuments: IDL.Bool,
    newForBuyer: IDL.Bool,
    nftID: IDL.Int,
    mintTxHash: IDL.Text,
  })
);
export type ShippingDetails = {
  id: string;
  name: string;
  status: DealStatus;
  contractId?: string;
  origin: string;
  destination: string;
  presentation: string;
  variety: string;
  docs: string[];
  portOfDestination?: string;
  portOfOrigin?: string;
  proposalSupplierEmail?: string;
  buyerCompany: CompanyBaseInfo;
  supplierCompany: CompanyBaseInfo;
  proposalBuyerEmail?: string;
  shippingStartDate: string;
  expectedShippingEndDate: string;
  currentMilestone: number;
  suppliers: AgreementPartyInfo[];
  buyers: AgreementPartyInfo[];
  milestones: MilestoneDetails[];
  investmentAmount: number;
  revenue: number;
  netBalance: number;
  roi: number;
  duration: string;
  daysLeft: number;
  quality: string;
  offerUnitPrice: number;
  quantity: number;
  totalValue: number;
  transport?: ITransportType;
  description?: string;
  buyerConfirmed?: boolean;
  supplierConfirmed?: boolean;
  newDocuments?: boolean;
  newForBuyer?: boolean;
  nftID?: number;
  mintTxHash?: string;
};

export const MilestoneStatusInfo = IDL.Rec();
MilestoneStatusInfo.fill(
  IDL.Record({
    submitToReview: IDL.Bool,
    approve: IDL.Bool,
    deny: IDL.Bool,
  })
);
export type MilestoneStatusInfo = {
  submitToReview?: boolean;
  approve?: boolean;
  deny?: boolean;
};

export const NftDealLogs = IDL.Rec();
NftDealLogs.fill(
  IDL.Record({
    message: IDL.Text,
    event: IDL.Variant({
      DealMilestoneChanged: IDL.Null,
      DealCreated: IDL.Null,
    }),
    txHash: IDL.Text,
    blockTimestamp: IDL.Text,
  })
);
export type NftDealLogs = {
  message: string;
  event: {
    DealMilestoneChanged: null;
    DealCreated: null;
  };
  txHash: string;
  blockTimestamp: string;
};
