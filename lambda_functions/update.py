import json
import boto3
import botocore
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME
from retrieve import get_user_client_list, get_network_as_list, get_role, get_user
from create import encrypt_password, create_token

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

def update_client_data(payload: dict) -> dict:
    '''
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.
    '''
        
def update_user_data(payload: dict) -> dict:
    '''
    This updates a user data on the database if they made changes
    '''
    user_list = get_user_client_list()
    update_info = payload["user_info"]
    
    #clear empty values
    #if v is empty false, else true
    update_info = {k: v for k, v in update_info.items() if v}
    
    #might cause timeout if timeout error still occurs
    update_info["include_in"] = {k: v for k, v in update_info["include_in"].items() if v}
    update_info["automate"] = {k: v for k, v in update_info["automate"].items() if v}
    update_info["health_minister"] = {k: v for k, v in update_info["health_minister"].items() if v}
    update_info["permissions"] = {k: v for k, v in update_info["permissions"].items() if v}
    
    user_list["username"].update(update_info)
    
    try:
        #upload new user info
        s3 = boto3.resource("s3", region_name = REGION_NAME)
        s3.Bucket(BUCKET_MAPPING["user"]).put_object(Body = json.dumps(user_list, indent=2), Key = FILE_MAPPING["user"], ContentType = 'json')  
        return {
            "success":True,
            "return_payload": {
                "message": "Operation Success",
            }
        }
            
    except botocore.exceptions.ClientError as error:
        return {
            "success":False,
            "return_payload": {
            "message": "Operation update_user_info encountered an error"
            }
        }
        
def update_user_cred(payload:dict) -> dict:
    '''
    updates a user's credentials
    '''
    user_list = get_user_client_list()
    og_user = user_list.pop(payload["username"])
    
    if "new_username" in payload.keys():
        og_user["username"] = payload["new_username"]
        og_user["token"] = create_token({
            "username": og_user["username"],
            "password": og_user["password"]
        })["token"]
        
    else:
        og_user["password"] = payload["new_password"]
        og_user.pop("token")
        og_user["username"] = payload["username"]
        og_user = encrypt_password(og_user)
        
    user_list[og_user["username"]] = {key:value for key,value in og_user.items() if key != "username"}
    
    try:
        #upload new user info
        s3 = boto3.resource("s3", region_name = REGION_NAME)
        s3.Bucket(BUCKET_MAPPING["user"]).put_object(Body = json.dumps(user_list, indent=2), Key = FILE_MAPPING["user"], ContentType = 'json')  
        return {
            "success":True,
            "return_payload": {
                "message": "Operation Success",
            }
        }
            
    except botocore.exceptions.ClientError as error:
        return {
            "success":False,
            "return_payload": {
            "message": "Operation update_user_cred encountered an error"
            }
        }
    
    
def update_network(payload:dict) -> dict:
    '''
    updates a network's information
    payload:{
        username,
        token,
        network_info: all info one wants to update, structured based on network_data on aws_config.py
        }
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
                    "message": "update_network error: user does not exist"
                }
            }
        
    #might have a "none" network based on the network_list.json, might cause issues?
    network_id = find_user["return_payload"]["network_id"]
    
    if(network_id not in network_list.keys()):
        return {
                "success": False,
                "return_payload": {
                    "message": "update_network error: network does not exist"
                }
            }
    
    
    update_info = payload["network_info"]
    include_in = update_info.pop("include_in")
    automate = update_info.pop("automate")
    
    network_list[network_id]["include_in"].update(include_in)
    network_list[network_id]["automate"].update(automate)
    network_list[network_id].update(update_info)
    
    try:
        #upload updated network info
        s3 = boto3.resource("s3", region_name = REGION_NAME)
        operation = "network"
        s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(network_list, indent=2), Key = FILE_MAPPING[operation], ContentType = 'json')  
        return {
            "success":True,
            "return_payload": {
                "message": "Operation Success",
            }
        }
            
    except botocore.exceptions.ClientError as error:
        return {
            "success":False,
            "return_payload": {
            "message": "Operation update_network encountered an error while uploading"
            }
        }