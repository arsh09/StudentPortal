# Student Portal 

A very simple student portal. 


## Project setup and build

1) Install NodeJS and make sure it is in the environment path. 
2) Run the following commands in command prompt/terminal etc. 

```bash
$ git clone https://github.com/arsh09/StudentPortal.git
$ cd StudentPortal 
$ npm install 
$ ./node_modules/.bin/electron-rebuild.cmd 
$ npm run electron:serve 


# To build the app, change the version in StudentPortal/package.json file and then 
$ npm run electron:build 

# To release on GitHub.
$ npm run release # make sure to increment the version in package.json

```
## ToDos: 

1) Setup GH flows 
2) Add a test or two 
3) Setup user authentication  
4) Setup auto updates in app
