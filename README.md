# BSale challenge (Client)
Single client app that shows different products separated by categories, made purely with HTML, JavaScript (ES6) and CSS. Includes an Express server that only serves those static files without adding any additional logic. 

___

## Table of contents
* [Project info](#project-info)
* [Page navigation](#page-navigation)
* [Technologies](#technologies)
* [Setup](#setup)

## Project info
This project is a simple client app that gets data through a RESTful API and displays it in a user friendly way. It fetches data from a server app through queries sent by pure JavaScript ES6, taking JSON data as response and displaying it on the browser. The HTML, CSS and JS files are served through an express server to make it easier to deploy on Heroku. The core and the logic of this app can be found in the "Public" folder.

## Page navigation

At the moment, this client app only has two main views for users to navigate: Index page and Single product page

### Index page

Index page displays all the products retrieved from the server app, following the filters and criteria provided by the user. The index page contains three main features for the user to interact:
* Search bar from Navigation bar: The Navigation bar contains an inline search bar where the user may write any terms (Only alphanumeric characters and 'º' symbol allowed). Once the user presses the Search button or hits enter, the page will retrieve all the products that contains the written search term. (See Image below, point 1)
* Category selector: The category selector contains all the categories provided by the server app. If the user picks any element from the Category selector, the page will immediatly retrieve all the products that belong to the chosen category (See Image below, point 2). Note: The category selector and the Search bar do not work simultaneously.
* Sort selector: The sort selector allows the user to pick a sort type, which could be price or alphabetical name, ascending or descending. The retrieved products will be ordered by the option selected by the user (See Image below, point 3). The sort selector can work simultaneously with the Search Bar OR the Category selector.

Additionally, at the bottom of the displayed products, the user will see a "Load more" button. Once clicked, it will fetch more products. If there are not any more items to load, the "Load more" button will disappear.

![Index page](https://res.cloudinary.com/arkeg/image/upload/v1655082737/bsale-index-2_hpxxfc.png)


### Product page

If any of the products displayed on the Index page are clicked, the user will be automatically redirected to the clicked product page. On this page, the user would see further details about the products. On the current version of the page, it is not possible to perform any actions on the Product page, so it is actually a template or Mock-up for future updates. (See Image below) 

![Product page](https://res.cloudinary.com/arkeg/image/upload/v1655082534/bsale-product_mn57ay.png)
	
## Technologies
Project is created with:
* HTML5
* CSS
* JavaScript (ES6)

This project runs on an Express server, but it is only for serving the static files. Express is not mandatory for this project to work.
* Express ^4.18.1

## Setup
To run this project, dependencies must be first installed. After that, the project is run by executing through node the index.js file:

```
$ cd ../client2
$ npm install
$ node index.js
```

The project will be run by default on the port 3000

