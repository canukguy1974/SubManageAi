# SubManageAI

SubManageAI is a subscription management application designed to help users track, manage, and optimize their subscriptions. It provides features like subscription tracking, spending analysis, and user authentication.

## Features

- **Subscription Management**: Add, edit, and delete subscriptions.
- **Spending Analysis**: Visualize spending trends with charts and stats.
- **Authentication**: Secure user authentication and session management.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

The project is divided into two main parts:

### Client

The client is a React-based frontend application built with TypeScript and Vite. It includes reusable UI components and pages for various functionalities.

- **Key Directories**:
  - `src/components`: Reusable UI components.
  - `src/pages`: Application pages like Dashboard, Login, and Settings.
  - `src/api`: API service files for interacting with the backend.
  - `src/contexts`: Context providers for global state management.
  - `src/hooks`: Custom React hooks.

### Server

The server is a Node.js application using Express.js and MongoDB for the backend. It handles API requests, authentication, and database interactions.

- **Key Directories**:
  - `routes`: API route handlers.
  - `models`: Mongoose models for database schemas.
  - `services`: Business logic and helper functions.
  - `config`: Configuration files, including database connection.
  - `utils`: Utility functions for authentication and password management.

## Prerequisites

- Node.js (v16 or later)
- MongoDB
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/canukguy1974/SubManageAI.git
   cd SubManageAI
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the `server` directory.
   - Add the following variables:
     ```env
     MONGODB_URI_DEV=<your_mongodb_uri>
     DATABASE_URL=<your_database_url>
     PORT=3000
     ```

## Running the Application

### Using Docker

1. Ensure Docker is installed and running.
2. Run the application:
   ```bash
   docker-compose up
   ```

### Without Docker

1. Start the server:
   ```bash
   cd server
   npm start
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/).
- UI components styled with [Tailwind CSS](https://tailwindcss.com/).
- Charts powered by [Chart.js](https://www.chartjs.org/).
