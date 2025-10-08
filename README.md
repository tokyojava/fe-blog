# 🧭 Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** My Frontend Blog  
**Target Users:** Individual developers/learners  
**Product Goal:**  
A personal blog system that supports Markdown writing, allowing you to write diaries or technical notes. It also includes basic AI Agent capabilities (e.g., summarizing articles, generating tags, answering reader questions, etc.).

This is a person project which aims to
1. Try out the latest technologies
2. Try to build a system via "Vibe coding", meaning that quite a big portion of the code base was assisted by **Github Co-pilot**.
2. Try to build a project in a FullStack way: both Frontend + Backend
3. Try out some of the famous frontend libs
4. Finally, after I finish this project, I will try to upload a video to share
the whole process of how everything was built

**Technology used**:
- **Next.js**
  - App Router
  - React Server Component
  - Server Action
  - Turbopack
  - Vercel deployment
- **UI**
  - Tailwind css
  - Shadcn
  - Responsive design
- **Authentication**
  - Signup/Signin using Email + Password
  - Github login (TBD)
  - Google login (TBD)
- **Other tools**
  - MongoDB(Atlas)
  - Markdown
  - OpenAI-based agent using Langchain(Tech investigated, coding not started)
  - Message Queue: to extract blog info into RAG once published (To be investigated)

---

## 2. Core Features

### 1️⃣ Basic Blog Features (MVP must-have)

| Feature       | Description                              |
| ------------- | ---------------------------------------- |
| 📝 Article Management | Support creating/editing/deleting articles in Markdown format, with image upload support |
| 🗂 Categories and Tags | Each article can have categories and tags assigned |
| 📅 Diary Mode         | Articles can be categorized as "Blog" (public) or "Diary" (private). New "Diary" articles are hidden from the homepage by default and are only visible to the author |
| 🔍 Search Function     | Search by title, tags, or content keywords |
| 🧭 Blog Homepage       | Display a list of articles (with summaries, timestamps, and tags) |
| 📄 Article Details Page | Render Markdown, provide table of contents, and navigation for previous/next articles |
| 🧑‍💻 Login System      | The login interface allows users to choose between GitHub or Email+Password login. For Email, registration is also supported |

---

### 2️⃣ AI Agent Features (Learning Focus)

| Feature         | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| 🧠 Smart Summary | Automatically generate summaries or TL;DR sections after publishing articles |
| 🏷️ Smart Tags     | Automatically extract keywords from articles to generate tags |

---

### 3️⃣ System Extension Features (Optional)

| Feature          | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| 📈 Visit Statistics | Record the number of views for each "Blog" article and track daily PV/UV |
| 💾 Data Storage     | Articles are stored in the database                      |
| 🌙 Theme Switching  | Support light and dark modes                             |

---

## 3. System Architecture

### Suggested Tech Stack

| Module          | Technology                                              |
| --------------- | ------------------------------------------------------- |
| Frontend        | Next.js 15 + React Server Components + TailwindCSS      |
| Backend         | Next.js App Router (Server Actions)                     |
| Database        | MongoDB                                                 |
| Authentication  | NextAuth (currently supports GitHub only)               |
| Markdown Editor | react-markdown                                          |
| Deployment      | Vercel                                                  |

---

## 4. User Stories (Simplified)

| User       | Scenario                     | Goal                                                   |
| ---------- | ---------------------------- | ------------------------------------------------------ |
| Visitor    | Open the blog homepage, and if not logged in, click "Login" | Choose between GitHub and Email. For Email, registration is available |
| Visitor    | Register a new account       | When choosing Email, the user must provide an email, password, confirm the password, and a username |
| Author     | After logging in             | Create/edit articles (Markdown)                       |
| Author     | After saving an article      | Automatically generate summaries and tags             |
| Visitor    | Open the blog homepage       | Read the list of article summaries                    |

---

## 5. MVP Goals (1-2 weeks)

- Markdown writing + saving
- Blog homepage + details page
- AI-generated summaries and tags
- Login system

---

## 6. Additional Requirements (Add below this section)
- 2025/10/07 This is an example, please ignore



