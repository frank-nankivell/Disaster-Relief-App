# rescapp read me

This is the code for the Web Scripting and application development submission 'rescApp' application that is built through for the third application submission. [rescApp]

A brief demonstration of the core functionality of the system can be seen at the youtube link below

https://www.youtube.com/watch?v=CxOWEkhz88E&feature=youtu.be


## What is rescapp

Rescapp is an application that supports communities around the world with disaster relief, it enables people to report on issues they may have faced and other people to be alerted when these reports arise.

## How has it been buit

The app has been built with node,express and mongodb. MongoDb's hosted service Atlas is currently serving as the database for the system.

## Development process

The app and repositories for the system are all hosted on dev.azure.com. Below are some useful links to present where the app was created.

Most changes on the app were pushed to the master noted here:
https://dev.azure.com/7wcm0035-fn17aak/_git/app-fn17aak/commits?itemPath=%2F&itemVersion=GBmaster

there were many internal `develop` branches which have now been merged.

This link below shows the kanban style board that the work was produced on. As noted there is always more to do, like every application.
https://dev.azure.com/7wcm0035-fn17aak/app-fn17aak/_boards/board/t/app-fn17aak%20Team/Stories


## Below gives the instructions on how to run the app

1) To get the code for the master app.

`$ git clone git@ssh.dev.azure.com:v3/7wcm0035-fn17aak/app-fn17aak/app-fn17aak`
or 
`git clone https://7wcm0035-fn17aak@dev.azure.com/7wcm0035-fn17aak/app-fn17aak/_git/app-fn17aak`

(You will need to either set up ssh keys or git credentials prior to accessing these links)

or... use the zip file from the submission

2) Then change into the folder the git clone command will create:

`$ cd app-fn17aak`

3) install the dependencies:

`npm install`

4)Then to start the application run this command

`NODE_ENV=production npm start`

5) The app will launch here locally

http://localhost:3000

#enjoy!