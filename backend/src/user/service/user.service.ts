import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BraintreeProvider } from '../braintreeProvider';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User,) private readonly userRepository: Repository<User>,
    private readonly braintreeProvider: BraintreeProvider,
    private readonly mailerService: MailerService


  ) {}
  //add user
  async create(date: any): Promise<User> {
    return this.userRepository.save(date);
  }
  //get user
  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }
  //get all users
  async findall(): Promise<User[]> {
    return await this.userRepository.find();
  }
  // update user
  async update(user_id: number, user: User): Promise<User> {
    await this.userRepository.update(user_id, user);
    return await this.userRepository.findOne({ where: { user_id } });
  }
  // delete user
  async delete(user_id: number): Promise<void> {
    await this.userRepository.delete(user_id);
  }
  async processCheckout(user_id: string, paymentMethodNonce: string) {

    try {
    const { gateway } = this.braintreeProvider;
    // Use the gateway object to perform Braintree operations
    const result = await gateway.transaction.sale({
        amount: '10',
        paymentMethodNonce: paymentMethodNonce,
        options: {
        submitForSettlement: true
        }
    });
    console.log({result})
    if (result.success) {
        return { result: 'success' };
    } else {
    // Check for specific authentication error
    if (result.transaction && result.transaction.processorResponseCode === '2000') {
        throw new Error('Braintree authentication error: Invalid credentials or account not configured properly');
    } else {
        throw new Error('Error processing transaction');
    }
    }
} catch (error) {
    console.error('Error during checkout:', error);
    throw new Error('Internal Server Error');
}
}

async sendEmail(to: string, subject: string, text: string) {
  try {
      await this.mailerService.sendMail({
      to,
      subject,
      text,
      });
      console.log('Email sent successfully');
  } catch (error) {
      console.error('Error sending email:', error);
      throw error;
  }
  }
  googleLogin(req:any){
    if(!req.user){
        return 'No user from google'
    }
    return{
        message : 'User Info from Google',
        user : req.user ,
        
    }
}

}
