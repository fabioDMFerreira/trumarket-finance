import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  DealStatus,
  CompanyBaseInfo,
  MilestoneDetails,
} from '../interfaces/shipment';

@Entity({ name: 'shipment_details' })
export class ShipmentDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  contractId?: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  presentation: string;

  @Column()
  variety: string;

  @Column('simple-array')
  docs: string[];

  @Column({ nullable: true })
  portOfDestination?: string;

  @Column({ nullable: true })
  portOfOrigin?: string;

  @Column('json')
  buyerCompany: CompanyBaseInfo;

  @Column('json')
  supplierCompany: CompanyBaseInfo;

  @Column({ type: 'datetime' })
  shippingStartDate: Date;

  @Column({ type: 'datetime' })
  expectedShippingEndDate: Date;

  @Column()
  currentMilestone: number;

  @Column('json')
  milestones: MilestoneDetails[];

  @Column()
  duration: string;

  @Column()
  daysLeft: number;

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

  @Column({ nullable: true })
  nftID?: number;

  @Column({ nullable: true })
  mintTxHash?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
