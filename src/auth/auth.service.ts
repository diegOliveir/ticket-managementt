import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService, private jwtService: JwtService) {}



  async validateGoogleUser(googleUser: CreateUserDto){
    try{

      const user = await this.userService.findByEmail(googleUser.email)
      if(user) return user
      return this.userService.create(googleUser)
    }catch(er){
    }
  }

  async generatePasswordSetupToken(userId: string) {
    const payload = { userId };
    return await this.jwtService.sign(payload,{secret:process.env.JWT_SECRET, expiresIn:'1h'});
  }

  async verifyToken(token: string, type: 'password-setup' | 'email-verification'): Promise<{ userId }> {
    try {
      const payload = this.jwtService.verify(token,{secret:process.env.JWT_SECRET});
      return payload;
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
  
  
}
