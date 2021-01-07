echo "Starting Just Client Application By Docker"

docker build -f ./client/Dockerfile.dev -t paybook/client ./client
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app paybook/client
