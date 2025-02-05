import {
  Query,
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
  UseMiddleware
} from "type-graphql";

import { User } from "../../entity/User";
import { UserInputType } from "./types/UserInput";
import { LoginInput } from "./types/LoginInput";
import { UserService } from "./userService";
import { MyContext } from "../../middleware/context";
import { isAuth } from "../../middleware/AuthMiddleware";

@Resolver(User)
export class UserResolver {
  private userService = new UserService();

  // @FieldResolver()
  // async authToken(@Root() parent: User) {
  //   console.log(parent, "parent")
  //   return "Auth Token From : " + parent.firstName;
  // }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async fetchUser(@Ctx() context: MyContext): Promise<User| boolean> {
    if(!context?.payload?.username) throw new Error("User not authenticated")
    const user = this.userService.fetchUser(context.payload.username);
    return user;
  }

  @Query(() => [User!]!)
  async fetchAllUser(): Promise<User[]> {
    const allUsers = this.userService.fetchAllUsers();
    return allUsers;
  }

  @Mutation(() => User)
  async registerUser(@Arg("userInfo") userInfo: UserInputType): Promise<User> {
    const user = await this.userService.createUser(userInfo);
    return user;
  }

  @Mutation(() => User)
  async loginUser(
    @Arg("loginInfo") loginInfo: LoginInput
  ): Promise<User | boolean> {
    const user = await this.userService.authenticateUser(loginInfo.username, loginInfo.password);
    return user;
  }
}
