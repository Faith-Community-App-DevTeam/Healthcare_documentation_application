import json
import boto3
import botocore
import hashlib
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME




def create_user(payload):


    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.