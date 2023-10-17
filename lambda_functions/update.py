import json
import boto3
from aws_configs import CLIENT_BUCKET, REGION_NAME


def update_client_data(payload: dict) -> dict:
    
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    try:
        response = s3.