import { UserDTO } from "@/app/dto";

export interface IUserRepository {
 
  findByUsername(username: bigint): UserDTO | undefined;
  create(user: UserDTO): boolean;
  exists(username: bigint): boolean;
  validateCredentials(username: bigint, password: string): UserDTO | undefined;
}
