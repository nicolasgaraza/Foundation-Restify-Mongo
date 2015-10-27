 # Foundation and Restify Template for Web Applications



This is a default template for fast web applications base on Foundation (with AngularJs) and RestifyJS

## Requirements

You'll need the following software installed to get started.

  - [Chocolatey](https://chocolatey.org): As a dependecy installer for Windows
  - [Node.js](http://nodejs.org): Use the installer for your OS.
  - [Nodemon](http://nodemon.io/): Use `npm install -g nodemon`
  - [MongoDB](https://www.mongodb.org/): You can use the oficial installer or use choco to install it using the command Use `choco install mongodb`
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.
  - [Curl](https://chocolatey.org/packages?q=curl): Run `choco install curl`

## Get Started

Clone this repository, where `app` is the name of your app.

```bash
git clone https://github.com/nicolasgaraza/Foundation-Restify-Mongo.git app
```

Change into the directory.

```bash
cd app
```

Install the dependencies. If you're running Mac OS or Linux, you may need to run `sudo npm install` instead, depending on how your machine is configured.

```bash
npm install
bower install
```

While you're working on your project, run:

```bash
npm start
```

This will compile the Sass and assemble your Angular app. **Now go to `localhost:8079` in your browser to see it in action.** When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

The restify application will start on `localhost:8080`. **Try `curl http://localhost:8080/hello/user` to see it in action**

To run the compiling process once, without watching any files, use the `build` command.

```bash
npm start build
```
## TODO

Add more example for the TODO app (client and server)
Add Unit test framework support
Add OAuth2 security


## Special Thanks

Special thanks to the foundation app creator located at http://foundation.zurb.com/apps/docs/#!/installation this template was created usinging it as a base

Thanks!!!


