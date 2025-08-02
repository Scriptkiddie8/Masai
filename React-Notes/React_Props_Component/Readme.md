React Evaluation Task: Recipe Finder App with Vite
📝 Problem Statement
Build a Mini Recipe Finder App using React + Vite that allows users to:

Search and browse recipes.
View detailed instructions for a specific recipe.
Mark/unmark recipes as "favorites."
Toggle the application's user interface between light and dark themes.
🔧 Core Requirements

1. Project Initialization & Structure
   Initialize your project using the Vite toolchain for a fast development environment.
   Organize your code with a clean and scalable folder structure (e.g., src/components, src/pages, src/hooks, src/context, etc.).
2. Recipe Listing Page (/)
   Fetch an initial list of recipes from the public API:
   https://dummyjson.com/recipes
   using the Axios library.
   Display the fetched recipes in a grid or list format using a reusable RecipeCard component.
   Each RecipeCard must prominently display:
   name of the recipe.
   cuisine type.
   image of the dish.
   A toggle button (e.g., a heart icon) to mark/unmark the recipe as a "favorite."
3. Recipe Detail Page (/recipe/:id)
   Implement routing using React Router to navigate to a unique page for each recipe when a user clicks on a RecipeCard.
   On the detail page, use the id from the URL parameters to fetch and display the full details for that specific recipe. This should be managed by a useEffect hook.
4. Favorites Toggle
   The "favorite" status for each recipe must be managed using the useState hook.
   The toggle's state (favorited or not) must be visually clear on the RecipeCard.
   The favorited status should be consistently reflected across the application.
5. Global Theme Switcher (Light/Dark Mode)
   Use the Context API to create a global theme provider that makes the current theme (light or dark) available to all components without prop drilling.
   Include a UI switch (e.g., a toggle button in the header) that allows the user to change the theme.
   The selected theme should dynamically change the background colors and text colors of all pages and components for a consistent user experience. You can use custom CSS or a styling library of your choice.
6. Component-Based Architecture
   Logically break down the entire user interface into small, functional, and reusable components.
   Ensure data flows correctly from parent to child components via props.
   Maintain a clean, modular, and easily understandable codebase.
   🏅 Bonus Challenge
   Persist the user's "favorited" recipes and their selected theme preference using localStorage. This ensures that the user's choices are saved and restored when they revisit the application.
   On the main recipe listing page, add a filter or a separate view that allows users to see only their favorited recipes.
   ✅ Submission Guidelines
   Upload the complete source code to a public GitHub repository.
   Deploy the application to a free hosting service (like Vercel or Netlify) and include the live URL in your repository's description.
