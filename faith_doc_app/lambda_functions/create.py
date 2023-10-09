import json
import boto3
import botocore
import hashlib
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME

FILE_MAPPING = {
    "user": 'users.json',
    'client': 'client_list.json'
}


"""VALIDATION_MAPPING = {
    "user": lambda payload: validate_new_user(payload),
    "flashcard": lambda payload: validate_flashcard(payload)
}"""


def create_user(payload):


    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.



def create_client(payload):

    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.

def create_service_report(payload):

    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.    

