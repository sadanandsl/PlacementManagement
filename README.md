# Placement Management System

A web-based platform for managing campus placements, designed to streamline the process for administrators, faculty, and students. Built with React for the frontend and Node.js/Express for the backend.

## Features

- **Admin Dashboard:** Manage jobs, resources, and placement statistics.
- **Faculty Login:** Secure access for faculty to manage placement activities.
- **Student Portal:** Students can log in, view jobs, submit experiences, and access resources.
- **Job Listings:** Add, view, and manage job opportunities.
- **Resource Management:** Upload and share resources for students.
- **Statistics:** Track placement statistics and student experiences.

## Tech Stack

- **Frontend:** React (JavaScript)
- **Backend:** Node.js, Express
- **Styling:** CSS

## Project Structure

```
pms/
  package.json
  README.md
  public/
    ...
  src/
    App.js
    Admin/
    Constants/
    Students/
    assets/
    ...
server/
  index.js
  package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm

### Installation

1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd placementManagement
   ```
2. Install dependencies for both frontend and backend:
   ```powershell
   cd pms
   npm install
   cd ../server
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```powershell
   cd server
   npm start
   ```
2. Start the frontend React app:
   ```powershell
   cd ../pms
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser for the frontend.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
