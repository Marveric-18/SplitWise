import { In } from "typeorm";
import { Group } from "../../entity/Group";
import { User } from "../../entity/User";
import { GroupUpdate } from "./types/GroupUpdateInput";

export class GroupService {
  async createGroup(groupName: string, user_id: number): Promise<Group> {
    const user: User | null = await User.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error("User not found to create as Group Admin");
    }
    const group = Group.create({
      name: groupName,
      expense: [],
      totalExpenses: 0,
    });
    group.users = [user];
    group.groupAdmin = user;
    await group.save();
    return group;
  }

  async fetchGroupById(groupId: number): Promise<Group> {
    const group = await Group.findOne({
      where: { group_id: groupId },
      relations: {
        groupAdmin: true,
        users: true,
        expense : {
          addedBy: true,
        }
      }
    });
    if (!group) {
      throw new Error("Group not found by given ID: " + groupId);
    }
    return group;
  }

  async fetchGroupByAdmin(userId: number): Promise<Group[]> {
    const user = await User.findOne({where: {id: userId}});
    if(!user){
      throw new Error("Admin not found")
    }
    const groups = await Group.find({
     where: { groupAdmin: user},
     relations: ["groupAdmin", "users", "expense"],
    });
    return groups;
  }
  

  /**
   * Fetch all Groups in which provided userID is part
   * @param userId
   * @returns List of Groups
   */
  async fetchGroupByUserId(userId: number): Promise<Group[]> {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    const userRelatedGroups = await Group.createQueryBuilder("group")
      .leftJoinAndSelect("group.users", "user")
      .leftJoinAndSelect("group.groupAdmin", "admin")
      .where("user.id = :userId", { userId: userId })
      .getMany();
    const groupIdList = userRelatedGroups.map(({ group_id }) => group_id);
    const groups: Group[] = await Group.find({
      where: {
        group_id: In(groupIdList),
      },
      relations: ["groupAdmin", "users", "expense"],
    });
    return groups;
  }

  async updateGroup(
    requestingUserId: number,
    updatedGroupPayload: GroupUpdate
  ): Promise<Group> {
    const { groupId, adminId, pushUserId, popUserId, name, expenseId } =
      updatedGroupPayload;

    const requestingUser = await User.findOne({
      where: { id: requestingUserId },
    });
    if (!requestingUser) throw new Error("User requesting update not Found");

    const group = await Group.createQueryBuilder("group")
      .leftJoinAndSelect("group.users", "user")
      .leftJoinAndSelect("group.groupAdmin", "admin")
      .where("group.group_id = :groupId", { groupId: groupId })
      .getOne();


    if (!group) {
      throw new Error("Group not found by given ID: " + groupId);
    }
    let adminObj: User | null;
    const currentGroupUsersIds = group.users.map((each_user) => each_user.id);
    const currentGroupAdmin = group.groupAdmin.id;
    if (adminId && requestingUserId != currentGroupAdmin) {
      throw new Error(
        "You are not admin. Request Current Admin to change Group Admin"
      );
    } else if (currentGroupAdmin === adminId) {
      throw new Error("You are already the Admin");
    } else {
      adminObj = await User.findOne({ where: { id: adminId } });
      if (!adminObj) throw new Error("Provided Admin Id's user not found");
    }

    if (pushUserId || popUserId) {
      if (pushUserId && currentGroupUsersIds.includes(pushUserId)) {
        throw new Error("User already in the Group");
      } else if (popUserId && !currentGroupUsersIds.includes(popUserId)) {
        throw new Error("User to remove not found in Group");
      } else if (popUserId === currentGroupAdmin) {
        throw new Error("Cant remove admin from Group");
      }
    }

    if (name) {
      group.name = name;
    }
    const userObj = await User.findOne({
      where: { id: pushUserId || popUserId },
    });

    if (popUserId && userObj) {
      group.users = group.users.filter(
        (each_user) => each_user.id !== popUserId
      );
    } else if (pushUserId && userObj) {
      group.users.push(userObj);
    }
    if (expenseId) {
      console.log("Add Expense or Remove Expense coming soon");
    }

    if (adminId && adminObj != null) {
      group.groupAdmin = adminObj;
    }
    await group.save();
    return group;
  }

  async deleteGroup(group_id: number, requestingUser: number): Promise<Group> {
    const groupObj = await Group.findOne({
      where: { group_id: group_id },
      relations: ["groupAdmin"],
    });
    if (!groupObj) throw new Error("Group not found");
    return groupObj;
  }
}
