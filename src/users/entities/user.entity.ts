import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from '../../todos/entities/todo.entity';
// 这段代码定义了一个 User 实体类，使用了 TypeORM 提供的装饰器来标记该类为数据库实体，并定义了该实体的属性和对应的数据库列。
// 每个属性都使用了相应的装饰器来指定其在数据库中的行为和约束。
//typeorm 是一个流行的 TypeScript ORM（对象关系映射）库，用于与数据库进行交互。它提供了装饰器和实体类来定义数据库表结构和关系。
//Entity 装饰器用于标记一个类为数据库实体，表示该类对应数据库中的一张表。
//Column 装饰器用于定义实体类中的属性对应数据库表中的列。
//PrimaryGeneratedColumn 装饰器用于标记一个属性为主键，并且该主键的值会自动生成。
//CreateDateColumn 装饰器用于标记一个属性为创建时间戳，数据库会自动设置该字段的值为记录创建的时间。
//UpdateDateColumn 装饰器用于标记一个属性为更新时间戳，数据库会自动设置该字段的值为记录最后一次更新的时间。
//OneToMany 装饰器用于定义 User 实体与 Todo 实体之间的一对多关系，表示一个用户可以有多个待办事项（todos）。在 User 实体中，todos 属性使用 OneToMany 装饰器来指定与 Todo 实体的关系，并且通过 todo => todo.user 来指定反向关系，即每个待办事项都属于一个用户。
@Entity('users') // @Entity 装饰器用于标记 User 类为一个数据库实体，并指定该实体对应的数据库表名为 'users'。
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column() // @Column 装饰器用于定义 name 属性对应数据库表中的一列，并且指定该列的长度为 100。
  password: string;

  @CreateDateColumn() // @CreateDateColumn 装饰器用于定义 createdAt 属性为创建时间戳，数据库会自动设置该字段的值为记录创建的时间。
  createdAt: Date;

  @UpdateDateColumn() // @UpdateDateColumn 装饰器用于定义 updatedAt 属性为更新时间戳，数据库会自动设置该字段的值为记录最后一次更新的时间。
  updatedAt: Date;
  // @OneToMany 装饰器用于定义 User 实体与 Todo 实体之间的一对多关系，
  // 表示一个用户可以有多个待办事项（todos）。在 User 实体中，todos
  // 属性使用 OneToMany 装饰器来指定与 Todo 实体的关系，
  // 并且通过 todo => todo.user 来指定反向关系，即每个待办事项都属于一个用户。
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
