uSerivices oriented architecture for ticketing plantform

# Commit Message Format
```
git commit -m "feat(AM-2442): added husky commit feature"
```
Types of Commits

- "type": "feat", "Meaning": "Features"
- "type": "fix", "Meaning": "Bug Fixes"
- "type": "chore", "Meaning": "Maintainance Tasks"
- "type": "docs", "Meaning": "Documentation"
- "type": "refactor", "Meaning": "Refactoring"
- "type": "test", "Meaning": "Test Cases

To release following commands have to be used
```
npm run release
npm run release:minor
npm run release:patch
npm run release:major
```

# Email Config Details
```
host: "insidemail.cloud4c.com",
10.10.121.10
port: 25,587
from: noreply@insidemail.cloud4c.com
password: keep password empty
```

# Data Analytics Dashboards
- https://app.powerbi.com/groups/me/reports/379360bb-f76f-4b18-95b0-d51e1ce667f0/ReportSection?ctid=512ec501-cb12-46d1-bbef-7f52f8ad2df8&clientSideAuth=0&bookmarkGuid=2756e6a9-4dbf-4cbe-98e7-49c7df758052
- https://app.powerbi.com/groups/me/reports/061c8338-c9fc-46fb-8df1-b177b1b089f9/ReportSection?ctid=512ec501-cb12-46d1-bbef-7f52f8ad2df8&clientSideAuth=0&bookmarkGuid=7a95420d-aa6c-4849-a15c-836ee51dc9b1
- https://app.powerbi.com/groups/me/reports/7071de4e-3cd0-4828-9d97-cbe9d8261dac/ReportSection?ctid=512ec501-cb12-46d1-bbef-7f52f8ad2df8&clientSideAuth=0&bookmarkGuid=8772c64a-f974-4a9d-bd1a-dc04eb177b23


#  Connector services
UCP
Zabbix
Frun
Email Parser
Myshift
CSP
APP
OPF3
Beg
serviceportal
OCP
GEMS
microservices
SRE
IFL
Ctrls UCP


# Internal URLs
- http://appmodernization-service  

- http://appmodernizationbackend-service

- http://fileserver-service  

- http://gateway-service

- http://kafka-service

- http://ticket-service


- https://itsmworkflow.cloud4c.com/

- https://itsmnotification.cloud4c.com

- https://itsmkafka.cloud4c.com

- https://itsmticket.cloud4c.com/auth

- https://itsmgateway.cloud4c.com/

- https://itsmfileserver.cloud4c.com/auth

- https://itsmscheduler.cloud4c.com


## ITSM Dashboard
- itsmdashboardapi.cloud4c.com
- itsmdashboard.cloud4c.com

# TODO
* Workflow service
* Automation with workflows - https://n8n.io/
* RBAC
* Bookshelf.js or Objection.js Integration as ORM
* Event Emitters

* Data seggregation inputs - sachin khambam


# Services

- API Gateway

- Cache Service

- Connector Service

- Email Service

- File Server Service

- Kafka Service

- Roaster Service

- Notification Service

- Search Service

- Ticket Service

- User Service

- Workflow Service


# How to Run the Application


## Database Path
Mongodb default path has been set to following. If the directory is not existing create one in the following path.
```
C:\\data
```

Run the following command to run the application.
```
docker-compose up
```

Run the following command to stop the running services
```
docker-compose down
```




