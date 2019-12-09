#!/bin/sh
#
# This is the script you need to provide to launch a rest instance
#

cat > Dockerfile <<EOF
# Use an ubuntu 18.04
FROM ubuntu

MAINTAINER Neethi

RUN apt-get update
RUN apt-get install -y python3 python3-pip git

RUN git clone https://github.com/pallets/flask
WORKDIR /flask/examples/tutorial

RUN python3 setup.py install
RUN pip3 install -e .
WORKDIR /project
COPY rest-Install.sh /project
COPY restAPI.py /project
RUN chmod 777 rest-install.sh
RUN chmod 777 rest-server.py

RUN pip3 install pillow jsonpickle
RUN pip3 install pillow
RUN pip3 install redis
RUN pip3 install pika
RUN pip3 install numpy
RUN pip3 install pymongo
RUN pip3 install dnspython
CMD ["python3", "restAPI.py"]
EXPOSE 5000
EOF

docker build -t rest:v3 .

docker tag rest:v3 gcr.io/dcsc-256802/rest:v3
docker push gcr.io/dcsc-256802/rest:v3

kubectl create deployment rest --image=gcr.io/dcsc-256802/rest:v3
kubectl expose deployment rest --port 5000 --target-port 5000 --type=LoadBalancer