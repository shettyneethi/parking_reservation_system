#!/usr/bin/env python
import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()


channel.exchange_declare(exchange='logs', exchange_type='topic')



result = channel.queue_declare('', exclusive=True)
queue_name = result.method.queue

binding_keys = ["*.*.info","*.*.debug"]

for binding_key in binding_keys:
	channel.queue_bind(
		exchange='logs', queue=queue_name, routing_key=binding_key)
print(' [*] Waiting for messages. To exit press CTRL+C')

def callback(ch, method, properties, body):
	print(" [x] %r:%r" % (method.routing_key, body))

channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
channel.start_consuming()




