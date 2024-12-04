import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";

@Controller('auth')
export class AuthController {

  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin(){

  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req, @Res() res){
    console.log(req.user)
    res.redirect("https://www.youtube.com")
  }
}