# AuraFlix 🎬

> A high-performance, responsive web application inspired by Netflix, featuring real-time movie data streaming and AI-powered personalized recommendations using GPT-4 and TMDB APIs.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.x-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI_API-GPT--4-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com/)
[![TMDB API](https://img.shields.io/badge/TMDB-REST_API-01B4E4?style=flat-square&logo=themoviedb&logoColor=white)](https://www.themoviedb.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Engineering Highlights](#-engineering-highlights)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Commit Conventions](#-commit-conventions)
- [License](#-license)

---

## 💡 Overview

**AuraFlix** bridges modern UI/UX design with natural language conversational AI. Instead of manually browsing static genre categories, users can search using complex natural language prompts (e.g., _"Retro 80s sci-fi movies with synthwave soundtracks"_).

The app parses GPT recommendations, fetches full metadata and video trailers from TMDB API endpoints in parallel, and populates interactive movie rows and full-screen hero backgrounds.

---

## 🔥 Key Features

- 🤖 **AI-Powered GPT Search:** Context-aware search engine leveraging OpenAI's Chat Completions to generate smart movie suggestions.
- 🎥 **Dynamic Hero Background:** Embedded trailer video player driven by custom video-fetching hooks.
- 🍿 **Real-Time Movie Feeds:** Dynamic rows for **Now Playing**, **Popular**, **Top Rated**, and **Upcoming** movies.
- ⚡ **Centralized State Management:** Optimized Redux Toolkit architecture managing user auth, browse states, and GPT query caches.
- 📱 **Responsive UI:** Fully mobile-first layout built with Tailwind CSS, supporting fluid navigation across all viewports.
- 🔒 **Secure Credential Storage:** Environment variable isolation protecting sensitive API keys (`TMDB` and `OpenAI`).

---

## 🛠 Architecture & Tech Stack

### Frontend & UI

- **React 18:** Component-driven architecture utilizing custom React hooks for async logic abstraction.
- **Tailwind CSS:** Utility-first CSS styling for layout responsiveness, overlays, and animations.
- **Lucide Icons / React Icons:** Crisp icon set for navigation and action triggers.

### State Management & Data Fetching

- **Redux Toolkit:** State slice architecture (`moviesSlice`, `gptSlice`, `userSlice`) for global application state.
- **Custom React Hooks:** Encapsulated async logic (`useMovieTrailer`, `usePopularMovies`, `useTopRatedMovies`, `useUpcomingMovies`).

### Third-Party APIs

- **OpenAI API (GPT-4 / GPT-3.5):** Natural language processing for tailored movie suggestions.
- **TMDB API:** RESTful endpoint provider for live movie metadata, poster paths, and YouTube trailer keys.

---

## 🏗 Engineering Highlights

### 1. Data Abstraction via Custom Hooks

Async API fetching logic is completely decoupled from UI presentation components. Custom hooks encapsulate data retrieval and dispatch actions directly to the Redux store:

```text
Component Render ──► Custom Hook ──► REST API Request ──► Redux Dispatch ──► Store State ──► UI Update

2. Multi-Stage Async Query Pipeline
When a user submits a search query in the GPT Search bar, the application executes a two-stage aggregation pipeline:

Prompt Parsing: Sends the search prompt to OpenAI API to return movie title recommendations.

Parallel Promise Aggregation: Executes Promise.all() across TMDB endpoints for each title to fetch metadata and images concurrently before populating Redux store slices.

📁 Project Structure

src/
├── components/          # Presentational and container UI components
│   ├── Browse.js        # Main container for browse view
│   ├── Header.js        # Navigation bar & GPT search toggle
│   ├── GPTSearch.js     # AI Search container & input bar
│   ├── GPTMovieSuggestions.js # Grid for AI movie results
│   ├── MovieList.js     # Horizontal scrollable movie rows
│   └── MovieCard.js     # Media poster cards
├── hooks/               # Encapsulated data-fetching custom hooks
│   ├── useMovieTrailer.js
│   ├── useNowPlayingMovies.js
│   ├── usePopularMovies.js
│   ├── useTopRatedMovies.js
│   └── useUpcomingMovies.js
├── utils/               # Redux slices, API helpers, & constants
│   ├── appStore.js      # Main Redux store configuration
│   ├── gptSlice.js      # Slice for GPT toggle and search results
│   ├── moviesSlice.js   # Slice for movie data arrays
│   ├── constants.js    # API endpoints & asset links
│   └── openai.js        # OpenAI SDK instantiation
└── App.js               # Application root & router config

🚀 Getting Started
Prerequisites
Node.js (v18.0.0 or higher recommended)

npm or yarn

TMDB API Key (from The Movie Database)

OpenAI API Key (from OpenAI Platform)

Installation



1.Clone the repository:
git clone [https://github.com/your-username/auraflix.git](https://github.com/your-username/auraflix.git)

cd auraflix

2.Install project dependencies:
npm install

3.Set up Environment Variables:
Create a .env file in the root directory:
REACT_APP_TMDB_KEY=your_tmdb_api_key_here
REACT_APP_OPENAI_KEY=your_openai_api_key_here

4.Start the development server:
Navigate to http://localhost:3000 in your browser.

📜 Commit Conventions
This repository follows the Conventional Commits specification to maintain a clean git history

```
