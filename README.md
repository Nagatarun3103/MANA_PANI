# MANA_PANI Full-Stack Application

This document provides the instructions to set up and run the MANA_PANI project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Java (JDK 17 or later)**
- **Apache Maven**
- **Node.js and npm**

---

## How to Run the Application

You will need to open **two separate terminal windows** to run both the backend and frontend servers simultaneously.

### Step 1: Run the Backend (Spring Boot)

1.  **Open your first terminal.**
2.  Navigate to the `backend` directory:
    ```sh
    cd MANA_PANI/backend
    ```
3.  Start the Spring Boot application using Maven:
    ```sh
    mvn spring-boot:run
    ```
The backend server will start on `http://localhost:8080`. Leave this terminal running.

---

### Step 2: Run the Frontend (React)

1.  **Open a new, second terminal.**
2.  Navigate to the `frontend` directory:
    ```sh
    cd MANA_PANI/frontend
    ```
3.  Install the necessary Node.js packages (only needs to be done once):
    ```sh
    npm install
    ```
4.  Start the React development server:
    ```sh
    npm run dev
    ```
The terminal will show you a `Local:` URL, which is typically `http://localhost:5173`.

---

### Step 3: Access the Application

1.  Open your web browser and go to the frontend URL (e.g., `http://localhost:5173`).
2.  You will be directed to the login page.

---

### Login Credentials

You can use the pre-configured accounts to log in:

-   **User Role:**
    -   **Username:** `user`
    -   **Password:** `password`

-   **Admin Role:**
    -   **Username:** `GRS`
    -   **Password:** `GRS_Mahi`
