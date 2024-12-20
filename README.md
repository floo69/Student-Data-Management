# Project Setup

Follow these steps to set up the project:

1. **Create `.env` file**  
   Create an `.env` file in the root directory of the project.

2. **Configure Database**  
   Open the `.env` file and set your database name and password.

3. **Install PHP dependencies**  
   Run the following command to install the necessary PHP dependencies:
   `composer install`

4. **Generate application key**  
   Run the following command to generate the application key:
   `php artisan key:generate`

5. **Run migrations**  
   Run the following command to apply database migrations:
   `php artisan migrate`

6. **Link storage**  
   Run the following command to create the symbolic link for storage:
   `php artisan storage:link`

7. **Install Node.js dependencies**  
   Run the following command to install the necessary Node.js dependencies:
   `npm install`

8. **Build assets**  
   Run the following command to build the assets:
   `npm run build`

---

### Running the Project

You need two terminal windows for the following steps:

1. **Serve the application**  
   In the first terminal, navigate to the `public` directory and run:
   `cd public`  
   `php -S localhost:8000`

2. **Run the frontend development server**  
   In the second terminal, run:
   `npm run dev`
