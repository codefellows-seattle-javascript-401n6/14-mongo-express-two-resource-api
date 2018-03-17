# Amber Kim CodeFellows Lab 14 Mongo/Express 2 Resource API

## Introduction
This is a simple node.js app with an Express Server that implements Restful API's and uses MongoDB with Mongoose for storage. It implements Mongo sub-documents and the Mongoose populate() method. Tests are run using Jest with 'Sunny Day' tests.

## To Run This Application
Make sure you have your Mongo Daemon running.

Run server.js. Some example tools and commands you can use:
```
node server.js
// for node

nodemon server.js
// if you have nodemon installed globally
```

RECOMMENDED: Test this app by using an http client like Postman. The built-in tests are written for Jest.

## Mongoose Schema
There are three schemas.

The main schema is called contactScheme which has an array of 'jobs' for populating jobs that are associated with this each contact.

There is a second main schema called jobSchema and its sub document schema called quoteSchema.

### Contact Schema
There are two required keys:
* name: takes a string
* email: takees a string and has to be unique

Not required:
* company: takes a string
* jobs: takes an array of job objects
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
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
}
```

### Job Schema
Required keys:
* name: takes a string.

Not requred:
* Quote: The subdocument schema.
```
{
  name: {type: String, required: true},
  quote: quoteSchema
}
```

jobSchema has a method called isExpired which returns whether or not the lead's quote has expired.

### Quote Schema
Required keys:
* cost: takes a number

Optional keys:
* date: will input Date.now as default
* expiration: defaults to a date a week from today.
```
{
  date: {type: Date, default: Date.now},
  expiration: {
    type: Date,
    default: new Date(+ new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  cost: {type: Number, required: true},
}
```

## API End Points
### Resource 1: Contacts
#### For Getting all the Contacts:
```
http://localhost:3000/api/contacts
```

#### For getting a specific Contacts:
```
http://localhost:3000/api/contacts?id=<valid leads id>
```
Improper GET request will return 404 not found.
This will return more detailed information on the jobs key using the Mongoose populate() method.


#### For POSTing new Contacts, use:
```
http://localhost:3000/api/contacts
```
and send proper JSON in the request body. For example:
```
{
	"name": "Dr. Strange",
	"company": "123 hi",
	"email": "hi123@me.com",
	"jobs": [{"name": "job"}, {"name": "ace"}]
}
```

#### For PUT requests to update Contacts, use
```
http://localhost:3000/api/contacts?id=<valid leads id>
```
and send proper JSON in the request body:
```
{
	"name": "Dr. Strange",
	"company": "123 hi",
	"email": "hi123@me.com",
	"jobs": [{"name": "job"}, {"name": "ace"}]
}
```

### Resource 2: Jobs
#### For Getting all the Jobs:
```
http://localhost:3000/api/jobs
```

#### For getting a specific job:
```
http://localhost:3000/api/jobs?id=<valid leads id>
```

Improper GET request will return 404 not found


#### For POSTing new jobs, use:
```
http://localhost:3000/api/jobs
```
and send proper JSON in the request body
```
{
	"jobName": "Web Design",
	"quote": {
		"cost": 15000
	}
}
```

### For PUT requests to update jobs, use
```
http://localhost:3000/api/jobs?id=<valid leads id>
```
and send proper JSON in the request body:
```
{
	"jobName": "Web Design",
	"quote": {
		"cost": 15000
	}
}
```

## Special Thanks
* [JB Tellez](https://github.com/jb-tellez) for mongone.js found in the /lib folder.
* Thank you to [emailregex.com](http://emailregex.com/) for the email validator.