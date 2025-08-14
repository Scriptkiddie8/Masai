Project: ConnectSphere - A User & Post Dashboard
Unit-4

1. Project Vision
   Create "ConnectSphere," a clean, modern, and responsive single-page application where you can browse a directory of users, view their profiles, and read their blog posts. The application will be built entirely with React, using a modern toolchain, and will interact with the public JSONPlaceholder API to fetch its data. This project will test your foundational knowledge of React, from building components and managing state to handling side effects and implementing client-side navigation.

2. Core Features & Task Breakdown
   The project should be developed with a component-based architecture in mind.

Phase 1: Project Setup and Static Components
Setup: Initialize a new React project using Vite.
Component Scaffolding: Create the basic, static UI components.
Header: A simple component that displays the application title, "ConnectSphere".
UserList: A container component that will display a grid or list of users.
UserCard: A presentational component that displays a user's name, username, and email. This component will receive its data via props.
Phase 2: State, API Integration, and Lifecycle Hooks
State Management: Use the useState hook in your main application component to manage the list of users that will be displayed.
API Communication:
Use the JSONPlaceholder API for all data.
Use a library like Axios to handle your API requests.
Utilize the useEffect hook to fetch a list of users from the /users endpoint when the application first loads and update the component's state with the results.
Dynamic Rendering: Pass the fetched user data down to the UserList component, which should then map over the data and render a UserCard for each user, passing the necessary props to each one.
Phase 3: Client-Side Routing and Detailed Views
Implement Routing: Integrate a routing library like React Router into your application.
Create Routes:
The Home Route (/): This will be the main page, displaying the list of all users.
The User Detail Route (/users/:userId): When a user clicks on a UserCard, the application should navigate to this dynamic route.
Detailed Page: The user detail page should fetch and display more information about the selected user using the userId from the URL. This page must show:
The user's full details (e.g., address, company).
A list of all blog posts written by that user (fetched from the /users/:userId/posts endpoint).
Phase 4: Global State with Context API
Create a "Follow" Feature: Allow users to "follow" their favorite users.
Implement Context:
Create a FollowContext to manage a global list of the users you are following.
The context should provide the list of followed users and functions to add or remove a user from that list.
Consume Context:
Add a "Follow" button to the UserCard and the UserDetail page. Clicking this button should use the context's functions to update the global list.
Create a new route (/following) that displays a list of all the users you have decided to follow. This component will get its data directly from the FollowContext.
Final Deliverable
The folder's repo link of a complete, functional React application that fulfills all the feature requirements. The code should be well-organized into components, demonstrate proper state management and side-effect handling, and use client-side routing and the Context API effectively. The final code should be available in a public GitHub repository.
