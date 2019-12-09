#!/bin/sh
cat > Dockerfile <<EOF

#!/bin/sh
#
# This is the script you need to provide to install the rest-server.py and start it running.
# It will be provided to the instance using redis-launch.sh
#
FROM ubuntu:eoan

WORKDIR /srv
COPY worker-server.py /srv
RUN apt-get update
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y openalpr
RUN (cd /usr/share/openalpr/runtime_data/ocr/; cp tessdata/lus.traineddata .)

#
# Install other packages as needed
#
RUN apt-get install -y python3 python3-pip python3-pillow python3-openalpr python3-redis
RUN pip3 install pika
RUN pip3 install jsonpickle
RUN cd /srv
CMD ["python3", "worker-server.py"]

EOF

docker build -t worker:v3 .

docker tag worker:v3 gcr.io/dcsc-256802/worker:v3
docker push gcr.io/dcsc-256802/worker:v3

kubectl create deployment worker --image=gcr.io/dcsc-256802/worker:v3