# Amber Kim CodeFellows Lab 14 Mongo/Express 2 Resource API

## Introduction
This is a simple node.js app with an Express Server that implements Restful API's and uses MongoDB with Mongoose for storage.

## To Run This Application
Make sure you have your Mongo Daemon running.

Run server.js. Some example tools and commands you can use:
```
node server.js
// for node

nodemon server.js
// if you have nodemon installed globally

npm run start
// the package.json in this repo is configured to run "nodemon server.js" with this command.
```

RECOMMENDED: Test this app by using an http client like Postman.

## Mongoose Schema
There are two schemas. One main schema called leadSchema and a sub document schema called quoteSchema

### Lead Schema
Required keys: Name and Email (has to pass validation and needs to be unique). Both are strings.

Company: String

Quote: The subdocument schema.
```
{
  name: {type: String, required: true},
  company: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validator: function(v){
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
    }
  },
  quote: quoteSchema
};
```

leadSchema has a method called isExpired which returns whether or not the lead's quote has expired.

### Quote Schema
Required keys: Cost which is a number

Optional: Date and Expiration will use the default if none is set. Date will input Date.now while Expiration will default to a week from today.

```
{
  date: {type: Date, default: Date.now},
  expiration: {
    type: Date,
    default: new Date(+ new Date() + 7*24*60*60*1000),
  },
  cost: {type: Number, required: true},
};
```

## API End Points

### For Getting all the Leads:
```
http://localhost:3000/api/leads
```

### For getting a specific Leads:
```
http://localhost:3000/api/leads?id=<valid leads id>
```

Improper GET request will return 404 not found


### For POST requests, use:
```
http://localhost:3000/api/leads
```
and send proper JSON in the request body
```
{
  "name": "John Doe",
  "company": "JD, LLC",
  "email": newEmail,
  "quote": {
    "cost": 60000
  }
}
```

### For PUT requests, use
```
http://localhost:3000/api/leads?id=<valid leads id>
```
and send proper JSON in the request body:
```
{
  "name": "John Doe",
  "company": "JD, LLC",
  "email": newEmail,
  "quote": {
    "cost": 60000
  }
}
```

## Special Thanks
Thank you to emailregex.com for the email validator http://emailregex.com/