#!/bin/sh
#
# The following script should install OpenALPR using apt-get
# in Ubuntu 19.10. There's an error in the configuration that needs
# to be addressed manually
#
# Install prerequisites
sudo apt-get update

sudo apt list --installed | grep alpr
sudo apt-get purge libopenalpr
sudo rm -rf /usr/local/lib/python3.5/dist-packages/openalpr*

# Install prerequisites
sudo apt-get install -y libopencv-dev libtesseract-dev git cmake build-essential libleptonica-dev
sudo apt-get install -y liblog4cplus-dev libcurl3-dev

# If using the daemon, install beanstalkd
sudo apt-get install -y beanstalkd

cd ~
# Clone the latest code from GitHub
sudo git clone https://github.com/openalpr/openalpr.git

# Setup the build directory
cd /openalpr/src
sudo mkdir build
cd build

# setup the compile environment
sudo cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_INSTALL_SYSCONFDIR:PATH=/etc ..

# compile the library
sudo make

# Install the binaries/libraries to your local system (prefix is /usr)
sudo make install

sudo add-apt-repository -y ppa:alex-p/tesseract-ocr
sudo apt-get -y update

sudo apt-get -y purge libtesseract-dev
sudo apt-get install -y libtesseract-dev

sudo apt-get install -y python3 python3-pip 

cd /openalpr/src/bindings/python/
sudo python3 setup.py install

cd ~

sudo pip3 install --upgrade pika
sudo pip3 install pillow
sudo pip3 install openalpr
sudo pip3 install redis
sudo pip3 install numpy
sudo pip3 install jsonpickle
sudo pip3 install pymongo
sudo pip3 install dnspython

WORKER_SERVER=$(curl http://metadata/computeMetadata/v1/instance/attributes/worker-server -H "Metadata-Flavor: Google")> worker-server.py