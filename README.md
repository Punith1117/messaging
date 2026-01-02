#Project25 in The Odin Project

# Messaging
- Search users through usernames
- Start sending messages with chat invitation
- Profile customization
- Cursor based pagination for messages using prisma-postgresql
- Block or unblock users which also hides your 'mood' from them

## Chat Invitation Flow
- A user can send an initial message by searching a username
- The chat remains in `pending` state until the receiver accepts
- Further messaging is blocked until both users accept the chat

## Endpoints
- /user
    * GET /?q=asdf - get users based on query
- /meta
	* GET /moods - get all available moods
- /profile
	* GET / - get profile of user himself
	* GET /:id - get profile of particular user
	* PATCH / - update profile (casualName and mood sent through JSON)
- /chat
	* GET / - get all chats
	* POST /:otherUserId/:newStatus - update status of chat 
- /message
	* POST / - send messages (send toId and content through JSON)
	* GET /:userId?limit=10&cursor=10 - get messages sent to or received from particular user. You receive chat status, messages and nextCursor.
- /auth
	* POST /signup - send username, password and casualName through JSON
	* POST /login - send username and password through JSON. You receive 'token' that is valid for few mins

- Note: Only /meta/moods, /signup and /login endpoints are unprotected

## Authentication
- Through username and password
- JWT based (stateless)
- Passport JWT-strategy
- Token validity is few minutes
