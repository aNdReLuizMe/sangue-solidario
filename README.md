# Sangue Solidário

A digital platform designed to encourage and facilitate regular blood donation in Três Lagoas - MS, Brazil. This project is a collaboration between UFMS (Federal University of Mato Grosso do Sul) and Hemosul Três Lagoas, aiming to modernize and streamline the blood donation process through an intuitive and efficient digital platform.

## Project Overview

Sangue Solidário is a React-based web application that allows users to register, schedule blood donation appointments, and manage their donation history. The platform operates entirely on the frontend using localStorage for data persistence, eliminating the need for a backend server during the initial development phase.

### Key Features

- **User Registration and Authentication**: Complete user registration with personal information and blood type
- **Appointment Scheduling**: Interactive calendar interface for booking donation appointments
- **Appointment Management**: Edit, cancel, and track appointment status
- **User Profile**: Comprehensive profile management with donation statistics
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Local Data Storage**: All data persisted locally using browser localStorage

## Technology Stack

- **Frontend**: React 19.1.1 with Vite
- **Styling**: Tailwind CSS 4.1.14
- **Icons**: Font Awesome 6.4.0
- **Build Tool**: Vite 7.1.7
- **Package Manager**: pnpm (recommended)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 16 or higher)
- pnpm package manager

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aNdReLuizMe/sangue-solidario.git
cd sangue-solidario
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
pnpm build
```

### 5. Preview Production Build

```bash
pnpm preview
```

## Application Usage Guide

### First Access - User Registration

1. **Access the Application**: Open your browser and navigate to the application URL
2. **Register Account**: Click on "Cadastre-se" (Register) in the navigation bar
3. **Fill Registration Form**:
   - Complete name
   - Email address
   - Phone number
   - Date of birth
   - Blood type (optional)
   - Password
   - Confirm password
   - Accept terms and conditions
4. **Submit Registration**: Click "Cadastrar" to create your account

### User Authentication

1. **Login**: Click "Login" in the navigation bar
2. **Enter Credentials**: Provide your email and password
3. **Access Dashboard**: Upon successful login, you'll be redirected to the home page

### Scheduling a Blood Donation

1. **Login Required**: You must be logged in to schedule appointments
2. **Click "Agendar Doação"**: Available on the home page or navigation
3. **Select Location**: Choose between:
   - Hemocentro Regional de Três Lagoas
   - Campus UFMS
4. **Choose Date**: Use the interactive calendar (available dates only)
5. **Select Time**: Pick from available time slots (7:00 AM to 12:00 PM)
6. **Notification Preferences**: Configure SMS and email notifications
7. **Confirm Appointment**: Click "Confirmar Agendamento"

### Managing Appointments

#### Viewing Active Appointments

- Active appointments are displayed on the home page
- Shows date, time, location, and notification status

#### Editing Appointments

1. Click the edit icon on your appointment card
2. Modify date, time, location, or notification preferences
3. Click "Salvar Alterações" to save changes

#### Canceling Appointments

1. Click the delete icon on your appointment card
2. Confirm the cancellation in the modal dialog
3. The appointment will be removed from your schedule

### User Profile Management

1. **Access Profile**: Click on your name in the navigation bar, then select "Perfil"
2. **Update Information**: Modify your personal details
3. **View Statistics**: See your donation count, lives saved, and appointment history
4. **Save Changes**: Click "Salvar Alterações" to update your profile

## Data Storage and Persistence

The application uses browser localStorage to persist user data, including:

- User account information
- Appointment schedules
- Authentication state
- User preferences

**Important Notes:**

- Data is stored locally in your browser
- Clearing browser data will remove all stored information
- Data is not synchronized between different browsers or devices
- Each user must create a new account on each device

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppointmentCard.jsx
│   ├── CustomModal.jsx
│   ├── LoginModal.jsx
│   ├── Navbar.jsx
│   ├── ProfileModal.jsx
│   ├── RegisterModal.jsx
│   └── ScrollToTop.jsx
├── contexts/           # React Context providers
│   └── AuthContext.jsx
├── pages/              # Main application pages
│   ├── About.jsx
│   ├── Appointment.jsx
│   ├── Contact.jsx
│   └── Home.jsx
├── App.jsx             # Main application component
├── App.css             # Application styles
├── index.css           # Global styles and Tailwind imports
└── main.jsx            # Application entry point
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Browser Compatibility

The application is compatible with modern browsers that support:

- ES6+ JavaScript features
- CSS Grid and Flexbox
- localStorage API
- React 19

## Development Notes

### Frontend-Only Architecture

This application operates entirely on the frontend without requiring a backend server. Key considerations:

- **Data Persistence**: Uses browser localStorage for data storage
- **Authentication**: Simulated authentication system
- **State Management**: React Context API for global state
- **Routing**: Single-page application with conditional rendering

### Future Backend Integration

The current architecture is designed to easily integrate with a backend API in the future. The data models and user flows are structured to support:

- RESTful API integration
- Real authentication with JWT tokens
- Database persistence
- Multi-device synchronization

## Contributing

This project is part of an academic extension project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive free software license that allows users to:

- Use the software for any purpose
- Modify the software
- Distribute the software
- Distribute modified versions of the software

## Acknowledgments

Developed by [André Luiz](https://www.linkedin.com/in/andreluizme/), an Information Technology undergraduate at the Federal University of Mato Grosso do Sul (UFMS).
