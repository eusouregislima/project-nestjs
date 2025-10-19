import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { Message } from './entities/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const messages = await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
      select: {
        from: { id: true, name: true },
        to: { id: true, name: true },
      },
    });
    if (message) {
      return message;
    }

    this.throwNotFoundError();
  }

  async create(createMessagesDto: CreateMessagesDto) {
    const { fromId, toId } = createMessagesDto;

    const from = await this.usersService.findOne(fromId);

    const to = await this.usersService.findOne(toId);

    const newMessage = {
      text: createMessagesDto.text,
      from,
      to,
      read: false,
    };

    const message = this.messageRepository.create(newMessage);

    await this.messageRepository.save(message);

    return {
      ...message,
      from: message.from.id,
      to: message.to.id,
    };
  }

  async update(id: number, updateMessagesDto: UpdateMessagesDto) {
    const message = await this.findOne(id);

    if (!message) {
      return this.throwNotFoundError();
    }

    if (message.read === true && updateMessagesDto?.read === false) {
      message.read = updateMessagesDto?.read ?? message.read;
      await this.messageRepository.save(message);
      return {
        message: 'Message read updated to false',
      };
    }

    if (message.read === true) {
      return {
        message: 'Message already read, cannot be updated',
      };
    }

    message.read = updateMessagesDto?.read ?? message.read;
    message.text = updateMessagesDto?.text ?? message.text;

    return this.messageRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) {
      return this.throwNotFoundError();
    }

    return this.messageRepository.remove(message);
  }

  async removeAll() {
    const messages = await this.messageRepository.find();
    await this.messageRepository.remove(messages);
    return {
      message: 'All messages removed',
      count: messages.length,
    };
  }
}
