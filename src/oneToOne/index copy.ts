import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { IdCard } from "./entities/IdCard";
// OneToOne
async function main() {
  await AppDataSource.initialize();
  // const user = new User();
  // user.name = "11";
  // user.nickname = "11111";
  // user.phone = "12222222222";
  // user.age = 18;
  // user.desc = "11111111111111111111";

  // const idCard = new IdCard();
  // idCard.cardNo = "123456789012345678";
  // idCard.name = "hmm";
  // idCard.address = "北京市朝阳区";
  // idCard.birthday = new Date("2000-01-01");
  // idCard.email = "hmm2000@163.com";
  // // 关联两个实体
  // idCard.user = user;

  // const userRepository = AppDataSource.getRepository(User);
  // const idCaerRepostiory = AppDataSource.getRepository(IdCard);

  // await userRepository.save(user);
  // console.log("保存用户信息成功...", user);

  // await idCaerRepostiory.save(idCard);
  // console.log("保存身份证信息成功...", idCard);

  // 获取idCard实体存储库
  const idCardRespositroy = AppDataSource.getRepository(IdCard);
  // 通过idCard实体查询关联表数据
  const idCards = await idCardRespositroy.find({
    relations: { user: true },
  });
  console.log("idCards---", idCards);

  // 获取user实体存储库
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({
    relations: { card: true },
  });

  console.log("users---", users);
}
main();
