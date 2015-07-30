# piTunes

> Social Sharing Tune

## Team

  - __Product Owner__: Zachary Lester
  - __Scrum Master__: John Mai
  - __Development Team Members__: Kyle Rokita, Josh Tepei

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> node index.js

## Requirements

- Node 0.12.x
- Mysql 5.6.x

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g gulp
npm install
gulp
```

### Database Development Support
![alt tag](https://github.com/ScintillatingAcai/pitunes/blob/master/SQLSchema.png)
In the server/db/dev-support-assets directory, developers may access the following items:
  1. Schema visualization image
  1. testdata.sql file which is unused in production but may be useful for inserting sample data during development

### Setting up a development database environment
1. Installing mysql:
```sh
npm install -g mysql-server
```
1. Start mysql and sign in:
```sh
mysql.server start
mysql -u [your username] -p
Enter Password:  [your password]
```
1. In server/db/knex-config.js, set your mysql username and password in the configuration object
1. Create and use database "pitunes"
```sh
create database pitunes;
use pitunes;
```
When the app is started (node index.js), the schema will be created so long as this setup has been performed.

### Emulating in the browser
1. Start server
From root directory:
```sh
node index.js
```
1. Open browser and navigate to http://localhost:3000

### Roadmap

View the project roadmap [here](https://github.com/ScintillatingAcai/pitunes/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
