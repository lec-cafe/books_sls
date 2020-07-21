---
# TODO firebase 管理者向け機能のコード利用のセクション追加
---
# Firebaseの管理者向け機能

## CLI で Firebase の管理者向け機能を利用する

Firebase の管理者向け CLI は、 npm 経由でインストール可能です。

```
$ npm install -g firebase-tools
```

firebase の管理者向けコマンドを利用する場合、まずは、以下のlogin コマンドを利用して、ログインを実施します。

```
$ firebase login 
```

以下のコマンドでプロジェクトの一覧が表示されたら、CLI のインストールは完了です。

```
$ firebase project:list
```

### CI 上での Firebase CLI の利用

CI などの対話的なインターフェースによるログインが実施できない環境では、環境変数を利用したログインが利用可能です。

環境変数 `FIREBASE_TOKEN` 変数を定義する事で、firebase コマンドは自動的に認証状況を　認識します。

トークンを取得するには、ログインを実施した環境上で、以下のコマンドを実行します。

```
$ firebase login:ci
``` 

発行されたトークンを無効化する場合には以下のコマンドを実行します。

```
$ firebase logout --token {token}
``` 
