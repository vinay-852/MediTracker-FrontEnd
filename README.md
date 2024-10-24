
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
  <img width="1437" alt="Screenshot 2024-10-24 at 12 37 35 PM" src="https://github.com/user-attachments/assets/0ea73876-8418-47c1-8e5e-03b64b2d3cd9">
- **Register**: Create a new account.
  <img width="1440" alt="Screenshot 2024-10-24 at 12 28 53 PM" src="https://github.com/user-attachments/assets/cb98c64b-48b7-4ece-a445-ccf6eef1aceb">
- **Login**: Access an existing account.
  <img width="1440" alt="Screenshot 2024-10-24 at 12 27 19 PM" src="https://github.com/user-attachments/assets/df2459d5-e677-47ba-85fa-c30f8dad602b">


- **Schedule**: Manage medication schedules.
  <img width="1440" alt="Screenshot 2024-10-24 at 12 33 48 PM" src="https://github.com/user-attachments/assets/a1746a9e-1769-447f-af42-a7cd7d73a2f2">
- **Dashboard**: View logs of medicine intake.
  <img width="1440" alt="Screenshot 2024-10-24 at 12 35 20 PM" src="https://github.com/user-attachments/assets/99111011-b884-4399-aaf2-9eabcaee4951">


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
