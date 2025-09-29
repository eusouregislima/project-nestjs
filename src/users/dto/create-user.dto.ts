import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'O nome deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O nome é obrigatório',
  })
  @MinLength(3, {
    message: 'O nome deve ter pelo menos 3 caracteres',
  })
  @MaxLength(150, {
    message: 'O nome deve ter no máximo 150 caracteres',
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'O email é obrigatório',
  })
  readonly email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  @MaxLength(30, { message: 'A senha deve ter no máximo 30 caracteres' })
  readonly password: string;
}
