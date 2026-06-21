import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
// 使用manager来操作数据库
AppDataSource.initialize()
  .then(async () => {
    const user1 = new User();
    user1.name = "jack";
    user1.nickname = "张三";
    user1.phone = "13311111111";
    user1.age = 25;
    user1.desc = "This is a desc1";
    await AppDataSource.manager.save(user1);
    console.log("Saved a new user with id: " + user1.id);

    const user2 = new User();
    user2.name = "rose";
    user2.nickname = "李四";
    user2.phone = "13322222222";
    user2.age = 26;
    user2.desc = "This is a desc2";
    await AppDataSource.manager.save(user2);
    console.log("Saved a new user with id: " + user2.id);

    // 查询数据
    const users = await AppDataSource.manager.find(User);
    console.log("查询所有用户信息: ", users);

    // 跟新
    user1.name = "tom";
    await AppDataSource.manager.save(user1);
    //查询;
    const user = await AppDataSource.manager.findOneBy(User, {
      id: 5,
    });
    console.log("查询所有用户信息: ", user);
  })
  .catch();

// ┌─────────────────────────────────────────┐
// │         DataSource (数据源)              │QueryBuilder
// │      "数据库连接的源头，管理连接池"         │
// │                                          │
// │  ┌────────────────────────────────────┐ │
// │  │   EntityManager (实体管理器)         │ │
// │  │   "可以操作所有实体"                  │ │
// │  │                                     │ │
// │  │  ┌──────────┐  ┌──────────┐       │ │
// │  │  │Repository│  │Repository│       │ │
// │  │  │  (User)  │  │(Product) │       │ │
// │  │  │"只操作   │  │"只操作   │       │ │
// │  │  │ User表"  │  │Product表"│       │ │
// │  │  └──────────┘  └──────────┘       │ │
// │  └────────────────────────────────────┘ │
// └─────────────────────────────────────────┘
