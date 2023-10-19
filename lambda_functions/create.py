import json
import boto3
import botocore
import hashlib
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME

#setup for finding one user
FILE_MAPPING = {
    "user": 'user_list.json',
    'client': 'client_list.json'
}


"""VALIDATION_MAPPING = {
    "user": lambda payload: validate_new_user(payload),
    "flashcard": lambda payload: validate_flashcard(payload)
}"""


def encrypt_password(payload: dict):
    '''
    This functions encrypt a user's password before storing it
    '''
    print("encrypting password")
    payload["password"] = hashlib.sha256(bytes(payload["password"], 'utf-8')).hexdigest()
    print('password encrypted')
    return payload


def create_user(payload):
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
    
    user = {}
    #checking if user exist
    try:
        response = s3.Object(USER_BUCKET, FILE_MAPPING['user']).get()
        print("response:", response)
        user_list = json.loads(response['Body'].read())
        #print("list", user_list)
       
            
      
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] != '404':
            #if something else happened for now
            print(error)
            raise Exception(str(error))
    finally:
        
        print("creating new user")
        print(payload['first_name'] + ' ' + payload['last_name'])
        print(user_list)
        
        #checking if username exists (not sure if most efficient but it works)
        
        for user in user_list:
            if user['username'] == payload['username']:
                return {
                    "success":False,
                    "return_payload": {
                    "message": "User Creation Failed: Username already exists"
                    }
                }
        
        
        #dumping user setting into s3 bucket
        try:
            #print("new", type(new_list))
            print(payload, type(payload))
            print(user_list, type(user_list))
            payload = encrypt_password(payload)
            user_list.append(payload)
            print("newnew", user_list)
            
            s3.Bucket(USER_BUCKET).put_object(Body = json.dumps(user_list), Key = FILE_MAPPING['user'], ContentType = 'json')
            
            return {
                "success":True,
                "return_payload": {
                    "message": "User Creation Success"
                }
            }
        except botocore.exceptions.ClientError as error:
            
            return {
                "success":False,
                "return_payload": {
                    "message": "User Creation encountered an client error"
                }
            }


def create_client(payload):
    pass
    '''
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.
    '''

def create_service_report(payload):
    pass
    '''
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.    
    '''

