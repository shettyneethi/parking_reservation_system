# parking_reservation_system
GOALS:

The idea of this project is to implement a parking reservation system to help users reserve parking lots. The following are the list of features that we are providing:

Users can book parking lots for a specific time and date for a given license plate.
Only the vehicle that has a reservation for that time and date will be allowed to the parking lot.
Users can see the state of the parking lot for any chosen date i.e., how many spots are booked and how many are available.
On exit, the fine to be paid will be calculated and displayed. (If you have exceeded the reservation time)
The system recognizes the license plates the vehicle enters the parking lot and keeps track of time till it enters and exits the lot. 



HARDWARE AND SOFTWARE COMPONENTS:

The following are the various software and hardware components that we are going to use for our project:

Nodejs and React : used for frontend / Web User Interface
MongoDB: NoSQL database for storing info
Flask REST Server:  for Rest APIs to handle user request
RabbitMQ: 
 Logging and Debugging
 Message exchange between RestAPI and worker
Google Compute Engine: virtual machines to host services and deployment
Open ALPR: Image recognition
Docker: deployments
Kubernetes: Deployment Scalability
Worker: distribute work

Interactions with other components:

The user can access our Web Application that is built using node.js and React.js. This frontend talks to the Rest API server to serve each user request (by collecting the required data or performing a desired action). The Rest API Server is built using flask. All log messages from the rest server are sent using rabbitMQ for log monitoring. 

The following are the list of APIs that we have implemented:


/api/getBookingsByDate/<string:selected_date>:
This is a get API that takes in 1 parameter: date. This API returns the list of all bookings from MongoDB for that given date. 

/api/getBookingsByDateAndPlate/<string:selected_date>/<string:plate>
This is a get API that takes in 2 parameters: date and licence_plate number. This API returns the list of all bookings from mongoDB for that given date and license plate. 
/api/makeBooking
This is a POST API that takes in JSON parameter: of the following format:
{“license_plate” : license_plate,
  “lot_number” : lot_number,
“Start_time” : “start_time”,
“End_time” : “End_time”}

This API creates an entry in the MongoDB database for the reservation requested. 

/api/registerEntry/<string:date>/<string:time>
This is a POST API that takes in 3 parameters date, time and image (of the car with license plate). This API takes in the data and places it in rabbitmq so that workers can consume the data and do image recognition on the image to recognize the license plate. Then it queries the database to find out if there is a booking for that license plate for a given date and time. This returns if a car can enter the lot or not.

/api/registerExit/<string: date>/<string: time>
This is a POST API that takes in 3 parameters date, time and image (of the car with license plate). This API takes in the data and places it in rabbitmq so that workers can consume the data and do image recognition on the image to recognize the license plate. Then it queries the database to find out the expected exit time for that vehicle. It then calculates the fine to be paid if you have exceeded the reservation time and returns the amount due.

We have used MongoDB Atlas,  which is a NoSQL database that uses JSON like documents to share scheme-free data. Hence we didn’t have to worry much about the structure we were storing documents. This also helped us change structure/schema as and when required with altering much of the code. Hence it was mainly used for flexibility reasons.

Rabbitmq served 2 main purposes: 1 queue was used for messaging between rest and worker to handle requests and another queue for logging. The Log server listens for debug and info logs topics in rabbitmq sent from different hosts. 

The worker consumes tasks from rest and is used for detecting the license plate using open ALPR in the image sent and store details in the MongoDB. Also, more workers can be added with the script if we think there is a large amount of incoming traffic. Each of these are deployed using docker on Kubernetes engine POD. 

DEBUGGING AND TESTING MECHANISM:

This project involved a lot of debugging. As discussed above we have log server running that is used for reading logs from rabbitMQ emitted by various components. As we are using the Kubernetes engine in our project which has a logging mechanism, we were able to debug using kubectl log commands. This way we could go back and find if any problem has occurred using the data from the logs. This enabled us to test whether the application is working as expected or not. We have used error handling and edge case handling in our code in order to make sure that if any problem comes, these logs and try-except block help us debug.

We wrote test scripts that were used to check the return values of each APIs. For each test, we manually investigated the logs to check if everything was working as expected. Web UI had 2 forms to test if the APIs were working as expected. We were able to cover a lot of edge cases of the API using a web interface.

CAPABILITY AND IMPROVEMENTS: 

The current system is able to handle a fair amount of load as we have deployed them using Kubernetes, Docker containers and additional resources that can be added when necessary. Currently, we have to manually run our script to add a number of workers. But it would have been better if we had automated that as well to scale up and down according to the number of requests that are coming in. There is a single point of failure if the rest server goes down. Also, multiple web servers can be used based on traffic and use a load balancers to decide which web server serves the request. (Kubernetes can handle this well). Maybe we should have used Indexing based on dates for quick access from MongoDB. Also, replicas of database records can be made for handling fault and also data can be sharded. 
