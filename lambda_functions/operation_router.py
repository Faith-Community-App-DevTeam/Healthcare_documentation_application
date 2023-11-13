from create import create_user, create_client, create_document
from retrieve import get_user, user_login, get_client, get_user_client_list



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
    elif operation == "user_login":
        return lambda payload: user_login(payload)
    elif operation == "get_client":
        return lambda payload: get_client(payload)
    elif operation == "get_user_client_list":
        return lambda payload: get_user_client_list(payload)
    elif operation == "create_document":
        return lambda payload: create_document(payload)
    else:
        return unrecognized_payload