import { InputType, Field, ObjectType, Int, ID } from "type-graphql";
import { IsUserIdAlreadyExists } from "../../../modules/user/utils/IsUserIdAlreadyExists";

@InputType()
@ObjectType()
export class GroupUpdate {
  @Field(()=> ID)
  groupId!: number;

  @Field({nullable: true})
  @IsUserIdAlreadyExists({ message: "Admin Id is not a valid User" })
  adminId?: number;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  @IsUserIdAlreadyExists({ message: "User to add to Group is not a valid User" })
  pushUserId?: number;

  @Field({nullable: true})
  @IsUserIdAlreadyExists({ message: "User to remove from Group is not a valid User" })
  popUserId?: number;

  @Field({nullable: true})
  expenseId?: number;
}
