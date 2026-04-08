# Student Health & Wellness App

A modern, AI-powered web application designed to support student mental health and wellness. Built with React, Vite, and styled with custom CSS for a beautiful, responsive user experience.

## Features

- **Mental Health Tracking**: Daily mood monitoring with AI-powered insights
- **Wellness Resources**: Curated content including meditation guides and expert articles
- **Instant Support**: 24/7 AI chat assistant and counselor connections
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 with React Router
- **Build Tool**: Vite
- **Styling**: Custom CSS with modern gradients and animations
- **API**: Axios for HTTP requests
- **Development**: ESLint for code quality

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5175](http://localhost:5175) in your browser

## UI Design Highlights

- **Modern Gradient Background**: Calming purple-blue gradient for wellness theme
- **Glassmorphism Navbar**: Semi-transparent navbar with backdrop blur
- **Animated Cards**: Fade-in animations with hover effects
- **Responsive Layout**: Mobile-first design with flexible components
- **Accessible Forms**: Clean, focused input fields with smooth transitions

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx       # Landing page with hero and feature cards
│   ├── Login.jsx      # User authentication
│   └── Register.jsx   # User registration
├── services/
│   ├── api.js         # API configuration
│   └── authService.js # Authentication logic
├── utils/
│   └── errorHandler.js # Error handling utilities
├── App.jsx            # Main app component with routing
├── main.jsx           # App entry point
└── styles.css         # Global styles and component styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
