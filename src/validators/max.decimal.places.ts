import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function MaxDecimalPlaces(max: number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "MaxDecimalPlaces",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [max],
            options: validationOptions,
            validator: {
                validate(value: number, args: ValidationArguments) {
                    if (typeof value !== "number") return false;
                    const decimalPart = value.toString().split(".")[1];
                    return !decimalPart || decimalPart.length <= args.constraints[0];
                },
                defaultMessage: () => `Amount must be an integer or have up to ${max} decimal places`,
            },
        });
    };
}