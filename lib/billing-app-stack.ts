import { Stack, StackProps } from 'aws-cdk-lib';
import { AccessLogFormat, LogGroupLogDestination } from 'aws-cdk-lib/aws-apigateway';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
// import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { MyRESTApi } from './stacks/rest-api';

export class BillingAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // new Vpc(this, 'BillingVPC');

    const logGroup = new LogGroup(this, 'MyAPIGatewayLogs');

    new MyRESTApi(this, {
      deployOptions: {
        accessLogDestination: new LogGroupLogDestination(logGroup),
        accessLogFormat: AccessLogFormat.jsonWithStandardFields(),
      }
    });
  }
}
