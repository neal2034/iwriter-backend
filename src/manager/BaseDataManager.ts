/**
 * this base manager is constructed with nest mixin accord below url:
 * https://github.com/nestjs/typeorm/issues/187#issuecomment-528910193
 */
import { Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

export interface IBaseDataManager<T> {
  addEntity: (entity: T) => Promise<T>;
  addEntities: (entities: T[]) => Promise<T[]>;
  editEntity: (entity: T) => Promise<T>;
  editEntities: (entity: T[]) => Promise<T[]>;
  getOneEntity: (options: FindOneOptions<T>) => Promise<T>;
  listEntity: (options: FindManyOptions<T>) => Promise<T[]>;
  countEntity: (options: FindManyOptions<T>) => Promise<number>;
  findAndCount: (options: FindManyOptions<T>) => Promise<[T[], number]>;
  getEntityWithId: (id: number, extend?: (keyof T)[] | Record<string, unknown>) => Promise<T>;
  getEntityWithSerial: (serial: number) => Promise<T>;
  softDelete: (id: number) => void;
  softRemove: (entity: T) => void;
  softRemoveEntities: (entities: T[]) => void;
  restore: (id: number) => void;
  getPageParam: (page: number) => { take: number; skip: number };
}

export type Constructor<I> = new (...args: any[]) => I;

export function BaseDataManager<T>(entity: Constructor<T>): Type<IBaseDataManager<T>> {
  class DataManager implements IBaseDataManager<T> {
    @InjectRepository(entity) private readonly repository: Repository<T>;

    async addEntity(entity: T): Promise<T> {
      return this.repository.save(entity);
    }

    async addEntities(entities: T[]): Promise<T[]> {
      return this.repository.save(entities);
    }

    async listEntity(options: FindManyOptions): Promise<T[]> {
      return this.repository.find(options);
    }

    async countEntity(options: FindManyOptions): Promise<number> {
      return this.repository.count(options);
    }

    async getEntityWithId(id: number, extend?: (keyof T)[] | Record<string, unknown>): Promise<T> {
      if (!id) return;
      if (extend) {
        let relations = {};
        if (Array.isArray(extend)) {
          extend.map((item) => {
            relations[item as string] = true;
          });
        } else {
          relations = { ...extend };
        }
        return this.repository.findOne({
          relations,
          where: { id },
        } as FindOptionsWhere<unknown>);
      }

      return this.repository.findOneBy({ id } as FindOptionsWhere<unknown>);
    }

    getEntityWithSerial(serial: number): Promise<T> {
      return this.repository.findOneBy({ serial } as FindOptionsWhere<unknown>);
    }

    getOneEntity(options: FindOneOptions<T>): Promise<T> {
      return this.repository.findOne(options);
    }


    async editEntity(entity: T): Promise<T> {
      return this.repository.save(entity);
    }

    async editEntities(entity: T[]): Promise<T[]> {
      return this.repository.save(entity);
    }

    softDelete(id: number): void {
      this.repository.softDelete({ id } as FindOptionsWhere<unknown>);
    }

    softRemove(entity: T): void {
      this.repository.softRemove(entity);
    }

    restore(id: number) {
      this.repository.restore({ id } as FindOptionsWhere<unknown>);
    }

    findAndCount(options: FindManyOptions<T>) {
      return this.repository.findAndCount(options);
    }

    /**
     * get page parameter
     * @param page
     */
    getPageParam(page) {
      const pageNum = 10;
      return {
        take: pageNum,
        skip: page * pageNum,
      };
    }

    softRemoveEntities(entities: T[]): void {
      if (!entities || entities.length === 0) return;
      this.repository.softRemove(entities);
    }
  }
  return DataManager;
}
