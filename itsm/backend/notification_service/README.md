# NOTIFICATION SERVICE
Notification service is built using Socket.io for interactive communication between client users and server.


## Events

* Broadcast Events (from server to client)
	- Only for logged in user
		- Unread notifications
		- History notifications

* Update on event(from client to server)
	- Marking notification as read.



## Data Model

```
title: string
message: string
status: "read" / "unread"
timestamp: "" //Unix timestamp
type: "app_wide" / "user_specific"
```
