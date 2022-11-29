# Social Network API
This is a mock-up of a social media site API where you can create users, create posts, have reactions/comments on those posts, and make friend connections.

## Installation

In order to run the app, you must have Node.js installed and upon opening the repository run <code>npm i</code> to download the necessary packages. Optionally, you are welcome to test the app with an application like Insomnia to test the routes as this application does not have a front end, but it should be able to run in the browser as well. 

## Usage
After you have installed the packages, you can start the server by running <code>node server.js</code>.

Once you have started the server you can either test the application in the browser or in insomnia using the below routes. 


[http://localhost:3001/api/users](http://localhost:3001/api/users)

* The GET request on this route will find all users in the database and all of their information

* the POST request on this route will create a new user and all that is needed as input is a username, and email.

example input: 
```
{
  "username": "kristenkillingsworth",
  "email": "killingsworth_kristen@yahoo.com"
}
```


[http://localhost:3001/api/thoughts](http://localhost:3001/api/thoughts)

* The GET request on this route will find all of the 'thoughts' (AKA posts) made by all users. 

* The POST request on this route will create a new thought and requires a thought body, username of the person making the thought, as well as their id number

example input: 
```
{
  "thoughtText": "Here's a cool thought...",
  "username": "kristenkillingsworth",
  "userId": "638641b369effab9111d79ec"
}
```


[http://localhost:3001/api/users/:userId](http://localhost:3001/api/users/:userId)

* The GET request on this route will find one user with the matching id number.

* The PUT requset on this route will update a user with the matching id number; it will take in the same input as creating a user (see above).

* The DELETE request on this route will delete a user with the matching id number. 


[http://localhost:3001/api/thoughts/:thoughtId](http://localhost:3001/api/thoughts/:thoughtId)

* The GET request on this route will find one thought with the matching id number.

* The PUT requset on this route will update a thought with the matching id number; it will take in only the thought body as input because in normal functionality of a social media app, you cannot transfer ownership of posts.

```
{
  thoughtBody: "lorem ipsum"
}
```

* The DELETE request on this route will delete a thought with the matching id number. 


[http://localhost:3001/api/users/:userId/friends/:friendId](http://localhost:3001/api/users/:userId/friends/:friendId)

* The POST request on this route creates a one-way friend connection; the friendsId is added to the users 'profile' that matches the userId inside of the friends array.

* The DELETE request on this route deletes the friendsId from the user's 'profile' that matches the userId. 


[http://localhost:3001/api/thoughts/:thoughtId/reactions](http://localhost:3001/api/thoughts/638640fe57d9ad6ba31bd81c/reactions)

* The POST request on this route creates a reaction to a user's thought (like a comment on a post). This matches the thoughtId to the id of the thought being reacted to, and takes in a reactionBody and the username of the user creating the reaction. 

example input: 
```
{
  "reactionBody":"meow meow meow meow",
  "username":"OrionIsCat"
}
```

[http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId](http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId)

* The DELETE request on this route deletes the reaction with the id that matches the reactionId on the thought with the matching thoughtId. 


Here is a link to the video demo. This video can also be found as a file in the repository itself. 

[DEMO](https://watch.screencastify.com/v/86Nxzmn1PoPTDY2dZTt9)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
