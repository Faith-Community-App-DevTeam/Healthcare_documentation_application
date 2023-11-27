import json
import boto3
import botocore
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME
from retrieve import get_all_users_as_list, get

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
    '''
    deletes a client
    
    deletes client, but plan to move the info to a different bucket for storage
    '''
    user_list = get_all_users_as_list()
    client_list = {}
    
    user = user_list[payload["username"]]
    network_id = user["network_id"]
    church_id = user["church_id"]
    
    try:
        response = s3.Object(BUCKET_MAPPING["client"], FILE_MAPPING["client"]).get()
        client_list = json.loads(response["Body"].read())
    except botocore.exceptions.ClientError as error:
        print(error)
        return {
            "success":False,
            "return_payload": {
            "message": f"Operation delete_client error: {error}"
            }
        }
        
    client_list = client_list[network_id][church_id]
    for i, client in enumerate(client_list):
        if client["last_name"] == payload["client_info"]["last_name"] and client["dob"] == payload["client_info"]["dob"]:
            client_list.pop(i)
    
    try:
        #upload new user info
        s3 = boto3.resource("s3", region_name = REGION_NAME)
        s3.Bucket(BUCKET_MAPPING["client"]).put_object(Body = json.dumps(client_list, indent=2), Key = FILE_MAPPING["client"], ContentType = 'json')  
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
            "message": f"Operation delete_user_info encountered an error: {error}"
            }
        }