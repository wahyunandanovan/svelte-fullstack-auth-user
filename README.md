SvelteKit + MySQL + Prisma ORM Project
This project uses SvelteKit for the frontend, MySQL as the database, and Prisma ORM for database management.

Prerequisites
Ensure the following are installed:

Node.js (>= 19.x)
MySQL (>= 5.7 or 8.x)
Prisma ORM CLI (>= 4.0)
Git (for version control)
Setup
1. Clone the Repository
bash
Copy code
git clone https://github.com/wahyunandanovan/svelte-fullstack-auth-user.git
cd svelte-fullstack-auth-user
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file in the root of the project and add the following:

bash
Copy code
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
4. Set Up MySQL Database
Create the database:

bash
Copy code
CREATE DATABASE database_name;
5. Prisma Configuration
Generate the Prisma client:

bash
Copy code
npx prisma generate
Run the initial migration and sync Prisma with your database:

bash
Copy code
npx prisma migrate dev --name init
6. Run the Development Server
bash
Copy code
npm run dev
Your project should now be running locally.
