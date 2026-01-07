# Houston Zoo Access+ 🌿

An AI-powered accessible companion app for Houston Zoo guests. This application leverages the **Google Gemini API** (Gemini 3 Pro) to provide personalized navigation, accessibility insights, and real-time assistance for guests with mobility, visual, auditory, sensory, or cognitive needs.

## Features

- **Personalized Profiles**: Users can select one or multiple accessibility profiles (e.g., Mobility + Sensory) to get tailored information.
- **Smart Guidebook**: A digital guide replacing traditional maps, offering specific accessibility notes for every habitat and amenity.
- **ZooBuddy AI**: A context-aware chatbot that helps with navigation, animal facts, and accessibility support.
- **Persistent State**: User preferences are saved automatically, ensuring a seamless experience throughout the visit.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **AI**: @google/genai (Gemini 3 Pro Preview)
- **Formatting**: React Markdown

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set your Google Gemini API Key in your environment variables or `.env` file:
    ```bash
    export API_KEY="your_api_key_here"
    ```
4.  Run the application:
    ```bash
    npm start
    ```

## Usage

1.  Select your accessibility needs (Quick Select or Custom) upon first load.
2.  Explore the zoo using the Guide view.
3.  Click "Get Directions" on any card or tap the floating chat button to ask ZooBuddy for help!
4.  Use the "Settings" button in the header to change your accessibility profile at any time.