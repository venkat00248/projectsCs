# UAT URL
https://itsmkafka.cloud4c.com/

# Create Topic
```
kafka-topics.sh --create --bootstrap-server 10.10.121.101:9092 --topic myshifttickets --partitions 3 --replication-factor 1
```

# Listen on Consumer
```
kafka-console-consumer.sh --bootstrap-server 10.10.121.101:9092 --topic myshifttickets
```

# Producer
```
kafka-console-producer.sh  --bootstrap-server 10.10.121.101:9092 --topic myshifttickets
```