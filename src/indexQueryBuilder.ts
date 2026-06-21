import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
// 使用manager来操作数据库
async function main() {
  await AppDataSource.initialize();
  //直接通过AppDataSource创建QueryBuilder
  // const user = await AppDataSource.createQueryBuilder()
  //   .select("user")
  //   .from(User, "user")
  //   .where("user.id=:id", { id: 1 })
  //   .getOne();
  // console.log(user);

  // 通过Repository创建QueryBuilder
  // const user = await AppDataSource.getRepository(User)
  //   .createQueryBuilder("user")
  //   .where("user.id=:id", { id: 1 })
  //   .getOne();
  // console.log(user);

  //  通过EntityManager创建QueryBuilder
  // const user = await AppDataSource.manager
  //   .createQueryBuilder(User, "user")
  //   .where("user.id=:id", { id: 1 })
  //   .getOne();
  // console.log(user);

  // const user = new User();
  // user.name = "lily";
  // user.nickname = "丽丽";
  // user.phone = "13333333333";
  // user.age = 18;
  // user.desc = "......";

  const queryBuilder = AppDataSource.createQueryBuilder();
  // const result = await queryBuilder.insert().into(User).values(user).execute();
  // console.log(result);
  // getMany() → 返回实体对象（有类型安全、自动映射）
  // getRawMany() → 返回原始数据库数据（无类型安全、无映射）
  // const saveUser = await queryBuilder.select("u").from(User, "u").getRawMany();
  // console.log(saveUser);

  const userUpdate = await queryBuilder
    .select("u")
    .from(User, "u")
    .where("u.id = :id", { id: 3 })
    .getOne();
  console.log("查询id=1的用户信息:", userUpdate);

  // userUpdate.name = "lucy";
  // userUpdate.nickname = "露西";
  // userUpdate.phone = "13344444444";
  // userUpdate.age = 20;
  // userUpdate.desc = "123456";

  // const resultUpdate = await queryBuilder
  //   .update(User)
  //   .set(userUpdate as any)
  //   .where("id = :id", { id: 1 })
  //   .execute(); //返回结果
  // console.log("更新数据:", resultUpdate);

  // const resultDelete = await queryBuilder
  //   .delete()
  //   .from(User)
  //   .where("id = :id", { id: 1 })
  //   .execute();
  // console.log("删除数据:", resultDelete);
}
main();
