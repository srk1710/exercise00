# exercise00

## Overview

This project is a web application with two apps featuring a grid generator, payment management, and real-time synchronization. The system is built using **Node.js**, **React**, **MongoDB**, and **WebSockets**. It employs a modular structure and automated CI/CD pipelines for deployment.

---

## Technologies

### Backend

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling API routes.
- **MongoDB**: NoSQL database for storing payment data.
- **Mongoose**: ODM library for interacting with MongoDB.
- **WebSockets**: Real-time communication for live updates.
- **JWT**: Authentication mechanism for secure WebSocket connections.

### Frontend

- **React**: JavaScript library for building the frontend UI.
- **WebSockets**: Real-time updates for new payments.

### DevOps and CI/CD

- **GitHub Actions**: CI/CD pipelines for automated testing and deployment.
- **Docker**: Containerization for backend and frontend apps.
- **Self-Hosted Runner**: Local runner for executing CI/CD workflows.

---

## Scripts Overview

### Backend (`apps/be/package.json`)

- **`npm install`**: Install dependencies.  
- **`npm run lint`**: Lint the codebase.
- **`npm run dev`**: Start the backend development server.  
- **`npm run build`**: Build the backend code (TypeScript to JavaScript).  
- **`npm start`**: Start the backend server.  

### Frontend (`apps/fe/package.json`)

- **`npm install`**: Install dependencies.  
- **`npm run lint`**: Lint the codebase.
- - **`npm start`**: Start the frontend development server.  
- **`npm run build`**: Build the React app for production.  

---

## Setup and Running the Project

### Prerequisites

- **Node.js** (LTS version)  

### Step-by-Step Guide (Development)

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:srk1710/exercise00.git
   cd exercise00
   ```

2. **Backend Setup**:

   ```bash
   cd apps/be
   npm install
   npm dev
   ```

3. **Frontend Setup**:

   ```bash
   cd apps/fe
   npm install
   npm start
   ```

4. **Access the Application**:

   - **Frontend**: `http://localhost:8080`  
   - **Backend API**: `http://localhost:3000/api`  

---

## Branch Schema

The project follows a structured branch schema for feature development and deployment.

- **`main`**: The stable version of the codebase.  
- **`feat/generator`**: Implements the grid generator feature.  
- **`feat/payments`**: Adds payment management functionality.  
- **`feat/real-time-sync`**: Introduces real-time updates with WebSockets.  
- **`feat/operations`**: Combines all features and includes CI/CD workflows.  

### Latest Version

To get the latest version of the project, switch to the `feat/operations` branch:

```bash
git checkout feat/operations
```

---

## Deployment

### Automated Deployment Workflow

The deployment process is automated via GitHub Actions:

- **Backend and Frontend Deployment**:  
  - **Trigger**: A push to the `production` branch with changes in `apps/be/**` or `apps/fe/**` paths.  
  - **Process**:  
    - Lint, build, and package the application into Docker containers.  
    - Deploy the containers using a self-hosted runner.  

### Deploying to Production

To deploy the latest changes:

1. **Merge Changes into `production`**:

   ```bash
   git checkout production
   git merge feat/operations
   git push origin production
   ```

2. The GitHub Actions workflow will automatically handle the deployment.

