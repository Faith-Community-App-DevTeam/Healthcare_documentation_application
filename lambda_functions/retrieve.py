import json
import boto3
from aws_configs import USER_BUCKET, REGION_NAME, CLIENT_BUCKET


def get_all_users_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    users = json.loads(response['Body'].read())
    return users

def get_all_networks_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "network_list.json").get()
    networks = json.loads(response['Body'].read())
    return networks


def get_user(payload: dict):
    '''
    retrieves a specific user's information from the database
    function takes a payload with a user's username
    returns a responce with a new key value user: user info
    '''
    user_list = get_all_users_as_list()
    #a list of info to include in the response payload
    include_list = [ 
        import json
import boto3
from aws_configs import USER_BUCKET, REGION_NAME, CLIENT_BUCKET


def get_all_users_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    print("getting users")
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    #print("1")
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    #print(response)
    users = json.loads(response["Body"].read())
    #print(users)
    return users

def get_all_networks_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "network_list.json").get()
    networks = json.loads(response['Body'].read())
    return networks


def get_user(payload: dict):
    '''
    retrieves a specific user's information from the database
    function takes a payload with a user's username
    returns a responce with a new key value user: user info
    '''
    user_list = get_all_users_as_list()
    #a list of info to include in the response payload
    include_list = [ 
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "license_state",
        "license_number"
    ]
    print("getting user info")
    if payload["username_to_find"] in user_list.keys():
        print("found user data")
        user = user_list[payload["username_to_find"]]
        user = {key:value for key,value in user.items() if key in include_list}
        return {
            "success": True,
            "return_payload": user
        }
    return {
        "success": False,
        "return_payload": {
            'message': "failed to find user"
        }
    }

def get_clients_by_network(payload: dict):
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(CLIENT_BUCKET, "client_list.json").get()
    clients = json.loads(response['Body'].read())

    for client in clients:
        if client["network"] != payload["network"]:
            del client

    return {
        "success": True,
        "return_payload": {
            "message": "successfully retrieved clients by network",
            "clients": clients
        }
    }
    ]
    print("getting user info")
    if payload["username"] in user_list.keys():
        print("found user data")
        user = user_list[payload["username"]]
        user = {key:value for key,value in user.items() if key in include_list}
        return {
            "success": True,
            "return_payload": user
        }
    return {
        "success": False,
        "return_payload": {
            'message': "failed to find user"
        }
    }

def get_clients_by_network(payload: dict) -> list:
    """
    function to return list of clients by network_id
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(CLIENT_BUCKET, "client_list.json").get()
    client_list = json.loads(response['Body'].read())
    print(type(client_list))
    print(type(payload))
    network_id = payload["network_id"]
    print(network_id)

    client_list = client_list[network_id]
    return {
        "success": True,
        "return_payload": {
            "message": "successfully retrieved clients by network",
            "clients": client_list
        }
    }
        

def get_client(payload: dict) -> dict:
    """
    function to return a single client
    payload must have last name, dob, network_id
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(CLIENT_BUCKET, "client_list.json").get()
    client_list = json.loads(response['Body'].read())
    
    print(type(payload))
    network_id = payload["network_id"]
    last_name = payload["last_name"]
    dob = payload["dob"]
    client_list = client_list[network_id]
    
    for client in client_list:
        stored_last_name = client["last_name"]
        stored_dob = client["dob"]

        if stored_last_name == last_name:
            if stored_dob == dob:
                return {
                    "success": True,
                    "return_payload": {
                        "message": "successfully retrieved client",
                        "clients": client
                    }
                }
    return {
        "success": False,
        "return_payload": {
            'message': "failed to find client"
        }
    }