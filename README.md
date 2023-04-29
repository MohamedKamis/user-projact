# user-projact
welcome to user-projact 

This project is designed to add a user, delete a user, log in to a user, update or delete user data.
Also use jwt to protect and encrypt user data

# This is the backend side

How it works ?
First open the project in an editor and then install dependencies using 
 code ( npm i ) in TERMINAL projact

You need to add some data in file (.env)

PORT=8080
NODE_ENV=dev
Postgres_host=
Postgres_user=
Postgres_password=
Postgres_database=
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=
PEPPER=

and run migrations using code (npm run mu) in TERMINAL projact

Now that the project data has been downloaded, you need to activate the project using
 code (npm run dev) in TERMINAL projact

Congratulations, now your backend project is ready and its API can be used

How to use api 
    get('/user') api for read data users
    get('/login/user') api for login user
    post('/user') api for create user
    get('/user/show') api for show user
    put('/user')  api for update user
    delete('/user') api for destroy user

 you can read api data user using (http://localhost:8080/user)

 Enjoy your free time
