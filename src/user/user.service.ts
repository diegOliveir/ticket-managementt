import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDAO } from './dao/user-dao';

@Injectable()
export class UserService {
  constructor(readonly userDAO: UserDAO){}

  create(createUserDto: CreateUserDto) {
    return this.userDAO.create(createUserDto)
  }

  findAll() {
    return this.userDAO.findAll()
  }

  findOne(id: number) {
    return this.userDAO.findById(id)
  }

  findByEmail(email: String){
    return this.userDAO.findByEmail(email)
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userDAO.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userDAO.delete(id)
  }
}
