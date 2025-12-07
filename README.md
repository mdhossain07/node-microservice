# Node Microservices Project

This project is a microservices-based application built with Node.js, Express, and Docker. It consists of three main services: User Service, Task Service, and Notification Service, orchestrated using Docker Compose.

## 🏗 Architecture

The system is composed of the following services:

| Service                  | Port   | Description                              | Tech Stack                                      |
| :----------------------- | :----- | :--------------------------------------- | :---------------------------------------------- |
| **User Service**         | `5001` | Manages user data.                       | Node.js, Express, MongoDB                       |
| **Task Service**         | `5002` | Manages tasks and assigns them to users. | Node.js, Express, PostgreSQL, TypeORM, RabbitMQ |
| **Notification Service** | `5003` | Consumes messages to send notifications. | Node.js, Express, RabbitMQ                      |

### Infrastructure

- **MongoDB**: Database for the User Service (Port 27018).
- **PostgreSQL**: Database for the Task Service (Port 5434).
- **RabbitMQ**: Message broker for asynchronous communication (Port 5672, Management: 15672).

## 🚀 Getting Started

Follow these instructions to set up and run the project using Docker.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop).

### Installation & Setup

1.  **Clone the repository** (if not already done).

2.  **Environment Setup**:
    You need to create a `.env` file in each service directory with the correct configuration.

    **User Service (`./user-service/.env`)**

    ```env
    PORT=5001
    # Connects to the 'mongo' container defined in docker-compose
    MONGODB_URI=mongodb://mongo:27017/user_db
    ```

    **Task Service (`./task-service/.env`)**

    ```env
    PORT=5002

    # Postgres Configuration (Matches docker-compose values)
    DB_HOST=postgres
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=task_service_db

    # RabbitMQ Configuration
    RABBITMQ_CONNECTION_URI=amqp://rabbitmq:rabbitmq@rabbitmq:5672
    ```

    **Notification Service (`./notification-service/.env`)**

    ```env
    PORT=5003

    # RabbitMQ Configuration
    RABBITMQ_CONNECTION_URI=amqp://rabbitmq:rabbitmq@rabbitmq:5672
    ```

3.  **Build and Run**:
    Run the following command from the root directory to build the images and start the containers.

    ```bash
    docker-compose up --build
    ```

    _Use `docker-compose up -d` to run in detached mode._

4.  **Verify Services**:
    - **User Service**: [http://localhost:5001](http://localhost:5001)
    - **Task Service**: [http://localhost:5002](http://localhost:5002)
    - **Notification Service**: [http://localhost:5003](http://localhost:5003)
    - **RabbitMQ Management**: [http://localhost:15672](http://localhost:15672) (User: `rabbitmq`, Pass: `rabbitmq`)

## 🛠 Troubleshooting

- **Database Connection Errors**: Ensure the database containers (`mongo`, `postgres`) are healthy and fully started before the services try to connect. Docker Compose `depends_on` handles startup order but applications might need retry logic (which is implemented in the services).
- **Port Conflicts**: Ensure ports `5001`, `5002`, `5003`, `5434`, `27018`, and `5672` are not occupied on your host machine.
- **Environment Variables**: Double-check that your `.env` files are in the correct directories and have valid values.

## 📝 API Usage

Each service runs on its specific port. You can interact with them via HTTP requests (using Postman, curl, etc.).

- **User Service**: `http://localhost:5001`
- **Task Service**: `http://localhost:5002`
- **Notification Service**: `http://localhost:5003`
