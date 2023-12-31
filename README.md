# Project-Tree-Hole-Backend
This is the fortified version of the project tree hole's back end;

## Code Highlight
Middleware: The authentication/authorization logic with JWT and TreeHole's GCP SSO

Controllers: provide login and friends invitation logic

Models: contains the database to object mappers

Routes: Contains the logical Routes
SocketHandlers: 
-  Contains the logic that deals with the connection of WebRTC
-  Contains the signaling server written with Socket.io
-  Contains the necessary user dispatch, and room attendance features with optimization done with Socket.io

To sum up, the Spring System will serve as a __Discord__ natured clone that is written by hand specifically for TreeHole with SSO, JWT, Socket.io, and WebRTC based real time communication

## Technical Notice
Technologies used:
- Express.js
- Node.js
- MongoDB
- Socket.io
- WebRTC

## Feature Notice
This server now provides a way to use UChicago Tree Hole's SSO to login into the __Spring__ System, which enables the users to do real-time communication and group chats

## Security
For security reasons, the .env file is hidden.
