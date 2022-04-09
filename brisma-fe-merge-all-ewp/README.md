# Brisma FE

### Source folder structure

    .
    ├── src                     # All the source files (components, pages, CSS, and utilities)
    │   ├── store               # For store management (Redux)
    │   ├── views               # Views-related code
    │       ├── components      # Individual, reusable components (like buttons)
    │       ├── pages           # Page components (e.g. LoginPage, LandingPage, Portal PAT)
    │       ├── routes          # Handle client-side routing
    │   ├── index.css           # Global styling (Tailwind)
    │   ├── index.js            # React entry point

### Dependencies
- React-router
- Redux (react-redux, redux-thunk, redux-devtools-extension)
- Socket.io