# k8s-poc

## Mongodb run docker command
```
docker run -d -p 27017:27017 -v ~/data/mongo:/data/db --name mongodb-k8s mongo:latest
```

## Start frontend from Dockerfile
```
docker build -t k8sfront .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app k8sfront
```

## Start backend from Dockerfile (go to backend root directory)
```
docker build -t k8sback .
docker run -p 3001:3001 -v /app/node_modules -v $(pwd):/app k8sback
```

## Start docker-compose
```
docker-compose down && docker-compose build --no-cache && docker-compose up
```
