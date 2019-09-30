# reactMediumLike

Blog application created with MERN(Mongo,Express,React and Node) stack. Basic CRUD operations, using Redux as state management library.

## Getting started

- Clone this repo
- `npm install/yarn install` in root directory
- `npm install/yarn install` in client directory
- Create `.env` file with these variables:

```
  JWT_SECRET = secret
  DB = mongodb
  NODEMAILER_SERVICE = nodemailer_service
  NODEMAILER_USER = nodemailer_email_password
  NODEMAILER_PASSWORD = nodemailer_user_password
  APP_URL = client_app_url
```

- In client folder, create env with these variables:

```
REACT_APP_API_URL=url/api
// api url
REACT_APP_BASE_URL=url
// base url for loading uploaded photos like http://localhost:5000/uploads/photo.jpg
```

- `npm run development/yarn development` to start server and client
