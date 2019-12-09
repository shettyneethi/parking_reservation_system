#!/bin/sh
#
# This is the script you need to provide to install the rest-server.py and start it running.
# It will be provided to the instance using redis-launch.sh
#

REST_SERVER=$(curl http://metadata/computeMetadata/v1/instance/attributes/rest-server -H "Metadata-Flavor: Google")


sudo apt-get update
sudo apt-get install -y python3 python3-pip git
cd
git clone https://github.com/pallets/flask
cd flask/examples/tutorial
sudo python3 setup.py install
sudo pip3 install -e .

cd
echo "$REST_SERVER" > rest-server.py
sudo pip3 install --upgrade pika
sudo pip3 install jsonpickle
sudo pip3 install pillow
sudo pip3 install numpy
sudo pip3 install pymongo
sudo pip3 install dnspython

sudo python3 restAPI.py