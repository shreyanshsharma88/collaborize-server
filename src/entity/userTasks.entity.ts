import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_tasks')
export class UserTasks {
  @PrimaryGeneratedColumn()
  task_id: string;

  @Column()
  user_id: string;

  @Column()
  task_name: string;

  @Column()
  priority: number;

  @Column('text', { array: true })
  sub_task_ids: string[];
}
