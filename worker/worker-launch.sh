gcloud compute instances create worker-test \
    --image-project=ubuntu-os-cloud \
    --image-family=ubuntu-1804-lts  \
    --tags=default-allow-internal \
    --network-interface=no-address \
 	--metadata-from-file=startup-script=worker-install.sh,worker-server=worker-server.py 