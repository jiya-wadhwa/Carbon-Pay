# CarbonPay

CarbonPay is a modern web application designed to help users track, analyze, and reduce their carbon footprint. By leveraging AI and cloud technologies, CarbonPay provides actionable insights, visualizations, and rewards to encourage sustainable choices.

## Features

- **Bill Upload & Analysis:** Upload bills and receipts to automatically estimate your carbon footprint.
- **Carbon History:** Visualize your carbon emissions over time with interactive charts.
- **Daily Facts:** Receive daily sustainability tips and facts.
- **Leaderboard:** Compete with friends and the community to reduce your carbon impact.
- **Rewards:** Earn rewards for sustainable actions and milestones.
- **AI Suggestions:** Get personalized recommendations for lower-carbon alternatives.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Firebase (Emulators for Auth & Firestore)
- **AI Integration:** Automated bill analysis and carbon estimation
- **Development Environment:** Nix for reproducible builds and workspace setup

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Nix](https://nixos.org/download.html) (for development environment)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/CarbonPay.git
   cd CarbonPay
   ```

2. **Start the development environment (with Nix):**
   ```sh
   nix develop
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Start Firebase emulators:**
   ```sh
   firebase emulators:start
   ```

5. **Run the development server:**
   ```sh
   npm run dev
   ```

6. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  app/           # Next.js app directory
  components/    # Reusable UI components
  features/      # Feature modules (charts, upload, leaderboard, etc.)
  lib/           # Utility libraries
  styles/        # Tailwind and global styles
firebase.json    # Firebase emulator config
dev.nix          # Nix development environment config
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.


*Empowering you to make greener choices, one step at

