# Notes

* **CustomError**: Mainly to serve as a base Error type, like the JavaScript Error, but with some extra fields for us to use consistently across all of the other errors we’ll create.

* **InternalError**: We throw this one when it’s a true 500. Either a process within our code fails, or maybe an external API request fails.

* **BadRequestError**: This is our generic 400 error, and will tell the user their payload was malformed.

* **NotFoundError**: This is our standard 404, signifying that either a route or resource wasn’t found. Since we have the fallback to 404 if a user hits a route we don’t have (in server.ts) we will only be using this for not found resources.

* **UnauthorizedError**: This will be our 401 error, when our authorization middleware (which we’ll build in the next article) finds that a user’s authentication is either missing or invalid

