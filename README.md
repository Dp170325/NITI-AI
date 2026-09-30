# 🏛️ NITI AI — Empowering Indian Entrepreneurs with AI Scheme Intelligence

> A self-hosted, multilingual AI platform designed to help Indian entrepreneurs seamlessly discover, match, and navigate personalized central and state government schemes, subsidies, and credit-linked financial incentives.

[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-orange?style=flat&logo=cloudflare)](https://niti-ai.hg497kg.workers.dev/)
[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blue?style=flat&logo=github)](https://kgupta171025.github.io/NITI-AI/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Deployments

- **Primary Cloudflare Production:** [https://niti-ai.hg497kg.workers.dev/](https://niti-ai.hg497kg.workers.dev/)
- **Alternative Domain:** [https://niti-ai.pages.dev/](https://niti-ai.pages.dev/)
- **GitHub Pages Portal:** [https://kgupta171025.github.io/NITI-AI/](https://kgupta171025.github.io/NITI-AI/)

---

## ✨ Key Features

- **🎯 Intelligent Scheme Matching:** Smart rule-based and semantic engine that evaluates business stage, sector, demographic eligibility (gender, category, location), and funding requirements against hundreds of national & state schemes (e.g., PMEGP, Stand-Up India, MUDRA, CGTMSE).
- **🗣️ Multilingual NITI Saathi AI:** Conversational mentor supporting English, Hindi, and regional languages for scheme query resolution, document assistance, and application guidance.
- **🔐 Secure Authentication:** Seamless email/password, Google OAuth, and Apple sign-in backed by Firebase Authentication and Cloud Firestore profile persistence.
- **⚡ Interactive Modern UI:** High-performance Liquid Glass interface with sound-reactive voice animations, thinking orbs, metallic badges, and responsive rounded controls.
- **📊 Personalized Roadmap:** Generates step-by-step milestone roadmaps for eligibility verification, document preparation, portal application, and subsidy disbursal.
- **🚀 Edge-Optimized Performance:** Static generation on Next.js 14 deployed to Cloudflare Workers with global CDN static asset streaming and sub-100ms load times.

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

```bash
# Start Next.js development server
pnpm dev

# Build all packages & export static application
pnpm run build

# Run TypeScript checks across packages
pnpm -r typecheck
```

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
