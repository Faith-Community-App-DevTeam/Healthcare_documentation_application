from create import create_user, create_client, create_document, create_network, create_report
from retrieve import get_user, user_login, get_client, get_user_client_list, get_client_document_list, get_role, get_user_list
from update import update_user_data, update_user_cred, update_client_data, update_user_by_admin
from delete import delete_user, delete_client, delete_user_by_admin




def retrieve_operation(operation: str):
    """
    takes an operation, finds the appropriate function for that operation, then returns
    :param operation: a str that tells this method what function to retrieve
    :return: the function to execute
    """

    unrecognized_payload = lambda x: {
        "success": False,
        "return_payload": {"message": f"the api operation '{operation}' unrecognized"}
    }
    # the wiring between operations and payloads lives in the "gross" list of if then statments below
    # I'd prefer a hash table, but this is probably more reasonable -pp
    print(f'getting result for operation \'{operation}\'')
    if operation == "create_user":
        return lambda payload: create_user(payload)
    elif operation == "create_client":
        return lambda payload: create_client(payload)
    elif operation == "get_user":
        return lambda payload: get_user(payload)
    elif operation == "get_user_list":
        return lambda payload: get_user_list(payload)
    elif operation == "user_login":
        return lambda payload: user_login(payload)
    elif operation == "update_user":
        return lambda payload: update_user_data(payload)
    elif operation == "update_user_by_admin":
        return lambda payload: update_user_by_admin(payload)
    elif operation == "update_username" or operation == "update_password":
        return lambda payload: update_user_cred(payload)
    elif operation == "delete_user":
        return lambda payload: delete_user(payload)
    elif operation == "delete_user_by_admin":
        return lambda payload: delete_user_by_admin(payload)
    elif operation == "get_client":
        return lambda payload: get_client(payload)
    elif operation == "get_user_client_list":
        return lambda payload: get_user_client_list(payload)
    elif operation == 'update_client':
        return lambda payload: update_client_data(payload)
    elif operation == 'delete_client':
        return lambda payload: delete_client(payload)
    elif operation == "create_document":
        return lambda payload: create_document(payload)
    elif operation == "get_client_document_list":
        return lambda payload: get_client_document_list(payload)
    elif operation == "get_role":
        return lambda payload: get_role(payload)
    elif operation == "create_network":
        return lambda payload: create_network(payload)
    elif operation == "create_report":
        return lambda payload: create_report(payload)
    else:
        return unrecognized_payload