# Chat App Rest API - Node.js, Express.js, MongoDB, Postman

# https://abrachatapp.herokuapp.com/

MERN stack chat application rest API backend system that is responsible for handling messages between users.
CURD operations:

•	Write message
•	Get all messages for a specific user
•	Get all unread messages for a specific user
•	Read message
•	Delete message (as owner or as receiver)

# Instructions:


To initial dummy data to the db, please go “db.js” file which located in “AbraChatApp/server/config”,
go to line 12 and remove the “//“ marks before initUsers() then save.
Make sure to mark it as a comment again to avoid duplicate data in the next saves.


1.	Create a user: GET https://abrachatapp.herokuapp.com/register
   ![image](https://ibb.co/MkF6fHN)
   
2.	Login to user: GET https://abrachatapp.herokuapp.com/login

3.	Get All users: GET https://abrachatapp.herokuapp.com/users

4.	Get All messages: GET https://abrachatapp.herokuapp.com/messages

5.	Send Message: POST https://abrachatapp.herokuapp.com/messages/SENDER-USERID 
	![image](https://ibb.co/ZKrZgq7)

6.	Get All messages of specific user: GET https://abrachatapp.herokuapp.com/messages/USERID 

7.	Read Message: PUT https://abrachatapp.herokuapp.com/messages/MESSAGEID 

8.	Get All Unread messages of specific user: GET https://abrachatapp.herokuapp.com/messages/USERID 

9.	Delete Message: DELETE https://abrachatapp.herokuapp.com/messages/MESSAGEID 
