# eslint の設定

## LINTERツールの導入

LINTERはプログラム上で自動的にコードのチェックを行うツールです。
LINTERを導入することで、コードの品質を高めることができます。

LINTERと呼ばれるツールは、(狭義の）LINTERとFORMATTERに分けることができます。

- LINTERプログラム上のエラーや、潜在的なバグ、推奨されない記述方法などを警告するもの
- FORMATTERインデントや改行、コードの書き方やルールを統一するもの

概ねLINTERはFORMATTERを兼ねますが、中にはFORMATTERのみで提供されるツールも存在します。

JavaScriptにおけるLINTERとして有名なものではeslintがあり、
JS/CSS/HTMLのFORMATTERとしてはprettierが有名です。

## ESLINTとPRETTIERの導入

eslintとprettierでvueファイルの整形を行うには、まず関連モジュールのインストールが必要です。

```bash
$ npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

eslintの設定ファイル `.eslintrc.js` をプロジェクトのルートに作成して準備は完了です。

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // より厳しいルールにするには`plugin:vue/strongly-recommended` もしくは `plugin:vue/recommended` に切り替えることを検討してください。
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    'vue'
  ],
  // ここにカスタムルールを追加します。
  rules: {
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false }]
  }
}
```

prettierはeslintの拡張として実行可能なので、上記のような形でeslintの設定ファイル内でprettierのプラグインを読み込ませています。

プログラムの実行は、`eslint` コマンドで実行可能なため、 package.jsonに以下のコマンドを追記します。

```json
{
  //...
  "scripts": {
    //...
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
  },
  //...
}
```

`npm run lint` で各種エラーが確認可能で、 `npm run lintfix` では、エラーの自動修正が可能です。

### Webpack経由での自動実行

`nuxt.config.js` に以下のような記述を追加してWebpack経由での自動LINTを実行することも可能です。

```js
export default {
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        })
      }
    }
  },
}
```

コードを修正してWebpack buildが走るたびにeslintが実行されます。

eslint実行時にコードの修正も行いたい場合は、`fix` オプションが利用可能です。

```js
export default {
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true,
          }          
        })
      }
    }
  },
}
```

### eslintの設定


eslintの設定は、 `.eslintrc.js` 内でカスタマイズすることが可能です。

```js
module.exports = {
  // ...
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'semi': false }]
  }
}
```

`extends` で `plugin:vue/recommended` のようにして、 Vue.js向けの拡張ルールを読み込んでいます。

`plugin:vue/recommended` で適用される各種ルールは以下のドキュメントから参照可能です。

https://eslint.vuejs.org/rules/

ルール名を用いて `rules` のセクションにオプションを渡すことも可能です。
値を `off` にすることで設定をわたせるほか、配列をわたすことでルールにオプション値を設定することも可能です。

また、eslintの機能として、JavaScript内で、 `/* eslint-disable */`  等のコメントを入れることでエラーの発生を制御することができますが、
HTMLテンプレート側ではこのような機能は用意されていません。

https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments

