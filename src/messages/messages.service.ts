import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { Message } from './entities/messages.entity';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Hello World!',
      from: 'John Doe',
      to: 'Jane Doe',
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  findOne(id: number) {
    const message = this.messages.find((message) => message.id === id);

    if (message) {
      return message;
    }

    // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  create(createMessagesDto: CreateMessagesDto) {
    this.lastId++;

    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessagesDto,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: number, updateMessagesDto: UpdateMessagesDto) {
    const messageExistsIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (messageExistsIndex < 0) {
      this.throwNotFoundError();
    }

    const messageExists = this.messages[messageExistsIndex];

    this.messages[messageExistsIndex] = {
      ...messageExists,
      ...updateMessagesDto,
      updatedAt: new Date(),
    };

    return this.messages[messageExistsIndex];
  }

  remove(id: number) {
    const messageExistsIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (messageExistsIndex < 0) {
      this.throwNotFoundError();
    }

    const messageExists = this.messages[messageExistsIndex];

    this.messages.splice(messageExistsIndex, 1);

    return `Message ${messageExists.id} removed`;
  }
}
