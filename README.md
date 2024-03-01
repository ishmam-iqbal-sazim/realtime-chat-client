# Realtime-chat-client

## Table of Contents

- [What is the project about](#what-is-the-project-about)
- [Architecture](#architecture)
- [Feature List](#feature-list)
- [Local Development Setup](#local-development-setup)
- [Acknowledgments](#acknowledgments)

## What is the project about

Realtime-chat is a chat application with real time communication powered by websockets.

## Architecture

The client of the Realtime chat application is built using React and it integrates with a [Ruby on Rails backend](https://github.com/iIqbalSazim/realtime-chat-api).
<br/>

The frontend architecture follows a component-based approach, where the user interface is composed of reusable and modular components. These components include pages, UI elements, and container components.

- Pages: Each page in the application corresponds to a specific route or URL and is composed of one or more React components. Examples of pages include the login page, dashboard page, classroom page, and profile page.

- UI Elements: UI elements are reusable components that represent common user interface elements such as buttons, forms, input fields, dropdowns, and modals. These components are styled using Mantine UI, a modern React UI library.

- Container Components: Container components are responsible for managing state and data fetching logic. They interact with the backend API to retrieve and update data, and pass this data down to presentational components as props.

The app follows the bulletproof file-folder structure.

## Feature List

- **Login/Registration:**

  - Users can login and register.
  - New user registrations are notified to all other logged in users.

- **Main Functionalities:**

  - Users will be able to see list of other users.
  - Users will be able to chat one on one with other users.

## Local Development Setup

### Prerequisites

- Node v18 or higher installed on your machine

### Step-by-step instructions

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the client directory: `cd superteacher-client`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

## Acknowledgments

- This project was developed as a requirement for month 3 in the Sazim Learner's Program.
- Special thanks to the instructors and mentors for their guidance and support throughout the program.
