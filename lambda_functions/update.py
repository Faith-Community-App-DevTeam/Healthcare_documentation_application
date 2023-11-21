import json
import boto3
import botocore
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME
from retrieve import get_user_client_list
from create import encrypt_password, create_token

FILE_MAPPING = {
    "user": 'user_list.json',
    'client': 'client_list.json'
}

BUCKET_MAPPING = {
    "user": USER_BUCKET,
    'client': CLIENT_BUCKET,
    "document": CLIENT_BUCKET
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
    pass
    
    