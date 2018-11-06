<template>
	<div>async</div>
</template>
<script type="text/javascript">
	export default{
		methods:{
			fun1(){
				async function getStockPriceByName(name) {
				  const symbol = await getStockSymbol(name);
				  const stockPrice = await getStockPrice(symbol);
				  return stockPrice;
				}

				getStockPriceByName('goog').then(function (result) {
				  console.log(result);
				});
			},
			fun2(){
				function timeout(ms){
					return new Promise((resolve)=>{
						setTimeout(resolve,ms);
					})
				}
				async function asyncPrint(value,ms){
					await timeout(ms);
					console.log(value);
				}
				asyncPrint('hello world',5000)
			},
			/*
				async 函数内部的return 会成为then方法的回调函数
			*/
			fun3(){
				async function f (){
				// let f = async function(){
					try{
						await Promise.reject('出错了');
					}catch(e){

					}
					return await Promise.resolve('hello world22');
				}
				f().then((v)=>console.log(v));
			},
			fun4(){
				/*
					防止 第一个await 命令后面的promise对象，运行结果可能是
					rejected
				*/
				async function myFunction() {
				  try {
				    await somethingThatReturnsAPromise();
				  } catch (err) {
				    console.log(err);
				  }
				}

				// 另一种写法

				async function myFunction() {
				  await somethingThatReturnsAPromise()
				  .catch(function (err) {
				    console.log(err);
				  });
				}
				/*
					多个await命令后面的异步操作，如果不存在继发关系，最好让他们同时触发
				*/
				let fun = async ()=>{

					let getFoo = function(){};
					let getBar = function(){};
					
					let foo = await getFoo();
					let bar = await getBar();
					// 写法一
					let [foo1,bar1] = await Promise.all([getFoo(),grtBar()])
					// 写法二
					let fooPromise = getFoo();
					let barPromise = getBar();
					let foo2 = await fooPromise;
					let bar2 = await barPromise;
				}
			}
		},
		created(){
			// this.fun1();
			// this.fun2();
			this.fun3();
		}
	}
</script>