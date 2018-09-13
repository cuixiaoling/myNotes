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
       /**
        * promise 实例具有 then 方法，
        * then 方法是定义在原型对象 promise.prototype 上的
        * 作用是 为Promise实例添加状态改变时的回调函数
        * then 方法第一个参数是 resolve状态的回调函数
        * 第二个参数是reject状态的回调函数（可选）
        * then 方法返回的是一个新的promise 实例（不是原来那个Promise实例）
        * 因此可以采用链式写法，即then的方法后面在调用另一个then方法
        */ 

    },
    created(){
        // this.test1();
        // this.test2();
        // this.test5();
        // this.test6();
        this.getJSON("https://api.iviewui.com/v1/ad/list?name=1").then((json)=>{
            console.log('Contents:'+json);
        },(error)=>{
            console.error('出错啦',error)
        })
        // 方式一
        this.getJSON("/post.json").then((posts)=>{
            // ...
        },(error)=>{
            console.log('发生错误一',error)
        })
        // 方式 二
        this.getJSON("/post/json").then((posts)=>{

        }).then(null,(err)=>{
            console.log('发生错误二',err)
        })
        // 方式 三
        this.getJSON("/post.json").then((posts)=>{
            // ...
        }).catch((error)=>{
            console.log('发生错误三！',error);
        })


    }
}
</script>

