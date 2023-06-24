
# UnifiedAuth

UnifiedAuth is an Express.js application designed to provide a unified login experience by integrating multiple authentication methods. Users can log in using Google OAuth2, a One-Time Password sent to their email, or even Ethereum (bonus feature), with the ability to connect multiple accounts under a single profile.

## Key Features

- Google OAuth2 Integration: Allows users to log in using their Google accounts.
- One-Time Password (OTP) Authentication: Users can log in using a unique OTP sent to their email.
- JSON Web Tokens (JWT): Upon successful login, a JWT is issued to the user for maintaining a stateless session.
- Authenticated Endpoint: A protected endpoint ('/me') which returns information about the currently logged-in user. It requires a valid JWT to access.
- Logout Functionality: Users can log out, which invalidates their JWT.
- Ethereum Sign-In Integration (Bonus): An additional method of login.

## Project Objectives

1. Setting up an Express.js application and installing necessary dependencies.
2. Storing sensitive information in environment variables.
3. Integrating Google OAuth2 for user authentication.
4. Implementing OTP login functionality.
5. Issuing and managing JWTs for authenticated users.
6. Implementing logout functionality.
7. Creating authenticated endpoint for retrieving user information.
8. Database integration to store and manage user information.
9. Enabling users to connect multiple accounts under a single profile.
10. Ethereum sign-in integration (Bonus).

## Getting Started

TBD