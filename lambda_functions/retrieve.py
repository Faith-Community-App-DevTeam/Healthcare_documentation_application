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

    print("getting user info")
    for user in user_list:
        if user["username"] == payload["username"]:
            print("found user data")
            return {
                "success": True,
                "return_payload": {
                    "message": "successfully retrieved user's data",
                    "user": user
                }
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