Backend repo. Built using Nest.JS, Mongoose, TypeScript and Zod

# Features
- e2e testing with [jest](https://jestjs.io/)
- crud operations with [mongoose](https://mongoosejs.com/)
- deployment setup with [docker](https://www.docker.com/)
- date computation with [date-fns](https://date-fns.org/)
- type validation with [zod](https://github.com/colinhacks/zod)

# References
https://docs.aws.amazon.com/amplify/latest/userguide/to-add-a-custom-domain-managed-by-godaddy.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html
https://dev.to/mrrishimeena/revolutionize-your-nestjs-development-4-steps-to-dockerize-your-nestjs-app-6ea
https://dev.to/mrrishimeena/nestjs-docker-aws-ec2-the-ultimate-combo-1ohd
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-docker.html
https://collabnix.com/warning-the-requested-images-platform-linux-amd64-does-not-match-the-detected-host-platform-linux-arm64-v8/
https://docs.docker.com/engine/reference/commandline/rmi/
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html
https://medium.com/@mertcal/install-nginx-on-ec2-instance-in-30-seconds-e714d427b01b
https://medium.com/@mudasirhaji/how-to-configure-nginx-as-a-reverse-proxy-on-aws-ec2-instance-270736ca2a50
https://www.youtube.com/watch?v=bBA2yCnEf68
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
https://www.geeksforgeeks.org/how-to-install-git-on-aws/
https://stackoverflow.com/questions/51020596/amazon-ec2-error-listen-eacces-0-0-0-080
https://unix.stackexchange.com/questions/741450/installing-lets-encrypt-on-amazon-linux-2023
https://certbot.eff.org/instructions?ws=nginx&os=pip
https://shreyalmandot.in/blog/how-to-fix-out-of-storage-issue-in-aws
https://stackoverflow.com/questions/72056218/docker-container-eating-space-over-time-in-my-ec2

## Notes

In development I used port 3001 because 3000 was occupied by the frontend. When I built the docker image, I used the same port.
When I pulled the docker image from the registry I had to run docker run -p 3000:3001 nytrek/backend:latest

- On my iMac I had to run `docker build -t nest-app . --platform linux/amd64` in order for my ec2 instance on aws to run properly

## Steps to update docker image

- docker build -t nest-app . --platform linux/amd64 //If you are using iMac you might need to turn on `Use Rosetta for x86/amd64 emulation on Apple Silicon`
- docker tag nest-app nytrek/backend:latest
- docker push nytrek/backend:latest

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
