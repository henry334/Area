# AREA - Action REAction

## Project Overview

AREA  is a software suite similar to IFTTT and Zapier, designed to automate tasks by connecting different services through triggers and actions. The system allows users to create automated workflows where an event in one service triggers an action in another.

The project is divided into three main components:
1. **Backend Server**: Implements all core features and API endpoints
2. **Web Application**: Provides a browser-based interface
3. **Mobile Application**: Offers the same functionality on mobile devices

## Technologies Used

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Testing**: Jest

### Web Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Testing**: Jest with React Testing Library

### Mobile Frontend
- **Framework**: React Native with Expo
- **Styling**: React Native Elements

### Integrated Services
- Discord
- Google
- Microsoft
- Weather API
- Etherscan

## Features

- User authentication and authorization
- Creation and management of automated tasks
- Integration with multiple third-party services
- Trigger monitoring and action execution
- Admin panel for service management

## Setup and Installation

### Prerequisites
- Node.js (>=14.x)
- MySQL
- Docker (optional)

### Backend Setup
1. Navigate to the Back directory:
   ```bash
   cd Back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file based on the provided example.

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```
   and
   ```bash
   ./setupDb.sh
   ```

5. Start the server:
   ```bash
   npm run start:dev
   ```

### Web Frontend Setup
1. Navigate to the Front/Web directory:
   ```bash
   cd Front/Web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with:
   ```
   NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Mobile Frontend Setup
1. Navigate to the Front/Mobile directory:
   ```bash
   cd Front/Mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Use the Expo Go app on your device or an emulator to run the application.

### Admin Panel Setup
1. Navigate to the Admin directory:
   ```bash
   cd Admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
docker-compose up -d
```

## API Documentation

API documentation is available at:
```
http://localhost:8080/api/docs
```

## Creating New Actions and Triggers

You can extend the platform by adding new services, triggers, and actions by modifying the JSON files located in the `Back/setup` directory:

### Adding a New Service
Edit `Back/setup/services.json` to add a new service with the following structure:
```json
{
    "name": "ServiceName",
    "description": "Description of the service",
    "logo": "URL to service logo",
    "color": "Brand color (hex code)",
    "oauth2url": "OAuth2 redirect URL (if applicable)"
}
```

### Adding a New Trigger
Edit `Back/setup/triggers.json` to add a new trigger with the following structure:
```json
{
    "name": "TriggerName",
    "servicename": "Associated Service Name",
    "func": "./path/to/trigger.trigger",
    "description": "Description of the trigger",
    "toSend": [
        // Configuration fields for the trigger
        // Can include dropdowns, text inputs, etc.
    ]
}
```

### Adding a New Action
Edit `Back/setup/actions.json` to add a new action with the following structure:
```json
{
    "name": "ActionName",
    "servicename": "Associated Service Name",
    "func": "./path/to/action.action",
    "description": "Description of the action",
    "toSend": [
        // Configuration fields for the action
        // Can include dropdowns, text inputs, etc.
    ]
}
```

After adding entries to these JSON files, you'll need to implement the corresponding logic in the backend and restart the server for the changes to take effect.

## Contributors

- [Valentin PY](https://github.com/ValentinPy1)
- Mobile: [Gredzy](https://github.com/gredzy)

## License

This project is licensed under [LICENSE TYPE] - see the LICENSE file for details. 