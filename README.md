# Viasta Product Management Backend

A Django REST API backend for Viasta Product Management system, featuring user authentication, department management, employee management, and leave management.

## Features

- User registration and authentication with JWT tokens
- Custom user model with user types (Admin, Employee)
- Department management
- Employee management with profile pictures
- Leave request system with approval workflow
- RESTful API endpoints

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd myProject
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser (optional):
   ```
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```
   python manage.py runserver
   ```

The API will be available at `http://127.0.0.1:8000/api/`

## Usage

### API Endpoints

#### Authentication
- `POST /api/register/` - Register a new user
  - Body: `{"username": "string", "email": "string", "password": "string", "User_Type": "Admin" or "Employee"}`
- `POST /api/login/` - Login user
  - Body: `{"username": "string", "password": "string"}`
  - Returns: `{"refresh": "token", "access": "token", "user": {...}}`
- `POST /api/logout/` - Logout user (requires authentication)
  - Body: `{"refresh": "token"}`
- `POST /api/token/refresh/` - Refresh access token
  - Body: `{"refresh": "token"}`

#### Models
- CustomUser: Extends Django's AbstractUser with User_Type field
- DepartmentModel: Departments created by users
- EmployeeModel: Employee details linked to departments
- LeaveModel: Leave requests with status tracking

## Testing with Thunder Client

1. Ensure the server is running (`python manage.py runserver`)

2. In VS Code, open Thunder Client extension

3. For registration:
   - Method: POST
   - URL: `http://127.0.0.1:8000/api/register/`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123",
       "User_Type": "Employee"
     }
     ```

4. For login:
   - Method: POST
   - URL: `http://127.0.0.1:8000/api/login/`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```

5. For logout (use access token from login response):
   - Method: POST
   - URL: `http://127.0.0.1:8000/api/logout/`
   - Headers: `Authorization: Bearer <access_token>`
   - Body:
     ```json
     {
       "refresh": "<refresh_token>"
     }
     ```

## Technologies Used

- Django 5.2.5
- Django REST Framework
- Simple JWT for authentication
- SQLite database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request
