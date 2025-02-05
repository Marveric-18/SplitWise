import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

import { Expense } from "../../../entity/Expense";

@ValidatorConstraint({ async: true })
export class IsExpenseAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return Expense.findOne({ where: { id: id } }).then(expense => {
            if (expense) return false;
            return true;
        });
    }
}

export function IsExpenseAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsExpenseAlreadyExistConstraint
        });
    };
}
