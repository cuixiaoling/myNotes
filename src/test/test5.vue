<template>
    <div>
        promise
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        fun1(){
            this.$axios.get('http://47.100.54.97:8080/soar_fish/cargo/getCargo').then((res)=>{
                console.log(res,'货种111')
            }).then(()=>{
                console.log(1111)
            })
        },
        init(){
            let that = this;
            const promise = new Promise(function(resolve,reject){
                that.$axios.get('http://47.100.54.97:8080/soar_fish/getSluiceInfo').then((res)=>{
                    console.log(res,'闸口信息')
                    resolve(res)
                })
                // if(true){
                //     resolve(value)
                // }else{
                //     reject(error)
                // }
            })
            .then((res)=>{
            console.log(res)
        });
        },
        timeout(ms){
            return new Promise ((resolve,reject)=>{
                // setTimeout(resolve,ms,'done');
                this.$axios.get('http://47.100.54.97:8080/soar_fish/getSluiceInfo').then((res)=>{
                    console.log(res,'异步结果')
                    resolve('异步成功');
                })
            })
        },
        fun2(){
            /**
             * promise 建立后先执行，里面的同步
             * .then 是在所有的同步执行完之后，在执行
             */
            let promise = new Promise ((resolve,reject)=>{
                console.log('Promise')
                resolve()
            });
            promise.then(()=>{
                console.log('resolved.')
            })
            console.log("Hi!")
            
        },
        getJson(url){
            const promise = new Promise (function(resolve,reject){
                const handler = function(){
                    if(this.readyState !==4){
                        return;
                    }
                    if(this.status===200){
                        let obj = this.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
                        resolve(obj)
                    }else{
                        reject(new Error (this.statusText))
                    }
                };
                const client = new XMLHttpRequest();
                client.open("GET",url,true);
                client.onreadystatechange = handler;
                client.responseType = "json";
                // client.setRequestHeader("Accept","application/json");
                client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                client.send();
            });
            return promise;
        }
    },
    created(){
        // this.init()
        // this.timeout(100).then((value)=>{
        //     console.log(value)
        // })
        // this.$axios.get('http://47.100.54.97:8080/soar_fish/getSluiceInfo').then((res)=>{
        //     console.log(res,'闸口信息111')
        // }).then(()=>{
        //     this.fun1();
        // })
        this.getJson("http://47.100.54.97:8080/soar_fish/getSluiceInfo").then((json)=>{
            console.log('Contents:'+json)
            console.log(json)
            // console.log('Contents:'+JSON.parse(JSON.stringify(json)))
        }, function(error) {
            console.error('出错了', error);
        })
        return;
        this.fun2() 
        return;
        this.timeout().then((res)=>{
            // console.log(res,'999')
            this.fun1();
        })

    }
}
</script>

