# Healthcare_documentation_application
## Overview
This repository contains all the code used to create the FCN App. The lambda functions folder has everything
related to AWS as well as the logic for the back end. Within the src folder, the constants folder has examples
of what the payloads the front end would send as well as JSON's that represent what the JSON's in the AWS S3 buckets
would look like.

To enter the testing environment in the app, valid usernames include test_admin, test_user1, test_user2, and test_user3
all with "password" as a password.

## What works and what needs work
In terms of CRUD (creation, reading, updating, and deleting), users, clients, documents, and networks have full
functionality. Monthly reports had creation complete as we felt that RUD wasn't necessary for the amound of time
we had. 

Church CRUD has not been implemented. In the client_list.json that can be found in src > constants > clients,
the client list is layered by network_id > a list of clients. Originally we wanted it to be layered by network_id >
church_id > list of clients as per our clients request. We decided to leave church layer out since we were running out
of time. 

Communication between users also has not been implemented. Assigning pictures to clients also requires implementation.
This web app is also hosted on github. Will eventually need to be hosted on a proper domain.

## Workflow
![image](https://github.com/Faith-Community-App-DevTeam/Healthcare_documentation_application/assets/113818711/6c444600-71ad-4585-b646-ce229d4a163b)


## Back-end Architecture
![image](https://github.com/Faith-Community-App-DevTeam/Healthcare_documentation_application/assets/113818711/42e372c6-bc9d-4106-9c5c-808381258f1d)
