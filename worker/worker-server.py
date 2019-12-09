#!/usr/bin/env python
import pika
import time
from openalpr import Alpr
from PIL.ExifTags import TAGS, GPSTAGS
import redis
import socket
import jsonpickle
import io
import math
from PIL import Image
import pymongo
	
connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()

myclient = pymongo.MongoClient("mongodb+srv://admin:password@cluster0-q2l6k.gcp.mongodb.net/test?retryWrites=true&w=majority")
mydb = myclient["PARKING"]
bookings = mydb["BOOKINGS"]
entryDetails = mydb["ENTRY"]
exitDetails = mydb["EXIT"]

hostname = socket.gethostname()
routing_key_debug = hostname+".rest.debug"
routing_key_info = hostname+".rest.info"

alpr = Alpr('us', '/etc/openalpr/openalpr.conf', '/usr/share/openalpr/runtime_data')

channel.exchange_declare(exchange='toWorker', exchange_type='direct')
print(' [*] Waiting for messages. To exit press CTRL+C')

result = channel.queue_declare(queue='entryQueue', exclusive=True)
queue_name = result.method.queue

channel.queue_bind(
		exchange='toWorker', queue=queue_name, routing_key="**image")

def callback(ch, method, properties, body):
	print(" [x] received image %r" % (method.routing_key))
	data = jsonpickle.decode(body)
	
	# convert the data to a PIL image type so we can extract dimensions
	ioBuffer = io.BytesIO(data["img"])

	img = Image.open(ioBuffer)
	img.save("temp.jpg")
	results = alpr.recognize_file('temp.jpg')
	license = ""
	if len(results['results']) == 0:
		print(routing_key_debug+"No license plate found")
	else:
		license = str(results['results'][0]['plate'])
		print(routing_key_debug+":Most likely plate is "+license)

	if(data["func"] == "ENTRY"):
		row = {
			"license_plate" : license,
			"date": data["date"],
			"time": data["time"],
			"checksum": data["hash"]
		}
		myquery = { "date": data["date"], "license_plate": license }
		query_res = bookings.find(myquery)
		result = {}
		found = False
		for i in query_res:
			if(i["start_time"] <= data["time"] and i["end_time"] > data["time"]):
				found = True
				row["booking_id"] = i["_id"]
		if(found):
			entryDetails.insert_one(row)

	else:
		row = {
			"license_plate" : license,
			"date": data["date"],
			"time": data["time"],
			"checksum": data["hash"],
			"fine" : 0
		}
		myquery = { "date": data["date"], "license_plate": license }
		query_res = entryDetails.find(myquery).sort("time", -1).limit(1)
		
		myquery = { "_id" : query_res["booking_id"]}
		query_res = bookings.find(myquery)
		if(data["time"] > query_res[0]["end_time"]+0.05):
			overTime  = math.ceil(data["time"] - query_res[0]["end_time"])
			row["fine"] = overTime*40
		exitDetails.insert_one(row)
	print(routing_key_info+"worker DONE!")
	

channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
channel.start_consuming()