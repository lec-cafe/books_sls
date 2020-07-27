
## セットアップ

```bash
$ npm i -S nuxt-property-decorator
```

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## Component の記述

通常のComponentを記述する場合、Vue.js のそれぞれの要素は以下のような形で記述できます。

```
```

data に渡す値は、クラスのプロパティとして記述します。

```
```

computed の値は、 クラスの getter / setter として記述します。

```
```

methods に定義する関数は、クラス関数として記述します。

```
```

mounted などのライフサイクルフックもクラス関数として記述できます。

```
```

Props は クラスプロパティの定義に、`@Props` デコレータを添えて定義します。

```
```

watch も クラスメソドに、`@Watch` デコレータを添えて定義することができます。

```
```

その他、components や filter などの値は、クラスデコレーター上で定義します。

```
```

## Nuxt.js 固有のオプション

pages フォルダ内で利用する vue コンポーネントで、Nuxt.js 固有のオプションはそれぞれ以下のように記述することができます。

layout は クラスデコレータ上で定義します。

head は

fetch/asyncData は

 validate は
 
  