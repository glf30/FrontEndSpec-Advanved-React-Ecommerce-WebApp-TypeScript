# Advanced E-Commerce Frontend Project

## Overview

This project is an advanced frontend application for an e-commerce platform, built with React, Vite, and Bootstrap. The application offers enhanced features for managing products, customer accounts, and orders, utilizing state management through Redux, session storage, and local storage.

## Prerequisites

To fully utilize this frontend application, you will need to clone and set up the backend API from the following repository: [BackEndCore Advanced Flask API](https://github.com/Skylar-Ennenga/BackEndCore-Advanced-Flask-API.git).

A list of changes is listed on this REPO. Changing how to delete nested resources was required to get everything working smoothly. 

## Features

- **Product Management**:
  - Add products to your cart.
  - Efficient state handling with Redux for better performance and scalability.

- **Customer Account Management**:
  - Simulate user authentication with `UserContext` to handle login states.
  - Store essential user data (`name`, `id`, `loggedIn` status) using `sessionStorage` and `localStorage` to persist across sessions.

- **Order Management**:
  - by Checking out you add an order to the customer that is logged in.
  - Integration with Redux to manage the state of orders within the application.

- **Shopping Cart**:
  - Add products to the shopping cart, with items stored in Redux for state management.
  - The shopping cart icon is conditionally displayed based on the user’s login status and shows the count of items.
  - Utilize local storage to maintain the cart state between sessions.

- **User Interaction**:
  - User-friendly modals for success and error messages during CRUD operations.
  - Seamless navigation between different sections using React Router.

## Technologies Used

- **React**: For building the dynamic user interface.
- **Vite**: For fast development and optimized production builds.
- **Bootstrap**: For responsive and consistent styling across the application.
- **Redux**: For centralized state management, particularly for the shopping cart and user data.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For managing navigation within the application.
- **Session Storage & Local Storage**: For persisting user data and cart state across sessions.


## Usage

### User Authentication Simulation

- Users can log in using the `Login` component, which simulates authentication by verifying credentials through a GET request.
- Upon successful login, the user’s data is stored in the `UserContext`, with persistence achieved through session storage.

### Shopping Cart

- Users can add products to their shopping cart, with the cart’s state managed by Redux.
- The shopping cart's contents are saved in local storage, allowing users to maintain their cart between sessions.

### Managing Products, Accounts, and Orders

- Navigate to the relevant section using the navbar.
- Use the provided forms to add, edit, or delete products, accounts, or orders.

### Navigation and State Management

- The application utilizes React Router for smooth navigation between different sections.
- Redux handles the complex state management of the application, particularly for user data and the shopping cart.
