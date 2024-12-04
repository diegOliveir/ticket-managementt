import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService) {}



  async validateGoogleUser(googleUser: CreateUserDto){
    try{

      const user = await this.userService.findByEmail(googleUser.email)
      if(user) return user
      return this.userService.create(googleUser)
    }catch(er){
    }
  }
  
}
