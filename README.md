# Course Fellows

Course Fellows is a modern web application that helps users organize and manage their learning journey by creating structured courses from YouTube playlists. Course Fellows helps you track your progress and organize content into manageable chapters. Support for individual videos is planned for future implementation.

## 🚀 Features

- **Course Management**

  - Create courses from YouTube playlists (individual videos support coming soon)
  - Organize videos into logical chapters
  - Track watched/unwatched status of videos
  - Delete courses when no longer needed

- **Learning Experience**

  - Structured learning path with organized content
  - Progress tracking for each video
  - Custom video player interface
  - Chapter-based navigation

- **User System**
  - Secure authentication
  - Personalized course library
  - Individual progress tracking

## 🛠 Tech Stack

- **Frontend**

  - Next.js 15.3.2 (App Router)
  - React
  - TypeScript
  - SCSS Modules for styling
  - TanStack Query (React Query) for data management

- **Backend**

  - Next.js API Routes
  - PostgreSQL Database
  - Prisma ORM
  - NextAuth.js for authentication

- **External Services**
  - YouTube Data API for video/playlist fetching

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- YouTube API Key

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/course-fellows"

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# YouTube API
YOUTUBE_API_KEY="your-youtube-api-key"
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/course-fellows-v2.git
   cd course-fellows-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   npx prisma migrate dev
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🐳 Docker Support

The application includes Docker support for easy deployment:

1. **Build the image**

   ```bash
   docker build -t course-fellows .
   ```

2. **Run with docker-compose**
   ```bash
   docker-compose up -d
   ```

## 📚 Database Schema

### Core Models

- **Course**

  - Represents a learning course
  - Can be created from a YouTube playlist or individual video
  - Contains videos and chapters

- **CourseVideo**

  - Individual video within a course
  - Tracks watch status and duration
  - Can be part of a chapter

- **CourseChapter**
  - Organizational unit within a course
  - Contains multiple videos
  - Helps structure the learning content

### Authentication Models

- **User**

  - Core user information
  - Linked to courses and authentication data

- **Account**

  - OAuth account information
  - Supports multiple authentication providers

- **Session**
  - User session management
  - Handles authentication state

## 🔒 Authentication

The application uses NextAuth.js for authentication, supporting:

- Secure session management
- Multiple OAuth providers (configurable)
- Email verification
- Session persistence

## 📁 Project Structure

```
course-fellows-v2/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main route group
│   ├── (watch)/           # Watch route group
│   ├── api/               # API routes
│   ├── components/        # Shared components
│   ├── hooks/             # Custom React hooks
│   ├── screens/           # Page-specific components
│   └── utils/             # Utility functions
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🛡 Security

- Secure authentication with NextAuth.js
- API route protection
- Database relation security with cascading deletes
- Environment variable protection
- Type-safe database operations with Prisma

## 🔄 State Management

- TanStack Query for server state
- React state for UI management
- Optimistic updates for better UX
- Proper error handling and loading states

## 🎨 Styling

- SCSS Modules for component-specific styles
- Responsive design
- Modern UI components
- Consistent styling patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- YouTube API for content access
- All contributors and users of the application
