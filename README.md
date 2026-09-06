# 🏥 MedCare

> **"One patient. Three roles. One continuous clinical story."**

MedCare is a full-featured, AI-powered unified clinical platform built for a hackathon that bridges the gap between **patients**, **nurses**, and **doctors**. It features real-time shared clinical state, multi-agent AI triage, surgical journey education, medico-legal guidance, and more — all wrapped in a premium dark-mode UI.

---

## 📋 Table of Contents

- [Features Overview](#-features-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Feature Deep-Dive](#-feature-deep-dive)
  - [Login & Role Selection](#1-login--role-selection)
  - [Patient Portal](#2-patient-portal)
    - [Dashboard](#21-patient-dashboard)
    - [AI Triage Council](#22-ai-triage-council)
    - [Surgery Journey](#23-surgery-journey)
    - [Medico-Legality Chat](#24-medico-legality-chat)
  - [Nurse Dashboard](#3-nurse-dashboard)
  - [Doctor Dashboard](#4-doctor-dashboard)
- [API Routes](#-api-routes)
- [Running Tests](#-running-tests)
- [Design System](#-design-system)

---

## ✨ Features Overview

| Feature | Role | Description |
|---|---|---|
| AI Triage Council | Patient | Multi-agent AI symptom checker with hard safety rules |
| LASIK Surgery Journey | Patient | 8-step image carousel with bilingual Read More guide |
| Appendix Surgery Journey | Patient | 9-step image carousel with bilingual Read More guide |
| Add Custom Surgery | Patient | Upload images & text for new procedure types |
| Medico-Legality Chat | Patient | AI advocate (Mukundan Unni) answers legal questions |
| Nurse Ward Dashboard | Nurse | Real-time vitals, handover notes, audit trail |
| Doctor Alert Dashboard | Doctor | Critical patient alerts, SBAR reports, calculators |
| Shared Clinical State | All | Zustand-powered cross-role synchronised data |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI** | React 19 |
| **Styling** | Tailwind CSS v4 (Dark Mode + Pastel Design System) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **State Management** | Zustand v5 |
| **AI / LLM** | Groq API (primary) → ModelScope/Qwen (fallback) |
| **Runtime** | Node.js (via Next.js API routes) |

---

## 📂 Project Structure

```
MedCare/
├── app/
│   ├── api/
│   │   ├── triage/
│   │   │   └── route.ts          # AI Triage Council — multi-agent API
│   │   └── medico-legal/
│   │       └── route.ts          # Medico-Legality AI — Mukundan Unni advocate
│   │
│   ├── login/                    # Role-based login screen
│   ├── page.tsx                  # Landing / role selector page
│   │
│   ├── patient/
│   │   ├── dashboard/page.tsx    # Patient home with all feature cards
│   │   ├── triage/page.tsx       # AI Triage symptom checker UI
│   │   ├── medico-legality/
│   │   │   └── page.tsx          # Medico-Legal chat (Dhamu + Mukundan Unni)
│   │   └── surgery/
│   │       ├── page.tsx          # Surgery type selector (3 cards)
│   │       ├── lassik/
│   │       │   ├── page.tsx      # LASIK image carousel + Read More modal
│   │       │   └── images/       # eye_1.png … eye_8.png (8 steps)
│   │       ├── appendix/
│   │       │   ├── page.tsx      # Appendix image carousel + Read More modal
│   │       │   └── images/       # app1.png … app8.png + image.png (9 steps)
│   │       └── add/
│   │           └── page.tsx      # Custom surgery upload page
│   │
│   ├── nurse/
│   │   └── dashboard/page.tsx    # Nurse vitals, handover, audit trail
│   │
│   ├── doctor/
│   │   └── dashboard/page.tsx    # Doctor alerts, SBAR, calculators
│   │
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   └── globals.css               # Tailwind base + global CSS variables
│
├── lib/
│   └── store.ts                  # Zustand shared clinical state engine
│
├── public/
│   └── characters/
│       ├── dhamu.jpg             # Dashamoolam Dhamu character photo
│       └── mukundan.png          # Advocate Mukundan Unni character photo
│
├── scripts/
│   └── test-triage.mjs           # Triage API test suite
│
├── .env.local                    # Your local API keys (not committed)
├── .env.example                  # Example env template
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js v18+ 
- npm v9+

### 1. Clone & Install

```bash
git clone https://github.com/Shravan-Balakrishnan/MedCare.git
cd MedCare
npm install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your API keys:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
# Groq (Primary AI provider — fast inference)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama3-70b-8192
GROQ_API_BASE=https://api.groq.com/openai/v1

# ModelScope / Qwen (Fallback AI provider)
MODEL_API_KEY=your_modelscope_token_here
MODEL_NAME=Qwen/Qwen2.5-72B-Instruct
MODEL_API_BASE=https://api-inference.modelscope.ai/v1
```

> **Note:** The Medico-Legality feature degrades gracefully to a built-in mock response if no API key is set. The Triage feature uses simulated agents and works without any API key.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

### 5. Lint

```bash
npm run lint
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | For AI chat | API key from [console.groq.com/keys](https://console.groq.com/keys) |
| `GROQ_MODEL` | Optional | Model name (default: `llama3-70b-8192`) |
| `GROQ_API_BASE` | Optional | Groq endpoint (default set) |
| `MODEL_API_KEY` | Fallback only | ModelScope token for Qwen fallback |
| `MODEL_NAME` | Optional | Qwen model variant |
| `MODEL_API_BASE` | Optional | ModelScope endpoint |

---

## 🔍 Feature Deep-Dive

### 1. Login & Role Selection

**Route:** `/`  
The landing page presents three role cards:
- 🧑‍🦽 **Patient** → `/patient/dashboard`
- 👩‍⚕️ **Nurse** → `/nurse/dashboard`
- 👨‍⚕️ **Doctor** → `/doctor/dashboard`

No actual authentication is required — role selection is immediate for demonstration purposes.

---

### 2. Patient Portal

#### 2.1 Patient Dashboard

**Route:** `/patient/dashboard`

The central hub for all patient-facing features. Shows:
- **Health stats row** — Health Score, Steps Today, Upcoming Appointments, Active Medications
- **3 main action cards:**
  - 🩺 **Start Triage** (pink) — AI symptom checker
  - 💙 **My Surgery Journey** (teal) — surgical procedure viewer
  - ⚖️ **Medico Legality** (yellow/gold) — AI legal advisor
- **Quick Access** cards — My Records, Prescriptions, Appointments
- **Daily Health Tip** banner

---

#### 2.2 AI Triage Council

**Route:** `/patient/triage`  
**API:** `POST /api/triage`

The most technically sophisticated feature. It evaluates patient symptoms using a **two-layer safety architecture**:

**Layer 1 — Hard Safety Rules (Deterministic)**  
Before any AI is involved, the system checks for 20+ dangerous keyword patterns (e.g., "chest pain + left arm", "suicidal", "can't breathe"). These immediately escalate to `URGENT` or `ESCALATE` without AI involvement — zero hallucination risk.

**Layer 2 — AI Council (4 Simulated Agents)**  
If no hard rule fires, four AI agents collaborate:

| Agent | Role | Output |
|---|---|---|
| **Dhanvantari** | Clinical Extractor | Identifies clinical features & red flags |
| **Vishwamitra** | Urgency Estimator | Assigns urgency level with reasoning |
| **Chanakya** | Safety Vetoist | Can override if a safety concern is detected |
| **Bhishma** | Communication | Evaluates clarity, adjusts panic risk |

**Urgency levels:** `URGENT` → `PRIORITY` → `NON-URGENT` → `ESCALATE`

**Usage:**
1. Navigate to `/patient/triage`
2. Type your symptoms in plain language (e.g., *"I have a headache and fever since two days"*)
3. Receive urgency classification, reason codes, and recommended action

---

#### 2.3 Surgery Journey

**Route:** `/patient/surgery`

A selection screen with 3 surgery cards:

---

**LASIK Surgery** → `/patient/surgery/lassik`

An 8-step image carousel explaining the LASIK eye surgery procedure:
- **Sidebar** (toggleable via ☰ hamburger button) shows thumbnail navigation for all 8 steps
- **Main image viewer** — large display of the current step
- **Previous / Next buttons** — navigate step by step
- **Read More modal** — opens a bilingual (Malayalam + English) deep-dive guide:
  - *LASIK യാത്ര — രോഗികൾക്കുള്ള ലളിതമായ ഗൈഡ്* (Malayalam)
  - *LASIK Journey — A Simple Guide for Patients* (English)
  - Covers: What is LASIK, pre-op checks, flap creation, laser reshaping, flap repositioning, immediate aftercare, recovery, follow-up

**Images:** `lassik/images/eye_1.png` → `eye_8.png`

---

**Appendix Surgery** → `/patient/surgery/appendix`

A 9-step image carousel explaining laparoscopic appendectomy:
- Same UI as LASIK — sidebar, toggleable, Next/Previous navigation
- **Read More modal** — bilingual (Malayalam + English) guide:
  - *അപ്പെൻഡിക്സ് ശസ്ത്രക്രിയ — രോഗികൾക്കുള്ള ലളിതമായ ഗൈഡ്* (Malayalam)
  - *Appendectomy — A Simple Guide* (English)
  - Covers: What is the appendix, diagnosis, pre-op preparation, laparoscopic access, identifying appendix, removal, closure, recovery

**Images:** `appendix/images/app1.png` → `app8.png` + `image.png` (9 images total)

---

**Add Custom Surgery** → `/patient/surgery/add`

An upload interface for adding new procedure types:
- **Upload Images** panel — drag-and-drop style file picker (supports JPG, PNG, GIF)
- **Upload Text Guide** panel — rich text area to paste or write procedure descriptions
- Designed for future backend integration

---

#### 2.4 Medico-Legality Chat

**Route:** `/patient/medico-legality`  
**API:** `POST /api/medico-legal`

An AI-powered legal consultation chat featuring two characters from Kerala cinema:

**Characters:**
| Character | Role | Position |
|---|---|---|
| **Dashamoolam Dhamu** | The confused patient with questions | Left side |
| **Adv. Mukundan Unni** | The dramatic Kerala advocate AI | Right side |

**How it works:**
1. Type a medico-legal question in the input bar (Malayalam or English)
2. Dhamu's speech bubble displays your question in real time as you type
3. On submit, Mukundan Unni's response typewriters in character-by-character
4. Characters react dynamically with emoji badges based on response tone:
   - ⚖️ **Stern** (red glow) — serious legal consequences
   - ✅ **Happy** (green glow) — patient is in the right
   - 🗣️ **Talking** (blue glow) — general explanation
   - 🤔 **Thinking** — AI is processing

**AI Persona:** Mukundan Unni speaks theatrically, mixes Malayalam and English, cites real Indian laws:
- Consumer Protection Act 2019
- Clinical Establishments Act
- Indian Medical Council Act
- Right to Information (RTI) Act
- Indian Penal Code (IPC) sections for medical negligence
- Patient Rights Charter

**Suggested starter questions (pre-filled buttons):**
- "Hospital bill kooduthal aayaal enthu cheyyam?" *(Bill too high?)*
- "Doctor consent ohne operation cheythaal?" *(Surgery without consent?)*
- "Medical records copy kittaan right undо?" *(Right to medical records?)*
- "Medical negligence case file cheyyaan kazhiyumо?" *(Can I file a negligence case?)*

**AI Provider chain:** Groq → ModelScope → Built-in fallback mock

---

### 3. Nurse Dashboard

**Route:** `/nurse/dashboard`

A clinical ward management interface:
- **Patient list** with priority colour-coding (Urgent = red, Priority = amber, Stable = green)
- **Vitals editor** — BP, HR, SpO₂, Temperature with real-time delta calculations vs baseline
- **Handover Snapshot** — capture current vitals as the shift baseline
- **Clinical Audit Trail** — chronological log of all changes and actions
- State is synced via Zustand — changes are instantly visible on the Doctor dashboard

---

### 4. Doctor Dashboard

**Route:** `/doctor/dashboard`

A clinical decision support interface:
- **Critical Alerts panel** — surfaces patients with deteriorating vitals from the shared state
- **Auto SBAR Generator** — one-click generation of Situation, Background, Assessment, Recommendation structured handover notes, pre-filled from live patient data
- **Clinical Calculators** — BMI, Mean Arterial Pressure (MAP), Body Surface Area (BSA); auto-populate from selected patient metrics

---

## 🌐 API Routes

### `POST /api/triage`

Evaluates patient symptoms and returns urgency classification.

**Request body:**
```json
{
  "symptoms": "I have chest pain and my left arm feels numb",
  "age": 55,
  "context": "optional additional clinical context"
}
```

**Response:**
```json
{
  "urgency": "URGENT",
  "reason_codes": ["CARDIAC_SYMPTOMS", "RED_FLAG_NEURO"],
  "recommended_action": "Call emergency services immediately.",
  "diagnosis": null,
  "triggered_by": "HARD_RULE",
  "processing_ms": 12
}
```

**Urgency levels:** `URGENT` | `PRIORITY` | `NON-URGENT` | `ESCALATE`

---

### `POST /api/medico-legal`

Sends a question to the Mukundan Unni AI advocate persona.

**Request body:**
```json
{
  "message": "Hospital bill kooduthal aayaal enthu cheyyam?"
}
```

**Response:**
```json
{
  "reply": "Dhamu saare! Ningalude chodyam valare nallathanu!..."
}
```

Provider fallback order: **Groq → ModelScope → Built-in mock**

---

## 🧪 Running Tests

The Triage API includes a comprehensive backend test suite covering all hard safety rules and agent decision logic.

**Prerequisites:** Dev server must be running (`npm run dev`)

```bash
# In a separate terminal:
node scripts/test-triage.mjs
```

This runs a battery of test cases including:
- Cardiac emergency detection
- Stroke symptom recognition
- Respiratory distress escalation
- Mental health crisis handling
- Paediatric fever thresholds
- Non-urgent symptom classification

---

## 🎨 Design System

MedCare uses a consistent premium dark-mode aesthetic across all pages:

| Token | Value | Usage |
|---|---|---|
| Background | `#121212` | All page backgrounds |
| Surface | `#1A1D24` | Cards, modals, inputs |
| Teal accent | `#A8DADC` | LASIK, patient badges |
| Pink accent | `#FAD2E1` | Appendix, triage cards |
| Lavender accent | `#E5D9F2` | Add/Custom surgery |
| Gold accent | `#FFF3CD` | Medico Legality |
| Orange accent | `#FFCDB2` | Prescriptions |

**UI Conventions:**
- `rounded-[2rem]` — large pill-shaped cards
- `hover:scale-105` — subtle lift on hover for all interactive cards
- `backdrop-blur` — frosted glass navbar
- `animate-fadeIn` — smooth entrance for modals and sidebars
- `hide-scrollbar` — clean sidebar scrolling without visible scrollbars

---

## 🏗️ Architecture Notes

- **In-Memory State:** The Zustand store is in-memory for demo. State resets on hard reload but persists across client-side navigation (`router.push`).
- **AI Safety:** The Triage system is intentionally designed so AI never produces a `diagnosis`. The `diagnosis` field is always `null`.
- **Graceful Degradation:** All AI features fall back gracefully — the Medico-Legal chat has a built-in mock response so the UI always works even without API keys.
- **Image Storage:** Surgery step images are co-located with their page components (`app/patient/surgery/<type>/images/`) for easy replacement.
- **Bilingual Content:** All patient-facing educational content (Read More modals) is written in both **Malayalam** and **English** side-by-side.

---

## 📸 Screenshots

| Page | Route |
|---|---|
| Patient Dashboard | `/patient/dashboard` |
| AI Triage | `/patient/triage` |
| Surgery Selection | `/patient/surgery` |
| LASIK Journey | `/patient/surgery/lassik` |
| Appendix Journey | `/patient/surgery/appendix` |
| Medico Legality | `/patient/medico-legality` |
| Nurse Dashboard | `/nurse/dashboard` |
| Doctor Dashboard | `/doctor/dashboard` |

---

## 👥 Team

Built for **TinkerHack** hackathon.

Repository: [github.com/Shravan-Balakrishnan/MedCare](https://github.com/Shravan-Balakrishnan/MedCare)
