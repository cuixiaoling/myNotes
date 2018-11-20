<template>
	<div>async</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	export default{
		methods:{
			async fun5 (){
				let getFoo = ()=>{
					this.$axios.get('http://47.100.54.97:8080/soar_fish/cargo/getCargo').then((res)=>{
						console.log(res,'货种接口')
					}).catch(()=>{

					})
				};
				let getBar = ()=>{
					this.$axios.get('http://47.100.54.97:8080/soar_fish/getSluiceInfo').then((res)=>{
						console.log(res,'闸口接口')
					})
				};
				let bar2 = await getBar();
				let foo2 = await getFoo();
			},
			// async fun1(){
			fun1(){
				new Promise((resolve)=>{
				// await new Promise((resolve)=>{
					this.$axios.get('http://47.100.54.97:8080/soar_fish/getSluiceInfo').then((res)=>{
						console.log(res,'闸口信息')
						resolve('fun1');
					})
				})
			},
			// async fun2(){
			fun2(){
				new Promise((resolve)=>{
				// await new Promise((resolve)=>{
					this.$axios.get('http://47.100.54.97:8080/soar_fish/cargo/getCargo').then((res)=>{
						console.log(res,'货种接口')
						resolve();
					})
				})
			},
			fun3(){
				console.log('fun3')
			},
			fun4(){
				console.log('fun4')
			},
			async asyncPrint(){
				// console.log(this.fun1().then((res)=>{console.log(res,'000')}),'888')
				// console.log(this.fun1())
				// await this.fun4();
				// await this.fun3();
				// console.log('1111')
				await this.fun2();
				await this.fun1();
				// console.log('2222')
			},
			/* async */
			fun6(){
				async function timeout(ms){
					await new Promise((resolve)=>{
						setTimeout(resolve,ms);
					});
				}
				async function asyncPrint(value,ms){
					await timeout(ms);
					console.log(value);
				}
				asyncPrint('hello world',1000)
			}
		},
		created(){
			this.asyncPrint();
		},
		mounted(){
			/**
			 * this VueComponent
			 * this methods -> ()=>{} -> this -> 上一层
			 * this methods -> function(){} -> this -> VueComponent
			 * await 后面跟的是 promise
			 * 如果被调用的方法里面是一个异步的需要先完成的方法，就需要await
			 * async 里面可以用 await
			 * promise 为什么 succese 炫耀放 reject()
			 */
		}
	}
</script>