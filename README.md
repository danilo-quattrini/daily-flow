# daily-flow
Daily Flow is a habit-tracking application built with Node.js, Express, MySQL, and Pug. This README will guide you through the steps to install and set up the project on your local machine.
## Table of contents
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Database setup](#Database Setup)
- [environment configuration](#Environment configuration)
- [Running the application](#Running the application)
## Prerequisites
Ensure you have the following installed on your system:
1.	**Node.js**: [Download here](https://nodejs.org/) (version 14+ recommended)
2.	**MySQL**: [Download here](https://dev.mysql.com/downloads/mysql/)
3.	**Git**: [Download here](https://git-scm.com/downloads)
4.	A code editor (e.g., VS Code)
---
## Installation
1.	Clone the repository by running the following command in your terminal:
```bash
git clone https://github.com/your-username/daily-flow.git
cd daily-flow
```
2.	Install the project dependencies by running the following command:
```bash
npm install
```
---
## Database Setup
1.	**Create a MySQL database**:
Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or terminal) and import the daily_flow_db.sql file to set up the database structure.
**Using MySQL CLI**: 
```bash
mysql -u your_user -p your_password < models/daily_flow_db.sql
```
Replace your_user and your_password with your MySQL credentials.
Using MySQL Workbench:
- Open Workbench and connect to your MySQL server. 
- Go to the File > Run SQL Script option. 
- Select the daily_flow_db.sql file and execute.
2.	**Confirm the Database**:
Ensure the database is created and includes tables such as app_users, habits, etc.
---
## Environment Configuration
1.	**Rename** .env.example to .env.:
```bash
mv .env.example .env
```
2.	**Edit the .env file**:
Open the .env file in a code editor and update the following environment variables:
```dotenv
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=add_your_password_here
DB_NAME=daily_flow_db
PORT=3000
SESSION_SECRET=z+Ilx8n2RKwXMGHchWpKqCzJ2BscF2VNgN8Z30PZ4e1hMETGGyUHnForzKOnA6vO
```
Replace:
- **your_mysql_user** with your MySQL username.
- **add_your_password_here** with your MySQL password.
- **(optional)** Change the PORT value if you want to use a different port.
- **(optional)** Change the SESSION_SECRET value to a random string.
---
## Running the Application
1.	**Start the server**:
Run the following command to start the server:
```bash
npm start
```
2.	**Access the application**:
Open your browser and go to http://localhost:3000 to access the application.
---
## Note
- The application is set to run on port 3000 by default. You can change this in the .env file.
- The database credentials should match your MySQL credentials.
- Ensure your MySQL server is running before starting the application.
- To reset the database, you can re-import the daily_flow_db.sql file.
---
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.