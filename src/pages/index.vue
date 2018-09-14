<template>
<div>
    promise
</div>
</template>
<script>
export default {
    data(){
        return{
            // getJSON:{},
        }
    },
    methods:{
       initFun(){
           const promise  = new Promise((resolve,reject)=>{
               if(true){//异步操作成功
                    resolve(value);
               }else{
                    reject(error)
               }
           }) 
           promise.then(()=>{

           },(error)=>{

           })
       },
       test1(){
            let timeout=(ms)=>{
                return new Promise ((resolve,reject)=>{
                    setTimeout(resolve,ms,'done')
                })
            }
            timeout(1000).then((value)=>{
                console.log(value)
            })
       },
       test2(){
           let promise = new Promise ((resolve,reject)=>{
               console.log('Promise');
               resolve();
           })
           promise.then(()=>{
               console.log('resolved.')
           })
           console.log('Hi!')
       },
       /* 包装 ajax 操作的例子 */
       getJSON(url){
            const promise = new Promise((resolve, reject)=>{
            const handler = function() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            const client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();

            });
            return promise;
       },
    //    catch 的三种表现形式
       test3(){
        // this.getJSON("https://api.iviewui.com/v1/ad/list?name=1").then((json)=>{
        //     console.log('Contents111:'+json);
        // },(error)=>{
        //     console.error('出错啦',error)
        // })
        // // 方式 一
        // this.getJSON("/post.json").then((posts)=>{
        //     // ...
        // },(error)=>{
        //     console.log('发生错误一',error)
        // })
        // // 方式 二
        // this.getJSON("/post/json").then((posts)=>{

        // }).then(null,(err)=>{
        //     console.log('发生错误二',err)
        // })
        // // 方式 三
        // this.getJSON("/post.json").then((posts)=>{
        //     // ...
        // }).catch((error)=>{
        //     console.log('发生错误三！',error);
        // })
        this.getJSON("https://api.iviewui.com/v1/ad/list?name=1").then((res)=>{
            return this.getJSON(res.commentURL);
        }).then((err2)=>{
            console.log(err2)
        }).catch((err)=>{
            console.log(err)
        })
       },
       test4(){
           const p1 = new Promise (function(resolve,reject){
            //    p1 Promise 实例
           })
           const p2 = new Promise (function(resolve,reject){
               resolve(p1)
           })

       },
       test5(){
           const p1 = new Promise(function(resolve,reject){
               setTimeout (()=>reject(new Error ('fail11')),3000)
           })
           const p2 = new Promise(function(resolve,reject){
               setTimeout(()=>resolve(p1),1000)
           })
           p2
           .then(result => console.log(result))
           .catch(error => console.log(error))
       },
       test6(){
            new Promise ((resolve,reject)=>{
                //    resolve(1);
                return resolve(1);
                console.log(2);
            }).then((r)=>{
                console.log(r);
            })
       },
       test7(){
            const promise = new Promise (function(resolve,reject){
                throw new Error ('test')
            });
            promise.catch(function(error){
                console.log(error)
            })
            // 写法一
            const promise1 = new Promise ((resolve,reject)=>{
                try{
                    throw new Error ('test1111111')
                }catch(e){
                    console.log(e);
                }
            })
            promise1.catch((err)=>{
                console.log(err +'666') // 加不上字符串
            })
            // 写法二
            const promise2 = new Promise((resolve,reject)=>{
                reject(new Error('test2'))
            });
            promise2.catch((err)=>{
                console.log(err+'2222222')
            })
        },
        // 如果Promise状态已经变成resolve，再抛出错误是无效的
        test8(){
            const promise = new Promise((resolve,reject)=>{
                resolve('ok')
                throw new Error ('test')
            });
            promise
                .then((res)=>{console.log(res)})
                .catch((error)=>{console.log(error)})
        },
        test9(){
            const promise = new Promise ((resolve,reject)=>{
                resolve('ok')
                setTimeout(()=>{ throw new Error('test')},0)
            })
            promise.then(function(value){console.log(value)})

        },
        // finally 实现的方式
        test10(){ 
            Promise.prototype.finally = callback =>{
                let p = this.constructor;
                return this.then(
                    value => P.resolve(callback()).then(()=>value),
                    reason => p.resolve(callback()).then(()=>{throw reason})
                )
            }
        },
        // promise all
        // all 的执行条件 都变成 fulfilled 或者 有一个是 rejected
        // 才会调用Promise.all 方法后面的回调函数
        testAll1(){
            const promise = [2,3,5,7,11,13].map(id=>{
                console.log(id);
                return this.getJSON('/post/'+id+".json")
            })
            Promise.all(promise).then((posts)=>{
                console.log(posts)
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 只有都兩個異步函数都执行完，才会执行回调函数
        testAll2(){
            const databasePromise = connectDatabase()
            const booksPromise = databasePromise.then(findAllBooks)
            const userPromise = databasePromise.then(getCurrentUser)
            Promise.all([
                booksPromise,
                userPromise
            ])
            .then(([books,user])=> pickTopRecommentations(books,user));
        },
        // 作为参数的promise的实例，自己定义的catch方法报错，
        // 不会触发 Promise.all() 的catch方法
        testAll3(){
            const p1 = new Promise ((resolve,reject)=>{
                resolve('hello')
            })
            .then(res =>res)
            .catch(err=>err)
            const p2 = new Promise((reslove,reject)=>{
                throw new Error('报错')
            })
            .then(res => res)
// 如果没有这个方法，就会执行Promise.all 的 catch 方法
            // .catch(err => err) 
            Promise.all([p1,p2])
            .then(res=>console.log(res))
            .catch(e=>console.log(e+1111))
        },
        /**
         * 将对象转为 Promise 对象， Promise.reolve
         */
        testA(){
            
        },
    },
    created(){
        // this.test1();
        // this.test2();
        // this.test3();
        // this.test5();
        // this.test6();
        // this.test7();
        // this.test8();
        // this.test9();
        // this.testAll1();
        // this.testAll2();
        this.testAll3()
    }
}
</script>

