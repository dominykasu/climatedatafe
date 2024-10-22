Project Documentation: Climate Data App
This documentation provides a detailed guide to set up, run, and manage the Climate Data App. The project consists of both a backend API and a frontend React application. Users can register, log in, and view weather data for various towns using interactive charts powered by Recharts.

Table of Contents
Tech Stack
Prerequisites
Backend Setup
Frontend Setup
How to Run the Application
User Registration
Usage Guide
Common Issues and Troubleshooting
Tech Stack
Backend: Java, Spring Boot, Hibernate, PostgreSQL, RESTful API
Frontend: React, TypeScript, Axios, Recharts
Database: PostgreSQL
Authentication: JWT-based authentication
Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v14+)
npm (comes with Node.js)
Java Development Kit (JDK) (v11+)
Maven (Apache Maven 3.6+)
PostgreSQL (or any other relational database)
Backend Setup
1. Clone the Repository
bash
Copy code
git clone <your-repo-url>
cd climate-data-backend
2. Configure the PostgreSQL Database
Ensure you have PostgreSQL running locally or in the cloud. Create a database and configure the connection details.

Open src/main/resources/application.properties and configure your PostgreSQL credentials:

properties
Copy code
spring.datasource.url=jdbc:postgresql://localhost:5432/climatedata
spring.datasource.username=your_postgres_user
spring.datasource.password=your_postgres_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
3. Build and Run the Backend
bash
Copy code
mvn clean install
mvn spring-boot:run
This will start your backend server at http://localhost:8081.

4. REST API Endpoints Overview
Authentication:
POST /auth/signin: User login
POST /auth/signup: User registration
User Preferences:
GET /user/preferences: Get user weather preferences
POST /user/preferences: Save user preferences
Weather Data:
GET /weather?town=<town>: Fetch weather data for the specified town.
Frontend Setup
1. Navigate to Frontend Directory
bash
Copy code
cd ../climate-data-frontend
2. Install Dependencies
Run the following command to install all required Node.js dependencies:

bash
Copy code
npm install
This will install React, Recharts, Axios, and other necessary packages.

3. Set Up Environment Variables (Optional)
If needed, create an .env file in the frontend directory and add the backend URL:

arduino
Copy code
REACT_APP_API_URL=http://localhost:8081
4. Run the Frontend
bash
Copy code
npm start
This will start the React application at http://localhost:3000.

How to Run the Application
Once both the backend and frontend are set up:

Start the Backend:

Run the Spring Boot server at http://localhost:8081.
Start the Frontend:

Start the React frontend at http://localhost:3000.
The frontend will communicate with the backend to fetch user data, preferences, and weather information.

User Registration
Step 1: Open the frontend at http://localhost:3000.

Step 2: Click on the Sign Up button to register.

Username: Must be between 3-20 characters.
Email: Must be a valid email address.
Password: Must be at least 6 characters long.
Step 3: After successful registration, log in using the provided credentials.

Step 4: Once logged in, you can select towns from the list and view 10-day weather forecasts for each. These are displayed using Recharts in the form of line charts.

Usage Guide
Login/Signup: Register an account or log in with existing credentials.
Select Towns: After logging in, you can select towns to view weather forecasts.
Weather Data: The weather data for selected towns will be displayed on interactive Recharts line charts.
Save Preferences: Click the Save Preferences button to save your selected towns as preferences. These will be loaded automatically the next time you log in.
Common Issues and Troubleshooting
Database Connection Failure:

Make sure PostgreSQL is running and the connection details are correctly configured in the backend application.properties file.
CORS Errors:

If you face CORS issues, ensure the backend allows requests from http://localhost:3000. You can add the following to the backend configuration:

java
Copy code
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000");
    }
}
Frontend Not Connecting to Backend:

Ensure the frontend REACT_APP_API_URL is correctly pointing to http://localhost:8081 or the correct backend URL.
Login/Registration Validation Failures:

Check the validation rules for username, email, and password in the backend's SignupRequest class, and ensure proper error messages are handled on the frontend.
Conclusion
Once everything is set up, the Climate Data App allows users to register, log in, select preferred towns, and view weather forecasts for Lithuania's largest cities. The app saves user preferences, enabling a personalized experience. The app also demonstrates how to integrate a Java Spring Boot backend with a React frontend, including JWT authentication and interactive charting using Recharts.

If you encounter any issues, feel free to raise them in the repository's issue tracker.
