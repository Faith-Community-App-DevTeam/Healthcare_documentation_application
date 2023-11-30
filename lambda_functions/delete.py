import json
import boto3
import botocore
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME
from retrieve import get_all_users_as_list, get_user, get_network_as_list, get_a_network, get_role

'''
    Once structure is done, then I think we can start on how to delete users and clients
'''
FILE_MAPPING = {
    "user": 'user_list.json',
    'client': 'client_list.json'
}

BUCKET_MAPPING = {
    "user": USER_BUCKET,
    'client': CLIENT_BUCKET,
    "document": CLIENT_BUCKET
}

def delete_user(payload: dict) -> dict:
    '''
    used to delete a user
    '''
    user_list = get_all_users_as_list()
    user_del = user_list.pop(payload["username"])
    del user_del
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
            "message": "Operation delete_user_info encountered an error"
            }
        }
        

def delete_client(payload:dict) -> dict:
    pass

def delete_network(payload:dict) -> dict:
    '''
    deletes a network if one is an admin
    #FIXME for now it just deletes it, without refactoring user and client information
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
                    "message": "delete_network error: user does not exist"
                }
            }
        
    #might have a "none" network based on the network_list.json, might cause issues?
    network_id = find_user["return_payload"]["network_id"]
    
    if(network_id not in network_list.keys()):
        
        return {
                "success": False,
                "return_payload": {
                    "message": "delete_network error: network does not exist"
                }
            }
    
    #for future use, holds the deleted network
    temp = network_list.pop(network_id)
        
    return {
                "success": True,
                "message": "Operation Success. Deleted network"
            }