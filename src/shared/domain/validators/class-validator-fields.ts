import { validateSync } from 'class-validator'
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fileds.interface'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null
  validatedData: PropsValidated = null

  validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        const { property, constraints } = error
        this.errors[property] = Object.values(constraints)
      }
    } else {
      this.validatedData = data
    }

    return !errors.length
  }
}
