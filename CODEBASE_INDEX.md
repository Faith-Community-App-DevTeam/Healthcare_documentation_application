# Healthcare Documentation Application - Codebase Index

## Project Overview
A healthcare documentation application (FCN App) built with React frontend and AWS Lambda backend. The application manages users, clients, documents, networks, and monthly reports for a faith community healthcare organization.

---

## In Layman's Terms: What Is This App?

### The Simple Explanation

**What it is:** This is a digital record-keeping system designed specifically for faith community healthcare organizations (like churches that provide health services to their members and community).

**Think of it like:** A digital filing cabinet and notebook combined. Instead of keeping paper files for patients, writing notes in notebooks, and storing everything in physical folders, healthcare workers can do all of this on their computer or tablet.

### Who Uses It?

- **Nurses and healthcare workers** who provide services at faith community locations
- **Administrators** who manage patient records and oversee operations
- **Healthcare volunteers** who help with documentation

### What Can They Do?

1. **Keep Track of Patients (Clients)**
   - Add new patients to the system
   - View all patients they're responsible for
   - Update patient information when needed
   - See patient history and documents

2. **Document Healthcare Visits**
   - Record what happened during a patient visit
   - Fill out forms like blood pressure reports, foot clinic notes, care notes, and interaction logs
   - Store these documents so they can be referenced later

3. **Organize by Networks**
   - Group users and patients by "networks" (like different church locations or regions)
   - Keep patient information organized and accessible only to the right people

4. **Create Monthly Reports**
   - Generate reports summarizing activities and patient care for a given month

5. **Manage User Accounts**
   - Administrators can add new users (nurses, healthcare workers)
   - Assign people to different networks
   - Control who has access to what information

### Real-World Example

Imagine a church that runs a free health clinic once a week. A nurse named Sarah uses this app to:
- Check in patients as they arrive
- Record their blood pressure readings
- Write notes about what she discussed with them
- Create a monthly report showing how many people were served

All of this information is stored securely online, so Sarah and other authorized staff can access it later to see a patient's history or prepare reports for the church leadership.

### Key Features

- **Secure Login**: Only authorized people can access patient information
- **Easy to Use**: Simple forms and screens for entering information
- **Organized**: Everything is filed and searchable
- **Secure**: Patient information is kept private and only visible to authorized staff in the same network
- **Accessible**: Can be used from any computer or tablet with internet access

### In Summary

This app helps faith community healthcare organizations keep track of the people they serve and the care they provide, all in one organized, secure, digital system. It replaces paper records with an easy-to-use computer system that makes documentation faster and more reliable.

---

## Technology Stack
- **Frontend**: React 18.2.0, React Router DOM, Bootstrap 5.3.2, Sass
- **Backend**: AWS Lambda (Python), AWS S3
- **Build Tool**: Create React App (react-scripts)
- **Deployment**: GitHub Pages

---

## Project Structure

### Root Directory
```
Healthcare_documentation_application/
├── lambda_functions/        # AWS Lambda backend code
├── src/                     # React frontend source code
├── public/                  # Static assets
├── node_modules/           # Node.js dependencies
├── package.json            # Frontend dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── lambda_functions.zip    # Packaged Lambda functions
└── README.md               # Project documentation
```

---

## Backend (AWS Lambda Functions)

### Location: `lambda_functions/`

#### Core Files

**`lambda_function.py`**
- Main Lambda handler entry point
- Handles authentication (username/password and token verification)
- Routes operations to appropriate functions via `operation_router.py`
- Returns HTTP responses with status codes and payloads

**`operation_router.py`**
- Maps operation strings to their corresponding CRUD functions
- Supported operations:
  - User: `create_user`, `get_user`, `user_login`, `update_user`, `update_user_by_admin`, `update_username`, `update_password`, `delete_user`, `delete_user_by_admin`, `get_user_list`
  - Client: `create_client`, `get_client`, `get_user_client_list`, `update_client`, `delete_client`
  - Document: `create_document`, `get_client_document_list`
  - Network: `create_network` (Note: Network CRUD exists but not fully wired in router)
  - Report: `create_report`
  - Role: `get_role`

**`aws_configs.py`**
- AWS configuration constants (REGION_NAME, bucket names)

#### CRUD Modules

**`create.py`**
- `create_user()` - Create new users
- `create_client()` - Create new clients
- `create_document()` - Create new documents
- `create_network()` - Create new networks
- `create_report()` - Create monthly reports

**`retrieve.py`**
- `get_user()` - Retrieve user data
- `get_user_list()` - Get all users
- `user_login()` - Authenticate and return user token
- `get_client()` - Retrieve client data
- `get_user_client_list()` - Get all clients for a user's network
- `get_client_document_list()` - Get all documents for a client
- `get_role()` - Get user role information
- `get_all_users_as_list()` - Helper function to retrieve all users

**`update.py`**
- `update_user_data()` - Update user profile data
- `update_user_cred()` - Update username or password
- `update_user_by_admin()` - Admin-only user updates
- `update_client_data()` - Update client information

**`delete.py`**
- `delete_user()` - Delete user (self-service)
- `delete_user_by_admin()` - Admin-only user deletion
- `delete_client()` - Delete client records

**`init.py`**
- Initialization/utility functions

---

## Frontend (React Application)

### Location: `src/`

#### Entry Points

**`index.js`**
- React application entry point
- Sets up React Router with HashRouter
- Imports global styles (custom.scss)
- Routes to App component

**`App.js`**
- Main application component
- Sets up React Router Routes
- Manages UserContext for authentication state
- Routes:
  - `/` - Home page
  - `/login` - Login page (hasAccount={true})
  - `/register` - Registration page (hasAccount={false})
  - `/dashboard` - Main dashboard
  - `/client` - Client detail page
  - `/new-encounter` - Create new encounter/documentation

**`App.css`** - Application-level styles

**`index.css`** - Global CSS styles

**`custom.scss`** - Custom SCSS styles

---

### Pages (`src/pages/`)

**`home/Home.jsx`** + **`home/home.css`**
- Landing page/homepage
- Entry point for unauthenticated users

**`login/Login.jsx`** + **`login/login.css`**
- Handles both login and registration based on `hasAccount` prop
- Authentication form
- Test credentials: test_admin, test_user1, test_user2, test_user3 (password: "password")

**`dashboard/Dashboard.jsx`** + **`dashboard/dashboard.css`**
- Main application dashboard after login
- Displays user's client list and network information
- Uses `data.json` for dashboard data structure

**`client/Client.jsx`**
- Individual client detail view
- Shows client information and associated documents

**`new-encounter/NewEncounter.jsx`**
- Page for creating new encounter documentation
- Contains `OneToOneIntForm.jsx` for one-on-one interaction forms

**`new-encounter/OneToOneIntForm.jsx`**
- Form component for one-on-one interaction documentation

---

### Components (`src/components/`)

#### Navigation & Layout

**`topbar/Topbar.jsx`** + **`topbar/topbar.css`**
- Top navigation bar component
- User menu and navigation links

**`sidebar/Sidebar.jsx`**
- Main sidebar navigation component

**`sidebar/ClientSidebar.jsx`**
- Sidebar specifically for client-related views

#### Forms & Inputs

**`forms/NewClientForm.jsx`**
- Form for creating new clients
- Handles client data input and submission

#### Data Display

**`patientCard/PatientCard.jsx`**
- Component to display patient/client card information
- Used in lists and grids

#### Authentication & Context

**`userContext/userContext.jsx`**
- React Context for managing user authentication state
- Provides: username, token, isLoggedIn
- Exported as UserContext for use throughout app

**`logout/LogoutButton.jsx`**
- Button component for logging out users

#### Utilities

**`functions/apiRequest.jsx`**
- Centralized API request function
- Handles communication with AWS Lambda backend
- Manages request/response formatting

---

### Constants (`src/constants/`)

#### Client Data
**`clients/client_list.json`**
- Example structure of client data organized by network_id
- Note: Originally planned to include church_id layer (removed for time constraints)

#### Document Templates
**`docs/bp_report.json`** - Blood pressure report template
**`docs/client_care_notes.json`** - Client care notes template
**`docs/document_list.json`** - Document listing structure
**`docs/foot_clinic_notes.json`** - Foot clinic documentation template
**`docs/monthly_report.json`** - Monthly report template
**`docs/nurse_interaction_log.json`** - Nurse interaction log template

#### System Data
**`sys/user_list.json`** - User data structure example
**`sys/network_list.json`** - Network data structure example

#### Other
**`payload_examples.txt`** - Example payloads for API requests

---

### Assets (`src/assets/`)

**`homepage-photo.jpg`** - Homepage background/image
**`LogoRed(1).png`** - Application logo

---

### Public Assets (`public/`)

**`index.html`** - HTML entry point
**`manifest.json`** - Web app manifest
**`favicon.ico`** - Site favicon

---

## Features & Functionality

### Implemented (Full CRUD)
✅ Users - Create, Read, Update, Delete
✅ Clients - Create, Read, Update, Delete
✅ Documents - Create, Read
✅ Networks - Create (CRUD exists but not fully wired)

### Partially Implemented
⚠️ Monthly Reports - Create only (Read, Update, Delete not implemented)
⚠️ Networks - CRUD functions exist but not in operation_router

### Not Implemented
❌ Church CRUD - Planned but not implemented (layer removed from client structure)
❌ User-to-user communication
❌ Client photo assignment
❌ Network operations in frontend (missing from operation_router)

---

## Security Notes

⚠️ **Important Security Issue**: Newly created users are automatically assigned to "none" network. If a client is created by someone in the "none" network, all newly created users can see that client. This could allow unauthorized access. Users should be assigned to a network before creating clients.

---

## Testing Credentials

The following test accounts are available in the testing environment:
- Username: `test_admin`, Password: `password`
- Username: `test_user1`, Password: `password`
- Username: `test_user2`, Password: `password`
- Username: `test_user3`, Password: `password`

---

## Build & Deployment

### Development
```bash
npm start
```
Starts development server (typically on port 3000)

### Production Build
```bash
npm run build
```
Creates optimized production build

### Deploy to GitHub Pages
```bash
npm run deploy
```
Builds and deploys to GitHub Pages (configured in package.json homepage field)

---

## Backend Architecture

The backend follows a Lambda function pattern where:
1. Request comes to `lambda_function.py`
2. Operation is extracted from event
3. Authentication is verified (password or token)
4. Operation router maps operation to appropriate CRUD function
5. Function executes and returns response
6. Response is formatted and returned with appropriate HTTP status code

Data storage is handled via AWS S3 buckets:
- User data stored in `USER_BUCKET` (configured in aws_configs.py)
- Client, document, network data stored in respective S3 buckets

---

## Data Flow

1. Frontend makes API request via `apiRequest.jsx`
2. Request sent to AWS Lambda function
3. Lambda handler authenticates request
4. Operation router determines which function to call
5. CRUD function reads/writes to S3
6. Response returned to frontend
7. Frontend updates UI based on response

---

## Key Dependencies

### Frontend
- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.17.0
- bootstrap ^5.3.2
- sass ^1.69.4
- react-scripts 5.0.1

### Backend (Python)
- boto3 (AWS SDK)
- Standard library: json, hashlib

---

## File Count Summary

- **Python Files**: 8 (all in lambda_functions/)
- **React Components (JSX)**: 14
- **Page Components**: 6
- **JSON Data Files**: 10
- **CSS/SCSS Files**: 5
- **Configuration Files**: 3 (package.json, manifest.json, README.md)

---

## Future Improvements Needed

1. **Security**: Fix "none" network issue to prevent unauthorized client access
2. **Network Operations**: Wire network CRUD operations into operation_router
3. **Church Layer**: Implement church CRUD and integrate into client structure
4. **Monthly Reports**: Complete RUD operations for monthly reports
5. **Communication**: Implement user-to-user communication features
6. **Photos**: Add client photo assignment functionality
7. **Hosting**: Move from GitHub Pages to proper domain
8. **Network Router**: Add network operations to frontend-accessible router

---

## Notes

- The application uses HashRouter instead of BrowserRouter (likely for GitHub Pages compatibility)
- All passwords are hashed using SHA-256 before storage
- Token-based authentication used for API requests after initial login
- Client data structure originally planned to be: network_id > church_id > clients, but church layer was removed
