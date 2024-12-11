import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/utils/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

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

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res) {
    const user = req.user;
    const token = await this.authService.generatePasswordSetupToken(user.id);
    this.userService
      .findByEmail(user.email)
      .then((user) => {
        console.log(user.senha);
        if (user.senha != '') {
          this.emailService.sendEmail(
            user.email,
            'Welcome to Our Platform',
            `Hello ${user.nome}, your registration is complete!`,
            `<h1>Hello ${user.nome},</h1><p>Your registration is complete!</p>`,
          );
          res.redirect(`http://localhost:3001/dashboard?token=${token}`);
        } else {
          this.emailService.sendEmail(
            user.email,
            'Set your password',
            `Hello ${user.nome}, please set your password by clicking the link below:`,
            `<h1>Hello ${user.nome},</h1><p>Please set your password by clicking the link below:</p><a href="http://localhost:3001/password-setup?token=${token}">Set password</a>`,
          ); 
          res.redirect(`http://localhost:3001/password-setup?token=${token}`);
        }
      })
      .catch((er) => {});
  }

  
  @Post('recover-password')
  async recoverPassword(@Body('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return { message: 'Email not found' };
    }

    const token = await this.authService.generatePasswordSetupToken(user.id);
    this.emailService.sendEmail(
      email,
      'Recover your password',
      `Hello ${user.nome}, recover your password by clicking the link below:`,
      `<h1>Hello ${user.nome},</h1><p>Recover your password by clicking the link below:</p><a href="http://localhost:3001/password-setup?token=${token}">Recover password</a>`,
    );

    return { message: 'Email sent' };
  }
}
