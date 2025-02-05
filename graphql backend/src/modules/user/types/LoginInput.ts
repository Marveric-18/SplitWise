import { InputType, Field, ObjectType } from "type-graphql";


@InputType()
@ObjectType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
 
}