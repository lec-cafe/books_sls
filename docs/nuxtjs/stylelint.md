# stylelint の設定

## Style Lintの導入

stylelintはCSSのためのLINTERツールです。

stylelintを用いてvueファイル内のCSSを整形するにはまず関連モジュールをインストールします。

```bash 
$ npm i -D stylelint @nuxtjs/stylelint-module stylelint-config-standard
```

Stylelintの設定は `.stylelintrc.json` に記述します。

```text
{
  "extends": "stylelint-config-standard"
}
```

Nuxt.jsでstylelintを利用可能にするため、 `buildModules` 内に

```js
export default {
  buildModules: [
    '@nuxtjs/stylelint-module'
  ],
  stylelint: {
      /* module options */
  },
}
```

として、設定を追記します。

::: tip
`buildModules` はnuxt@2.9から追加されたオプションで、
それ以前のNuxt.jsを利用するケースでは `modules` セクションを利用します。

stylelintのような本番環境で不要なモジュールは、
`buildModules`オプションに記述することで本番環境向けのJS配信サイズを削減することが可能です。
:::


Nuxt.jsのモジュールとして読み込むことで、自動的にwebpack等の設定が追加され、CSSのLINTチェックが可能になります。

### 手動でのセットアップ

`@nuxtjs/stylelint-module` では、SCSS等を含む全てのファイルにLINTがかかるため、
例えば .vueファイルのみのLINTなどの調整が必要な場合は、手動でのセットアップが必要です。

とはいえ、 stylelintは .vueをデフォルトで認識するため、
LINTの実行を行うstylelintコマンドを用いて、 package.jsonでのように設定すれば、LINTを手動で実行可能です。

```json 
{
  "scripts": {
      "dev": "nuxt",
      "build": "nuxt build",
      "start": "nuxt start",
      "generate": "nuxt generate",
      "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
      "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore .",
      "lint:css": "stylelint '**/*.vue'",
      "lintfix:css": "stylelint --fix '**/*.vue'",
      "precommit": "npm run lint"
  },
}
```

この例では、 LINT実行の `lint:css` と自動整形の `lintfix:css` を定義しています。

webpack経由でのLINT設定を行いたい場合には、`stylelint-webpack-plugin`を用いて以下のように記述します。

```bash
$ npm i -D stylelint-webpack-plugin
```

```js
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {

  // ...

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.plugins.push(new StylelintPlugin({
          files: [
            '**/*.vue',
          ],
        }))
      }
    },
  },
}
```

fixオプションを付与して、 webpackビルド時にCSSの自動整形を実施することも可能です。

```js
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {

  // ...

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.plugins.push(new StylelintPlugin({
          files: [
            '**/*.vue',
          ],
        }))
      }
    },
  },
}
```


### SCSSの利用

scss記法のLINTを追加するには、`stylelint-scss` を追加し、`.stylelintrc.json` の `plugins` セクションに追加します。

```bash
$ npm i -D stylelint-scss
```

```json
{
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-scss"
  ]
}
```

stylelintは拡張子等の情報から、自動的にSCSS記述を判別可能なため、
.vueファイルの場合でも `lang=scss` 属性を記述することで自動的にscssのルールが適用されます。

::: tip
stylelintはデフォルトで拡張子からファイルタイプを認識するため、
一部で紹介されるような `--syntax scss` のオプションは不要です。
:::

.vueでscssを使う場合、以下のようなルールセットを追加しておくと良いでしょう。

```json
{
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-scss"
  ],
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true
  }
}
```


### stylelintのカスタマイズ

stylelintの各種ルールは、以下の公式サイトより内容を確認することができます。

https://stylelint.io/

デフォルトのルールセットでも十分強力にCSSのLINTを行うことが可能ですが、
必要に応じて、更に強力なルールを書けてCSSの記述範囲を絞ることも可能です。

```json
{
  // ...
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-max-id": 0,
    "selector-combinator-whitelist": [],
    "selector-max-specificity": "0,2,0",
    "selector-nested-pattern": "^&(:hover|:focus|:last-of-type|::before|(__|--)([a-zA-Z0-9]*))$",
    "selector-class-pattern": [
      "^(c|p|l|is)-[a-zA-Z0-9]*(__[a-zA-Z0-9]*){0,1}(--[a-zA-Z0-9]*){0,1}$",
      {"resolveNestedSelectors": true}
    ]
  }
}
```

- `selector-max-id` は値を `0` にしてIDセレクタによるCSS定義を禁止できます。
- `selector-combinator-whitelist` は値を `[]` にして子孫セレクタ、隣接セレクタの仕様を禁止できます。
- `selector-max-specificity` は値を設定して、クラスセレクタの詳細度を限定できます。
- `selector-nested-pattern` はSCSSの入れ子記法における表現範囲を正規表現を使って絞り込むことができます。
- `selector-class-pattern` はクラスセレクタの表現範囲を正規表現を使って絞り込むことができます。

### CSSのreorder

`stylelint-config-recess-order` を利用してCSSプロパティの並び替えが可能です。

```bash
$ npm install --save-dev stylelint stylelint-config-recess-order
```

利用する場合は、 `.eslintrc.json` の `extends` に追記します。

```json
{
  "extends": [
     "stylelint-config-standard",
     "stylelint-config-recess-order"
   ],
  "rules": {
    // ...
  }
}
```
