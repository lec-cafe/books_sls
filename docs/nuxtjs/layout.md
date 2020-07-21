# レイアウトとビュー

Nuxt.js では Vue.js の機能をディレクトリ構造に合わせて
階層的に活用する事が可能です。

https://ja.nuxtjs.org/guide/views

## レイアウト

Nuxt.jsでは、ページの共通部分をlayoutフォルダ内のVueコンポーネントで共通化することができます。

これまでの例では、`layout/default.vue` をサイト共通のレイアウトとして定義し、
ヘッダやフッタを定義して、サイト共通のレイアウトを記述していました。

しかし、例えば、後からイベントのページを追加する際に、
特別なヘッダ・フッタ構成のレイアウトを利用したいケースなども出てくるでしょう。

layoutフォルダには、 `default.vue` の他にも、
任意のレイアウトファイルを作成することができます。

作成した任意のレイアウトファイルの利用は、ページコンポーネント側で指定します。

`layout/event.vue` を作成して、`pages/event/summer.vue` のページでこれを利用する場合、
`pages/event/summer.vue` のscriptセクション内で以下のようにして `layout` を指定します。

```vue
<template>
  <div >
     ...
  </div>
</template>

<script>
export default {
    layout: "event"
}
</script>

<style>

</style>
```

