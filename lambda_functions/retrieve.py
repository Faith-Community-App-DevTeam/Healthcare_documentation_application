import json
import boto3
import botocore
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

def get_user(payload: dict, include_list: list) -> dict:
    '''
    Returns users based on a given list of wanted info
    '''
    user_list = get_all_users_as_list()
    #a list of info to include in the response payload

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

def get_client(payload: dict) -> dict:
    """
    function to return a single client
    payload must have last name, dob, network_id
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(CLIENT_BUCKET, "client_list.json").get()
    client_list = json.loads(response['Body'].read())
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    user = json.loads(response['Body'].read())[payload["username"]]

    network_id = user["network_id"]
    church_id = user["church_id"]
    last_name = payload["last_name"]
    dob = payload["dob"]
    client_list = client_list[network_id][church_id]
    
    for client in client_list:
        stored_last_name = client["last_name"]
        stored_dob = client["dob"]

        if stored_last_name == last_name:
            if stored_dob == dob:
                return {
                    "success": True,
                    "return_payload": {
                        "message": "successfully retrieved client",
                        "client": client
                    }
                }
    return {
        "success": False,
        "return_payload": {
            'message': "failed to find client"
        }
    }
    
def get_user_client_list(payload: dict) -> dict:
    include_list = [ 
        "first_name",
        "last_name",
        "dob",
        "gender",
    ]
    client_list = {}
    try:
        s3 = boto3.resource("s3", region_name=REGION_NAME)
        response = s3.Object(CLIENT_BUCKET, "client_list.json").get()
        client_list = json.loads(response['Body'].read())
    except botocore.exceptions.ClientError as error:
        return {
        "success": False,
        "return_payload": {
            'message': "failed to load client list"
        }
    }
    
    #Want to get user info from calling a function instead of relying on the front end to get that info for us
    #For now it is setup like this
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    user = json.loads(response['Body'].read())[payload["username"]]
    
    network_id = user["network_id"]
    church_id = user["church_id"]
        
    return {
            "success": True,
            "return_payload": {
                "message": "successfully retrieved client",
                "client_list": client_list[network_id][church_id]
            }
        }

def user_login(payload: dict) -> dict:
    include_list = [ 
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "license_state",
        "license_number",
        "token"
    ]
    return get_user(payload, include_list)