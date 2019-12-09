
gcloud compute instances create worker-added --source-snapshot=worker --tags=default-allow-internal --network-interface=no-address --metadata-from-file=startup-script=run-worker.sh