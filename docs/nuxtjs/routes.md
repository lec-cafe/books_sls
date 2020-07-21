# ルーティング

Nuxt.js では、内部に Vue Router が組み込まれており、
Vue Router による高度なルーティング機能を利用することが可能です。

https://ja.nuxtjs.org/guide/routing

## Nuxt.js におけるルーティング

Nuxt.js では、pages フォルダに配置されたコンポーネントが
自動的にルートとして認識されます。

また、先頭が `-` で始まるコンポーネントは、
ルートとして認識されず、シンプルなコンポーネントとして活用する事が可能です。

URL に動的なパラメータを含むケースでは、フォルダ or ファイル名の先頭に
`_` を付与して、動的なURLセグメントを作成することができます。

例えば、`/items/{商品ID}` のURLページを作成する場合、
`pages/items/_id.vue` または、`pages/service/_id/index.vue` を作成します。

このとき URL で利用されている値は、`this.$route.params.id` で参照可能です。

## ルートのパラメータ

Vue Router を内部で利用している Vue.js では、
ルートのパラメータは、 `this.$route` 経由で取得することができます。

https://router.vuejs.org/api/#route-object-properties

- `this.$routes.path` : URL のpath
- `this.$routes.query` : URL の?以降で付与されたパラメータ
- `this.$routes.params` : URL のpath中の動的なマラメータ

## ページ遷移の記述

Nuxt.js で利用可能な `nuxt-link` コンポーネントは、
Nuxt.js のアプリケーション上でのルート記述に役立ちます。

```vue
<template>
  <div>
    <h1>ホームページ</h1>
    <nuxt-link to="/about">このサイトについて（Nuxt アプリケーション内部リンク）</nuxt-link>
    <a href="https://nuxtjs.org">別のページへの外部リンク</a>
  </div>
</template>
```

`nuxt-link` の利用方法は、 `router-link` とほとんど同様で、
その実装は`router-link`の拡張となっています。

https://router.vuejs.org/api/#router-link

`nuxt-link` には `router-link` にはない、
ページの先読み機能が追加されており、遷移先のページの情報を事前読み込みすることで、
ページ遷移をより高速化することができます。

https://ja.nuxtjs.org/api/components-nuxt-link


