
# 🛡️ TI-HUNT – Threat Intel-Driven Hunting Platform

**TI-HUNT** is a cybersecurity project developed during my internship at **Cyveon Systems**.  
It helps security analysts detect and analyze threats by combining **Threat Intelligence** and **Threat Hunting** features.  
The platform provides a **web dashboard** for log analysis, IOC detection, and visualization.

---

## ⚙️ Features

* 🧠 **Threat Intelligence Integration** – Detect and analyze IOCs (IPs, domains, hashes, URLs)
* 📂 **Log File Analysis** – Upload log files and view detected threats visually
* 📊 **Dashboard View** – IOC statistics and analysis charts
* 👥 **User & Admin Roles** – Authentication and role-based access
* 🔔 **Notifications System** – Alerts for admin responses and updates

---

## 🧩 Tech Stack

* **Frontend**: React.js  
* **Backend**: Flask + SQLAlchemy  
* **Database**: SQLite / PostgreSQL  

---

## 🧰 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/TI-HUNT.git
cd TI-HUNT
````

---

### 2️⃣ Setup Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate       # for Linux/Mac
venv\Scripts\activate          # for Windows
pip install -r requirements.txt
```

Create a `.env` file:

```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
SQLALCHEMY_DATABASE_URI=sqlite:///ti_hunt.db
```

Run the backend:

```bash
flask run
```

Backend runs at: **http://localhost:5000**

---

### 3️⃣ Setup Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at **http://localhost:3000**



## 🧑‍💻 Author

**K.Mahammad Asif**
