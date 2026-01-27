# Repositório LMAC e MMAC

A full-stack web application for managing and accessing the LMAC and MMAC repository, integrated with IST's Fenix authentication system and MEGA cloud storage.

## Overview

This application provides a user-friendly interface for browsing, searching, downloading, and uploading files stored in a MEGA cloud repository. It features secure authentication through IST Fenix OAuth and is specifically designed for the LMAC and MMAC academic community.

## Features

- **Fenix Authentication**: Secure login using Instituto Superior Técnico's Fenix OAuth system
- **File Browser**: Navigate through folders in the MEGA repository with an intuitive interface
- **Search Functionality**: Search for files and folders across the entire repository
- **File Download**: Download files directly from the MEGA cloud storage
- **File Upload**: Upload PDF files to the repository's Upload folder
- **Session Management**: Automatic re-authentication after one-hour sessions
- **Responsive Design**: Modern React-based UI with smooth navigation

## Tech Stack

### Frontend (Client)
- **React** 19.1.1 - UI framework
- **React Router DOM** 7.8.2 - Client-side routing
- **Axios** 1.11.0 - HTTP client
- **React Icons** 5.5.0 - Icon library

### Backend (Server)
- **Node.js** with Express 5.1.0 - Server framework
- **MEGA.js** 1.3.9 - MEGA cloud storage integration
- **Multer** 2.0.2 - File upload handling
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.2 - Environment variable management

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/     # React components (Header, Navbar, Main, etc.)
│   │   ├── App.jsx         # Main app component with routing
│   │   └── index.jsx       # Application entry point
│   ├── build/              # Production build
│   └── Dockerfile          # Client containerization
├── server/                 # Express backend API
│   ├── index.js            # Main server file with API routes
│   └── Dockerfile          # Server containerization
└── Dockerfile              # Root Docker configuration
```

## API Endpoints

### File Management
- `GET /list?path=<path>` - List contents of a folder
- `GET /search?q=<query>` - Search for files/folders by name
- `GET /download?path=<path>` - Download a file
- `POST /upload` - Upload a PDF file (multipart/form-data)

### Authentication
- `POST /api/auth/fenix` - Exchange Fenix OAuth code for access token
- `GET /api/fenix/person` - Fetch authenticated user information

## Environment Variables

### Server (.env)
```
MEGA_EMAIL=<your-mega-email>
MEGA_PASSWORD=<your-mega-password>
CLIENT_ID=<fenix-oauth-client-id>
CLIENT_SECRET=<fenix-oauth-client-secret>
REDIRECT_URI=<oauth-redirect-uri>
PORT=8080
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MEGA account with repository access
- Fenix OAuth credentials

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/nmath-ist/RepositorioNMATH.git
cd RepositorioNMATH
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment variables**
Create a `.env` file in the `server` directory with the required variables

5. **Run the backend**
```bash
cd server
npm start
```

6. **Run the frontend**
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Docker Deployment

The application includes Dockerfiles for containerized deployment. Both client and server can be built and deployed independently using Docker.

## Authentication Flow

1. User visits the application
2. Redirected to Fenix OAuth authentication
3. User authorizes the application
4. Receives authorization code
5. Backend exchanges code for access token
6. User information fetched from Fenix API
7. Session maintained for one hour before re-authentication

## File Upload Policy

- Only PDF files are accepted for upload
- Files are uploaded to the `Repositório LMAC e MMAC/Uploads` folder
- File size limits apply based on server configuration

## Author

João Cordeiro

## License

ISC
