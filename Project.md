# SmartPR: Tech Stack and Setup Guide

This document outlines the tech stack and setup instructions for **SmartPR**, an AI-powered code review assistant built for the **Trae AI IDE: Zero Limits Hackathon (June 13–15, 2025)**. SmartPR automates GitHub pull request reviews using:

* Trae AI IDE’s agent system for code analysis
* Novita.ai’s LLMs for generating review comments
* Zilliz’s vector database for code pattern storage

The project uses a **single directory structure** for both frontend and backend code and meets hackathon requirements:

* Open-source MIT License
* Public GitHub repo
* Demo URL

---

## Tech Stack

### Backend Tech Stack

| Component              | Technology                      | Usage                                                                                                                                            |
| ---------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**          | Node.js + Express.js            | Powers the REST API to handle pull request fetching, code analysis, and comment posting. Lightweight and fast for rapid hackathon development.   |
| **Language**           | JavaScript/TypeScript           | JavaScript aligns with Node.js and Trae’s multi-language support; TypeScript adds type safety for cleaner code, critical for a code review tool. |
| **AI Integration**     | Novita.ai LLM APIs (Claude 3.7) | Generates human-like review comments using Claude 3.7, leveraging free hackathon credits.                                                        |
| **Vector Database**    | Zilliz (Milvus)                 | Stores vectorized code patterns for semantic search, enabling context-aware suggestions.                                                         |
| **GitHub Integration** | Octokit                         | Simplifies GitHub API interactions to fetch pull request diffs and post AI-generated comments, integrated via Trae’s MCP framework.              |
| **Database**           | SQLite                          | Lightweight, file-based storage for review metadata, ideal for hackathon’s minimal setup needs.                                                  |
| **Code Analysis**      | Trae AI IDE Agent System        | Analyzes code diffs for bugs, style violations, and optimizations using Trae’s agent system and deep context.                                    |
| **Deployment**         | Vercel                          | Hosts the backend API with instant deployment, providing a demo URL for hackathon submission.                                                    |

### Frontend Tech Stack

| Component              | Technology            | Usage                                                                                                                      |
| ---------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Framework**          | React + Vite          | Builds a dynamic UI to display pull request details and review comments. Vite ensures fast setup and hot module reloading. |
| **Language**           | JavaScript/TypeScript | Consistent with backend, enables quick UI prototyping with type safety.                                                    |
| **Styling**            | Tailwind CSS          | Utility-first CSS for rapid, responsive styling.                                                                           |
| **API Client**         | Axios                 | Lightweight HTTP client for calling backend APIs and simplifying frontend-backend communication.                           |
| **UI Components**      | Shadcn UI             | Pre-built, customizable React components styled with Tailwind CSS.                                                         |
| **Deployment**         | Vercel                | Hosts the React app with zero-config deployment and GitHub integration.                                                    |
| **Real-Time Previews** | Trae AI IDE           | Displays live UI updates during development.                                                                               |

---

## Why This Tech Stack?

* **Hackathon Fit**: Lightweight tools (Node.js, React, Vite) are rapid to implement within 48 hours. It leverages Trae’s agent system, Novita.ai’s LLMs, and Zilliz’s vector DB effectively.
* **Judging Criteria**:

  * *Trae*: Highlights code analysis and automation.
  * *Novita.ai*: Demonstrates LLM-generated review comments.
  * *Zilliz*: Enables semantic search of code patterns.
* **Feasibility**: One-click commands in Trae IDE, simple Vercel deployment, and minimal setup using SQLite and Octokit ensure quick development.

---

## Setup Guide and Manual

Follow these steps to build, test, and deploy **SmartPR** in a single directory within the 48-hour hackathon window.

---

### Prerequisites

* Node.js (v18+)
* Git
* Trae AI IDE (desktop app)
* Vercel account
* GitHub account
* Novita.ai account
* Zilliz account
* Terminal (e.g., VS Code Terminal, macOS Terminal, PowerShell)

---

## Step-by-Step Setup

### 1. Set Up Trae AI IDE

**Purpose**: Development platform for code analysis, agent creation, and GitHub integration.

**Steps**:

* Sign up at [www.trae.ai](https://www.trae.ai)
* Download and install the IDE
* Create a project named `smartpr`
* Configure a custom agent with a code analysis prompt
* Enable MCP framework for GitHub integration (see in-app docs)

---

### 2. Create a GitHub Repository

**Purpose**: Host the project and enable API access.

**Steps**:

* Initialize Git inside the project directory
* Create `.gitignore`, `README.md`, and `package.json`
* Commit files and push to GitHub
* Create a public GitHub repo named `smartpr` with MIT License
* Generate a personal access token with `repo` scope

---

### 3. Initialize Backend (Node.js + Express)

**Purpose**: Set up API for pull request analysis and GitHub comment posting.

**Steps**:

* Install Express, Octokit, SQLite, Axios, dotenv, and Zilliz SDK
* Create backend files (`server.js`, `.env`, `reviews.db`)
* Use Trae AI IDE to:

  * Generate API endpoints:

    * `GET /pr`: Fetch PR diffs
    * `POST /analyze`: Analyze with Claude 3.7
    * `POST /comment`: Post to GitHub
  * Integrate SQLite for metadata
  * Test the server locally

---

### 4. Initialize Frontend (React + Vite)

**Purpose**: Create a UI for displaying pull request and review information.

**Steps**:

* Install dependencies: Vite, React, Axios, Shadcn UI, Tailwind CSS
* Configure Tailwind and Vite
* Set up HTML template and React entry files
* Use Trae AI IDE to:

  * Generate UI components (dashboard, comments)
  * Call backend APIs using Axios
* Run development server locally

---

### 5. Set Up Novita.ai API

**Purpose**: Generate review comments using Claude 3.7.

**Steps**:

* Register at [Novita.ai Zero Limit](https://novita.ai/zerolimit)
* Generate and store API key in `.env`
* Test the Claude API manually
* Integrate API with Trae AI IDE in `/analyze` endpoint

---

### 6. Set Up Zilliz Vector Database

**Purpose**: Store vectorized code for semantic search.

**Steps**:

* Sign up at [cloud.zilliz.com](https://cloud.zilliz.com)
* Create a Milvus cluster and generate API key
* Store key in `.env`
* Use Trae IDE to:

  * Create `code_patterns` collection
  * Vectorize code using embeddings
  * Enable search in `/analyze` endpoint

---

### 7. Deploy to Vercel

**Purpose**: Host fullstack project with a public demo URL.

**Steps**:

* Install Vercel CLI
* Run deployment command
* In Vercel Dashboard:

  * Set environment variables
  * Configure backend and frontend paths
* Copy deployed URL for submission

---

### 8. Test and Prepare Submission

**Purpose**: Final testing and delivery.

**Steps**:

* Test backend (`node server.js`)
* Test frontend (`npm run dev`)
* Commit and push code
* Record 2–3 minute demo showing:

  * Trae agent in action
  * GitHub comments
  * Frontend displaying analysis
* Submit via [lablab.ai](https://www.lablab.ai):

  * GitHub Repo
  * Demo URL
  * Video demo
  * Description emphasizing Trae, Novita.ai, and Zilliz integrations

---

## Troubleshooting

* **Trae IDE**: Use in-app help or Discord for issues with MCP or agents
* **Novita.ai**: Ensure API key is valid and post-kickoff credits are available
* **Zilliz**: Test embeddings with small samples
* **GitHub API**: Ensure token scope is correct and check for rate limits
* **Vercel**: Confirm all environment variables are correctly set

---

## Notes

* **Single Directory**: Keeps frontend and backend in the same `smartpr` directory
* **Hackathon Compliance**: Built entirely in Trae AI IDE
* **Open Source**: Ensure MIT license and public access on GitHub
* **Support**: Use lablab.ai Discord for questions and support

---

Let me know if you'd like this exported as a `.md` file or converted into a Notion or PDF version.
