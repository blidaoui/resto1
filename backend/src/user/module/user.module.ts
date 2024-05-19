import { TypeOrmModule} from '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';
import { JwtModule } from '@nestjs/jwt';
import { BraintreeProvider } from '../braintreeProvider';
import { GoogleProvider } from '../GoogleProvider';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
  
    TypeOrmModule.forFeature([User]),
 
  JwtModule.register({
    secret:'AIzaSyAldsDQa38E4vaG8Kb6oC9_I6EZ4LJoPro',
    signOptions:{expiresIn: '1d'}                
}),
  MailerModule.forRoot({
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "blidaouiibtihel22@gmail.com",
      pass: "mvoy rpag vejx qfcg",
    },
  },
  defaults: {
    from: 'PIZZA TIME <blidaouiibtihel22@gmail.com>',
  },
}),
],

  controllers: [UserController],
  providers: [UserService,BraintreeProvider,GoogleProvider],
  

})

export class UserModule {}
//npm install --save @nestjs-modules/mailer nodemailer
//npm install --save-dev @types/nodemailer