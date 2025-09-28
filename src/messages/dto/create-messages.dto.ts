import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessagesDto {
  @IsString({
    message: 'O texto deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O texto é obrigatório',
  })
  @MinLength(3, {
    message: 'O texto deve ter pelo menos 3 caracteres',
  })
  @MaxLength(255, {
    message: 'O texto deve ter no máximo 255 caracteres',
  })
  readonly text: string;
  @IsString({
    message: 'O texto deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O texto é obrigatório',
  })
  @MinLength(3, {
    message: 'O texto deve ter pelo menos 3 caracteres',
  })
  @MaxLength(255, {
    message: 'O texto deve ter no máximo 255 caracteres',
  })
  readonly from: string;
  @IsString({
    message: 'O texto deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O texto é obrigatório',
  })
  @MinLength(3, {
    message: 'O texto deve ter pelo menos 3 caracteres',
  })
  @MaxLength(255, {
    message: 'O texto deve ter no máximo 255 caracteres',
  })
  readonly to: string;
}
