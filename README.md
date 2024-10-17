# dont-secure.me

unsecured social media platform

## API Routes

### User Routes

#### createUser

- **Endpoint**: `/api/user/create`
- **Method**: `POST`
- **Description**: Creates a new user.
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "name": "New User"
  }
  ```
- **Response**:
  - **Status**: 201 Created
  ```json
  {
    "_id": "user-id",
    "username": "newuser",
    "name": "New User",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```
  - **Status**: 400 Bad Request
  ```json
  {
    "error": "Username already exists"
  }
  ```

#### checkUser

- **Endpoint**: `/api/user/checkUser`
- **Method**: `GET`
- **Description**: Checks if a user exists.
- **Query Parameters**:
  - `username`: The username to check.
- **Response**:

  - **Status**: 201 OK

  ```json
  {
    "_id": "UUID",
    "username": "justin",
    "name": "justin",
    "date": "2024-08-19T04:15:10.974Z",
    "pfpLink": "pfps/pfp_justin.png",
    "followerCount": 2
  }
  ```

  - **Status**: 400 Bad Request

  ```json
  {
    "error": "username required"
  }
  ```

  - **Status**: 404 Not Found

  ```json
  {
    "error": "user not found"
  }
  ```
