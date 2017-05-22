# Github repository search #

## Search for Github repositories based on account name ##

## Features ##

* ES6/ES7 ready
* Babel
* Bootstrap 4 & Mixins
* CSS Modules
* Flow.js
* PostCSS, CSS Variables and autoprefixer
* Tree Shaking
* webpack.config (development & production mode)
* Browsersync
* Express
* EJS
* SASS
* ESLint
* standard.js
* yarn.lock
* .editorconfig

## Run the app ##

* install `yarn`
* run `yarn` or `yarn install` to install all npm paskages

* To be able to fetch **email** from users through Github API we need to use `Authorisation`. For the app to work we first need to get **Personal access token** from Github account. To get the token we go to our `Github profile/Settings/Personal access tokens`. We click on `Generate new token`, give him some description and under `Select scopes` we click on `user:email Access user email addresses (read-only)` and `Generate token`.

![picture alt](http://i.imgur.com/ry4os72.png "List")

* We get a new token. Copy the token, go back to application and paste it inside `app.json` and `app.local.json` file inside `conf folder` under `GITHUB_ACCESS_TOKEN`

* It should look like this

```json
{
  "APP_PORT": 3000,
  "GITHUB_ACCESS_TOKEN": "7skepblaf1dab4d1f9c51b9101ooeqbnd4e83da4"
}
```

**Note** => **If user didn't set email address as public it will not be fetched.**

* **Now we can run the app**

* If we run the app in **production** mode, settings from **app.json** and **webpack.config.babel.js** will be used
* If we run the app in **development** mode, settings from **app.local.json** and **webpack.config.babel.js** will be used

### BEFORE PRODUCTION ###

* `yarn run clean-client` will delete client bundle `build`
* `yarn run clean-server` will delete server bundle `dist`

### IN PRODUCTION ###

* `yarn run build-server`  will bundle server for production using `babel` and make a `build` folder
* `yarn run build-client` will bundle client for production using `webpack` and make a `dist` folder

* `yarn run start` sets NODE_ENV = production, runs `build-server` and `build-client` script and starts the app on port **3001**

### IN DEVELOPMENT ###

* `yarn run start-dev` will set NODE_ENV = development and start the server using `nodemon` on port **3000**
* `yarn run webpack` will start the webpack in `watch mode`, make a bundle directory `dist`, start the `browsersync` and automatic reloading and run the app on port **3002**

### HELPER SCRIPTS ###

* `yarn run flow` will run flow check
* `yarn run test` will run all the tests
* `yarn run coverage` will run test coverage

---

**App picture**
![picture alt](http://i.imgur.com/AaIHds1.png "List")
