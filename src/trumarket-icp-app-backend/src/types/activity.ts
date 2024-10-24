import { Record, Recursive, text } from 'azle/experimental';

export const Activity = Recursive(() =>
  Record({
    activityType: text,
    description: text,
    createdAt: text,
    txHash: text,
  })
);
export type Activity = typeof Activity.tsType;
