Problem Statement: "QuickRepo Viewer"
Core Objective:

You will build a single-page React application that allows users to search for a GitHub user by their username and view a list of their public repositories. This project is designed to test your proficiency with core React hooks, API integration, component architecture, and basic state management within a limited timeframe.

You can use this url : https://api.github.com/users/USERNAME/repos

Phase 1: Project Setup & Component Scaffolding
Topics Covered: Introduction to Vite, JSX, Components, Props.

Project Initialization:
Create a new React project using Vite.
Set up a simple folder structure, for example: src/components.
Component Creation:
SearchBar.jsx: A component containing a form with a single text input for the GitHub username and a "Search" button.
RepoCard.jsx: A component that accepts props (like name, description, stars, forks) and displays them in a card format.
App.jsx: The main component that will orchestrate the others.
Static Layout:
Assemble the components in App.jsx. For now, create a hardcoded array of 2-3 mock repository objects and pass the data down to RepoCard components via props to ensure your UI is working correctly.
Phase 2: State Management & API Integration
Topics Covered: useState Hook, useEffect Hook, React with APIs and Axios Library.

State Management:
In your App.jsx, use the useState hook to manage the following pieces of state:
The list of repository data (initially an empty array).
The current search query (the username to search for).
A loading state (boolean).
An error state (e.g., a string for error messages).
API Fetching with Effects:
Install Axios.
Implement the search functionality. When the search form is submitted, update the search query state with the new username.
Use the useEffect hook to trigger an API call whenever the search query state changes.
Endpoint: https://api.github.com/users/YOUR_SEARCH_TERM/repos
Inside the useEffect, set the loading state to true before the API call and false after it completes or fails. Handle any errors by setting the error state.
Dynamic Rendering:
Conditionally render your UI based on the state:
If loading, display a "Loading..." message.
If there's an error (e.g., user not found), display the error message.
If the data is successfully fetched, map over the repository data array and render a RepoCard for each item.
Phase 3: Global State & Performance
Topics Covered: Context API, Performance Optimization in React.

Global Theme with Context API:
Implement a simple light/dark mode theme switcher.
Create a ThemeContext to provide two values down the component tree: the current theme ('light' or 'dark') and a function to toggle the theme.
Wrap your App component with the ThemeProvider.
In any component (e.g., App.jsx or RepoCard.jsx), use the useContext hook to access the theme and apply different CSS classes accordingly.
Component Performance Optimization:
The RepoCard is a presentational component that will only change if its props change. To prevent unnecessary re-renders when the parent component's state updates, wrap your RepoCard component export in React.memo.
Add a comment in your RepoCard.jsx file briefly explaining why React.memo is being used here.

unit-4
