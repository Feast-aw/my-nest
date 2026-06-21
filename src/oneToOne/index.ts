import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { IdCard } from "./entities/IdCard";
// OneToOne
async function main() {
  await AppDataSource.initialize();
  // const user = new User();
  // user.name = "22";
  // user.nickname = "22222";
  // user.phone = "12222222222";
  // user.age = 18;
  // user.desc = "222222222222";

  // const idCard = new IdCard();
  // idCard.cardNo = "123456789012345678";
  // idCard.name = "22";
  // idCard.address = "北京市朝阳区";
  // idCard.birthday = new Date("2000-01-01");
  // idCard.email = "2222@163.com";
  // // 关联两个实体
  // user.card = idCard;
  // const userRepository = AppDataSource.getRepository(User);
  // await userRepository.save(user);
  // console.log("保存用户信息成功...", user);
}
main();
