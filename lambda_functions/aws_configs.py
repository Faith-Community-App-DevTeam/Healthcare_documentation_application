CLIENT_BUCKET = f"fcn-clients"
USER_BUCKET = f"fcn-users"
REGION_NAME = "us-east-1"

CLIENT_DATA = {
        "client_id": "",
        "picture": "",
        "first_name": "",
        "last_name": "",
        "dob": "",
        "gender": "",
        "address": "",
        "phone_number": "",
        "email": "",
        "emergency_contact": "",
        "emergency_phone_number":"",
        "occupation": "",
        "ethnicity": "",
        "race": "",
        "weight": "",
        "height": "",
        "bmi": "", 
        "a1c": "",
        "primary_physician_name": "",
        "primary_physician_number": "",
        "insurance": "",
        "medications": [],
        "comments": "",
        "referral": "",
        "enrolled_by": "",
        "private": True
}

USER_DATA = {
        "user_id": "",
        "username": "",
        "password": "",
        "token": "",
        "first_name": "",
        "last_name": "",
        "address": "",
        "phone_number": "",
        "license_state": "",
        "license_number": "",
        "include_in": {
            "doc_comm": "",
            "net_comm": "",
            "group_comm": ""
        },
        "network_id": "none",
        "church_id": "none",
        "automate": {
            "reporting": "",
            "net_reporting": ""
        },
        "health_minister": {
            "id": "",
            "name": "",
            "address": "",
            "phone_number": "",
            "email": ""
        },
        "clients": [],
        "printer_set_up": "",
        "role": "",
        "permissions": {
            "create": {
                "network": "",
                "nurse": "",
                "health_minister": "",
                "comm": ""
            }
        }
}

NETWORK_DATA = {
        "church_list": [],
        "date": "",
        "id": "",
        "name": "",
        "address": "",
        "phone_number": "",
        "email": "",
        "include_in": {
            "doc_comm": "", "#comment": "all values in this dict must be yes or no",
            "net_comm": "",
            "sys_comm": "",
            "group_comm": ""
        },
        "automate": {
            "net_reporting": "",
            "sys_reporting": ""
        },
        "create_net_comm": "", "#comment": "not sure what this is",
        "type": "", "#comment": "must be meeting or appointment",
        "send_date_time": "",
        "printer_set_up" : "",
        "#comment": "unsure if permissions, type are necessesary"
    
}

ENTRY_DATA = {
    "entry_number": "1",
    "service_type": "",
    "number_of_people": "",
    "service_time": "",
    "comments": ""
}