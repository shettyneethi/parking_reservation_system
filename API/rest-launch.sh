#!/bin/sh
#
# This is the script you need to provide to launch a rest instance
# and cause it to run the rest-install.sh script
#

gcloud compute instances create rest --image-family ubuntu-1804-lts --tags allow-5000 --image-project gce-uefi-images --metadata-from-file=startup-script=rest-install.sh,rest-server=restAPI.py