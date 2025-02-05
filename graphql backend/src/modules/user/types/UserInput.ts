import { InputType, Field } from "type-graphql";
import { IsUserAlreadyExist } from "../utils/IsUserAlreadyExist";
import { Length } from "class-validator";

@InputType()
export class UserInputType {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @Length(1, 255)
  @IsUserAlreadyExist({ message: "User with the email already exist" })
  email: string;

  @Field({ nullable: true })
  birthDate: Date;

  @Field()
  password: string;
}
