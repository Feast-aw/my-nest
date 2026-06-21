import { AppDataSource } from "./data-source";
import { Department } from "./entities/Department";
import { Employee } from "./entities/Employee";
// OneToOne
async function main() {
  await AppDataSource.initialize();
  // const depart = new Department();
  // depart.name = "表演部";
  // depart.desc = "表演部门";

  // const emp1 = new Employee();
  // emp1.name = "员工3";
  // const emp2 = new Employee();
  // emp2.name = "员工4";

  // depart.employees = [emp1, emp2];

  // const departmentRepository = AppDataSource.getRepository(Department);
  // const result = await departmentRepository.save(depart);
  // console.log(result);
  const departmentRepository = AppDataSource.getRepository(Department);
  const depart = await departmentRepository.find({
    relations: { employees: true },
  });
  console.log(depart);
}
main();
