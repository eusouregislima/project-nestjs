import { IsEmail } from 'class-validator';
import { Message } from 'src/messages/entities/messages.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Um usuário pode enviar várias mensagens
  // Relacionamento de um para muitos no campo 'from' da tabela 'messages'
  @OneToMany(() => Message, (message) => message.from)
  sentMessages: Message[];

  // Um usuário pode receber várias mensagens
  // Relacionamento de um para muitos no campo 'to' da tabela 'messages'
  @OneToMany(() => Message, (message) => message.to)
  receivedMessages: Message[];
}
