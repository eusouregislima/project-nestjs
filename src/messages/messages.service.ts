import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { Message } from './entities/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (message) {
      return message;
    }

    this.throwNotFoundError();
  }

  async create(createMessagesDto: CreateMessagesDto) {
    const newMessage = {
      ...createMessagesDto,
      read: false,
    };

    const message = this.messageRepository.create(newMessage);

    return await this.messageRepository.save(message);
  }

  async update(id: number, updateMessagesDto: UpdateMessagesDto) {
    const partialUpdateMessageDto = {
      read: updateMessagesDto?.read,
      text: updateMessagesDto?.text,
    };

    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDto,
    });

    if (!message) {
      return this.throwNotFoundError();
    }

    return this.messageRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) {
      return this.throwNotFoundError();
    }

    return this.messageRepository.remove(message);
  }
}
