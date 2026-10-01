# 🏛️ NITI AI — Empowering Indian Entrepreneurs with AI Scheme Intelligence

> A self-hosted, multilingual AI platform designed to help Indian entrepreneurs seamlessly discover, match, and navigate personalized central and state government schemes, subsidies, and credit-linked financial incentives.

[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-orange?style=flat&logo=cloudflare)](https://niti-ai.hg497kg.workers.dev/)
[![Firebase Hosting](https://img.shields.io/badge/Live-Firebase%20Hosting-FFA611?style=flat&logo=firebase)](https://niti--ai.web.app/)
[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blue?style=flat&logo=github)](https://kgupta171025.github.io/NITI-AI/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Deployments

- **Official Firebase Hosting:** [https://niti--ai.web.app/](https://niti--ai.web.app/) (or [https://niti--ai.firebaseapp.com/](https://niti--ai.firebaseapp.com/))
- **Cloudflare Production:** [https://niti-ai.hg497kg.workers.dev/](https://niti-ai.hg497kg.workers.dev/)
- **Alternative Domain:** [https://niti-ai.pages.dev/](https://niti-ai.pages.dev/)
- **GitHub Pages Portal:** [https://kgupta171025.github.io/NITI-AI/](https://kgupta171025.github.io/NITI-AI/)

---

## ✨ Key Features

- **🎯 Intelligent Government Scheme Matching:**  
  Uses a hybrid rule-based and semantic recommendation engine to match users with relevant central and state government schemes. The system evaluates business stage, industry sector, applicant category, gender, location, funding requirements, business type, and eligibility conditions across schemes such as PMEGP, Stand-Up India, MUDRA, CGTMSE, Startup India, and state-specific programs.

- **🧠 Explainable Eligibility Analysis:**  
  Provides transparent eligibility results with match scores, qualifying conditions, missing requirements, rejection reasons, required documents, and actionable recommendations so users understand exactly why a scheme is suitable.

- **🗣️ Multilingual NITI Saathi AI Mentor:**  
  A conversational AI assistant supporting English, Hindi, and regional languages. It helps users discover schemes, understand eligibility criteria, prepare documents, complete application forms, resolve queries, and receive step-by-step guidance throughout the funding journey.

- **🔐 Secure Authentication and User Profiles:**  
  Supports email/password authentication, Google OAuth, and Apple Sign-In through Firebase Authentication. User profiles, saved schemes, application progress, uploaded documents, preferences, and personalized recommendations are securely managed using Cloud Firestore.

- **📄 Document Readiness and Assistance:**  
  Generates personalized document checklists based on the selected scheme and applicant profile. Users can track document readiness, identify missing files, receive document explanations, and follow preparation instructions before beginning an application.

- **📊 Personalized Application Roadmap:**  
  Creates a milestone-based roadmap covering eligibility verification, business information preparation, document collection, application submission, department verification, sanction approval, and subsidy or loan disbursal.

- **🔔 Application Progress Tracking:**  
  Allows users to monitor the status of each saved scheme or application through stages such as shortlisted, documents pending, submitted, under review, approved, rejected, or disbursed. Optional reminders can notify users about deadlines and pending actions.

- **🎨 Interactive Liquid Glass Interface:**  
  Provides a modern, responsive interface with liquid-glass cards, rounded controls, metallic badges, animated thinking orbs, sound-reactive voice visualizations, smooth transitions, accessible color contrast, and mobile-first layouts.

- **⚡ High-Performance Edge Architecture:**  
  Built with Next.js 14 and optimized for static generation, code splitting, image optimization, caching, and edge delivery. Deployed on Cloudflare Workers with global CDN distribution for fast page rendering and low-latency asset delivery.

- **🛡️ Privacy, Security, and Reliability:**  
  Applies secure authentication, protected user routes, server-side validation, least-privilege Firestore rules, encrypted data transmission, input sanitization, and privacy-focused data handling for sensitive applicant and business information.

- **📱 Responsive and Accessible Experience:**  
  Designed to work consistently across desktops, tablets, and smartphones with keyboard navigation, semantic HTML, screen-reader support, readable typography, responsive forms, and accessible interactive components.

- **📈 Analytics and Continuous Improvement:**  
  Tracks anonymized search patterns, popular schemes, user drop-off points, application completion rates, and mentor interactions to improve scheme coverage, recommendation quality, and overall user experience.


---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) (App Router, Static Export), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/), Framer Motion, Lucide Icons |
| **State & Data Store** | [Zustand](https://github.com/pmndrs/zustand), SWR, LocalStorage |
| **Authentication & DB** | [Firebase Auth](https://firebase.google.com/products/auth), [Cloud Firestore](https://firebase.google.com/products/firestore) |
| **Deployment & Hosting**| [Cloudflare Workers](https://workers.cloudflare.com/) (Static Assets), [GitHub Pages](https://pages.github.com/) |
| **Monorepo Tooling** | [pnpm](https://pnpm.io/) workspaces, ESLint, TypeScript compiler |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v22.x` (LTS recommended)
- **pnpm**: `v9.x` or `v10.x+`

### Installation

```bash
# Clone the repository
git clone https://github.com/KGupta171025/NITI-AI.git
cd NITI-AI

# Install all workspace dependencies
pnpm install

# Configure environment variables
cp .env.example apps/web/.env.local
```

### Running Locally



Open [http://localhost:3000](http://localhost:3000) with your browser to explore NITI AI.

---

## 👥 Contributors

A special thank you to all the core contributors of the NITI AI platform:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/KGupta171025">
        <img src="https://github.com/KGupta171025.png" width="100px;" alt="Krishna Gupta"/><br />
        <sub><b>Krishna Gupta</b></sub>
      </a><br />
      <sub>Lead Developer & Architect</sub><br />
      <a href="https://github.com/KGupta171025">💻 @KGupta171025</a>
    </td>
    <td align="center">
      <a href="https://github.com/Dp170325">
        <img src="https://github.com/Dp170325.png" width="100px;" alt="Deepika Patel"/><br />
        <sub><b>Deepika Patel</b></sub>
      </a><br />
      <sub>Core Contributor</sub><br />
      <a href="https://github.com/Dp170325">💻 @Dp170325</a><br />
      <sub><a href="mailto:dppatel.deepika@gmail.com">✉️ dppatel.deepika@gmail.com</a></sub>
    </td>
    <td align="center">
      <a href="https://github.com/himanimaneshwar">
        <img src="https://github.com/himanimaneshwar.png" width="100px;" alt="Himani Maneshwar"/><br />
        <sub><b>Himani Maneshwar</b></sub>
      </a><br />
      <sub>Core Contributor</sub><br />
      <a href="https://github.com/himanimaneshwar">💻 @himanimaneshwar</a><br />
      <sub><a href="mailto:himanimaneshwar4@gmail.com">✉️ himanimaneshwar4@gmail.com</a></sub>
    </td>
  </tr>
</table>

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
