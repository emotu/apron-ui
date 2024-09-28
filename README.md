# Apron Take Home Project

The objective of this home task is to develop a production-ready web application that provides a
comprehensive UX for CRUD operations over a User entity. This project represents my implementation of the tasks, with the aim of demonstrating proficiency in the Apron's chosen technology stack.

### Setup & Launch Instructions

To set up and launch the project, follow these steps:

1. Clone the repository from [GitHub](https://github.com/emotu/apron-ui).
2. Navigate to the project root directory and install dependencies by running:
   ```bash
   npm install
   ```
3. Once installation is complete, start the development server with:
   ```bash
   npm run dev
   ```

   This command uses [concurrently](https://github.com/open-cli-tools/concurrently) and [Vite](https://vitejs.dev/) to launch both the mock API server and the web application simultaneously.

## Step 0: Mock API Setup

The mock backend API is powered by [json-server](https://github.com/typicode/json-server), enabling CRUD operations on user data. You can optionally generate mock data by running:
```bash
npm run generate
```

To create a specified number of dummy users, provide a number as an argument, such as:
```bash
npm run generate 100
```

This will generate 100 users using the [faker-js](https://fakerjs.dev/) library. 

When the application launches, the following endpoints are available:

- **List Users**: `GET /api/users`
- **Get User**: `GET /api/users/:id`
- **Add User**: `POST /api/users`
- **Update User**: `PATCH /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`


## Step 1: Frontend Implementation

The React application implements **all optional and mandatory requirements**  in Typescript as a **Single Page Application**. 

Form validation and handling is done with `yup` and `react-hook-form`, while the state management for data fetching and transmission is implemented using `react-query`. I also implemented a reusable class called  `Engine` to manage calls to the mock API endpoint.

Styling is implemented using [Tailwind](https://tailwindcss.com/).

Important files to look for:
  - `src/screens/users/list.tsx` - List users, and functionality to create, update and delete users. Other screens can be implemented by following the pattern in `src/screens/users`

  - `src/screens/users/form.tsx` - User form as a resuable modal for creating and updating users.
  
  - `src/lib/engine.ts` **[IMPORTANT]** - A API Endpoint class that implements all backend communication in a reusable way. 
  
  - `src/components/*` - Reusable presentation and form components like e.g. `Input` & `Select` for react-hook-form, `Modal` and `Alert` for dialog boxes.