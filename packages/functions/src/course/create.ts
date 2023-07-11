import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from '../../../core/db';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body);

  const result = await db
    .insertInto('courses')
    .values(data)
    .executeTakeFirstOrThrow();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};