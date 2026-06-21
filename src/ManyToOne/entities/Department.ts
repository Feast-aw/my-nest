import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Employee } from "./Employee";
//部门 1对多
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  desc: string;

  @OneToMany(() => Employee, (employee) => employee.department, {
    cascade: true, //级联
  })
  employees: Employee[];
}
