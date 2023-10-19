import json
import boto3
import botocore
import hashlib
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME
from retrieve import get_all_users_as_list

#setup for finding one user
FILE_MAPPING = {
    "user": 'user_list.json',
    'client': 'client_list.json'
}

BUCKET_MAPPING = {
    "user": USER_BUCKET,
    'client': CLIENT_BUCKET
}


VALIDATION_MAPPING = {
    "user": lambda payload: validate_new_user(payload),
    "client": lambda payload: validate_new_client(payload)
}

def validate_new_user(payload: dict) -> dict:

    for user in get_all_users_as_list():
        if payload['username'] == user['username']:
            raise Exception("User already exists")
    return encrypt_password(payload)
    
def validate_new_client(payload: dict) -> dict:
    del payload["username"]
    del payload["password"]
    print(payload)
    
    return payload
    


def encrypt_password(payload: dict):
    '''
    This functions encrypt a user's password before storing it
    '''
    print("encrypting password")
    payload["password"] = hashlib.sha256(bytes(payload["password"], 'utf-8')).hexdigest()
    print('password encrypted')
    return payload


def create(payload, operation):
    '''
    testing on creating new user.
    As of now it is configered for a single json file
    the try block is to test if nothing happened
    
    payload setup user:
        user_ID: int
        first_name: str
        last_name: str
    '''
    
    
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    #checking if user exist
    try:
        response = s3.Object(BUCKET_MAPPING[operation], FILE_MAPPING[operation]).get()
        print("response:", response)
        obj_list = json.loads(response['Body'].read())
        print("list", obj_list)
      
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] != '404':
            #if something else happened for now
            print(error)
            raise Exception(str(error))
            
    finally:
        payload = VALIDATION_MAPPING[operation](payload)  # validation of objects happens here
        obj_list.append(payload)
        
        #dumping user setting into s3 bucket
        try:
            s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(obj_list), Key = FILE_MAPPING[operation], ContentType = 'json')
            
            return {
                "success":True,
                "return_payload": {
                    "message": "Operation Success"
                }
            }
            
        except botocore.exceptions.ClientError as error:
            return {
                "success":False,
                "return_payload": {
                    "message": "Operation encountered an client error"
                }
            }

def create_user(payload: dict) -> dict:
    return create(payload=payload, operation="user")

def create_client(payload: dict) -> dict:
    return create(payload=payload, operation="client")

def create_service_report(payload):
    pass

