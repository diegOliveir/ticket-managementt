import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService){}

  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin(){

  }

  @Post('setup-password')
  async setupPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    const payload = await this.authService.verifyToken(token, 'password-setup');
    if (!payload) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    this.userService.updatePassword(payload.userId, hashedPassword);

    return { message: 'Password set successfully' };
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res){
    const user = req.user
    const token = await this.authService.generatePasswordSetupToken(user.id)
    this.userService.findByEmail(user.email).then((user)=>{
      console.log(user.senha)
      if(user.senha != ''){
        res.redirect(`http://localhost:3001/dashboard?token=${token}`)
      }else{
        res.redirect(`http://localhost:3001/password-setup?token=${token}`)
      }
      }).catch((er)=>{
    })
  }
}