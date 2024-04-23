# NEOS

This project is NEOSv2 Frontend web application migration from JavaFX Desktop application.

## Requirements

- VSCode (for Windows) https://code.visualstudio.com/download

- GIT configuration (for Windows) https://git-scm.com/download/win. **Do next actions BEFORE clone repository**:

  - `git config --global core.autocrlf false`
  - `git config --global core.editor "code --wait"`
  - `git config --global user.name "NAME SURNAME"`
  - `git config --global user.email "email@talan.com"`

  _Show global GIT configuration in VSCode with `git config --global -e`_

- Use NodeJS v12 for Angular 11 https://angular.io/guide/versions#unsupported-angular-versions

  | ANGULAR | NODE.JS                | TYPESCRIPT     | RXJS   |
  | ------- | ---------------------- | -------------- | ------ |
  | 11.2.x  | ^10.13.0 \|\| ^12.11.0 | >=4.0.0 <4.2.0 | ^6.5.3 |

  It's recommended to use NVM (Node Version Manager) https://github.com/coreybutler/nvm-windows/releases

- Install NodeJs v12 with command

  `nvm install 12`

- Install Angular CLI

  `npm install -g @angular/cli@11`

### Installation 🔧

To run the solution locally, execute the following commands in a console within the project folder

`npm install && npm run start`

_NOTE: `npm run start` will connect to the DEV APIs. You can use `npm run start:production | npm run start:uat` as needed._

Navigate to [http://localhost:4200](http://localhost:4200) to start the app locally.

## Running Scripts

### Tests ⚙️

In order to maintain quality levels, our code must have unit tests that validate it, and the solution must maintain over **80% coverage**.

- To run the tests, execute the following command in a console within the project folder

  `npm run test`

- To get the coverage report after the tests, run this command instead

  `npm run test:coverage`

### Style Checks ⌨️

Style (lint) tests verify that certain minimum quality levels are maintained when writing code, making it more readable and maintainable.

- To check the style, run the following command

  `npm run format && npm run lint`

- To fix the style, run the following command

  `npm run format:fix && npm run lint:fix`

### Restore project

`npm run clean` - Clean temp files

`npm run clean:lock && npm i` - Clean temp files and package.lock.json & intall dependencies

`npm run clean:force && npm i` - Clean all & intall

## CI Build 📦

`npm run ci:test` - Run the application Test

`npm run ci:build` | `npm run ci:build:uat` | `npm run ci:build:production` - Build the application for develop | uat | production

`npm run ci:name` - Gets package.json name (application name)

`npm run ci:version` - Gets package.json version (application version)

## Contributing 🖇️

We defined a set of rules to mantain our codebase consistent among the team. Many of which are checked with the code formatter and linter. Please, follow these recommendations:

https://gist.github.com/eneajaho/17bbcf71c44eabf56d404b028572b97b

### Install ESLint

`ng add @angular-eslint/schematics`

### Install Prettier and Prettier-ESLint dependencies

`npm install prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev `

https://prettier.io/docs/en/cli.html

### ESLint + Prettier configuration

See filenames [.eslintrc.json](.eslintrc.json) [.eslintignore](.eslintignore) [.prettierrc](.prettierrc) [.prettierignore](.prettierignore)

https://eslint.org/docs/latest/use/command-line-interface

## Translations

We use ngx-translate https://github.com/ngx-translate/core/tree/v13.0.0 and https://www.npmjs.com/package/ngx-translate-testing/v/5.1.0

`npm install @ngx-translate/core@13 --save`

`npm install ngx-translate-testing@5.1 --save-dev`

| Angular     | @ngx-translate/core | @ngx-translate/http-loader | ngx-translate-testing |
| ----------- | ------------------- | -------------------------- | --------------------- |
| 10/11/12/13 | 13.x+               | 6.x+                       | 5.1.0                 |

## Wiki and Resources 📖

- https://angular.io/docs
