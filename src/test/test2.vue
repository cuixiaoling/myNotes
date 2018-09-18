<template>
    <div>
        Generator
    </div>
</template>
<script>
export default {
    data(){
        return{
            hw:{}
        }
    },
    methods:{
        /**
         * 一个状态机
         * generator 函数返回一个遍历对象，遍历器对象生成函数
         * 
         */
                
        /**
         * yield 表达式就是暂停标志
         */

        fun1(){
            /* 1 */
            function* helloWorldGenerator() {
                yield 'hello';
                yield 'world';
                return 'ending';
            }

            this.hw = helloWorldGenerator();
            // console.log(this.hw.next());
            // console.log(this.hw.next());
            // console.log(this.hw.next());
            // console.log(this.hw.next());

            /* 2 */
            function* gen(){
                yield 123 + 123
            }
            let gen1 = gen();
            // gen1.next()
            // console.log(gen1.next);
            // console.log(gen1.next);

            /* 3 */
            // 不用yield表达式，就变成一个单纯的暂缓执行的函数
            function* f(){
                console.log('执行啦');
            }
            let generator = f();
            setTimeout(()=>{
                generator.next();
            },10)
        },
        fun2(){
            var arr =[1,[[2,3],4],[5,6]]
            var flat = function* (a){
                a.forEach(function(item){
                    if(typeof item !== 'number'){
                        // yield* flat(item);
                    }else{
                        // yield item;
                    }
                })
            }
        },
        fun3(){
           var arr = [1, [[2, 3], 4], [5, 6]];

            var flat = function* (a) {
            var length = a.length;
            for (var i = 0; i < length; i++) {
                var item = a[i];
                if (typeof item !== 'number') {
                    yield* flat(item);
                } else {
                    yield item;
                }
            }
            };

            for (var f of flat(arr)) {
                console.log(f);
            }
        },
        fun4(){
            function* demo(){
                /* yeild 放在表达式里面 */
                console.log('Hello' + (yield 123));
            }
            // this.hw = demo();
            console.log(demo().next());
            console.log(demo().next());
        },
        /* Iterator 接口的关系 */
        fun5(){
            var myIterable = {};
            myIterable[Symbol.iterator] = function* (){
                yield 1;
                yield 2;
                yield 3;
            };
            console.log( [...myIterable])
        },
        fun6(){
            function* gen(){

            }
            var g = gen();
            console.log(g[Symbol.iterator]() == g)
        },
        /* next 方法参数 */
        fun7(){
            function* f(){
                for(let i=0; true; i++){
                    var reset = yield i;
                    if(reset){i = -1;}
                }
            }
            var g = f();
            console.log(g.next())
            console.log(g.next())
            console.log(g.next())
            console.log(g.next(true))
        },
        fun8(){
            function* foo(x){
                var y = 2*(yield(x+1));
                // console.log(x+1);
                // console.log(yield(x+1));
                console.log(y,'yyy');
                var z = yield(y/3);
                return (x+y+z);
            }
            var a = foo(5);
            // console.log(a.next());
            // console.log(a.next());
            // console.log(a.next());

            var b = foo(5);
            console.log(b.next())
            console.log(b.next(12)) // 上一次的yield
            // next 方法的参数表示上一个yield表达式的返回值
            console.log(b.next(13))
        },
        fun9(){
            function* dataConsumer(){
                console.log('Started');
                console.log(`1.${yield}`);
                console.log(`2.${yield}`);
                return 'result'
            }
            let genObj = dataConsumer();
            genObj.next();
            genObj.next('a');
            genObj.next('b');
        },
        funA(){
            function* objectEntries(obj) {
            let propKeys = Reflect.ownKeys(obj);

            for (let propKey of propKeys) {
                yield [propKey, obj[propKey]];
            }
            }

            let jane = { first: 'Jane', last: 'Doe' };

            for (let [key, value] of objectEntries(jane)) {
            console.log(`${key}: ${value}`);
            }
        },
        funB(){
            function* objectEntries() {
            let propKeys = Object.keys(this);

            for (let propKey of propKeys) {
                yield [propKey, this[propKey]];
            }
            }

            let jane = { first: 'Jane', last: 'Doe' };

            jane[Symbol.iterator] = objectEntries;

            for (let [key, value] of jane) {
            console.log(`${key}: ${value}`);
            }
        },
        /**
         * for...of 循环
         * (...) 扩展运算符
         * 解构赋值
         * Array.from 方法
         */
        funC(){
            function* numbers(){
                yield 1
                yield 2
                return 3
                yield 4
            }
            // 扩展运算符
            console.log([...numbers()])
            // Array.from 方法
            console.log(Array.from(numbers()))
            // 解构赋值
            let [x,y] = numbers();
            console.log(x,y)
            // for...of 循环
            for (let n of numbers()){
                console.log(n);
            }
        },
        /**
         * Gnerator.prototype.throw();
         */
        funD(){
            var g = function* (){
                try{
                    yield;
                }catch(e){
                    console.log('内部捕获',e);
                }
            }
            var i = g();
            i.next();
            try{
                i.throw('a');
                i.throw('b');
            }catch(e){
                console.log('外部捕获',e);
            }
        },
        funE(){
            var g = function* (){
                try{
                    yield;
                }catch(e){
                    console.log('內部捕获2',e)
                }
            }
            var i =g();
            i.next();
            i.throw(new Error('出错啦'))
        }


    },
    created(){
        // this.fun1();
        // this.fun3();
        // this.fun4();
        // this.fun5();
        // this.fun6();
        // this.fun7();
        // this.fun8();
        // this.fun9();
        // this.funA();
        // this.funC();
        // this.funD();
        this.funE();
    }
}
</script>

