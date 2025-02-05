import { User, UserType } from "../../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class UserService {
  private JWT_SECRET = process.env.AUTH_SECRET || "marvensiser";
  /**
   * Create User
   * @param userInfo
   * @returns Created User
   */
  async createUser(userInfo: UserType): Promise<User> {
    const hashedPassword = await bcrypt.hash(userInfo.password, 12);
    const user = User.create({
      ...userInfo,
      password: hashedPassword,
      groups: [],
    });
    await user.save();
    return user;
  }

  /**
   * Fetch User by Email
   * @param email
   * @returns User or False if not found
   */
  async fetchUser(email: string): Promise<User | boolean> {
    const user = await User.find({ where: { email: email }, relations : ["groups", "adminGroups"] });
    if (user.length > 0) {
      return user[0];
    }
    return false;
  }

  async fetchAllUsers(): Promise<User[]> {
    const allUsers = await User.find({ relations: ["groups"] });
    return allUsers;
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | boolean> {
    try {
      const user = await User.findBy({ email: email });
      if (user.length <= 0) {
        throw new Error("User not Found");
      }
      const isPasswordMatch = await bcrypt.compare(password, user[0].password);
      if (!isPasswordMatch) {
        throw new Error("Incorrect Password");
      }
      const fetchedUser = user[0];
      const payload = {
        user_id: fetchedUser.id,
        username: fetchedUser.email,
      };
      fetchedUser.authToken = jwt.sign(payload, this.JWT_SECRET, {
        expiresIn: "2h",
      });
      return fetchedUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
