import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get, Request, response,
  ResponseObject, RestBindings
} from '@loopback/rest';
import {Travers} from '../lip/Traverse';
import {TodoRepository} from '../repositories/todo.repository';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};


/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    const todos = await this.todoRepository.find()
    return {
      // greeting: 'Hello from LoopBack',
      // date: new Date(),
      // url: this.req.url,
      // headers: Object.assign({}, this.req.headers),
      'todoList': todos
    };
  }

  // Map to `GET /ping`
  @get('/pong')
  @response(200, PING_RESPONSE)
  pong(): object {
    const travers = new Travers();
    return {
      tree: travers.travers()
    };
  }

}
