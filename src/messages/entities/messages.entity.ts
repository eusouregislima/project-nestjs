import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  // Muitas mensagens podem ser enviadas por um único usuário (remetente)
  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna 'from' da tabela 'messages' que referencia o id da pessoa na tabela 'users'
  @JoinColumn({ name: 'from' })
  from: User;

  // Muitas mensagens podem ser enviadas para um único usuário (destinatário)
  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna 'to' da tabela 'messages' que referencia o id da pessoa na tabela 'users'
  @JoinColumn({ name: 'to' })
  to: User;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
