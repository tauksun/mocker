sudo docker rm -f mocker
sudo docker build -t mocker:latest .
sudo docker run --name mocker --privileged  -d -v /home/tauksun/code/mocker/dist/:/app --network=host  mocker:latest
