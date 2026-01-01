import { UserDTO } from "@/app/dto";
import { IUserRepository } from "./interfaces";

class InMemoryUserRepository implements IUserRepository {
  private users = new Map<bigint, UserDTO>();

  findByUsername(username: bigint) {
    return this.users.get(username);
  }

  create(user: UserDTO): boolean {
    if (this.exists(user.username)) return false;
    this.users.set(user.username, user);
    return true;
  }

  exists(username: bigint): boolean {
    return this.users.has(username);
  }

  validateCredentials(username: bigint, password: string) {
    const user = this.findByUsername(username);
    return user?.password === password ? user : undefined;
  }
}

export const userRepository: IUserRepository = new InMemoryUserRepository();
