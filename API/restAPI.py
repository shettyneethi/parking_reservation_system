from flask import Flask, request, Response
import jsonpickle
import pickle
import datetime
import pymongo

myclient = pymongo.MongoClient("mongodb+srv://admin:password@cluster0-q2l6k.gcp.mongodb.net/test?retryWrites=true&w=majority")
mydb = myclient["PARKING"]
bookings = mydb["BOOKINGS"]

# myclient = pymongo.MongoClient("mongodb://admin:"+ atlasPswd +"@cluster0-shard-00-00-jqlac.gcp.mongodb.net:27017,cluster0-shard-00-01-jqlac.gcp.mongodb.net:27017,cluster0-shard-00-02-jqlac.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true")
##
## Set up redis connections
##
# redisByChecksum = redis.Redis(host=redisHost, db=1)                                                                           
# redisByName = redis.Redis(host=redisHost, db=2)                                                                           
# redisMD5ByLicense = redis.Redis(host=redisHost, db=3)

##
## Set up rabbitmq connection
##
# rabbitMQ = pika.BlockingConnection(
#         pika.ConnectionParameters(host=rabbitMQHost))
# rabbitMQChannel = rabbitMQ.channel()

# rabbitMQChannel.queue_declare(queue='toWorker')
# rabbitMQChannel.exchange_declare(exchange='logs', exchange_type='topic')
# infoKey = "{}.rest.info".format(platform.node())
# debugKey = "{}.rest.info".format(platform.node())
# def log_debug(message, key=debugKey):
#     print("DEBUG:", message, file=sys.stderr)
#     rabbitMQChannel.basic_publish(
#         exchange='logs', routing_key=key, body=message)
# def log_info(message, key=infoKey):
#     print("INFO:", message, file=sys.stderr)
#     rabbitMQChannel.basic_publish(
#         exchange='logs', routing_key=key, body=message)



# @app.route('/hash/<string:checksum>', methods=['GET'])
# def getByHash(checksum):
#     response = {}
#     status = 200
#     try:
#         items = redisByChecksum.smembers(checksum)
#         def mkdict(x):
#             x = x.split(":")
#             return { 'plate': x[0], 'lat':x[1], 'lon':x[2], 'conf':x[3]}
#         response = [ mkdict(x.decode("utf-8")) for x in items ]
#     except Exception as exp:
#         log_debug("Exception hash retrieving members:{}".format(exp))
#         status = 406
#     response_pickled = jsonpickle.encode(response)
#     log_info("/hash/{} => {}".format(checksum, response_pickled))
#     return Response(response=response_pickled, 
#                 status=200, mimetype="application/json")

# @app.route('/license/<string:license>', methods=['GET'])
# def getByLicense(license):
#     response = {}
#     status = 200
#     try:
#         items = redisMD5ByLicense.smembers(license)
#         response = [ x.decode("utf-8") for x in items ]
#     except Exception as exp:
#         log_debug("Exception retrieving members:{}".format(exp))
#         status = 406
#     response_pickled = jsonpickle.encode(response)
#     log_info("/license/{} => {}".format(license, response_pickled))
#     return Response(response=response_pickled, 
#                 status=200, mimetype="application/json")

# route http posts to this method
# @app.route('/image/<string:filename>', methods=['POST'])
# def postimage(filename):
#     r = request
#     # convert the data to a PIL image type so we can extract dimensions
#     status = 200
#     try:
#         md5 = hashlib.md5(r.data).hexdigest()
#         toWorker = pickle.dumps([filename, md5, r.data])
#         log_debug("toWorker is {}".format(len(toWorker)))
#         rabbitMQChannel.basic_publish(exchange='', 
#                     routing_key='toWorker', body=toWorker)
#     # build a response dict to send back to client
#         response = {
#             'hash' : str(md5)
#             }
#     except Exception as exp:
#         log_debug("Exception image:{}".format(exp))
#         response = { 'hash' : ''}
#         status = 406
#     # encode response using jsonpickle
#     response_pickled = jsonpickle.encode(response)
#     log_info("/image/{} => {}".format(filename, response_pickled))
#     return Response(response=response_pickled,
#             status=status, mimetype="application/json")


# Initialize the Flask application
app = Flask(__name__)

# route http posts to this method
@app.route('/getBookingsByDate/<string:selected_date>', methods=['GET'])
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
    # result = {1:{'11.30':'13.30','12.00':'14.00'},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},13:{},14:{},15:{}}
    response = { 'booked' : result}
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
            status=200, mimetype="application/json")

@app.route('/makeBooking', methods=['POST'])
def makeBooking():
    # print(selected_date)
    data = request.get_json()
    response = {
        "status" : "SUCCESS"
    }
    try:
    	#####################################
    	#TO_DO
    	#
    	######################################
    	#check in db if the given lot is avilable for the time and date given ie. select * from DB where date = date and start_time >= db.startTime and <= db.starttime or end_time>= db.startTime and <= db.starttime
    	
    	bookings.insert_one(data)
    	response["status"] = "SUCCESS"
    except:
    	response["status"] = "FAIL"
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
            status=200, mimetype="application/json")

# start flask app
app.run(host="0.0.0.0", port=5000)
