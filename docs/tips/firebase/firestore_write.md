# Firestore への書き込み

Firestore はコレクションと呼ばれる単位でデータを管理する、
Firebase のデータベースツールです。

コレクションの名前を コレクション ID とよび、
コレクション内の一つづつのデータをドキュメントと呼びます。

コレクション内の複数のドキュメントの中からドキュメントを区別するために割り当てられたIDを
ドキュメントIDと呼びます。

Firestoreの利用方法を確認するために、
まずは、基本的なデータ追加のフローを確認しておきましょう。


## ドキュメントIDを利用した追加

ドキュメントIDを利用した追加では、
`doc().set()` の形式を利用します。

以下の例では、コレクション `cities` にドキュメントID `LA`  で、
都市のデータを追加しています。

```js
db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
```

同一のドキュメント ID を利用した set の呼び出しはデータの更新になります。

一部のデータを用いてデータの更新を行いたい場合、
set に第二引数を渡して、値のマージを実施することができます。

```js
db.collection('cities').doc('BJ').set({
    capital: true
}, { merge: true });
```

上記の例は updateを利用して以下のように書くこともできます。

```js
db.collection('cities').doc('BJ').update_({
    capital: true
});
```

## ドキュメントID を利用しない追加

doc にドキュメントIDを利用しない場合、
Firestore 側で適当なドキュメントIDが発行されます。

```js
db.collection("messages").doc().set({
    name: "Taro",
    message: "hello world"
})
```

上記のコードは add を利用して以下のように書き換えることも可能です。

```js
db.collection("messages").add({
    name: "Taro",
    message: "hello world"
})
```

自動生成されたIDをドキュメントの作成後に確認したい場合は、ドキュメントへの参照を保持しておくと良いでしょう。

```js
const msgRef = db.collection("messages").doc()

msgRef.set({
    name: "Taro",
    message: "hello world"
})
```

## 公式ガイド

ドキュメントの追加に関する公式ドキュメントは以下から参照できます。

https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja




