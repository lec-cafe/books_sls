# ディレクティブの活用

Vue.jsでは `v-`で始まる専用の属性を用いて、
様々な機能を利用する事ができます。

こうした `v-` 接頭辞から始まる 属性は ディレクティブと呼ばれ、
様々な ディレクティブが用意されています。

https://jp.vuejs.org/v2/api/#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96

## v-if

`v-if` に条件式を記述して、要素の表示非表示を切り替えることができます。

```vue
<template>
   <div v-if="isStudent">
        <p>学生です</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isStudent: true 
            }
        }
    }
</script>
```  

似たディレクティブに `v-show` がありますが、
要素の表示非表示を css レベルで切り替える v-show に対し、
v-if では要素そのものの削除、生成で表示の切り替えを行っています。

## v-for

データの繰り返し処理には、`v-for` を使用します。

`v-for` を使用する際には必ず `key`属性で、配列内容そのユニーク項目を指定する必要があります。

```vue
<template>
   <div v-for="item in items" :key="item.index">
        <p>{{ item.label }}</p>
        <p>{{ item.value }}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                items: [
                    {
                        label: "hello",
                        value: "world"
                    }
                ]
            }
        }
    }
</script>
```  

## v-class

`v-class`はある要素に対して動的にclassを付与することができます。
`{ 'クラス名': 条件式 }` のような形で使用されるのが一般的です

```vue
<template>
   <div :class="{ 'color' : isStudent }">
        <p>学生です</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isStudent: true 
            }
        }
    }
</script>
```  





