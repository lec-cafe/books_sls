# Composition API + TypeScript 

Vue 3.0 から正式に導入される Composition API を利用して
Vue Component を作成する方法を確認していきましょう。

## Setup

プラグインを利用して簡単に

```bash
$ npm i @vue/composition-api
```

Nuxt.js で利用する場合には plugins を作成して、
`Vue.use` を実行する必要があります。

```js
// plugins/composition-api.js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

`nuxt.config.js` にプラグインの読み込みを追記して起きましょう。

## Component の記述

Component の記述は以下のような形になります。

data や methods などで定義していた変数や関数は、
setup 関数の内部で返り値として定義することができます。

```vue
<template>
    <div>
        <div>{{ message }} {{ counter }}</div>
        <div>
            <button type="button" @click="countUp">CLICK ME</button>        
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const message = ref("hello world")
    let counter = ref(0)
    const countUp = () => {
        counter++
    }   
    return {
        message,
        counter,
        countUp
    }
  }
})
</script>
```

data にわたすべき値は、`ref` 関数でラップして実装する必要があります。
`ref` でラップせずに渡した値は、リアクティブではない値として扱われ、
アプリケーション内での値の変更がテンプレートに通知されません。

ref には オブジェクトや配列を渡すことができず、文字列や数値のみを引数に渡すことができます。

オブジェクトや配列には以下のように reactive を利用して リアクティブなオブジェクトを生成します。

```vue
<template>
    <div>
        <div>{{ cart.unitPrice }}円 {{ cart.amount }}個</div>
        <div>
            <button type="button" @click="countUp">ADD</button>        
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const cart = reactive({
        unitPrice: 1500,
        amount: 1
    })   
    const countUp = () => {
        cart.amount++
    }   
    return {
        cart,
        countUp
    }
  }
})
</script>
```

### Components

子コンポーネントの定義は、 `components` で行うことができます。

```vue
<template>
    <div>
        ...
        <UserModal/>
        ...
    </div>
</template>

<script>
import { UserModal } from "@/components/UserModal.vue"
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: {
    UserModal
  },
  setup () {
    //...
  }
})
</script>
```

### lifecycle

`mounted` や `updated` などのライフサイクルは、
setup の中で該当の関数をコールして定義します。

```vue
<script>
import { defineComponent, ref,onMounted, onUpdated, onUnmounted } from '@vue/composition-api'

export default defineComponent({
  setup () {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
    
    // ...
  }
})
</script>

```

### computed

```ts
import { defineComponent, computed, reactive } from '@vue/composition-api'

interface User {
  firstName: string
  lastName: number
}

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },

  setup ({ user }) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const state = reactive({
        message: "hello world"
    })

    return {
      fullName,
      state
    }
  }
})
```

### Props

Props は setup の引数から値を受け取ることができます。

emit は以下のような形で、第２引数からemitを取得して利用します。

```vue
<script >
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    message: {
      type: String,
      default: "default Value"
    }
  },
  setup(props, context) {
    const message = props.message
    const upperCaseMessage = () => {
      context.emit("change-message");
    };
    return {
      message, // this is not reactive  
      upperCaseMessage
    };
  }
})
</script>
```
