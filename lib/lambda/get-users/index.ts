
import { dynamoDB } from 'lib/dynamodb';
import { ScanCommand, unmarshall } from '/opt/nodejs/modules';

exports.handler = async function(event: any) {

  const response = await dynamoDB.send(new ScanCommand({ TableName: process.env.TABLE_NAME }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      niceUsers: (response.Items?.map(item => unmarshall(item)) ?? []),
      originalUsers: response.Items ?? [],
    })
  }
}