# dont-secure.me

don't secure me is an experimental social platform where users can share posts and interact with each other, but with a twist — no passwords are required! Users can create new accounts or even log into those of others for a fun experience.

## 🚨 Warning
This project is deliberately insecure. It's meant for experimental purposes only.

## 🌟 Features
### User Management
- User registration and authentication
- Profile customization
- User search functionality

### Social Features
- Post creation and sharing
- Comments
- Friend/Follow system
- Interaction through likes and saves

## 🧪 Testflight Link
If you have an iOS device try out the mobile beta [here!](https://testflight.apple.com/join/JTftNpFY)

## 🛠️ API Routes

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

#### followUser

- **Endpoint**: `/api/user/followUser`
- **Method**: `GET` or `POST`
- **Description**: `GET` returns follow status, `POST` follows user
- **Query Parameters**:
  - `username`: intended user to follow/unfollow
- **GET Response**:

  - **Status**: 201 OK

  ```json
  { "success": true, "isFollowing": false, "totalFollowers": 0 }
  ```

  - **Status**: 400 Bad Request

  ```json
  { "error": "User not found" }
  ```

  **POST Response**:

  - **Status**: 201 OK

  ````json
  {"success":true,"message":"User followed successfully","action":"followed","isFollowing":true,"totalFollowers":1}```
  ````

  - **Status**: 400 Bad Request

  ```json
  { "error": "User not found" }
  ```

#### getSuggestedUsers

- **Endpoint**: `/api/user/getSuggestedUsers`
- **Method**: `GET`
- **Description**: Retrieves suggested users for current user.
- **Response**:
  - **Status**: 201 OK
  ```json
  {
    "suggestedUsers": [
      {
        "_id": "66c2c966bd0832fd8c2e7a8c",
        "username": "bobby",
        "name": "bob dylan",
        "date": "2024-08-19T04:26:14.884Z",
        "followerCount": 0
      },
      {
        "_id": "66c19695da85dda674380264",
        "username": "ianatorISaPOOPOO",
        "name": "POOOOOO",
        "date": "2024-08-18T06:37:09.881Z",
        "pfpLink": "pfps/pfp_ianatorISaPOOPOO.jpeg"
      },
      {
        "_id": "66c1a2dcde7d54de48ca4228",
        "username": "soheeswife",
        "name": "Brii Ze",
        "date": "2024-08-18T07:29:32.502Z",
        "pfpLink": "pfps/pfp_soheeswife.jpeg"
      },
      {
        "_id": "66c2c3c0e1d1d6d8e3ddcea2",
        "username": "OfficialFruitSalad",
        "name": "Fruit Salad",
        "date": "2024-08-19T04:02:08.431Z",
        "pfpLink": "pfps/pfp_OfficialFruitSalad.jpeg",
        "followerCount": 1
      }
    ]
  }
  ```
  - **Status**: 400 Bad Request
  ```json
  {
    "error": "User not authenticated"
  }
  ```

### login and logout

#### login

- **Endpoint**: `/api/login`
- **Method**: `POST`
- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "username": "justin"
  }
  ```
- **Response**:
  - **Status**: 201 Created
  ```json
  {
    "success": true,
    "message": "User logged in successfully"
  }
  ```
  - **Status**: 400 Bad Request
  ```json
  {
    "error": "User not found"
  }
  ```

#### logout

- **Endpoint**: `/api/logout`
- **Method**: `POST`
- **Description**: Logs out a user.
- **Response**:

  - **Status**: 201 Created

  ```json
  {
    "success": true,
    "message": "User logged out successfully"
  }
  ```

  - **Status**: 400 Bad Request

  ```json
  {
    "error": "User not authenticated"
  }
  ```

### feed

#### getFeed

- **Endpoint**: `/api/getFeed`
- **Method**: `GET`
- **Description**: Retrieves the feed for the current user.
- **Query Parameters**: -`type`: `string` - type of feed to retrieve
  Possible Values: - `home` - `following` - `user` - `saved` - `searchUsers` -`limit`: `number` - number of posts to retrieve -`page`: `number` - page number -`username`: `string` - username of user to retrieve feed for -`query`: `string` - query to search for the searchUsers type
  **Response**:
  - **Status**: 201 OK
  ```json
  [
    {
      "_id": "some-object-id",
      "username": "user1",
      "content": "post content",
      "date": "2023-10-01T00:00:00.000Z"
    }
    // ... other posts
  ]
  ```
  - **Status**: 400 Bad Request
  ```json
  {
    "error": "Invalid feed type"
  }
  ```
  - **Status**: 400 Bad Request
  ```json
  {
    "error": "User not authenticated"
  }
  ```
### Posts

#### createPost

- **Endpoint**: `/api/posts/createPost`
- **Method**: `POST`
- **Description**: Creates a new post
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "title": "Optional post title",
    "description": "Post content"
  }
  ```
- **Response**:
  - **Status**: 201 Created
  ```json
  {
    "_id": "post-id",
    "title": "Optional post title",
    "description": "Post content",
    "user": "user-id",
    "username": "username",
    "date": "2024-03-19T04:15:10.974Z",
    "likeCount": 0
  }
  ```
  - **Status**: 400 Bad Request
  ```json
  {
    "error": "Description is required"
  }
  ```
  - **Status**: 401 Unauthorized
  ```json
  {
    "message": "Not authenticated"
  }
  ```
