Mini Results Flow – React App (TypeScript)

📌 Overview

This project is a multi-step React application built with TypeScript to practice building reusable components, type-safe props, and step-based navigation.

The flow is structured:

User starts with a form to input basic details.

Moves through 6 result cards (each card dynamically shows content based on form input).

Ends with a Sales Card, acting as the final screen (like a sales or CTA page).

The app is designed with reusable components, clean structure, and type safety, making it easy to scale or adapt for future use cases.

🚀 Features

✅ Step-based navigation (Form → 6 Result Cards → Sales Card)
✅ Reusable ResultCard component with typed props
✅ Dynamic data handling through cardData.ts
✅ Back/Next navigation between steps
✅ Separation of concerns → each part (FormStep, ResultCard, SalesCard) is its own component
✅ Type-safe state management with TypeScript
✅ Clean UI flow with Tailwind CSS

🛠️ What I Did & How I Did It
🔹 Step 1 – Setting Up Project

Created a React + TypeScript app using Vite:

npm create vite@latest mini-results-flow -- --template react-ts


Installed Tailwind CSS for styling.

🔹 Step 2 – Building Components

FormStep.tsx → collects user input with typed FormData.

ResultCard.tsx → reusable component, displays unique content via typed props (CardDataItem).

SalesCard.tsx → final screen to wrap up the flow.

🔹 Step 3 – Managing Data

Created cardData.ts where all result card data is typed

Props are typed, passed from cardData.ts into ResultCard.tsx.

Avoided repeating code and ensured type safety across components.

🔹 Step 4 – Navigation Logic

Controlled steps using useState in App.tsx.

handleNext and handleBack functions control navigation between steps.

Step conditions:

Step 0 → FormStep

Steps 1–6 → ResultCard

Step 7 → SalesCard

All state and functions are typed for safety:

🔹 Step 5 – Final Touches

Structured the code into folders: components/, data/, hooks/, types/.

Ensured UI consistency using Tailwind CSS classes.

Installation & Setup
# Clone the repository
git clone https://github.com/Mahad2872004/Mini-Results-Flow-TypeScript.git
cd mini-results-flow

# Install dependencies
npm install

# Start the development server
npm run dev


Open http://localhost:5173
 in your browser 🚀

🧩 How It Works

Step 0 → Displays FormStep for user input.

Steps 1–6 → Each step displays a ResultCard with typed content from cardData.ts.

Step 7 → Shows the Sales (final screen).

Navigation

Next → Moves to the next step.

Back → Returns to the previous step.
