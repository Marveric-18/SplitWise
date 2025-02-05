import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from "class-validator";
  
  import { User } from "../../../entity/User";
  

  /**
   * Validator for UserId Exists or Not
   * Returns true if Provided Id is null
   */
  @ValidatorConstraint({ async: true })
  export class IsUserIdAlreadyExistsConstraint
    implements ValidatorConstraintInterface {
    validate(id: number| undefined) {
      if (!id) return true;
      return User.findOne({ where: { id: id } }).then(user => {
        if (!user) return false;
        return true;
      }).catch(err => {
        console.log("Error: ", err);
        return false;
      });
    }
  }
  
  export function IsUserIdAlreadyExists(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserIdAlreadyExistsConstraint
      });
    };
  }