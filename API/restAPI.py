from flask import Flask, request, Response
import jsonpickle
import pickle
import datetime
import pymongo
from PIL import Image
import io
import socket
import pika
import hashlib
import time 

myclient = pymongo.MongoClient("mongodb+srv://admin:Ca$hc0w1@cluster0-q2l6k.gcp.mongodb.net/test?retryWrites=true&w=majority")
mydb = myclient["PARKING"]
bookings = mydb["BOOKINGS"]
entryDetails = mydb["ENTRY"]
exitDetails = mydb["EXIT"]

hostname = socket.gethostname()
routing_key_debug = hostname+".rest.debug"
routing_key_info = hostname+".rest.info"


# Initialize the Flask application
app = Flask(__name__)

# route http posts to this method
@app.route('/api/getBookingsByDate/<string:selected_date>', methods=['GET'])
def getBookingsByDate(selected_date):
    # print(selected_date)
    # date = selected_date.split(".")
    # selected_date = datetime.datetime(int(date[2]), int(date[0]), int(date[1]))

    # get all bookings for this date
    myquery = { "date": selected_date }
    query_res = bookings.find(myquery)
    result = {}
    for i in query_res:
    	if(i["lot_numb"] in result):
    		result[i["lot_numb"]][i["start_time"]] = i["end_time"]
    	else:
    		result[i["lot_numb"]] = {i["start_time"] : i["end_time"]}
    response = { 'booked' : result}
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
            status=200, mimetype="application/json")

@app.route('/api/getBookingsByDateAndPlate/<string:selected_date>/<string:plate>', methods=['GET'])
def getBookingsByDateAndPlate(selected_date,plate):
    # print(selected_date)
    # date = selected_date.split(".")
    # selected_date = datetime.datetime(int(date[2]), int(date[0]), int(date[1]))

    # get all bookings for this date
    myquery = { "date": selected_date , "lic_plate" : plate}
    query_res = bookings.find(myquery)
    result = {}
    for i in query_res:
        if(i["lot_numb"] in result):
            result[i["lot_numb"]][i["start_time"]] = i["end_time"]
        else:
            result[i["lot_numb"]] = {i["start_time"] : i["end_time"]}
    response = { 'booked' : result}
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
            status=200, mimetype="application/json")

@app.route('/api/makeBooking', methods=['POST'])
def makeBooking():
    data = request.get_json()
    response = {
        "status" : "SUCCESS"
    }
    status=200
    try:
    	
    	bookings.insert_one(data)
    	response["status"] = "SUCCESS"
    except:
        response["status"] = "FAIL"
        status = 400
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
           status=status , mimetype="application/json")

@app.route('/api/registerEntry/<string:date>/<string:time>', methods=['POST'])
def registerEntry(date,time):
    status = 200
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
    channel = connection.channel()
    response = {'message' : "FAILED"}
    # try:
    print("try")
    channel.exchange_declare(exchange='toWorker', exchange_type='direct')
    channel.exchange_declare(exchange='logs', exchange_type='topic')

    channel.basic_publish(exchange='logs', routing_key=routing_key_info, body="Call to registerEntry Api made")
    m = hashlib.md5()
    m.update(request.data + str.encode(date) + str.encode(time))
    checksum = m.hexdigest()

    message = {
                "img":request.data,
                "date":date,
                "time":time,
                "func" : "ENTRY",
                "hash" : checksum
    }

    channel.basic_publish(exchange='toWorker',routing_key="**image",body=jsonpickle.encode(message))
    channel.basic_publish(exchange='logs', routing_key=routing_key_debug, body="sent image to worker for entry registration.")
    myquery = { "checksum": checksum, "date": date }
    if(entryDetails.find(myquery).count() > 0):
            response["message"] = "Successfully Registered entry"
    else:
            response["message"] = "No booking found for this Licence Plate for this date and time"
    # except:
        # channel.basic_publish(exchange='logs', routing_key=routing_key_debug, body="something failed")
    #Encode response using jsonpickle
    response_pickled = jsonpickle.encode(response)
    channel.basic_publish(exchange='logs', routing_key=routing_key_info, body="RESULT"+response_pickled)
    connection.close()
    return Response(response=response_pickled, status=200, mimetype="application/json")

@app.route('/api/registerExit/<string:date>/<string:time>', methods=['POST'])
def registerExit(date,time):
    status = 200
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
    channel = connection.channel()
    response = {'message' : "FAILED"}
    try:
        channel.exchange_declare(exchange='toWorker', exchange_type='direct')
        channel.exchange_declare(exchange='logs', exchange_type='topic')

        channel.basic_publish(exchange='logs', routing_key=routing_key_info, body="Call to registerExit Api made")
        m = hashlib.md5()
        m.update(request.data + str.encode(date) + str.encode(time))
        checksum = m.hexdigest()

        message = {
                "img":request.data,
                "date":date,
                "time":time,
                "func" : "EXIT",
                "hash" : checksum
            }

        channel.basic_publish(exchange='toWorker',routing_key="**image",body=jsonpickle.encode(message))
        channel.basic_publish(exchange='logs', routing_key=routing_key_debug, body="sent image to worker for exit registration.")
        myquery = { "hash": checksum, "date": date }
        res = exitDetails.find(myquery)
        if(exitDetails.find(myquery).count() > 0):
            response["message"] = "SUCCESS"
            response["fine"] = res[0]["fine"]
        else:
            response["message"] = "No booking found for this Licence Plate"
    except:
        channel.basic_publish(exchange='logs', routing_key=routing_key_debug, body="something failed")
    #Encode response using jsonpickle
    response_pickled = jsonpickle.encode(response)
    channel.basic_publish(exchange='logs', routing_key=routing_key_info, body="RESULT"+response_pickled)
    connection.close()
    return Response(response=response_pickled, status=200, mimetype="application/json")

# start flask app
app.run(host="0.0.0.0", port=5000)
