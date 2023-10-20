import json
import boto3
from aws_configs import USER_BUCKET, REGION_NAME


def get_all_users_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    users = json.loads(response['Body'].read())
    return users

def get_all_networks_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "network_list.json").get()
    networks = json.loads(response['Body'].read())
    return networks


def get_user(payload: dict):
    '''
    retrieves a specific user's information from the database
    function takes a payload with a user's username
    returns a responce with a new key value user: user info
    '''
    user_list = get_all_users_as_list

    print("getting user info")
    for user in user_list:
        if user["username"] == payload["username"]:
            print("found user data")
            return {
                "success": True,
                "return_payload": {
                    "message": "successfully retrieved user's data",
                    "user": user
                }
            }
    return {
        "success": False,
        "return_payload": {
            'message': "failed to find user"
        }
    }