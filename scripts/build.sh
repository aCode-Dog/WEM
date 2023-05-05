branch=$1
dev=$2
echo "build 开始了 $branch $dev"
npm -v
npm install -g npm-cli-login --registry=https://registry.npm.taobao.org
npm run build