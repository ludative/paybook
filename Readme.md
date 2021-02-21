# 가계부

Infra: ElasticBeanstalk + RDS(MySQL) + Docker multi-container + Nginx + Travis

Server: Nest.js + Sequelize

Client: React + Typescript + PWA

## How To Start

docker 를 이용하여 실행.

- client + server

```shell script
npm run start
```

- client

```shell script
npm run start:client
```

- server

```shell script
npm run start:server
```

## Routing 방식
- client 에서 request 요청이 있을시 Nginx 로 분기. 즉, proxy 역할을 수행
- /api 경로로 요청되는 것은 Node(Nest.js) server 로 rounting.
- 그 외의 경로 요청은 Front server 로 rounting. 이때 React 의 build 결과물은 정적 파일이기 때문에 별도의 Nginx 를 하나 더 두어서 정적 파일을 제공함.

## Directory 구조

```
.
├── client
│   ├── public
|		├── nginx
|		├── Dockerfile
|		├── Dockerfile.dev
│   └── src
├── server
│   ├── Dockerfile
│   └── main.ts
├── nginx
│   ├── default.conf
├── .travis.yml
├── Dockerrun.aws.json
└── docker-compose.yml
```

## API Response Body Format

```json
{
	"status": 200,
	"timestamp": 1609920607246,
	"path": "/api/users",
	"message": "INTERVAL_SERVER_ERROR",
	"data": {}
}
```
