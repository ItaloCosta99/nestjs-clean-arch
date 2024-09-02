import { faker } from '@faker-js/faker'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

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
})
