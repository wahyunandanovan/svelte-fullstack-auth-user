# SvelteKit + MySQL + Prisma ORM Project

This project uses **SvelteKit** for the frontend framework, **MySQL** as the database, and **Prisma ORM** for database management.

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Node.js** (>= 19.x)
- **MySQL** (>= 5.7 or 8.x)
- **Prisma ORM CLI** (version 4.0+)
- **Git** (for version control)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/wahyunandanovan/svelte-fullstack-auth-user.git
cd svelte-fullstack-auth-user

### 2. Install Dependencies

```bash
npm install

### 3. Configure Environment Variables
Create a .env file in the root of the project and add the following environment variables:

```bash
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

### 4. Set Up MySQL Database

```bash
CREATE DATABASE database_name;

### 5. Prisma Configuration

Generate the Prisma client by running:
```bash
npx prisma generate;

To create the initial migration and sync Prisma with your database:
```bash
npx prisma migrate dev --name init;

### 6. Run the Development Server

```bash
npm run dev;


