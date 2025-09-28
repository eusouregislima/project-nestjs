import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateMessagesDto } from './create-messages.dto';

export class UpdateMessagesDto extends PartialType(CreateMessagesDto) {
  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;
}
