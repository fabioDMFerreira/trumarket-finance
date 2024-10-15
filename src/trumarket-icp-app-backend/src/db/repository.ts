import {
  Repository as TypeORMRepository,
  EntityTarget,
  DataSource,
  ObjectLiteral,
  FindOptionsWhere,
} from 'typeorm';

export const PageLimit = 20;

export interface Page<T> {
  data: T[];
  total: number;
  offset: number;
  nextOffset: number;
}

export class Repository<T extends ObjectLiteral> {
  private repository: TypeORMRepository<T>;

  constructor(entity: EntityTarget<T>, dataSource?: DataSource) {
    if (!dataSource) {
      throw new Error('DataSource is required');
    }

    this.repository = dataSource.getRepository(entity);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.save(data as any);
  }

  async createMany(data: Partial<T>[]): Promise<T[]> {
    return this.repository.save(data as any);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOneBy({ id } as any) || null;
  }

  async find(filter: any, projection?: any, options?: any): Promise<T[]> {
    return this.repository.find({
      where: filter,
      select: projection,
      ...options,
    });
  }

  async update(filter: any, update: any): Promise<number> {
    const result = await this.repository.update(filter, update);
    return result.affected || 0;
  }

  async findOne(
    filter: any,
    projection?: any,
    options?: any
  ): Promise<T | null | undefined> {
    return this.repository.findOne({
      where: filter,
      select: projection,
      ...options,
    });
  }

  async paginate(
    filter: any,
    offset: number = 0,
    projection?: any,
    options?: any
  ): Promise<Page<T>> {
    const [data, count] = await this.repository.findAndCount({
      where: filter,
      skip: offset,
      take: PageLimit,
      select: projection,
      ...options,
    });
    return {
      data,
      offset,
      total: count,
      nextOffset: offset + PageLimit < count ? offset + PageLimit : -1,
    };
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async updateById(
    id: string,
    data: Partial<T>
  ): Promise<T | null | undefined> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<T | null> {
    const entity = await this.findById(id);
    if (entity) {
      await this.repository.remove(entity);
    }
    return entity;
  }
}
