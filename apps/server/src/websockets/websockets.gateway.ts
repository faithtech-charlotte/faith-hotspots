import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(5010)
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('WebsocketsGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('registration')
  handleRegistration(client: Socket, payload: any): string {
    this.logger.log('Client registration received', payload);
    return 'Hello registered client!';
  }
}
