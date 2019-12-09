from __future__ import print_function
import requests
import json
import time
import sys, os

host = sys.argv[1]
cmd = sys.argv[2]

addr = 'http://{}:5000'.format(host)

if cmd == 'getBookingsByDate':
    date = sys.argv[3]
    req_url = addr + '/api/getBookingsByDate' + "/" + date
    response = requests.get(req_url)
    print("Response is", response)
    print(json.loads(response.text))

elif cmd == "makeBooking":
    lic_plate = sys.argv[3]
    lot_numb = sys.argv[4]
    date = sys.argv[5]
    start_time = sys.argv[6]
    duration = sys.argv[7]
    req = {
        "license_plate" : lic_plate,
        "lot_numb" : lot_numb,
        "date" :date,
        "start_time" : start_time,
        "end_time" : duration
    }
    req_url = addr + '/api/makeBooking'
    headers = {'content-type': 'application/json'}
    response = requests.post(req_url, json=req, headers=headers)
    print("Response is", response)
    print(json.loads(response.text))
elif cmd == "getBookingsByDateAndPlate":
    date = sys.argv[3]
    plate = sys.argv[4]
    req_url = addr + '/api/getBookingsByDateAndPlate' + "/" + date + "/" + plate
    response = requests.get(req_url)
    print("Response is", response)
    print(json.loads(response.text))

elif cmd == "registerEntry":
    date = sys.argv[3]
    time = sys.argv[4]
    # prepare headers for http request
    headers = {'content-type': 'image/png'}
    img = open('car.jpg', 'rb').read()
    # send http request with image and receive response
    req_url = addr + '/api/registerEntry/' + date + "/" + time
    response = requests.post(req_url, data=img, headers=headers)
    print("Response is", response)
    print(json.loads(response.text))
elif cmd == "registerExit":
    date = sys.argv[3]
    time = sys.argv[4]
    # prepare headers for http request
    headers = {'content-type': 'image/png'}
    img = open('car.jpg', 'rb').read()
    # send http request with image and receive response
    req_url = addr + '/api/registerExit/' + date + "/" + time
    response = requests.post(req_url, data=img, headers=headers)
    print("Response is", response)
    print(json.loads(response.text))
else:
    print("Unknown option", cmd)