# a-A-capstone
My capstone project for mod 7 during my time at a/A

# API Documentation

## All endpoints that require authentication

All endpointss that require a current user to be logged in.
* Request: endpoints that require authentication
* Error Response: Require authentication
    * Status Code: 401
    * Headers:
        * Content-Type:application/json
    * Body:
        ```json
        {
            "message": "Authentication required"
        }
        ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Forbidden"
    }
    ```

# Users

## Get the Current user

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/users/<int:id>
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "wallet": 500
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log in a User

Logs in a current user with valid credentials and returns the current user's information.

* Require Authentication: false
* Request
    * Method: POST
    * URL: /api/auth/login
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret_password"
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Log out a User
Logs out the current user
* Require Authentication: True
* Request
    * Method: GET
    * URL: /api/auth/logout
    * Body: None
* Successful Response
    * Status Code:200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
      "message": "User logged out"
    }
    ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret_password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
      }
    }
    ```

### Get all Users

Returns the information about all users from the database when logged in

* Require Authentication: true
* Request
    * Method: GET
    * URL:/api/users
    * Body: None
* Successful Response when there is a logged in user
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
        {
        "users": [
            {
                "email": "demo@aa.io",
                "id": 1,
                "username": "Demo",
                "wallet": 400.0
            }
        ]
    }
    ```

## Games

### Get Games
Returns all games
* Require Authentication: false
* Request
    * Method: GET
    * URL:/api/game
    * Body: None
* Successful Response
    * Status Code:200
    * Headers:
        * Content-Type:application/json
    * Body:
    ```json
    {
        "games": [
            {
                "ESRB_rating": "T",
                "about": "Welcome to a new world! In Monster Hunter: World, the latest installment in the series, you can enjoy the ultimate hunting experience, using everything at your disposal to hunt monsters in a new world teeming with surprises and excitement.",
                "createdAt": "2024-04-03T22:30:18.333448",
                "developer": "CAPCOM Co., Ltd.",
                "franchise": "Monster Hunter",
                "genre": "Action",
                "id": 1,
                "images": "https://ice-capstone-bucket.s3.amazonaws.com/mhwheader.jpg",
                "owner_id": 4,
                "price": 29.99,
                "publisher": "CAPCOM Co., Ltd.",
                "release_date": "2018-08-08",
                "title": "Monster Hunter World",
                "updatedAt": "2024-04-03T22:30:18.333450"
            }
        ]
    }
    ```

### Get a Game by id

Returns a game specified by id

* Require Authentication: false
* Request
    * Method: GET
    * URL:/api/game/
    * Body: none
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "ESRB_rating": "T",
    "about": "Welcome to a new world! In Monster Hunter: World, the latest installment in the series, you can enjoy the ultimate hunting experience, using everything at your disposal to hunt monsters in a new world teeming with surprises and excitement.",
    "createdAt": "2024-04-03T22:30:18.333448",
    "developer": "CAPCOM Co., Ltd.",
    "franchise": "Monster Hunter",
    "genre": "Action",
    "id": 1,
    "images": "https://ice-capstone-bucket.s3.amazonaws.com/mhwheader.jpg",
    "owner_id": 4,
    "price": 29.99,
    "publisher": "CAPCOM Co., Ltd.",
    "release_date": "2018-08-08",
    "title": "Monster Hunter World",
    "updatedAt": "2024-04-03T22:30:18.333450"
    }
    ```

### Create a Game
Create a new game
* Require Authentication: true
* Request
    * Method: POST
    * URL: /api/game/create
    * Headers:
        * Content-Type: multipart/form-data
    * Body:
    ```json
    {
        "title": "BloodBorne PC",
        "release_date": "2025-02-27",
        "publisher": "Sony",
        "developer": "NEW STUDIO",
        "franchise": "BloodBorne",
        "price": 69.99,
        "genre": "action",
        "about": "The game we have been waiting for to come to pc",
        "ESRB_rating": "M",
        "image": "Image URL"
    }
    ```
* Error response: Body validation errors
    * Status Code: 400
    * Headers:
        * Content-Type:application/json
    * Body:
    ```json
    {
        "error": {
        "developer": [
            "This field is required."
        ],
        "genre": [
            "This field is required." ||  "Invalid genre, here is a list of valid genres to pick from! Action, Fighting, Visual Novel, Platformer, Open World, MOBA, Horror, Rhythm / Music, Roguelike / Roguelite, Adventure, Party / Mini-Games, Puzzle, Survival, Virtual Reality, Racing, RPG, Simulation, Sandbox, Free To Play, Sports, Strategy, Battle Royale, Metroidvania, MMORPG, Stealth, Casual"
        ],
        "image": [
            "This field is required."
        ],
        "publisher": [
            "This field is required."
        ],
        "release_date": [
            "This field is required." || "Release date cannot be in the past"
        ],
        "title": [
            "This field is required." || "Title must be less than 30 characters"
        ],
        "description": [
            "This field is required." || "Description must be less than 193 characters"
        ],
        "price": [
            "This field is required." || "Price cannot be less than $0.00" || "Price must be a number"
        ],
        "about":[
            "This field is required." || "Description must be less than 193 characters"
        ]

    }
    }
    ```


### Update a Game
Update an existing game if you are the owner of the game
* Require Authentication: True
* Require Authorization: True
* Request
    * Method: PUT
    * URL: /api/game/<int:id>
* Body:
```json
    {
        "title": "BloodBorne Remastered",
        "release_date": "2025-02-28",
        "publisher": "Microsoft",
        "developer": "BlueMoon",
        "franchise": "BloodBorne",
        "price": 69.99,
        "genre": "action",
        "about": "The game we have been waiting for to come to pc!",
        "ESRB_rating": "M",
        "image": "Image URL"
    }
```
* Successful Response
    * Status Code: 200
    * Headers:
        *Content-Type: application/json
    * Body:
    ```json
    {
        "title": "BloodBorne Remastered",
        "release_date": "2025-02-28",
        "publisher": "Microsoft",
        "developer": "BlueMoon",
        "franchise": "BloodBorne",
        "price": 69.99,
        "genre": "action",
        "about": "The game we have been waiting for to come to pc!",
        "ESRB_rating": "M",
        "image": "Image URL"
    }
    ```
* Error response: Game could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "error": "Game could not be found"
    }
    ```
<!-- * Error response: Not owner of game
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    *Body:
    ```json
    {
        "error": "You are not authorized to edit this game"
    }
    ``` -->
* Error response: Body validation errors
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    *Body:
    ```json
    {
         "error": {
            "developer": [
                "This field is required."
            ],
            "genre": [
                "This field is required." ||  "Invalid genre, here is a list of valid genres to pick from! Action, Fighting, Visual Novel, Platformer, Open World, MOBA, Horror, Rhythm / Music, Roguelike / Roguelite, Adventure, Party / Mini-Games, Puzzle, Survival, Virtual Reality, Racing, RPG, Simulation, Sandbox, Free To Play, Sports, Strategy, Battle Royale, Metroidvania, MMORPG, Stealth, Casual"
            ],
            "image": [
                "This field is required."
            ],
            "publisher": [
                "This field is required."
            ],
            "release_date": [
                "This field is required." || "Release date cannot be in the past"
            ],
            "title": [
                "This field is required." || "Title must be less than 30 characters"
            ],
            "description": [
                "This field is required." || "Description must be less than 193 characters"
            ],
            "price": [
                "This field is required." || "Price cannot be less than $0.00" || "Price must be a number"
            ],
            "about":[
                "This field is required." || "Description must be less than 193 characters"
            ]
        }
    }
    ```

### Delete a Game by id

Delete an existing game by id.
* Require Authentication: True
* Require Authorization: True
* request
    * Method: DELETE
    * URL: /api/game/<int:id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type:application/json
    *Body:
    ```json
    {
        "message": "Successfully deleted game"
    }
    ```
* Error response: Game not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
        * Body:
        ```json
        {
            "error": "Game could not be found"
        }
        ```

## Cart

### Get current user cart
* Require Authentication: True
<!-- * Require Authorization: True -->

* Request
    * Method: GET
    * URL: /api/cart/current
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
         "currentCart": [
        {
            "createdAt": "2024-04-04T23:07:52.471717",
            "game_id": 2,
            "id": 1,
            "quantity": 1,
            "updatedAt": "2024-04-04T23:07:52.471719",
            "user_id": 1
        }
    ]
    }
    ```
* Successful Response: Cart empty
    * Status Code: 200
    * Headers: Content-Type: application/json
    * Body:
    ```json
    {}
    ```

### Add a Game to cart
* Require Authentication: True
<!-- * Require Authorization: True -->
* Request
    * Method: POST
    * URL: /api/cart/create
    * Body: None
* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "game_id":1
    }
    ```
* Error Response: Game not found
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Can't add to cart"
    }
    ```

### Update quantity of a Game in cart
* Require Authentication: True
<!-- * Require Authorization: True -->
* Request
    * Method: PUT
    * URL: /api/cart/update/<int:id>
    * Body:
    ```json
    {
        "quantity": 3
    }
    ```
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "game_id":1,
        "quantity":3
    }
    ```
* Error Response: Cart item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart item not found"
    }
    ```

### Delete a Game from cart
Delete an item in current users cart.

* Require Authentication: True
<!-- * Require Authorization: True -->
* Request
    * Method: DELETE
    * URL: /api/cart/delete/<int:id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart item deleted successfully"
    }
    ```
* Error Response: Cart item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart item not found"
    }
    ```

### Clear all Games in cart
Clears the current users entire cart

* Require Authentication: True
* Request
    * Method: DELETE
    * URL: /api/cart/clear
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart cleared"
    }
    ```

## Wishlist

### Get current user Wishlist
Returns current user wishlist.
* Require Authentication: True
* Request
    * Method: GET
    * URL: /api/wishlist/current
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
            "currentWishlist": [
            {
                "createdAt": "2024-04-06T05:25:51.897060",
                "game_id": 1,
                "id": 1,
                "rank": 0,
                "updatedAt": "2024-04-06T05:25:51.897062",
                "user_id": 1
            }
        ]
    }
    ```

### Add a game to Wishlist
Add a game to current user wishlist
* Require Authentication: True
* Request
    * Method: POST
    * URL: /api/wishlist
    * Body:
    ```json
    {
        "game_id": 5
    }
    ```
* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "createdAt": "2024-04-08T18:56:15.697727",
        "game_id": 6,
        "id": 4,
        "rank": 0,
        "updatedAt": "2024-04-08T18:56:15.697731",
        "user_id": 1
    }
    ```
* Error Response: Game already exists in wishlist
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Game already in wishlist"
    }
    ```

* Error Response: Game does not exist
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Game doesn't exist"
    }
    ```

<!-- * Error Response: Wishlist does not exist
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Can't add to wishlist"
    }
    ``` -->

### Update game rank
A user can update the rank of a Game in their Wishlist
* Require Authentication: True

* Require Authorization: True

* Request
    * Method: PUT
    * URL: /api/wishlist/<int:wishlist_item_id>
    * Body:
    ```json
    {
        "game_id": 4,
        "rank":1
    }
    ```
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "createdAt": "2024-04-06T05:25:51.897060",
        "game_id": 4,
        "id": 1,
        "rank": 1,
        "updatedAt": "2024-04-08T19:03:02.933388",
        "user_id": 1
    }
    ```
* Error Response: Wishlist item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Wishlist item not found"
    }
    ```

### Delete game from wishlist
Current user can delete a game from their Wishlist
* Require Authentication: True

* Require Authorization: True

* Request
    * Method: DELETE
    * URL: /api/wishlist/<int:wishlist_item_id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Wishlist item deleted"
    }
    ```
* Error Response: Wishlist item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
       "message": "Wishlist item not found"
    }
    ```

## Reviews

### 
