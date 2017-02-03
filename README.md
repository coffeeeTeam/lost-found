#Project Title

####Lost and Found

##Descriptions

Lost and Found is a web app for helping people to find their lost stuff in hotel that they was stayed.

##Getting Started

The app using express, nodejs, mongodb, mongoose

##How to install

```
> npm install
```

##List of Route

####Admin Route

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

####Customer Route

|Route        |HTTP      |Descriptions|
|:------      |:--------:|:-----------|
|/confirmation|GET       |confirm link for customer, require to input email, room number, and check in date|

####Authors
|Name           |Github        |
|:--------------|:------------:|
|Chris Antoni   |chrisantoni   |
|Didit Suryadi  |didietsuryadi |
|Irsan Sebastian|sanBastia     |
|Yoma Sofwan    |yomaswn       |
