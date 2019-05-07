
import { User } from '../../entities/user.entity';
export interface IUserService {
    findAll(): Promise<User[]>;
    findOne(id?: number, email?: string): Promise<User>;
    create(User): Promise<User>;
    edit(User): Promise<User>;
    remove(id: number): Promise<boolean>;

}