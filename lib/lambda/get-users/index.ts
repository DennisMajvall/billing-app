
import { dynamoDB } from 'lib/dynamodb';
import { ScanCommand } from '/opt/nodejs/modules';

exports.handler = async function(event: any) {

  const response = await dynamoDB.send(new ScanCommand({ TableName: 'BillingAppStack-Users0A0EEA89-UZEXQBZK1CSW' }));
  console.log('🚀 -> response.Items', response.Items);

  return {
    statusCode: 200,
    body: JSON.stringify((response.Items ?? []))
  }
}