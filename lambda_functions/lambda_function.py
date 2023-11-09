import json
import boto3
import hashlib

from create import create_user
from aws_configs import REGION_NAME, USER_BUCKET
from operation_router import retrieve_operation
from retrieve import get_all_users_as_list






def authenticate(payload: dict, operation) -> bool:
    """
    authenticate the payload and return true or false if the username and password match
    """
    username = payload['username']
    operation = operation

    # we can always create a new user, go ahead and allow the script to work from there
    if operation == "create_user":
        return True
    elif operation == "user_login":
        return verify_credentials(username, payload['password'])
    else:
        #if anything else check if user is authenticated
        return verify_token(username, payload['token'])
    


def verify_credentials(username: str, password) -> bool:
    # separate function to connect to S3, pull the user file, and check to see if the username password combo matches
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    password = hashlib.sha256(bytes(password, 'utf-8')).hexdigest()
    print(password)
    print('verifying credentials')
    user_list = get_all_users_as_list()
    print(user_list)
    if username in user_list.keys():
        stored_password = user_list[username]["password"]
        print(stored_password)
        if password == stored_password:
            return True
    return False

def verify_token(username, token):
    # separate function to connect to S3, pull the user file, and check to see if the token matches
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    print("verifying token")
    user_list = get_all_users_as_list()
    print(user_list)
    if username in user_list.keys():
        stored_token = user_list[username]["token"]
        if token == stored_token:
            print("token verified")
            return True
    print("wrong token")
    return False

def lambda_handler(event, context):

    response = {
    'statusCode': 200,
    'headers': {
        #"Access-Control-Allow-Origin": "*"
    },
    "body": {
        "success": False,
        "return_payload": {}
    },
    }

    try:
        print(event)
        
        #event = json.loads(event['body'])
        
        operation = event['operation']
        payload = event.get('payload')
        #print(payload)
        
        #code here will encrpyt password
        #payload = encrypt_password(payload)
        
        if authenticate(payload, operation):
            print("retrieving result function")
            
            result_function = retrieve_operation(operation)
            response['statusCode'] = 200
            
            response['body'] = result_function(payload)
            
            if not response['body']['success']:
                #unrecognized api operation
                response['statusCode'] = 400
        else:
            response['statusCode'] = 404
            response['body']['return_payload']['message'] = 'unrecognized username or password'

        return response
    
    except Exception as error:
        print(error)
        
        response = {"body": {
            "success": False,
            "return_payload": {
                "message": "unexplained server error"
            }
        }, 'statusCode': 500,
            'headers': {
                # "Access-Control-Allow-Origin": "*"
            }
        }

        response['body']['return_payload'][
            'message'] = f"received the following error during operations: \n {str(error)}"

        return response        
    


        
