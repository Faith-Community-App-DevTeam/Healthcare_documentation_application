import json
import boto3
import botocore
from aws_configs import USER_BUCKET, REGION_NAME, CLIENT_BUCKET

FILE_MAPPING = {
    "user": 'user_list.json',
    'client': 'client_list.json',
    "network": "network_list.json"
}

BUCKET_MAPPING = {
    "user": USER_BUCKET,
    'client': CLIENT_BUCKET,
    "document": CLIENT_BUCKET,
    "network": USER_BUCKET
}

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

def get_user_list(payload: dict) -> dict:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json

    payload:
        operation:
        username:
        token:
    """
    print("getting users")
    role = get_role(payload)["return_payload"]["role"]
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    user_list = json.loads(response["Body"].read())
    if role == "admin":
        return {
            "success": True,
            "return_payload": user_list
        }
    else:
        return {
            "success": False,
            "return_payload": {
                "message": "Must be an admin."
            }
        }

def get_user(payload: dict) -> dict:
    '''
    Returns users based on a given list of wanted info
    payload: 
        username
        token
        "user_to_find": "",
        "include_list": [], "#comment": "list of strings, optional"
    '''
    user_list = get_all_users_as_list()
    include_list = []
    if "include_list" not in payload.keys():
        include_list = [ 
            "first_name",
            "last_name",
            "address",
            "phone_number",
            "license_state",
            "license_number",
            "token",
            "role"
        ]
    else:
        include_list = payload["include_list"]
    
    #a list of info to include in the response payload

    print("getting user info")
    if payload["user_to_find"] in user_list.keys():
        print("found user data")
        user = user_list[payload["user_to_find"]]
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
    payload
        last name
        dob
        network_id
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
    """
        returns the client list from a user's network and church
        payload
            username
            token
    """

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
    payload["user_to_find"] = payload["username"]
    return get_user(payload)

def get_client_document_list(payload: dict) -> dict:
    """
        A function that retrieves any client's list of documents by year and month

        payload:
            username: str
            token: str
            month: str (must be mm format)
            year: str (YYYY)
            client_id: str (XXXXXX)
    """
    year = payload["year"]
    client_id = payload["client_id"]
    json_name = year + ".json"
    try:
        s3 = boto3.resource("s3", region_name=REGION_NAME)
        response = s3.Object(CLIENT_BUCKET, json_name).get()
        document_list = json.loads(response['Body'].read())
    except botocore.exceptions.ClientError as error:
        return {
        "success": False,
        "return_payload": {
            'message': "failed to load document list"
        }
    }
    if "month" in payload.keys():
        month = payload["month"]
        if document_list[client_id][month] != None:
            return {
                    "success": True,
                    "return_payload": {
                        "message": "successfully retrieved client's documents",
                        "document_list": document_list[client_id][month]
                    }
                }
    else:
        if document_list[client_id] != None:
            return {
                    "success": True,
                    "return_payload": {
                        "message": "successfully retrieved client's documents",
                        "document_list": document_list[client_id]
                    }
                }
    return {
                    "success": False,
                    "return_payload": {
                        "message": "No documents exist for client in selected month/year"
                    }
                }
    
def get_role(payload: dict) -> dict:
    """
        I made it take in a paylaod instead of just a username in case the front end wants to use it
        payload: 
            username
            token
    """
    username = payload["username"]
    payload = {"user_to_find": username}
    role = get_user(payload)["return_payload"]["role"]
    return {
                "success": True,
                "return_payload": {
                    "message": "successfully retrieved role",
                    "role": role
                }
            }


def get_network_as_list() -> dict:
    '''
    returns all networks as a list
    '''
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    operation = "network"
    network_list = {}
    
    try:
        print("Getting bucket")
        response = s3.Object(BUCKET_MAPPING[operation], FILE_MAPPING[operation]).get()
        #print("response:", response)
        network_list = json.loads(response['Body'].read())
        #print("list", obj_list)
      
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] != '404':
            #if something else happened for now
            print(error)
            raise Exception(str(error))
        else:
            raise Exception(str(error))
    
    return network_list

def get_a_network(payload: dict) -> dict:
    '''
    returns info of a network if user is an admin
    '''
    role = get_role(payload)
    if get_role(payload)["return_payload"]["role"] != "admin":
        return {
                "success":False,
                "return_payload": {
                    "message": "Must be an admin"
                }
            }
    
    network_list = get_network_as_list()
    find_user = get_user({
        "user_to_find": payload["username"],
        "include_list": ["network_id"]
    })
    
    
    if(not find_user["success"]):
        return {
                "success": False,
                "return_payload": {
                    "message": "get_a_network error: user does not exist"
                }
            }
        
    #might have a "none" network based on the network_list.json, might cause issues?
    network_id = find_user["return_payload"]["network_id"]
    
    if(network_id not in network_list.keys()):
        return {
                "success": False,
                "return_payload": {
                    "message": "get_a_network error: network does not exist"
                }
            }
    
    return {
                "success": True,
                "return_payload": network_list[network_id]
            }