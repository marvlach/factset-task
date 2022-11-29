# factset-task
<h3> Install and run </h3>
You can run the app with docker-compose or locally. For both ways make sure that ports 3000, 8000, 3306 are free and there is no mysql service running in the background. You can stop a running service with ```sudo systemctl stop mysql.service```

- To run with docker:
Run the script:
```
sh ./start_app.sh
```

The script just runs docker compose up

To stop the app:
```
sh ./stop_app.sh
```

- To run locally:
You need node version >= 16 and a mySQL running in localhost

For MYSQL DB, follow the config found in ```docker-compose.yml``` under ```mysql``` service
```
MYSQL_DATABASE: FSDB
MYSQL_ROOT_PASSWORD: '123'
```
Please make sure you create a DB called FSDB, or else the node app will crash.

To build frontend React app, navigate to /frontend and run 
```
npm install
npm start
```


To build backend Node app, navigate to /backend and run 
```
npm install
npx nodemon ./server.js
```

<h3> The app </h3>

Little currency exchange calculator. You can sign up as regular user or admin. To test all features, sign up as admin. When asked for an admin code give: 'SUPER SECRET ADMIN CODE' (without the ''). The rest is pretty self-explanatory.
