import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name']
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }

    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }
}

describe('InMemorySearchableRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository()
  })

  describe('applyFilter', () => {
    it('should return all items when filter is null', async () => {
      const items = [new StubEntity({ name: 'item1', price: 10 })]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const result = await sut['applyFilter'](items, null)
      expect(result).toEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('should filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'item1', price: 10 }),
        new StubEntity({ name: 'ITEM1', price: 10 }),
        new StubEntity({ name: 'fake', price: 10 }),
      ]

      const spyFilterMethod = jest.spyOn(items, 'filter')

      let result = await sut['applyFilter'](items, 'ITEM1')
      expect(result).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)

      result = await sut['applyFilter'](items, 'item1')
      expect(result).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      result = await sut['applyFilter'](items, 'no-filter')
      expect(result).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })
  })

  describe('applySort', () => {})

  describe('applyPaginate', () => {})

  describe('search method', () => {})
})
