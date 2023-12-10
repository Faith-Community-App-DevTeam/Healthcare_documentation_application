import json
import boto3
import botocore
import hashlib
import random
from aws_configs import CLIENT_BUCKET, USER_BUCKET, REGION_NAME, CLIENT_DATA, USER_DATA, NETWORK_DATA, ENTRY_DATA
from retrieve import get_all_users_as_list, get_role

#setup for finding one user
FILE_MAPPING = {
    "user": 'user_list.json',
    'client': 'client_list.json',
    "network": "network_list.json",
    "report": "monthly_report_list.json"
}

BUCKET_MAPPING = {
    "user": USER_BUCKET,
    'client': CLIENT_BUCKET,
    "document": CLIENT_BUCKET,
    "network": USER_BUCKET,
    "report": USER_BUCKET
}

VALIDATION_MAPPING = {
    "user": lambda payload: validate_new_user(payload),
    "client": lambda payload: validate_new_client(payload)
}

FORMAT_MAPPING = {
    "user": lambda payload: format_user_data(payload, USER_DATA),
    "client": lambda payload: format_client_data(payload, CLIENT_DATA),
    "network": lambda payload: format_network_data(payload, NETWORK_DATA),
}

def validate_new_user(payload: dict) -> dict:
    '''
        function makes sure this user does not already exist by username
    '''
    print("validate the new user")
    user_list = get_all_users_as_list()
    #print("Ayooo")
    if payload["username"] in user_list.keys():
        raise Exception("User already exists")
    return encrypt_password(payload)
    
def validate_new_client(payload: dict, client_list: dict, network_id) -> dict:
    '''
        Checks if the client does not exist in the client list 
    '''
    print("Validating new client")
    client_lastname = payload["client_info"]['last_name']
    client_dob = payload["client_info"]['dob']
    
    client_list = client_list[network_id]
    for client in client_list:
        if client_lastname == client['last_name'] and client_dob == client['dob']:
            raise Exception("Client already exists")
    return payload

def encrypt_password(payload: dict):
    '''
    This functions encrypt a user's password before storing it
    '''
    print("encrypting password")
    payload["password"] = hashlib.sha256(bytes(payload["password"], 'utf-8')).hexdigest()
    print('password encrypted')
    return create_token(payload)

def create_token(payload: dict) -> dict:
    print("Creating token")
    token = payload["username"] + payload["password"] + str(random.random())
    payload["token"] = hashlib.sha256(bytes(token, 'utf-8')).hexdigest()
    return payload
    
def create_client_id(payload: dict, client_id_counter: str) -> dict:
    new_client_id = int(client_id_counter) + 1
    #print("payload", payload)
    new_client_id_counter = str(new_client_id)
    new_client_id = str(new_client_id).zfill(6)
    payload["client_info"]["client_id"] = new_client_id
    return payload, new_client_id_counter
    

def format_user_data(payload: dict, default_data) -> dict:
    new_payload = default_data
    new_payload.update(payload)
    return new_payload

def format_client_data(payload: dict, default_data) -> dict:
    new_payload = default_data
    enrolled_by = payload["username"]
    client_info = payload["client_info"]
    new_payload.update(client_info)
    new_payload["enrolled_by"] = enrolled_by
    return new_payload

def format_network_data(payload: dict, default_data) -> dict:
    new_payload = default_data
    network_info = payload["network_info"]
    new_payload.update(network_info)
    return new_payload

    

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
    operation = "user"
    obj_list = {}
    try:
        print("Getting bucket")
        response = s3.Object(BUCKET_MAPPING[operation], FILE_MAPPING[operation]).get()
        #print("response:", response)
        obj_list = json.loads(response['Body'].read())
        #print("list", obj_list)
      
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] != '404':
            #if something else happened for now
            print(error)
            raise Exception(str(error))
        else:
            raise Exception(str(error))
            
    finally:
        payload = VALIDATION_MAPPING[operation](payload)  # validation of objects happens here
        payload = FORMAT_MAPPING[operation](payload)
        keyword = "username"
            
        obj_list[payload[keyword]] = {key:value for key,value in payload.items() if key != keyword}
        
        #dumping user setting into s3 bucket
        try:
            s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(obj_list, indent=2), Key = FILE_MAPPING[operation], ContentType = 'json')
            
            return {
                "success":True,
                "return_payload": {
                    "message": "Operation Success",
                    "token": payload["token"]
                }
            }
            
        except botocore.exceptions.ClientError as error:
            return {
                "success":False,
                "return_payload": {
                    "message": "Operation encountered an client error"
                }
            }
            

def create_client(payload: dict) -> dict:
    '''
        A function that adds new clients to client_list.json
        Each client is tied to a nurse, where each client is grouped by a network and church
        
        payload:
            username: str
            network_id: str or 'none'
            church_id: str or 'none'
            client info: dict of client info
    '''
    #Setting up s3 buckets
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    operation = "client"
    client_list = {}
    
    #attempting to retrieve client list
    try:
        print("Gathering client list")
        response = s3.Object(BUCKET_MAPPING[operation], FILE_MAPPING[operation]).get()
        #print("response:", response)
        client_list = json.loads(response['Body'].read())
        #print("Retrieved client list")
        client_id_counter = client_list["id_counter"]
      
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] != '404':
            #if somehow the bucket does not exist
            print(error)
            raise Exception(str(error))
        else:
            #if anything else happenes
            print(error)
            raise Exception(str(error))
    else:
        print("creating new client")
        
        response = s3.Object(USER_BUCKET, "user_list.json").get()
        user = json.loads(response['Body'].read())[payload["username"]]
    
        network_id = user["network_id"]
        
        if network_id not in client_list.keys():
            client_list[network_id] = []
        
        payload = validate_new_client(payload, client_list, network_id)
        client_info, new_client_id_counter = create_client_id(payload, client_id_counter)
        client_info = FORMAT_MAPPING[operation](payload)
        
        client_list["id_counter"] = new_client_id_counter
        client_list[network_id].append(client_info)
        
        #Attempting to upload newly created client 
        try:
            print("uploading client file")
            s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(client_list, indent=2), Key = FILE_MAPPING[operation], ContentType = 'json')
            print("upload success")
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
                    "message": "Operation encountered an client error: client_list upload failed"
                }
            }
        

def create_document(payload: dict) -> dict:
    """
        A function that creates a json (if not already created) by year.
        appends documents to corresponding list by client_id > month > list_of_documents

        payload:
            username: str
            token: str
            document_info: {
                client_id:
                date:
                document_type:
                ...
            }

        TODO: once we have an update client function, we need to update the clients last_seen variable
        to be the same date as the document
    """
    s3 = boto3.client("s3", region_name  = REGION_NAME)
    operation = "document" 

    date = payload["document_info"]["date"] #yyyy-mm-dd
    year = date[0:4]
    month = date[5:7]
    #print(payload["document_info"]["date"])
    json_name = year + ".json"
    #print("json_name", json_name)
    client_id = payload["document_info"]["client_id"]
    document_info = payload.get("document_info")
    document_info["made_by"] = payload["username"]

    #attempting to retrieve document list
    try:
        print("checking if ", json_name, " exists")
        s3.head_object(Bucket = BUCKET_MAPPING[operation], Key = json_name)
        
        print("Object exists, Gathering document list")
        s3 = boto3.resource("s3", region_name = REGION_NAME)
        response = s3.Object(BUCKET_MAPPING[operation], json_name).get()
        document_list = json.loads(response['Body'].read())
        print("Retrieved document list: ", document_list)
        
        if client_id in document_list: #if client id and month exist, append
            if month in document_list[client_id]: 
                document_list[client_id][month].append(document_info)
            else: 
                document_list[client_id][month] = [document_info]
        else: #if client_id key dne add it
            document_list[client_id] = {
                month: [document_info]
            }
        
        s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(document_list, indent=2), Key = json_name, ContentType = 'json')
        #print("document")
        
        return {
            "success":True,
            "return_payload": {
                "message": "Operation Success"
            }
        }
        
    #if year.json does not exist, create it
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] == '403':
            print("document does not exist. creating document.")
            document_info = {
                client_id: {
                    month: [
                        document_info
                        ]
                }
            }
            
            s3 = boto3.resource("s3", region_name = REGION_NAME)
            s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(document_info, indent=2), Key = json_name, ContentType = 'json')
            print("document created")
            
            return {
            "success":True,
            "return_payload": {
                "message": "Operation Success."
                }
            }
            
        else:
            #if anything else happenes
            print(error)
            raise Exception(str(error))

def create_network(payload: dict) -> dict:
    """
        payload:
            username:
            token:
            network_info:
                network_id

    """
    print("bean")
    role = get_role(payload)
    print(role)
    if get_role(payload)["return_payload"]["role"] != "admin":
        return {
                "success":False,
                "return_payload": {
                    "message": "Must be an admin"
                }
            }
    s3 = boto3.resource("s3", region_name = REGION_NAME)
    operation = "network"
    obj_list = {}
    try:
        print("Getting bucket")
        response = s3.Object(BUCKET_MAPPING[operation], FILE_MAPPING[operation]).get()
        #print("response:", response)
        obj_list = json.loads(response['Body'].read())
        #print("list", obj_list)
      
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] != '404':
            #if something else happened for now
            print(error)
            raise Exception(str(error))
        else:
            raise Exception(str(error))
            
    finally:
        #payload = VALIDATION_MAPPING[operation](payload)  not sure if validation is needed
        payload = FORMAT_MAPPING[operation](payload)
        keyword = payload["name"]
        print(payload)
        print(type(keyword))
        print(obj_list)
        
        obj_list[keyword] = {key:value for key,value in payload.items() if key != keyword}
        print(obj_list)
        
        #dumping user setting into s3 bucket
        try:
            s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(obj_list, indent=2), Key = FILE_MAPPING[operation], ContentType = 'json')
            
            return {
                "success":True,
                "return_payload": {
                    "message": "Operation Success. Network created"
                }
            }
            
        except botocore.exceptions.ClientError as error:
            return {
                "success":False,
                "return_payload": {
                    "message": "Operation encountered an client error"
                }
            }

def create_report(payload: dict) -> dict:
    """
        gathers all of a users documents in a given month and year to create a document summerizing the info
        payload: 
            username:
            token:
            date:

        if documents in given year do not exist an error occurs. TODO catch error and include group documents
    """
    date = payload["date"] #yyyy-mm-dd
    year = date[0:4]
    month = date[5:7]
    username = payload["username"]
    json_name = year + ".json"
    operation = "report"
    s3 = boto3.client("s3", region_name  = REGION_NAME)

    try:
        print("checking if ", json_name, " exists")
        s3.head_object(Bucket = BUCKET_MAPPING["document"], Key = json_name)
        
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] == '403':
            print("documents for year does not exist.")
            
            return {
            "success":False,
            "return_payload": {
                "message": "Operation failes."
                }
            }
            
        else:
            #if anything else happenes
            print(error)
            raise Exception(str(error))
            
    finally:
        print("Object exists, Gathering document list")
        s3 = boto3.resource("s3", region_name = REGION_NAME)
        response = s3.Object(BUCKET_MAPPING["document"], json_name).get()
        document_list = json.loads(response['Body'].read())
        print("Retrieved document list: ", document_list)
        
        user_document_list = []
        client_document_list = {}
        #print(document_list)
        
        for client in document_list: #finding all the documents made by the user by month and year
            client_document_list = document_list.get(client)
            if month in client_document_list.keys():
                client_document_list = client_document_list.get(month)
                for document in client_document_list:
                    if document["made_by"] == username:
                        user_document_list.append(document)
                    
        #print(user_document_list)
        #print(len(user_document_list))
        
        #creating monthly report
        report = {
            "made_by": username,
            "date": date,
            "entry_list": []
        }
        
        i = 0
        for document in user_document_list:
            i = i + 1
            #print(i)
            entry_data = ENTRY_DATA.copy()
            entry_data["entry_number"] = i
            entry_data["service_type"] = "1:1"
            entry_data["number_of_people"] = 1
            if "direct_time" in document.keys():
                entry_data["service_time"] = document["direct_time"]
                #print("yuh")
            else:
                entry_data["service_time"] = "N/A"
            report["entry_list"].append(entry_data)
            
        #print("report:", report)
        
        
        response = s3.Object(BUCKET_MAPPING[operation], FILE_MAPPING[operation]).get()
        report_list = json.loads(response['Body'].read())
        print(report_list)
        
        
        if year not in report_list.keys():
            report_list[year] = {}
        
        if month not in report_list[year]:
            report_list[year][month] = [report]
        else:
            report_list[year][month].append(report)
        print(report_list)
        
        #uploading to s3
        s3.Bucket(BUCKET_MAPPING[operation]).put_object(Body = json.dumps(report_list, indent=2), Key = FILE_MAPPING[operation], ContentType = 'json')
        print(report_list)
        
        
        return {
            "success":True,
            "return_payload": {
                "message": "Operation Success"
            }
        }
        