# Admin Dashboard - Full Stack React Application

A modern, responsive admin dashboard built with React, Node.js, Express, and MongoDB. Features a comprehensive task management system with analytics, dark mode, and real-time notifications.

## 🚀 Features

### 📊 Dashboard Overview
- **Overview Cards**: Real-time task statistics with responsive design
- **Task Analytics**: Interactive charts showing task completion trends
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

### 📋 Task Management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Status Tracking**: In Progress, Complete, and Closed task states
- **Progress Visualization**: Visual progress bars and completion tracking
- **Due Date Management**: Task deadlines with calendar integration

### 🎯 Goals & Progress
- **Goal Setting**: Create and track project goals
- **Progress Tracking**: Visual progress indicators with circular charts
- **Deadline Management**: Monitor goal deadlines and completion rates

### 📅 Calendar & Meetings
- **Meeting Scheduler**: Create and manage team meetings
- **Calendar Integration**: Visual calendar for event tracking
- **Reminder System**: Set and manage task reminders

### 🌙 Dark Mode
- **Theme Toggle**: Switch between light and dark themes
- **Persistent Settings**: Theme preference saved locally
- **Complete Coverage**: All components support dark mode

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Bootstrap 5** - Responsive CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Chart.js** - Interactive charts and data visualization
- **React Calendar** - Calendar component for date management
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **npm** - Package management

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MuhammadHamidJaved/AdminDashboard-using-mongoDb.git
   cd AdminDashboard-using-mongoDb
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

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dashboard
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dashboard
   ```

5. **Start MongoDB**
   
   For local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas (cloud database)

6. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

7. **Seed the database (optional)**
   
   Visit: `http://localhost:5000/api/seed` to populate with sample data

8. **Access the application**
   
   Open your browser and navigate to: `http://localhost:5173`

## 📊 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Meetings
- `GET /api/meetings` - Get all meetings
- `POST /api/meetings` - Create a new meeting
- `PUT /api/meetings/:id` - Update a meeting
- `DELETE /api/meetings/:id` - Delete a meeting

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create a new goal
- `PUT /api/goals/:id` - Update a goal
- `DELETE /api/goals/:id` - Delete a goal

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create a new reminder
- `PUT /api/reminders/:id` - Update a reminder
- `DELETE /api/reminders/:id` - Delete a reminder

### Calendar Events
- `GET /api/calendar` - Get all calendar events
- `POST /api/calendar` - Create a new event
- `PUT /api/calendar/:id` - Update an event
- `DELETE /api/calendar/:id` - Delete an event

### Analytics & Overview
- `GET /api/analytics` - Get analytics data
- `GET /api/overview` - Get overview statistics
- `POST /api/seed` - Seed database with sample data

## 🎨 Features in Detail

### Responsive Design
- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoint System**: Custom responsive breakpoints for all screen sizes
- **Flexible Layout**: Components adapt to different screen resolutions
- **Touch Friendly**: Mobile-optimized interactions and touch targets

### Dark Mode Implementation
- **Complete Theme**: All components support dark/light theme switching
- **Persistent Preference**: Theme choice saved in localStorage
- **Smooth Transitions**: Animated theme transitions for better UX
- **Accessibility**: High contrast ratios for better readability

### Data Visualization
- **Interactive Charts**: Real-time task analytics with Chart.js
- **Progress Tracking**: Visual progress indicators and completion rates
- **Responsive Charts**: Charts adapt to container size and device orientation

## 🔧 Development

### Available Scripts

**Client (Frontend)**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Server (Backend)**
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
```

### Adding New Features

1. **Frontend Components**: Add new React components in `client/src/components/`
2. **API Endpoints**: Add new routes in `server/index.js`
3. **Database Models**: Create new Mongoose models in `server/models/`
4. **Styling**: Update styles in `client/src/index.css`

## 🚀 Deployment

### Frontend (Vite Build)
```bash
cd client
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend (Node.js)
```bash
cd server
# Set production environment variables
# Deploy to your Node.js hosting service (Heroku, DigitalOcean, etc.)
```

### Database
- **Local**: MongoDB running on your server
- **Cloud**: MongoDB Atlas (recommended for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Muhammad Hamid Javed**
- GitHub: [@MuhammadHamidJaved](https://github.com/MuhammadHamidJaved)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Bootstrap team for the responsive CSS framework
- MongoDB team for the powerful database
- Chart.js team for the data visualization library
- All open-source contributors who made this project possible

**⭐ Star this repository if you found it helpful!**
