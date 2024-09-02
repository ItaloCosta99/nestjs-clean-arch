import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    // Arrange
    props = UserDataBuilder({})

    sut = new UserEntity(props)
  })

  it('should create a new UserEntity instance', () => {
    // Assert
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.props).toEqual({
      ...props,
      createdAt: expect.any(Date),
    })
  })

  it('should return the name', () => {
    // Assert
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toBe(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('should set the name', () => {
    sut['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('should return the email', () => {
    // Assert
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toBe(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('should return the password', () => {
    // Assert
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toBe(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('should set the password', () => {
    sut['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('should return the createdAt', () => {
    // Assert
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should update a user', () => {
    sut.update('other name')
    expect(sut.props.name).toEqual('other name')
  })

  it('Should update the password field', () => {
    sut.updatePassword('other password')
    expect(sut.props.password).toEqual('other password')
  })
})
