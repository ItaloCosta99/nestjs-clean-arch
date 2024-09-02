import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'
import e from 'express'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should set Entity props and id', () => {
    const props = { prop1: 'prop1', prop2: 1 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })
  it('should accept a valid id', () => {
    const props = { prop1: 'prop1', prop2: 1 }
    const id = '6868fd18-f466-45bc-931c-7b3d7d45cdbb'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('should convert a entity to a Javascript Object', () => {
    const props = { prop1: 'prop1', prop2: 1 }
    const id = '6868fd18-f466-45bc-931c-7b3d7d45cdbb'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })
})
