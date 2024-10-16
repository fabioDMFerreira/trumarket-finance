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

export const Attachment = Recursive(() =>
  Record({
    description: text,
    _id: text,
    url: text,
  })
);
export type Attachment = typeof Attachment.tsType;

export const MilestoneDetails = Recursive(() =>
  Record({
    docs: Vec(Attachment),
    id: text,
    fundsDistribution: float64,
  })
);
export type MilestoneDetails = typeof MilestoneDetails.tsType;

export const ShipmentDetails = Recursive(() =>
  Record({
    id: text,
    name: text,
    status: text,
    origin: text,
    destination: text,
    presentation: text,
    variety: text,
    docs: Vec(Attachment),
    portOfDestination: text,
    portOfOrigin: text,
    shippingStartDate: text,
    expectedShippingEndDate: text,
    currentMilestone: int16,
    milestones: Vec(MilestoneDetails),
    quality: text,
    offerUnitPrice: float32,
    quantity: int32,
    transport: text,
    description: text,
    nftID: int32,
    mintTxHash: text,
  })
);
export type ShipmentDetails = typeof ShipmentDetails.tsType;
