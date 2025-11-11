AI Fitness Trainer


A full-stack web application built with React, Django, and MediaPipe that acts as an all-in-one personalized platform for managing fitness, nutrition, and workout goals.

🌟 Project Overview

The AI Fitness Trainer is a comprehensive web application designed to solve the problem of fragmentation in the digital fitness market. Instead of using separate apps for diet, workouts, and goal tracking, this project integrates all essential fitness features into a single, cohesive, and intelligent platform.
Users can receive personalized meal plans, build custom workout routines with video guides, track their long-term goals, visualize their progress, and even get real-time exercise feedback from a virtual trainer that uses their webcam.

✨ Key Features

This application is built with a modular approach, where each feature is a self-contained module:

•	🔐 Secure Authentication: Full user registration and login system using JWT (JSON Web Tokens) with an automatic token refresh mechanism.

•	📊 Personalized Dashboard: A dynamic main page that provides a real-time, at-a-glance summary of the user's daily progress, including calories consumed, workouts completed, and current weight/BMI.

•	🥗 AI Diet Tracker:

o	Manual logging for daily meals.

o	An "AI Meal Plan" generator that uses the user's profile data (weight, height, age, sex, activity level, and goal) to calculate their TDEE (Total Daily Energy Expenditure) and generate a personalized meal plan for the day.

•	💪 Workout Planner:

o	Full CRUD (Create, Read, Update, Delete) functionality for building custom workout routines.

o	Ability to log completed workouts, which automatically updates the progress charts.

•	🎯 Goal Tracker: A full CRUD module for setting and tracking long-term fitness goals (e.g., "Lose 5 kg in 30 days").

•	📈 Progress Dashboard: Visualizes the user's historical data using Chart.js, showing trends for weight, calories, and workout consistency over time.

•	🤖 Virtual Trainer: A real-time pose detection module that uses Google's MediaPipe and the user's webcam to:

o	Analyze body landmarks in the browser.

o	Automatically count repetitions for exercises like Squats, Push-ups, Lunges, and more.

o	Provide real-time feedback on form (e.g., "Go lower!", "Hold still!").

•	⚙️ Django Admin Panel: A complete backend interface for the administrator to manage users, add new default meals, and add new exercises to the database.

🚀 Technology Stack

Backend

•	Framework: Python, Django, Django REST Framework

•	Authentication: Simple JWT (JSON Web Tokens)

•	Database: SQLite (for development)

•	Core: Django Signals (for automating progress updates)

Frontend

•	Framework: React.js 18+ with Vite

•	Language: TypeScript

•	Styling: Tailwind CSS

•	API Client: Axios (with interceptors for auth)

•	Computer Vision: Google MediaPipe (for pose detection)

•	Data Visualization: Chart.js

🔧 Setup and Installation

To run this project locally, you will need to run two separate servers: the Backend API and the Frontend Client.

Prerequisites

•	Python 3.10+

•	Node.js 18+

•	Git
1. Backend S
   
2. etup (Django API)
   
# 1. Clone the repository

git clone [https://github.com/your-username/ai-fitness-trainer.git](https://github.com/your-username/ai-fitness-trainer.git)

cd ai-fitness-trainer/backend

# 2. Create and activate a virtual environment

# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 3. Install the required packages
pip install -r requirements.txt

# 4. Run the database migrations
python manage.py makemigrations
python manage.py migrate

# 5. Create a superuser to access the admin panel
python manage.py createsuperuser

# (Follow the prompts to create your admin account)


# 6. Run the backend server
python manage.py runserver

# The backend API will now be running at [http://127.0.0.1:8000](http://127.0.0.1:8000)
# You can access the admin panel at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
2. Frontend Setup (React Client)
(In a new, separate terminal)
# 1. Navigate to the frontend directory
cd ai-fitness-trainer/frontend

# 2. Install the npm packages
npm install

# 3. Run the frontend development server
npm run dev

# The React application will now be running at http://localhost:5173
🏃‍♂️ Usage
1.	Open your browser and go to http://localhost:5173.
2.	Create a new user account using the "Sign Up" page. Be sure to fill in all profile details, as these are required for the AI calculations.
3.	Once registered, you will be logged in and redirected to your personalized dashboard.
4.	You can now explore all the modules:
o	Diet Tracker: Generate an AI meal plan for the day.
o	Workouts: Create a new workout or log a pre-built one.
o	Virtual Trainer: Select an exercise and click "Start Camera" to begin pose detection.
o	Admin Panel: Go to http://127.0.0.1:8000/admin and log in with your superuser account to add new meals and exercises to the database.



SCREENSHORTS

<img width="1912" height="895" alt="image" src="https://github.com/user-attachments/assets/2b2a91ae-74f9-452b-8606-6af4b02d65a8" />
<img width="1906" height="880" alt="image" src="https://github.com/user-attachments/assets/1369057d-761b-4113-ad9a-955e0f02f4c5" />
<img width="1870" height="753" alt="image" src="https://github.com/user-attachments/assets/c237cd68-f709-48d9-af5d-caf1063cb5b2" />
<img width="1886" height="874" alt="image" src="https://github.com/user-attachments/assets/030945a0-f561-4f10-a1fd-267309c1bbb1" />
<img width="1877" height="862" alt="image" src="https://github.com/user-attachments/assets/0d5e5330-8022-4086-bf20-58bac8b31edc" />
<img width="1866" height="840" alt="image" src="https://github.com/user-attachments/assets/c9a509ce-a324-4b40-bd6a-30a888558d1d" />
<img width="1881" height="849" alt="image" src="https://github.com/user-attachments/assets/47ca3d1d-145d-47fa-8221-6793f1f0fec4" />
<img width="1884" height="871" alt="image" src="https://github.com/user-attachments/assets/18e983db-db1b-4a14-94a4-ff0788a739fc" />
<img width="1873" height="869" alt="image" src="https://github.com/user-attachments/assets/dc32c561-93a6-4196-bf57-42f1c593f20c" />
<img width="1875" height="872" alt="image" src="https://github.com/user-attachments/assets/6cdbbdfd-0471-4745-9ab5-15afa77c1610" />
<img width="1880" height="881" alt="image" src="https://github.com/user-attachments/assets/32ae2cdd-13f6-4388-8593-fea8adca1d60" />











