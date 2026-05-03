import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
// 这段代码定义了一个 User 实体类，使用了 TypeORM 提供的装饰器来标记该类为数据库实体，并定义了该实体的属性和对应的数据库列。
// 每个属性都使用了相应的装饰器来指定其在数据库中的行为和约束。
//typeorm 是一个流行的 TypeScript ORM（对象关系映射）库，用于与数据库进行交互。它提供了装饰器和实体类来定义数据库表结构和关系。
//Entity 装饰器用于标记一个类为数据库实体，表示该类对应数据库中的一张表。
//Column 装饰器用于定义实体类中的属性对应数据库表中的列。
//PrimaryGeneratedColumn 装饰器用于标记一个属性为主键，并且该主键的值会自动生成。
//CreateDateColumn 装饰器用于标记一个属性为创建时间戳，数据库会自动设置该字段的值为记录创建的时间。
//UpdateDateColumn 装饰器用于标记一个属性为更新时间戳，数据库会自动设置该字段的值为记录最后一次更新的时间。

@Entity('todos') // @Entity 装饰器用于标记 User 类为一个数据库实体，并指定该实体对应的数据库表名为 'users'。
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'int' })
  userId: number;
  // @ManyToOne 装饰器用于定义 Todo 实体与 User 实体之间的多对一关系，
  // 表示每个待办事项都属于一个用户。在 Todo 实体中，user 属性使用 ManyToOne
  // 装饰器来指定与 User 实体的关系，并且通过 user => user.todos 来指定反向关系，
  // 即每个用户可以有多个待办事项。
  // onDelete: 'CASCADE' 选项用于指定当关联的 User 实体被删除时，相关的 Todo 实体也会被自动删除，
  // 以保持数据的一致性。
  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  // @JoinColumn 装饰器用于指定关联的外键列名，这里指定为 'userId'，
  // 表示在数据库中该列将作为外键来关联 User 实体。
  @JoinColumn({ name: 'userId' })
  // @JoinColumn 装饰器用于指定关联的外键列名，
  // 这里指定为 'userId'，表示在数据库中该列将作为外键来关联 User 实体。
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
