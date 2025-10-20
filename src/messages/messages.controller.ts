import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() createMessagesDto: CreateMessagesDto) {
    return this.messagesService.create(createMessagesDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMessagesDto: UpdateMessagesDto,
  ) {
    return this.messagesService.update(id, updateMessagesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.messagesService.removeAll();
  }
}
