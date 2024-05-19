import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleProvider extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:8000/backend/user/auth/google/callback",
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string,refreshToken:string, profile: any, done: VerifyCallback): Promise<any> {
        const {name,emails,photos}=profile
        
            // Add your validation logic here, for example:
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastNAme: name.familyName,
                accessToken,
            };
                
            done(null, user);

    }
}

// npm i @nestjs/passport
// npm i --save @nestjs/passport passport