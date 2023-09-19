sudo docker rm -f mocker
sudo docker build -t mocker:latest .
sudo docker run --name mocker --privileged  -d -v /home/tauksun/code/mocker/dist/:/app -v /sys/fs/cgroup/testing:/sys/fs/cgroup/testing --network=host  mocker:latest
