Mini Results Flow – React App

📌 Overview
This project is a multi-step React application that I built to practice building reusable components and step-based navigation in React.

The flow is simple but structured:
1: User starts with a form to input basic details.
2: Moves through 6 result cards (each card dynamically shows content based on form input).
3: Ends with a Sales Card, designed to act as the final screen (like a sales or CTA page).

I designed the app with reusable components, clean structure, and easy navigation so it can be scaled or adapted for future use cases.

🚀 Features
✅ Step-based navigation (Form → 6 Result Cards → Sales Card)
✅ Reusable ResultCard component (consistent layout across all result steps)
✅ Dynamic data handling through cardData.js
✅ Back/Next navigation between steps
✅ Separation of concerns → each part (Form, Cards, Sales) is its own component
✅ Clean UI flow → ensures smooth user experience

🛠️ What I Did & How I Did It
🔹 Step 1 – Setting Up Project
Created a React app using Vite for a fast and lightweight development environment.
Installed Tailwind CSS for styling.

🔹 Step 2 – Building Components
FormStep → built the initial form to collect user input.
ResultCard → made it a reusable component so all 6 cards share the same structure but display different content via props.
SalesCard → created as the final screen to wrap up the flow.

🔹 Step 3 – Managing Data
Created a cardData.js file where all card-related data is stored.
Used props to pass data from cardData.js into the ResultCard.
This way, I avoided repeating code and made the app more scalable.

🔹 Step 4 – Navigation Logic
Controlled steps using state (useState) inside App.jsx.
Added Next and Back buttons for smooth navigation.
Set up conditions so step 0 shows the form, steps 1–6 show result cards, and step 7 shows the sales card.

🔹 Step 5 – Final Touches
Structured the code into clear folders (components, data).
Ensured UI consistency with Tailwind classes.
Deployed the app online for public access.

⚡ Installation & Setup
# Clone the repository
git clone https://github.com/your-username/mini-results-flow.git
cd mini-results-flow

# Install dependencies
npm install

# Start the development server
npm run dev


Now open http://localhost:5173
 in your browser 🚀

🧩 How It Works

Step 0 → Displays the FormStep for user input.

Steps 1–6 → Each step displays a ResultCard with unique content from cardData.js.

Step 7 → Shows the SalesCard (final screen).

Navigation

Next → Moves to the next step


Back → Returns to the previous step

🌐 Live Demo
🔗 https://mini-results-flow-react.vercel.app/
