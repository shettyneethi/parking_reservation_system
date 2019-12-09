#!/bin/sh
#
# This is the script you need to provide to launch a rabbitmq instance
# service
#

docker pull rabbitmq:3.8.0-alpine
#docker run -p 5672:5672 -d --hostname rabbitmq --name rabbitmq rabbitmq:3

docker tag rabbitmq:3.8.0-alpine gcr.io/dcsc-256802/rabbitmq:0.1
docker push gcr.io/dcsc-256802/rabbitmq:0.1

kubectl create deployment rabbitmq --image=gcr.io/dcsc-256802/rabbitmq:0.1
kubectl expose deployment rabbitmq --port 5672