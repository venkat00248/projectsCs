# Workflow Service

- All reads should check in cache service for records, missing of records in cache should fetch from database.
- All the logs of microservices should be trackable through elk 
- All the micro services should have /health and /ping urls
- All the code implemented should have its own test cases
- Only Code coverage of 60% are allowed to deploy using CI/CD



## Workflow Automation

- 


## Features
- CRUD can be performed unless the workflow is published.
- Once the workflow is published only read permissions are available to any user.
	- Because update on published workflows will impact tickets created earlier.
- UI < -- > Utilities < -- >Backend
	- Utilities library will fetch next step in workflow, validate the workflow, validate the next step in workflow etc.
- Workflow can be be driven from UI Library using diagrams/json
- Workflow decision block should have properties like capturing table_name and column_name for approval check

## Data Model
```
{
    "id": string,
    "uuid": string,
    "wf" : object, 
    "created_by": user_id, 
    "ticket_type_id": string, 
    "name": string,
    "description": string, 
    "is_active": boolean, 
    "is_published": boolean
}
```


## Grafana
- Health check and monitoring tool Installation and Integration

## Logs Service
- A common module has to implemented to record the logs on application level using winston

## Husky Commit Integration
- Change log creation
- Automatic version upgrade

## RBAC in user service
- create/define RBAC configuration in user service.
- Import userdata from myshift production.
- Roles are user/customer, support, admin and superadmin
- 

## Create a new ticket type and set parameters like
- all the ticket types should be specific to tenant
- ticket type name
- ticket type shorturl(used while creating ticket)
- priorities by ticket type (default)
- priorities also should be given by customer
- SLA's(in hours) against ticket type priority.
- Ticket Status by ticket type(Open, closed, pending with customer, In Progress etc.)
- status of ticket type
- only admin role can create new ticket type
- giving payload as aforementioned should create a record in relevant tables.
- Each ticket should have resolved hours and total hours
- Each ticket should have group, sub-group, department, owner, wings, line of business.

## Create a superadmin role
- SuperAdmin can on board new tenant
- SuperAdmin can do CRUD on tenants.

## Create a admin role
- Admin can create new ticket type
- Admin can do CRUD on master data
- Admin can Manage email configuration


## MultiTenant System Design
- All the data should be persisted in tenant specific database.
- Connections string information of Tenants has to maintained in Master database/yaml configuration.
- CRUD on Tenants will be done by superadmin role.
- Tenant id should be part of each request and will be part of request header.


## ELK stack Implementation and Integration

## Redis Integration
- scripts to keep backup of past 30days in cache service

## Establishing Communication between services
- Internal uServices will communicate each other with Kafka
- 

## API Gateway
- Frontend will communicate with micro services via API Gateway.
- API Specific Configuration
    - Authentication
    - Rate Limitor
    - Versioning


## CRUD on Ticket Type
- User should be able to create a ticket
- Payload will contain
    - Tenant ID
    - Ticket Type
    - Subject
    - Description
    - Departments
    - Groups
    - Organization
    - Priority with SLA
    - Ticket ID
- User should be able to see ticket id before creating the ticket.
- Users information has to be fetched from user service
- User should be able to upload or attach files against ticket.(file service)

## CRUD on tickets
- all the users should have access to this.
- trasactions on each ticket should also entry a record in governance data in mongo.
- User should also be able split and merge tickets.


## User Service
- Import existing users from production 
- Import master data from production like departments, groups, lobs, levels etc.
- 

## Connector Service
- any extra operation has to performed on a ticket specific action by ticket type etc should be implemented here.

## Authentication and Authorization service

## Swagger Installation and Integration

## Kafka Service

## Performance Optimization
- Clustering
- Code Refactoring


## UAT URL
https://itsmworkflow.cloud4c.com/

## workflow application setup

- Clone the project,go to workflow_Service directory present in backend directory
- Run npm install for installing all the dependencies
- add .env file and populate the mongodb connection details.Please ask for local .env from any developer
- Run npx tsc coomand followed by npm start command to start the workflow_Service

