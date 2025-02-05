import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Int
} from "type-graphql";

import { isAuth } from "../../middleware/AuthMiddleware";
import { MyContext } from "../../middleware/context";

import { GroupService } from "./groupService";
import { Group } from "../../entity/Group";
import { GroupUpdate } from "./types/GroupUpdateInput";

@Resolver(Group)
export class GroupResolver {
  private groupService = new GroupService();

  @Query(() => String)
  async fetchAllGroup() {
    return "User Registered";
  }

  @UseMiddleware(isAuth)
  @Query(() => Group)
  async fetchGroupByID(
    @Arg("groupId", () => Int) groupId: number,
    @Ctx() context: MyContext
  ): Promise<Group> {
    return await this.groupService.fetchGroupById(groupId);
  }

  @UseMiddleware(isAuth)
  @Query(() => [Group])
  async fetchGroupByUserID(@Ctx() context: MyContext): Promise<Group[]> {
    return await this.groupService.fetchGroupByUserId(context.payload.user_id);
  }

  @UseMiddleware(isAuth)
  @Query(() => [Group])
  async fetchGroupByAdminID(@Ctx() context: MyContext): Promise<Group[]> {
    return await this.groupService.fetchGroupByAdmin(context.payload.user_id);
  }

  
 
  @Mutation(() => Group)
  @UseMiddleware(isAuth)
  async registerGroup(
    @Arg("groupName") groupName: string,
    @Ctx() context: MyContext
  ): Promise<Group> {
    console.log(context);
    const group = await this.groupService.createGroup(
      groupName,
      context.payload["user_id"]
    );
    return group;
  }

  @Mutation(() => Group)
  @UseMiddleware(isAuth)
  async updateGroup(
    @Arg("groupInfo") groupInfo: GroupUpdate,
    @Ctx() context: MyContext
  ): Promise<Group> {
    const group = await this.groupService.updateGroup(
      context.payload["user_id"],
      groupInfo
    );
    return group;
  }
}
