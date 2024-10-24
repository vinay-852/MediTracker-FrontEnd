
# MediTracker

MediTracker is a web application that assists users in managing their medication schedules and logging their medicine intake. It features an intuitive interface for scheduling, logging, and viewing medication records.

## Features

- **User Authentication**: Secure login and registration.
- **Medicine Scheduling**: Schedule medication times for various compartments.
- **Medicine Logging**: Log medicine intake with timestamps.
- **User Logs**: Access logs of medicine intake.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/meditracker.git
    cd meditracker
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

- **Home Page**: The main landing page.
- **Register**: Create a new account.
- **Login**: Access an existing account.
- **Schedule**: Manage medication schedules.
- **Logger**: Log medicine intake.
- **Dashboard**: View logs of medicine intake.

## API Integration

The application uses Axios to communicate with the backend API. The base URL is set in [`src/api.js`](src/api.js).

## Components

- **PrivateRoute**: Protects routes that require authentication.
- **Layout**: Common layout for different pages.
- **Header**: The application's header.
- **ResetLogsButton**: Button to reset logs.

## Pages

- **HomePage**: The main landing page.
- **Register**: User registration page.
- **Login**: User login page.
- **Schedule**: Manage medication schedules.
- **UserLogger**: Log medicine intake.
- **UserLogs**: View logs of medicine intake.

## Testing

Run tests with:
```sh
npm test
```

## Build

Build the project for production with:
```sh
npm run build
```

## Deployment

The frontend is deployed at [MediTracker Frontend](https://meditracker-feaj.onrender.com).

The backend repository is available at [MediTracker Backend](https://github.com/vinay-852/MediTracker-Backend) and is deployed at [MediTracker Backend Deployment](https://meditracker-backend.onrender.com).

## License

This project is licensed under the MIT License.
