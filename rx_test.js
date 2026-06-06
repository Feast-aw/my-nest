import { Observable, of, from, concatAll, concatMap, forkJoin, filter, map } from "rxjs";

// 创建一个 Observable
// const observer = new Observable((subscriber => {
//     subscriber.next('Hello');
//     subscriber.next('World');
//     subscriber.complete();
// }))
// 订阅 Observable
// observer.subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('完成')
// })



// 使用 of 创建 Observable
// const observer = of(1, 2, 3, 4, 5);
// observer.subscribe({
//     next(value) {
//         console.log(value);
//     }, // 处理每个值
//     complete() {
//         console.log('Complete!');
//     }, // 流结束
// })


// 使用 from 创建 Observable
// const promise = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('Promise resolved!');
//     }, 1000)
// })
// const observer = from(promise);
// observer.subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('完成')
// })

// 使用 from 创建 Observable，并使用 concatMap 和 concatAll 处理多个 Promise
// const promise1 = new Promise((resolve) => setTimeout(() => resolve('Hello'), 500));
// const promise2 = new Promise((resolve) => setTimeout(() => resolve('World'), 1000));
// const promise3 = new Promise((resolve) => setTimeout(() => resolve('!'), 1500));
// const promises = [promise1, promise2, promise3];
// const observer = from(promises);
// // concatMap 会等待前一个 Observable 完成后才会订阅下一个 Observable，确保了顺序执行
// // concatAll 会将多个 Observable 合并成一个 Observable，按照顺序发出每个 Observable 的值
// observer.pipe(
//     concatAll(promises)
// ).subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('完成')
// });
// from(promises) // 创建一个 Observable，依次发出每个 Promise
//     .pipe(
//         concatMap(promise => from(promise))
//     )
//     .subscribe({
//         next(value) { console.log(value); },
//         complete() { console.log('Complete!'); }
//     });
//同时发出值
// forkJoin(promises).subscribe({
//     next(value) { console.log(value); },
//     complete() { console.log('Complete!'); }
// });

of(1, 2, 3, 4, 5)
    .pipe(map((x) => x * x))
    .pipe(filter((x) => x % 2 === 0))
    .subscribe((v) => console.log(`打印: ${v}`));