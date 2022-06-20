import { Duration } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi, RestApiProps } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { join } from 'path';

export class MyRESTApi extends RestApi {
  constructor(scope: Construct, props: RestApiProps = {}) {
    super(scope, 'MyRESTApi', props);

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
      environment: { TABLE_NAME: table.tableName },
      handler: 'handler',
      entry: join(__dirname, '../lambda/get-users/index.ts'),
      bundling: {
        minify: false,
        externalModules: ['aws-sdk', 'modules'],
      },
      // code: Code.fromAsset(join(__dirname, '../lambda/get-users')),
      layers: [nodeModulesLayer],
    });

    this.root.addResource('users').addMethod('GET', new LambdaIntegration(fn));
    table.grantFullAccess(fn);
  }
}
