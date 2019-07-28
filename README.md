
<!-- //mogo-db -->


## run < brew services start mongodb-community@4.0 > to start mondgo-db
## (mogo guide)[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/]

##steps for running this API
- [x] clone the repository
- [x] cd to the SMSAPI directory
- [x] setup the env to have a similar outlook to the .env.example
- [x] setup mongodb

This is an SMS management API built with Node, Express and MongoDB.


It models the following abstractions

## Contact:

- [x] name of person
- [x] phone number of person

## SMS:

- [x] person sending sms
- [x] person receiving sms
- [x] message of sms
- [x] sms status


## Endpoints
  
**contacts**
-[x] /api/v1/contacts/   method:GET   Gets all contacts 

/api/v1/contacts/:id  method:GET    Get a specific contact

/api/v1/contacts/ method:POST Add a contact to the database


/api/v1/contacts/:id  method:DELETE Delete a specific contact


/api/v1/contacts/login method:POST   login to get a token


## messages

api/v1/messages/  method:POST send message to a specific contact

api/v1/messages/   method:GET get all messages sent

api/v1/messages/:id method:GET get a specific message sent

api/v1/messages/:id  method:DELETE deletes a specific contact from a database

