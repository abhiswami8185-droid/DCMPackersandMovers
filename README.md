# DCM Packers & Movers — Digital Relocation Platform

Enterprise-grade digital relocation platform built for **DCM Packers & Movers** (Tagline: *"Safe Move • Happy You"*), featuring a customer booking wizard, real-time consignment tracking, operational admin command center with light/dark theme support, field staff mobile app, and a future-ready Firebase architecture.

---

## 🚀 Client Demo Status

- **Status:** Presentation / Client Demo Release
- **Target URL:** [https://abhiswami8185-droid.github.io/DCMPackersandMovers/](https://abhiswami8185-droid.github.io/DCMPackersandMovers/)
- **Repository:** [https://github.com/abhiswami8185-droid/DCMPackersandMovers](https://github.com/abhiswami8185-droid/DCMPackersandMovers)
- **Deployment Platform:** GitHub Pages via GitHub Actions (Official Vite + Static Artifact flow)
- **Backend Mode:** **Demo Mode (`VITE_APP_BACKEND_PROVIDER="mock"`)**

> **Note on Firebase:**
> Firebase is **intentionally not connected** in this demo build. No personal accounts, personal credentials, or external cloud resources are used. The platform runs on self-contained local repository providers with realistic sample data for leads, quotes, active moves, surveys, payments, fleet status, and damage claims.
>
> The full Firebase architecture (Firestore schemas, RBAC rules, storage rules, and adapter layers) is preserved and ready to be connected once DCM provides their official corporate Firebase credentials.

---

## 🛠️ Architecture & Tech Stack

```text
CURRENT CLIENT DEMO (GitHub Pages)

React 19 + TypeScript + Vite 8 + Tailwind CSS
                    ↓
        Repository Service Layer
                    ↓
  Mock Backend Provider (In-Memory/LocalStorage)
                    ↓
                npm run build
                    ↓
             dist/ (.nojekyll)
                    ↓
  GitHub Actions (.github/workflows/deploy.yml)
                    ↓
              GitHub Pages
```

```text
FUTURE CLIENT PRODUCTION ARCHITECTURE

React 19 + TypeScript + Vite
                    ↓
        Repository Service Layer
                    ↓
       Firebase Backend Provider
                    ↓
    Client-Owned Google Cloud / Firebase Project
      ├── Firebase Authentication (RBAC: Admin, Manager, Staff, Customer)
      ├── Cloud Firestore (Encrypted Database + Security Rules)
      ├── Firebase Storage (E-Signatures, Photos, Inventory Sheets)
      └── Payment Gateway (Razorpay India Integration)
```

---

## 📦 Local Development & Build

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
The dev server starts on `http://localhost:3000/`.

### Run Production Build (GitHub Pages target)
```bash
npm run build
```
This generates the optimized bundle in `dist/` with the repository base path `/DCMPackersandMovers/`.

---

## ⚙️ GitHub Pages Setup Instructions

1. Push this repository to GitHub: `https://github.com/abhiswami8185-droid/DCMPackersandMovers`.
2. Go to the repository **Settings** tab.
3. In the left navigation, click **Pages** (under *Code and automation*).
4. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
   *(Do NOT select "Deploy from a branch" / "docs" — that triggers legacy Jekyll).*
5. The included workflow `.github/workflows/deploy.yml` will automatically build and publish the site whenever changes are pushed to `main`.
6. Once deployed, the demo will be live at:
   `https://abhiswami8185-droid.github.io/DCMPackersandMovers/`

---

## 🔒 Security Rules & Client Handoff

The following production security rules are maintained in this repository for the client's future production rollout:
- `firestore.rules` — Granular role-based access control (Admin, Manager, Staff, Customer).
- `storage.rules` — Authenticated storage rules for survey media, consignment photos, and claims.
- `FIREBASE_DEPLOYMENT_GUIDE.md` — Step-by-step handoff guide for the client's IT team.
