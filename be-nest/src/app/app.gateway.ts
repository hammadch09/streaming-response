import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }

  @SubscribeMessage('questionId')
  async handleMessage(socket: Socket, questionId: number) {
    const words = this.appService.getAnswerById(questionId);
    const strings = words.answer.split(' ');
    for (const word of strings) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      this.server.emit('streamingAnswer', word);
    }
  }
}
