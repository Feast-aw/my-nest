import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
async function main() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);

  // const user1 = new User();
  // user1.name = "jack";
  // user1.nickname = "张三";
  // user1.phone = "13311111111";
  // user1.age = 25;
  // user1.desc = "This is a desc1";
  // await userRepository.save(user1);
  // console.log("新增成功...", user1);

  // const user2 = new User();
  // user2.name = "rose";
  // user2.nickname = "李四";
  // user2.phone = "13322222222";
  // user2.age = 26;
  // user2.desc = "This is a desc2";
  // // 新增 user2
  // await userRepository.save(user2);
  // console.log("新增成功...", user2);

  // 查询
  // const users = await userRepository.find();
  // console.log("查询所有用户信息:", users);

  // const user = await userRepository.findOneBy({
  //   id: 1,
  // });
  // console.log("查询所有用户信息:", user);

  // 更新
  // user.phone = "18888888888";
  // await userRepository.save(user);

  // 删除
  const user = await userRepository.findOneBy({
    id: 2,
  });
  await userRepository.delete(user);
  console.log("删除成功");
}
main();
