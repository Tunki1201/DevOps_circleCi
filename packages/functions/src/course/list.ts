import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from '../../../core/db';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const records = await db
    .selectFrom("courses")
    .selectAll()
    .execute();

  return {
    statusCode: 200,
    body: JSON.stringify(records),
  };
};