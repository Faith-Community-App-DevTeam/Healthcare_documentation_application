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
    password = payload['password']
    operation = operation

    # we can always create a new user, go ahead and allow the script to work from there
    if operation == "create_user":
        return True
    else:
        # if you're doing anything else, verify credentials before continuing
        return verify_credentials(username, password)
    


def verify_credentials(username: str, password) -> bool:
    # separate function to connect to S3, pull the user file, and check to see if the username password combo matches
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    password = hashlib.sha256(bytes(password, 'utf-8')).hexdigest()
    print('verifying credentials')
    for user_obj in get_all_users_as_list():
        print(user_obj)
        stored_username = user_obj['username']
        stored_password = user_obj['password']

        if username == stored_username:
            if password == stored_password:
                return True

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
        #print(event)
        event = event['body']
        
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
    


        
