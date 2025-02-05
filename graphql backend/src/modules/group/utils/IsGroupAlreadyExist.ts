import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

import { Group } from "../../../entity/Group";

@ValidatorConstraint({ async: true })
export class IsGroupAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return Group.findOne({ where: { group_id: id } }).then(group => {
            if (!group) return false;
            return true;
        });
    }
}

export function IsGroupAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsGroupAlreadyExistConstraint
        });
    };
}
