import json
import boto3
from create import create_user
from aws_configs import REGION_NAME, USER_BUCKET
from operation_router import retrieve_operation




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
    'statusCode': 500,
    'headers': {
        # "Access-Control-Allow-Origin": "*"
    },
    "body": {
        "success": False,
        "return_payload": {}
    },
    }

    try:


        return response

    except Exception as error:




        return response