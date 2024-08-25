import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_sub_tasks')
export class UserSubTasks {
  @PrimaryGeneratedColumn()
  sub_task_id: string;

  @Column()
  task_id: string;

  @Column()
  sub_task_name: string;

  @Column()
  sub_task_priority: number;
}
