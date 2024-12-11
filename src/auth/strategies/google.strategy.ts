import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleAuthConfig from '../config/google-auth-config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
      @Inject(googleAuthConfig.KEY) private googleConfiguration:
      ConfigType<typeof googleAuthConfig>,
      private authService: AuthService

  ) {
    super({ 
      clientID:googleConfiguration.clientID,
      clientSecret:googleConfiguration.clientSecret, 
      callbackURL:googleConfiguration.callbackURL, 
      scope:['email', 'profile'] });
  }
  async validate(accessToken: string, refreshToken:string,profile:any, done:VerifyCallback){
    const user = await this.authService.validateGoogleUser({
      email:profile.emails[0].value,
      nome: profile.name.givenName,
      senha:'' 
    }) 
    done(null, user)
  }

}

