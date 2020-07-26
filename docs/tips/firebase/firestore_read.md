# Firestore からの読み出し

Firestore では、クエリ等を利用した様々なタイプのデータ読み出しをサポートしています。

Firestore に格納したデータを取り出す様々な方法について確認していきましょう。

## 単一のデータ取得

コレクション内に格納したドキュメントを、IDを利用して一つ取り出す方法は非常に簡単で、
ドキュメントの 参照に対して、`get` をコールするだけです。

```js
const result = db.collection("cities").doc("SF").get()
console.log(result.id)
console.log(result.data())
```

上記の例では cities コレクションからドキュメントID が `SF` のデータを取得しています。

結果のオブジェクトは `data` をコールしてオブジェクトに変換できる他、
`id` プロパティから ドキュメントIDにアクセスすることも可能です。

## コレクションのデータを取得

コレクション内に格納した全てのドキュメントを取得する場合には、
コレクションの 参照に対して、`get` をコールします。

```js
const result = db.collection("cities").get()
console.log(result.docs)
result.forEach((doc)=>{
    console.log(doc.id)
    console.log(doc.data())
})
```

上記の例では cities コレクション内のドキュメントを全て取得しています。

結果のオブジェクトは `docs` プロパティから配列で取得できる他、
`forEach` を利用してそれぞれ一つづつのデータを取得することも可能です。
`id` プロパティから ドキュメントIDにアクセスすることも可能です。

## コレクション内のデータの絞り込み

コレクション内のデータを get で取得する際に、
`where` を利用してデータの絞り込みを行うことができます。

以下の例では、cities コレクションから `capital` の値が `true` のドキュメントのみを抽出して
取得しています。

```js
const result = db.collection("cities")
    .where("capital","==",true)
    .get()
```

where の引数は３つで、第一引数には検索対象の項目名を、
第二引数には比較演算子、第三引数には値を入力します。

第一引数には、 `.` を利用してオブジェクトの深くまで値の参照を行うことも可能です。

```js
const result = db.collection("messages")
    .where("user.age","=>",18)
    .get()
```

## コレクション内のデータの制限、並び替え

コレクション内のデータを get で複数取得する際には、
`orderBy` を利用してデータの並び替えを行うこともできます。

以下の例では、cities コレクションから `population` の値が `100000` 以上のドキュメントのみを抽出して
`population` の値を軸に昇順に取得しています。

```js
const result = db.collection("cities")
    .where("population",">=",100000)
    .orderBy("population")
    .get()
```

並び替えはデフォルトで昇順で行われるため、降順での結果を取得する際には、
`orderBy("population","desc")`のように第２引数に `desc` を追加します。

::: tip
orderBy で指定するソート列と、
whereで使用する検索列の名前が異なる場合エラーが発生します。
複雑なクエリを実行する場合は、エラーメッセージの表示に従いインデックスの作成が必要となります。
:::

また、limit を用いて取得件数を制限することも可能です。
次の例では、`population` の最も大きなドキュメントを1件取得しています。

```js
const result = db.collection("cities")
    .orderBy("population","desc")
    .limit(1)
    .get()
```


## 公式ガイド

データの取り出し、制限に関する公式のドキュメントは以下からも確認可能です。

https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja

https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja

