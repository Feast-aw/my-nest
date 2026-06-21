import { AppDataSource } from "./data-source";
import { Order } from "./entities/Order";
import { Product } from "./entities/Product";
// OneToOne
async function main() {
  await AppDataSource.initialize();
  const order1 = new Order();
  order1.name = "订单1";
  const order2 = new Order();
  order2.name = "订单2";

  const product1 = new Product();
  product1.name = "产品1";
  const product2 = new Product();
  product2.name = "产品2";
  const product3 = new Product();
  product3.name = "产品3";
  const product4 = new Product();
  product4.name = "产品4";

  order1.products = [product1, product2, product3];
  order2.products = [product1, product2, product3, product4];

  const orderRepository = AppDataSource.getRepository(Order);
  await orderRepository.save(order1);
  await orderRepository.save(order2);
}
main();
