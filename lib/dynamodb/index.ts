
import { DynamoDBClient, DynamoDBDocumentClient } from '/opt/nodejs/modules';

const ddbClient = new DynamoDBClient({});

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };
const dynamoDB = DynamoDBDocumentClient.from(ddbClient, translateConfig);

// ! https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.ReadItem.html
// ! https://www.udemy.com/course/aws-cdk-serverless-api/learn/lecture/28087998#overview  time: 16:!6

export { dynamoDB };