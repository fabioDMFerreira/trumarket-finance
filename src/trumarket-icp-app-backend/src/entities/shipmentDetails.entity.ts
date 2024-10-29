import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MilestoneDetails } from '../types/shipment';

@Entity({ name: 'shipment_details' })
export class ShipmentDetailsModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  presentation: string;

  @Column()
  variety: string;

  @Column('json')
  docs: any[];

  @Column({ nullable: true })
  portOfDestination?: string;

  @Column({ nullable: true })
  portOfOrigin?: string;

  @Column({ type: 'datetime' })
  shippingStartDate: Date;

  @Column({ type: 'datetime' })
  expectedShippingEndDate: Date;

  @Column()
  currentMilestone: number;

  @Column('json')
  milestones: MilestoneDetails[];

  @Column()
  quality: string;

  @Column('float')
  offerUnitPrice: number;

  @Column('float')
  quantity: number;

  @Column({ nullable: true })
  transport?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  investmentAmount: number;

  @Column({ nullable: true })
  nftID?: number;

  @Column({ nullable: true })
  mintTxHash?: string;

  @Column({ nullable: true })
  vaultAddress?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
