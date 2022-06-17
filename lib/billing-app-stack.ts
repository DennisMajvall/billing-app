import { Stack, StackProps } from 'aws-cdk-lib';
// import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { MyRESTApi } from './stacks/rest-api';

export class BillingAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // new Vpc(this, 'BillingVPC');

    new MyRESTApi(this);
  }
}
