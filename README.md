# SMSman


Sms Management System is an API that allows you create contact and send text messages to contacts

Note: For learning purposes, you can follow the commit history of this repo.

To use the routes, visit PMS API
Features
* Users can create a contact.
* Users can get a contact.
* Users can get all contacts.
* Users can edit a contact.
* Users can delete a contact.
* Users can send messages to existing contacts

Authorization: No authorization required

Endpoints
This is the link in which to access the api.

Below are the collection of routes.
```
 app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Sms API!',
  }));
  
  app.post('/api/contact', contactController.create);
  app.get('/api/contact', contactController.list);
  app.get('/api/contact/:contactId', contactController.retrieve);
  app.put('/api/contact/:contactId/name', contactController.updateName);
  app.put('/api/contact/:contactId/number', contactController.updateNumber);
  app.delete('/api/contact/:contactId', contactController.destroy);
  
  app.post('/api/sms/:contactId/', smsController.create);
```

Technologies Used
* Node.js
* Express
* Sequelize
* Installation
* Clone the project repository.
* Run the command below to clone:
* git clone ```git@github.com:ckOfor/PMSystem.git.```

Change directory into the PMSystem directory.
Install all necessary packages in the package.json file. Depending on if you are using npm, you can use the command below:
npm install

#### Things to note
1. I have created an online database to help make things faster all you need to do is create a .env file and add 
```
NODE_ENV = production
DATABASE_URL=postgres://huowaxfz:x1Fcz8iL8om89EoSghVWN97pvF5Bjayp@baasu.db.elephantsql.com:5432/huowaxfz
```

2. type the following code on your command line
```
export DATABASE_URL=postgres://huowaxfz:x1Fcz8iL8om89EoSghVWN97pvF5Bjayp@baasu.db.elephantsql.com:5432/huowaxfz
```

3. Run sequelize migrate command below:
```
sequelize db:migrate
```

4. Run the command below to start the application locally:
```
npm run start:dev
```

Test the routes above on POSTMAN or any other application of choice
Contributing
Fork this repository to your account.
Clone your repository: git clone git@github.com:ckOfor/PMSystem.git.
Commit your changes: git commit -m "did something".
Push to the remote branch: git push origin new-feature.
Open a pull request.
Licence
ISC

Copyright (c) 2018 Chinedu Ofor
