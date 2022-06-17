import { Duration, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

export class MyRESTApi extends RestApi {
  constructor(scope: Construct, props: StackProps = {}) {
    super(scope, 'MyRESTApi', props);

    // this.root.addMethod('GET');

    const table = new Table(scope, 'Users', {
      partitionKey: { name: 'id', type: AttributeType.STRING }
    });


    const nodeModulesLayer = new LayerVersion(this, 'modules-layer', {
      compatibleRuntimes: [Runtime.NODEJS_16_X],
      code: Code.fromAsset('lib/layers/modules'),
      description: 'Packages all external node_modules',
    });


    const fn = new NodejsFunction(this, 'GetUsers', {
    memorySize: 1024,
    timeout: Duration.seconds(5),
    runtime: Runtime.NODEJS_16_X,
    handler: 'handler',
    entry: join(__dirname, '../lambda/get-users/index.ts'),
    bundling: {
      minify: false,
      externalModules: ['aws-sdk', 'modules'],
    },
    // code: Code.fromAsset(join(__dirname, '../lambda/get-users')),
    layers: [nodeModulesLayer],
});



    const users = this.root.addResource('users');
    users.addMethod('GET', new LambdaIntegration(fn));
    table.grantFullAccess(fn);
  }
}
