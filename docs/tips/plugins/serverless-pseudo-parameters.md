## serverless-pseudo-parameters プラグインの使い方

### 導入

まずは、 `serverless.yml` に以下の内容を追記します。 

```yaml
plugins:
   - serverless-pseudo-parameters
```
### 使用方法

serverless.yml に `#{ AWS::Region }` や `#{ AWS::AcountId }` のように記述することで、
文字列をデプロイ時にデプロイ先の AWS リージョンや AWS アカウント名に置換することができます。

```yaml
BucketName: mybucket-#{ AWS::Region }-#{ AWS::AccountId }
```

### プロパティ

デフォルトでは、ハードコードなコードを自動的に置き換えません。
置き換えたい場合、 `skipRegionReplace: true` にすることで自動で置き換えることができます。

```yaml
custom:
  pseudoParameters:
    skipRegionReplace: true
```

### 他のリソースの参照を無効にする

以下を追加することで、内部の要素の参照を不可にすることができます。

```yaml
custom:
  pseudoParameters:
    allowReferences: false
```

::: tip
`@` の後ろにハッシュ化された文字を記述することでエスケープすることができます。

```yaml
DynamoDBInputS3OutputHive: 
  Type: AWS::DataPipeline::Pipeline
  Properties:
  	PipelineObjects:
  	  - Key: "directoryPath"
        StringValue: "#@{myOutputS3Loc}/#@{format(@scheduledStartTime, 'YYYY-MM-dd-HH-mm-ss')}"
```

:::
