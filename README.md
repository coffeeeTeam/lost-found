# Project Title

#### Lost and Found

## Descriptions

Lost and Found is a web app for helping people to find their lost stuff in hotel that they was stayed.

## Tech

Lost and Found uses a number of open source projects to work properly:


* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework !
* [mongoose](http://mongoosejs.com/) - Awesome mongoose !
* [mongoDB](https://www.mongodb.com/) - Awesome mongoDB !

## How to install

```
> npm install
```

## List of Route

#### Admin Route

|Route     |HTTP      |Descriptions                                       |
|:---------|:--------:|:--------------------------------------------------|
|/signup   |POST      |signup for admin                                   |
|/signin   |POST      |signin for admin                                   |
|/users    |GET       |allow admin for find all listing of user registered|
|/list     |GET       |allow admin for find all listing of lost stuff     |
|/customer |GET       |show all customer                                  |
|/customer |POST      |create new customer                                |
|/customer |PUT       |modify user info by email                          |
|/customer |DELETE    |delete customer by email                           |
|/item     |POST      |create new lost item                               |

#### Customer Route

|Route        |HTTP      |Descriptions|
|:------      |:--------:|:-----------|
|/confirmation|GET       |confirm link for customer, require to input email, room number, and check in date|

#### Develop by

- [sanbastia](https://github.com/sanBastia)
- [qblol](https://github.com/qblol)
- [radityaarya](https://github.com/radityaarya)
- [axiomaswn](https://github.com/axiomaswn)
