# 🏨 Hotel Management System

A simple full-stack **Hotel Management System** with a Node.js + Express backend, MySQL database, and a basic frontend served using Python HTTP server.

---

## 📌 Prerequisites

Make sure the following are installed on your system:

- Git
- Node.js & npm
- MySQL Server
- Python (Python 3 recommended)
- VS Code (optional but recommended)

---

## 📂 Project Setup & Installation

### 1️⃣ Clone the Repository

1. Create a new empty folder
2. Open the folder in **VS Code**
3. Open the terminal and run:

```bash
git init
git remote add origin https://github.com/goodachari-master/Hotel_Management.git
git pull origin main
```

### 2️⃣ Login to MySQL

Open Command Prompt / Terminal and run:

```bash
mysql -u root -p
```
Enter your MySQL root password.

### 3️⃣ Create Database

sql code

```sql
CREATE DATABASE hotel_db;
USE hotel_db;
```
### 4️⃣ Create rooms Table

sql code

```sql
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10),
    type VARCHAR(50),
    price DECIMAL(10,2),
    available BOOLEAN DEFAULT TRUE
);
```
### 5️⃣ Create bookings Table

sql code

```sql
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    customer_name VARCHAR(100),
    from_date DATE,
    to_date DATE,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);
```
## ⚙️ Backend Setup

### 6️⃣ Navigate to Backend Folder

Open VS Code or some other editor, and open a new Terminal

```bash
cd backend
```
### 7️⃣ Initialize Node Project

```bash
npm init -y
```

### 8️⃣ Install Backend Dependencies

```bash
npm install express mysql2 cors
```

### 8️⃣.1 Configure MySQL Connection

1. Open the file **`db.js`** inside the `backend` folder.

2. You will see the following code:

```js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Veejnas@4002",
  database: "hotel_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = db;
```
3. Change the password value to your own MySQL server password.

```js
password: "your_mysql_password"
```

4. Save the file after updating the password.

⚠️ Important:
Make sure the MySQL server is running and the database name matches hotel_db.


## 🎨 Frontend Setup

### 9️⃣ Navigate to Frontend Folder

```bash
cd ..
cd frontend
```

### 🔟 Install Frontend Dependency

```bash
npm install axios
```

---


## 🚀 Running the Application


### 1️⃣ Start Backend Server

Open a new terminal:

```bash
cd backend
node server.js
```
Backend will start running.

### 2️⃣ Start Frontend Server

Open another terminal:

```bash
cd frontend
python3 -m http.server 8081
```


### 3️⃣ Open the Web Application

Open your browser and visit:

```bash
http://localhost:8081/index.html
```
