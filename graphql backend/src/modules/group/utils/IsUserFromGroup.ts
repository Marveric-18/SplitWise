import { Group } from "../../../entity/Group";

export async function IsUserFromGroup(
  userId: number,
  groupId: number
): Promise<boolean> {
    console.log("Group and Usr", groupId, ' ', userId)
  const groups = await Group.createQueryBuilder("group")
    .leftJoinAndSelect("group.users", "user")
    .where("group.group_id = :groupId", { groupId })
    .andWhere("user.id = :userId", { userId: userId })
    .getMany();

  if (!groups || groups.length <= 0) {
    return false;
  }
  return true;
}
