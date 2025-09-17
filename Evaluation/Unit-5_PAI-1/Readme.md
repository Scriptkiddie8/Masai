Problem Statement: "Cuisine Critic" - Restaurant & Review API
Core Objective
You are to build a well-structured RESTful API for a restaurant review platform called "Cuisine Critic." The API will manage restaurant listings and user-submitted reviews for those restaurants. This project will test your skills in creating an Express.js application with an MVC architecture, modeling data with Mongoose, and implementing a one-to-many relationship between data collections.

Note: This exercise does not require user authentication or authorization.

Project Requirements
Project Foundation & Architecture:

Initialize a Node.js project and install necessary packages: express, mongoose, dotenv.
The application must follow the MVC (Model-View-Controller) pattern, with distinct folders for models, controllers, and routes.
Use a .env file to manage your MONGO_URI and PORT.
Middleware Implementation:

External Middleware: Use the morgan middleware in dev mode to log all incoming HTTP requests to the console.
Custom Middleware: Create a custom "Not Found" error handler middleware that responds with a 404 Not Found status and a JSON message for any route that doesn't exist.
Data Models
You will create two interconnected Mongoose models.

1. Restaurant Model (models/restaurantModel.js)
   name: String, must be required and unique.
   cuisine: String, must be required and one of the following values: 'Italian', 'Mexican', 'Indian', 'Chinese', 'Other'. Use a Mongoose enum for this validation.
   address: String, required.
   averageRating: Number, with a default value of 0. This field will be updated dynamically.
2. Review Model (models/reviewModel.js)
   text: String, required, with a minimum length of 10 characters.
   rating: Number, must be required, with a min value of 1 and a max value of 5.
   restaurant: This is the key field for the relationship. It must be a mongoose.Schema.Types.ObjectId that references the Restaurant model and is required.
   Advanced Logic Requirement: Dynamic Rating Calculation
   This is the central challenge of the project. The averageRating on a Restaurant document must not be updated manually. Instead, it must be automatically recalculated and saved every time a review associated with it is added, updated, or deleted.

Hint: A robust way to implement this is by creating a static method on the Review schema that calculates the average rating for a given restaurant ID and then updates the corresponding restaurant document. This method can then be called from your review controller after any create, update, or delete operation.
API Endpoints
Restaurant Routes (/api/restaurants)
POST /: Creates a new restaurant.
GET /: Retrieves a list of all restaurants.
Should support filtering by cuisine (e.g., ?cuisine=Italian).
GET /:restaurantId: Retrieves a single restaurant by its ID.
PUT /:restaurantId: Updates a restaurant's details.
Review Routes (Nested under Restaurants)
These routes should be designed to show the clear relationship between a restaurant and its reviews.

POST /api/restaurants/:restaurantId/reviews: Creates a new review for a specific restaurant. After creation, it must trigger the average rating recalculation.
GET /api/restaurants/:restaurantId/reviews: Retrieves all reviews for a specific restaurant.
DELETE /api/reviews/:reviewId: Deletes a specific review by its ID. After deletion, it must trigger the average rating recalculation for the parent restaurant.
Submission Guideline
Submit your root directory's git repo link , this will be specifically the folder that you worked on today's evaluation and you submit the parent folder of it .
