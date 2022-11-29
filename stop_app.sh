docker compose stop
docker container rm -f factset-task-backend-1 factset-task-frontend-1 factset-task-mysql-1 
docker image rm -f factset-task-frontend:latest factset-task-backend:latest 
docker volume rm factset-task_MYSQLDB