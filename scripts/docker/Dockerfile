FROM node:lts-alpine as builder

# 安装与编译代码
COPY . /app
WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \\
  && apk upgrade --update-cache --available \\
  && apk add --upgrade autoconf automake build-base libtool nasm pkgconfig zlib-dev \\
  && yarn --frozen-lockfile

RUN yarn build
RUN find . -name '*.map' -type f -exec rm -f {} \;

# 将子应用内的入口拷贝到根目录

# 最终的应用
FROM abiosoft/caddy
COPY --from=builder /app/packages/rtw-host-app/build /srv
EXPOSE 2015
