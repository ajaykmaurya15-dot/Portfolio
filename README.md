<<<<<<< HEAD
# Ajaykumar Kailash Maurya - Senior Software Engineer Portfolio

A highly interactive, professional, and uniquely architected personal portfolio built to showcase deep technical expertise in Java, Backend Architecture, and Industrial SCADA Solutions. 

This project abandons traditional build tools (like Webpack or Vite) in favor of a modern **Zero-Build-Step ESM Architecture**, running directly in the browser using native ES modules and import maps.

## 🚀 Technologies Used

*   **React.js (v18)**: Core UI library.
*   **TypeScript**: Ensuring type safety and robust component interfaces.
*   **Material UI (MUI v5)**: Comprehensive, enterprise-grade component library and theming engine.
*   **Framer Motion**: Industry-standard library for fluid, physics-based animations and transitions.
*   **Lucide React**: Clean, modern iconography.
*   **ESM (`esm.sh`)**: Direct browser module resolution utilizing HTML `<script type="importmap">`, bypassing the need for a local Node.js build step.

## ⚙️ Specifications & Features

*   **Immersive Theming**: Fully integrated Light/Dark mode managed through MUI's `ThemeProvider`, complete with an animated, theme-aware particle background (`ImmersiveBackground.tsx`).
*   **Data-Driven Design**: All portfolio content (Experience, Projects, Skills) is strictly decoupled from the UI and centralized in `constants.ts` for effortless updates.
*   **Dynamic Animations**: Staggered component entrances, scroll-linked progress bars, and physics-based drag interactions using Framer Motion.
*   **Terminal Hero Section**: A customized Hero component featuring a simulated Java class code block to instantly communicate backend proficiency.
*   **Responsive Layout**: Fluidly adapts from mobile screens to ultrawide desktop monitors.

---

## 🤖 Meet Megami (Your Virtual Companion)

One of the standout features of this portfolio is **Megami** (`components/Megami.tsx`) — an interactive, autonomous virtual assistant that floats on the screen to guide visitors. 

She isn't just a static graphic; she is a complex state machine with the following capabilities:
*   **Tour Guide Mode**: Megami can take visitors on a guided scroll-tour of the portfolio's sections, pointing out key highlights.
*   **Dynamic Moods**: She transitions between multiple emotional states (`neutral`, `happy`, `shy`, `angry`, `hungry`, `sad`) based on user interactions and time.
*   **Interactive Needs**: 
    *   *Hunger*: Over time, her battery depletes. Users must "feed" her by dragging and dropping a floating battery/energy icon to her.
    *   *Affection*: Users can give her colored hearts, to which she reacts dynamically (even offering a digital rose in return).
    *   *Poking*: Clicking her triggers varying reactions, ranging from giggles to getting annoyed if clicked too many times in a row.
*   **Physics & Roaming**: When left alone, she autonomously roams the screen. She can also be dragged around manually by the user using Framer Motion's spring physics.

---

## 📁 Project Structure

The application follows a modular, flat-component structure optimized for the ESM-native setup:

```text
/
├── index.html                 # Main entry point containing the ESM importmap and global CSS
├── index.tsx                  # React application bootstrap
├── App.tsx                    # Root layout, structure, and ThemeProvider
├── constants.ts               # Centralized data store (Profile, Skills, Projects, Experience)
├── types.ts                   # Global TypeScript interface definitions
└── components/                # Reusable UI Components
    ├── About.tsx              # Bio and key metrics grid
    ├── Contact.tsx            # Contact form and social links
    ├── Experience.tsx         # Vertical professional timeline
    ├── Footer.tsx             # Page footer
    ├── Header.tsx             # Sticky App bar with mobile drawer & theme toggle
    ├── Hero.tsx               # Landing section with Java terminal aesthetic
    ├── ImmersiveBackground.tsx# Animated, theme-aware particle background
    ├── Megami.tsx             # The interactive virtual mascot
    ├── Projects.tsx           # Featured work grid using MUI Cards
    ├── ReflowText.tsx         # Specialized typography component
    ├── ScrollProgress.tsx     # Top fixed scroll progress indicator
    ├── Skills.tsx             # Categorized technical skills with progress bars
    ├── TechCube.tsx           # 3D rotating technology cube (desktop only)
    ├── TextReveal.tsx         # Animated text reveal utility
    ├── TiltCard.tsx           # 3D mouse-tracking tilt effect wrapper
    └── Magnetic.tsx           # Magnetic mouse-pull effect wrapper
```

## 🌐 Running the Project

Because this project utilizes a zero-build-step architecture with `importmap`s, you do not need `npm run dev` or a local bundler. 

1. Simply serve the directory using any local web server (e.g., Live Server extension in VS Code, Python's `http.server`, or `npx serve`).
2. Open `index.html` in your browser.
3. *Note: Ensure you are using a modern browser that supports `<script type="importmap">`.*

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======

>>>>>>> 
