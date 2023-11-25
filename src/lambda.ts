import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { proxy } from 'aws-serverless-fastify';
import bootstrap from './app';
import { FastifyInstance } from 'fastify';

let fastifyInstance: FastifyInstance;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!fastifyInstance) {
    fastifyInstance = await bootstrap();
  }
  return await proxy(fastifyInstance, event, context);
};
