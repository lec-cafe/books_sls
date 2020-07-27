# Firestore からの削除

## ドキュメントの削除

ドキュメントの参照に対して、`delete` をコールすることで、
ドキュメントを削除できます。

```js
await db.collection("cities").doc("DC").delete()
```

::: tip
ドキュメントがサブコレクションを所有している場合、
ドキュメントを削除してもサブコレクションは削除されず、引き続き利用可能となります。
:::

## コレクションの削除

コレクション、サブコレクションを削除する特別な方法は、
Firestore上用意されていないため、
不要になったコレクション、サブコレクションは、
内部のドキュメントを全て削除することでのみ削除可能です。

::: tip
Web クライアントから大量の削除リクエストをコールことは推奨されておらず、
[Cloud Function を利用した削除](https://firebase.google.com/docs/firestore/solutions/delete-collections?hl=ja)が推奨されています。
:::


## 公式ガイド

データの削除に関する公式のドキュメントは以下からも確認可能です。

https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
