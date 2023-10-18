import json
import boto3
from aws_config import USER_BUCKET, REGION_NAME


def get_all_users_as_list() -> list:
    """
    connect to s3 and get the big list of json that contains all the user objects
    :return: big list of user objects as json
    """
    s3 = boto3.resource("s3", region_name=REGION_NAME)
    response = s3.Object(USER_BUCKET, "user_list.json").get()
    users = json.loads(response['Body'].read())
    return users