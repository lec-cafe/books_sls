## serverless-plugin-git-variables の使い方

### 導入

まずは、 `serverless.yml` に以下の内容を追記します。 

```yaml
plugins:
   - serverless-plugin-git-variables
```

### 使用方法

serverless.yml に `${ git:repository }` や `${ git:repository }` のように記述することで、
git 変数をサーバーレスに公開することができます。

```yaml
custom:
  gitDescription: ${git:repository} - ${git:branch} - ${git:tags}
```

## 利用できる変数

- git:repository - リポジトリ名
- git:sha1 - 現在のコミットのハッシュ値
- git:branch - 現在のブランチ名
- git:isDirty - ワークスペースが dirty のとき `true` を返します
- git:describe / git:describeLight - 以下を参照してください

