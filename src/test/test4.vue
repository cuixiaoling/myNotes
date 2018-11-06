<template>
    <div>obj</div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        // 对象的简写
        // 允许对象中直接写变量。
        // 属性名-> 变量名 属性值-> 变量的值
        test1(x,y){
            return{x,y}
        },
        test2(){
            let birth = "2015.02.02"
            const Preson = {
                name:'张三',
                birth, // birth:birth
                hello(){
                    console.log('我的名字是',this.name)
                }
            }
            console.log(Preson.birth)
        },
        test3(){
            let ms = {};
            function getItem(key){
                return key in ms ?[key] : null;
            }
            function setItem (key,value){
                ms[key] = value;
            }
            function clear(){
                ms={};
            }
            module.exports={ getItem,setItem,clear}
        },
        // 属性名表达式 a['first word']
        test4(){
            let lastWord= "last word";
            const a ={
                'first word' : 'hello',
                [lastWord]:'word'
            }
            let bb=[a['first word'],a[lastWord],a['last word']]
            console.log(bb)
        },
        test5(){
            const keyA = {a:1};
            const keyB = {b:2};
            const myObject = {
                [keyA]:'valueA',
                [keyB]:'valueB'
            }
            console.log(myObject)
        },
        // 方法的name 属性
        test6(){
            const person = {
                sayname(){
                    console.log('hello')
                }
            }
            // console.log(person.sayname.name())
            const obj = {
                get foo(){},
                set foo(x){}
            };
            // obj.foo.name
            const descriptor = Object.getOwnPropertyDescriptors(obj,'foo');
            // descriptor.get.name
        },
        // 判断两个对象是否相等
        test7(){
            Object.is('foo','foo')
            console.log(Object.is('foo','foo'))
        },
        // 对象合并
        test8(){
            const target={a:1}
            const source1 = {b:2}
            const source2 = {c:3}
            console.log(Object.assign(target))
            console.log(Object.assign(2))
            Object.assign(target,source1,source2)
            console.log(target)
            const v1 = "abc",v2=true,v3 = 10
            const obj = Object.assign({},v1,v2,v3);
            console.log(obj)
        }
    },
    created(){
        let test1 = this.test1(1,2);
        // console.log(test1)
        // this.test2()
        // this.test3()
        // this.test4();
        // this.test5();
        // this.test6();
        // this.test7();
        this.test8();

    }
}
</script>
