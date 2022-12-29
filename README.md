# Dockerfile for Puppeteer（Mac用）
Appleシリコンを搭載したMacで動くPuppeteerのDockerfileです。
* 参考にしたURLはDockerfile中に記載してあります。
* 過去にChromeで試して動かなかったので、Chromiumを使用しています。
* PuppeteerのバージョンとChromiumのバージョンの関係がよくわからないのですが、私の用途では問題なく動いています。
* 試した環境はMac mini(M1, 2020)です。
## イメージのビルド
```
$ docker build -t puppeteer:aarch64 --target puppeteer -f Dockerfile.aarch64 .
```
でPuppeteerが動作するイメージを作成できます。

私の場合は、読み取ったデータをMongoDBに保存しているのでdriverを一緒にインストールしています。
```
$ docker build -t puppeteer:mongodb --target puppeteer-mongodb -f Dockerfile.aarch64 .
```
## イメージの実行
### ファイルを指定して実行
```
$ docker run --rm -i --init --cap-add=SYS_ADMIN puppeteer:aarch64 node -e "$(cat test.js)"
```
### コンテナに入って実行する
```
$ docker run --rm -it --init --cap-add=SYS_ADMIN \
 -v $(pwd):/usr/src/app \
 -v /usr/src/app/node_modules \
 --name pup puppeteer:aarch64
```
:warning:カレントディレクトリに空のnode_modulesディレクトリが作成されます。
```
/usr/src/app $ node test.js
```
### コンテナを立ち上げておいてdocker execで実行する
```
$ docker run --rm -d --init --cap-add=SYS_ADMIN \
 -v $(pwd):/usr/src/app \
 -v /usr/src/app/node_modules \
 --name pup puppeteer:aarch64 sleep inf
```
:warning:カレントディレクトリに空のnode_modulesディレクトリが作成されます。
```
$ docker exec pup node test.js
```
