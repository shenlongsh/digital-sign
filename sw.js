importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js');
if (workbox) {  
    console.log(`Yay! Workbox is loaded 🎉`);
} else {  
    console.log(`Boo! Workbox didn't load 😬`);
}
//修改默认配置
workbox.core.setCacheNameDetails({
    prefix: 'app',
    suffix: 'v0',
    precache: 'precache',
    runtime: 'runtime'
  })
workbox.routing.registerRoute(
    /(.*)/,
    new workbox.strategies.CacheFirst()
  )
//创建一个cacheName
const cacheName = 'cache-0-2-0';
console.log('service worker 版本:', cacheName)

// async function cleanCaches() {
//   const mycaches = await caches.keys()
//   let str = 'mycaches:'+mycaches.toString()
//   console.log(str) 
//   for(let i=0;i<mycaches.length;i++) {
//     const result = await caches.delete(mycaches[i])
//     const rstr = 'delete:'+mycaches[i]+result
//     console.log(rstr)
//     str += '\n'+rstr
//   }
// }
// cleanCaches()
//需要缓存的资源列表
// const cacheFiles = [
//     '/digital-sign/',
//     // './index.html',
//     // './index.js',
//     // './style.css',
//     // './img/wang.jpeg',
//     // './img/loading.svg'
// ];
// //监听install事件, 完成安装时， 进行文件缓存
// self.addEventListener('install', function (e) {
//     console.log('service worker 安装成功');
//     const cacheOpenPromise = caches.open(cacheName).then(function (cache) {
//         return cache.addAll(cacheFiles);
//     });
//     e.waitUntil(cacheOpenPromise);
// });
// //监听activite事件， 激活后通过cache的key来判断是否需要更新cache中的静态资源
// self.addEventListener('activate',function (e) {
//     console.log('service worker 激活成功');
//     const cachePromise = caches.keys().then(function (keys) {
//         return Promise.all(keys.map(function (key) {
//             if(key !== cacheName) {
//                 return caches.delete(key);
//             }
//         }))
//     });
//     e.waitUntil(cachePromise);
//     return self.clients.claim(); //激活触发Service Worker
// });
// //cache存在则使用cache，无cache则fetch服务器端请求资源
// self.addEventListener('fetch', function (e) {
//     // console.log('service worker 抓取请求: ' + e.request.url)
//     e.respondWith(
//       caches.match(e.request).then(function (cache) {
//           return cache || fetch(e.request);
//       }).catch(function (err) {
//             console.log(err);
//             return fetch(e.request);
//       })
//     );
// });