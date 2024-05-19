import { Injectable } from '@nestjs/common';
import * as braintree from 'braintree';

@Injectable()
export class BraintreeProvider {
readonly gateway: braintree.BraintreeGateway;

constructor() {
    this.gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: '29b46ndbxsvgxwmg',
    publicKey: "qwkmy9g5hx985tmm",
    privateKey: "6a5bb2f8be69ad72d351e750e9b09501"
    });
}

}