## SMS API

This is an SMS MANAGEMENT APPLICATION API.
It is built with node, express and mongodb as the database engine.

## steps for running this API
- [x] clone the repository
- [x] cd to the SMSAPI directory
- [x] setup the env to have a similar outlook to the .env.example
- [x] setup mongodb following this ##(mogo guide)[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/]
- [x] in one terminal run mongod, in another run npm start.
- [x] open postman and test out the endpoints below.

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


/api/v1/contacts/   method:GET   Gets all contacts 

/api/v1/contacts/:id  method:GET    Get a specific contact

/api/v1/contacts/ method:POST Add a contact to the database


/api/v1/contacts/:id  method:DELETE Delete a specific contact


/api/v1/contacts/login method:POST   login to get a token


## End points

| Endpoint                 | payload              | headers     | Method |
| -------------------------| -------------------- | ----------- | ------ |
| `/api/v1/contacts/`      |                      |             | `GET`
| `/api/v1/contacts/`      | [Contact](#Contact)  | [header1](#header) | `POST` |
| `/api/v1/contacts/:contact_id`   |                      |             | `GET`  |
| `/api/v1/contacts/login` | [loginPayload](#loginPayload)  | [header1](#header) | `POST` |
| `/api/v1/contacts/:contact_id` |           | [header2](#header2) | `DELETE` |
| `/api/v1/messages` | [messagePayload](#messagePayload)  | [header2](#header2) | `POST` |
| `/api/v1/messages/received` |            | [header2](#header2) | `GET` |
| `/api/v1/messages/received/messageId` |            | [header2](#header2) | `GET` |
| `/api/v1/messages/sent` |            | [header2](#header2) | `GET` |
| `/api/v1/messages/sent/messageId` |            | [header2](#header2) | `GET` |




## API samples

#### header1

```
- Application/json
```

#### header2

```
- Application/json
<!-- Authorization  -->
```

#### Contact

```
{
	"name": "Heroes",
	"phone": "771654398",
	"password": "spiderman4"
	
}

```

#### Message 

```
{
    "status": "sent",
    "createdAt": "2019-06-26T14:21:08.283Z",
    "_id": "5d137f787b193c24b322aa77",
    "sender": "5d137f567b193c24b322aa75",
    "receiver": "5d120c7dd37b6a3a25d1a1ad",
    "text": "hey yah!!!",
}
```

#### loginPayload

```

{
	"phoneNumber": "711111112",
	"password": "#user@1234"
}

```

#### messagePayload

```
{
	"receiver": "711111112",
	"text": "hey yah!!!"
}
```





## messages

api/v1/messages/  method:POST send message to a specific contact

api/v1/messages/   method:GET get all messages sent

api/v1/messages/:id method:GET get a specific message sent

api/v1/messages/:id  method:DELETE deletes a specific contact from a database


