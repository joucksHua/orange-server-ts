
import { User } from './user.interface';
export interface IUserService {
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(User): Promise<User>;
    edit(User): Promise<User>;
    remove(id: number): Promise<boolean>;

}