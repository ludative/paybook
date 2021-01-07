echo "Starting Just Server Application By Docker"

docker build -f ./server/Dockerfile.dev -t paybook/server ./server
docker run -p 5000:5000 -v /app/node_modules -v $(pwd):/app paybook/server

