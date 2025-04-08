# Travel Booking API

This is a travel booking API that allows users to register, log in, browse hotels, and make bookings. It also supports web check-in functionality.

## Features

- User registration and authentication
- Hotel browsing with dummy data
- Booking creation and management
- Web check-in for bookings
- JWT-based authentication

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   SERVER_PORT=4000
   ```

4. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

## Database Schema

The database schema is defined using Prisma and includes the following models:

- **User**: Represents a user in the system.
- **TouristPlace**: Represents a tourist place associated with hotels.
- **Hotel**: Represents a hotel available for booking.
- **Booking**: Represents a booking made by a user.
- **GuestDetail**: Represents details of guests for a booking.

## API Routes

### Authentication

- **Register a new user**
  - **URL**: `/auth/add`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
    ```

- **Login a user**
  - **URL**: `/auth/login`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Login successful",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
    ```

- **Logout a user**
  - **URL**: `/auth/logout`
  - **Method**: `POST`
  - **Response**:
    ```json
    {
      "message": "Logout successful"
    }
    ```

### Hotels

- **Get all hotels**
  - **URL**: `/hotels`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": 1,
          "name": "Grand Palace Resort",
          "address": "123 Beachfront Ave, Miami, FL",
          "description": "Luxury resort with ocean views",
          "amenities": "Pool, Spa, Restaurant, Gym",
          "price_per_night": 299.99,
          "place_id": 1,
          "tourist_place": {
            "id": 1,
            "name": "Miami Beach",
            "location": "Florida, USA",
            "description": "Beautiful beaches and vibrant nightlife"
          }
        }
      ]
    }
    ```

- **Get hotel by ID**
  - **URL**: `/hotels/:id`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "id": 1,
        "name": "Grand Palace Resort",
        "address": "123 Beachfront Ave, Miami, FL",
        "description": "Luxury resort with ocean views",
        "amenities": "Pool, Spa, Restaurant, Gym",
        "price_per_night": 299.99,
        "place_id": 1,
        "tourist_place": {
          "id": 1,
          "name": "Miami Beach",
          "location": "Florida, USA",
          "description": "Beautiful beaches and vibrant nightlife"
        }
      }
    }
    ```

### Bookings

- **Create a booking**
  - **URL**: `/bookings/create`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "hotelId": 1,
      "checkInDate": "2023-12-01",
      "checkOutDate": "2023-12-05",
      "totalPrice": 1199.96
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Booking created successfully",
      "booking": {
        "id": 1,
        "user_id": 1,
        "hotel_id": 1,
        "check_in_date": "2023-12-01T00:00:00.000Z",
        "check_out_date": "2023-12-05T00:00:00.000Z",
        "total_price": 1199.96,
        "status": "pending"
      }
    }
    ```

- **Web check-in**
  - **URL**: `/bookings/check-in`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "bookingId": 1,
      "guests": [
        {
          "name": "Jane Doe",
          "aadhaarNo": "123456789012",
          "isPrimary": true
        }
      ]
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Web check-in completed successfully",
      "guests": [
        {
          "id": 1,
          "booking_id": 1,
          "name": "Jane Doe",
          "aadhaar_no": "123456789012",
          "is_primary": true
        }
      ]
    }
    ```

## Project Structure

- **src/controller**: Contains the business logic for handling requests.
- **src/routes**: Defines the API endpoints and their handlers.
- **src/middleware**: Contains middleware functions for authentication.
- **src/types**: Defines TypeScript types for the application.
- **src/utils**: Contains utility functions and classes.
- **src/db**: Contains the Prisma client setup.

## Authentication Mechanism

The API uses JWT for authentication. The `authenticate` middleware checks for a valid JWT token in the request headers or cookies and attaches the user information to the request object.

