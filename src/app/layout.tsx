import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CursorFollower } from "@/components/CursorFollower";
import { LetterboxIntro } from "@/components/LetterboxIntro";
import { AmbientToggle } from "@/components/AmbientToggle";

// Ambient background loop, opt-in via the corner toggle.
//   ambient.mp3   "Sunday Driver Loop" by GrumpyNora — Pixabay (no attribution required)
//   crackle.m4a   Vinyl Runoff Loop by 8bitmyketison — Freesound CC0
const AMBIENT_SRC: string | undefined = "/audio/ambient.mp3";
const CRACKLE_SRC: string | undefined = "/audio/crackle.m4a";

const arsenica = localFont({
  variable: "--font-arsenica",
  src: [
    { path: "./fonts/Arsenica-Antiqua-Regular-trial.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Arsenica-Antiqua-Italic-trial.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Arsenica-Antiqua-Medium-trial.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Arsenica-Antiqua-Demi-Bold-trial.ttf", weight: "600", style: "normal" },
  ],
  display: "swap",
});

const gagen = localFont({
  variable: "--font-gagen",
  src: [
    { path: "./fonts/GagenDemo-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/GagenSlantedDemo-Light.otf", weight: "300", style: "italic" },
    { path: "./fonts/GagenDemo-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/GagenSlantedDemo-Regular.otf", weight: "400", style: "italic" },
    { path: "./fonts/GagenDemo-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/GagenSlantedDemo-Medium.otf", weight: "500", style: "italic" },
    { path: "./fonts/GagenDemo-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/GagenSlantedDemo-SemiBold.otf", weight: "600", style: "italic" },
    { path: "./fonts/GagenDemo-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/GagenSlantedDemo-Bold.otf", weight: "700", style: "italic" },
  ],
  display: "swap",
});

const schrifted = localFont({
  variable: "--font-schrifted",
  src: [
    { path: "./fonts/SFT Schrifted Serif TRIAL Display Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/SFT Schrifted Serif TRIAL Display Light Italic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/SFT Schrifted Serif TRIAL Display Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/SFT Schrifted Serif TRIAL Display Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/SFT Schrifted Serif TRIAL Display Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/SFT Schrifted Serif TRIAL Display Medium Italic.ttf", weight: "500", style: "italic" },
  ],
  display: "swap",
});

const schriftedSubhead = localFont({
  variable: "--font-schrifted-sub",
  src: [
    { path: "./fonts/SFT Schrifted Serif TRIAL Subhead Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/SFT Schrifted Serif TRIAL Subhead Italic.ttf", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const alugfte = localFont({
  variable: "--font-alugfte",
  src: [
    { path: "./fonts/alugfte-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/alugfte-italic.otf", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const nordstove = localFont({
  variable: "--font-nordstove",
  src: [
    { path: "./fonts/nordstove.otf", weight: "400", style: "normal" },
  ],
  display: "swap",
});

const machina = localFont({
  variable: "--font-machina",
  src: [
    { path: "./fonts/NeueMachina-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/NeueMachina-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/NeueMachina-Ultrabold.otf", weight: "800", style: "normal" },
  ],
  display: "swap",
});

const fliege = localFont({
  variable: "--font-fliege",
  src: [
    { path: "./fonts/FliegeMono-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/FliegeMono-Medium.otf", weight: "500", style: "normal" },
  ],
  display: "swap",
});

const magnat = localFont({
  variable: "--font-magnat",
  src: [
    { path: "./fonts/MagnatPoster-Light.otf", weight: "300", style: "normal" },
  ],
  display: "swap",
});

const craftwork = localFont({
  variable: "--font-craftwork",
  src: [
    { path: "./fonts/CraftworkGrotesk-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/CraftworkGrotesk-Medium.ttf", weight: "500", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "my dear self — Letters from your future self, spoken in your own voice",
  description:
    "An app that uses AI to clone your voice and build a personalized affirmation library plus a future-self letter writer. Trained on the specific life you describe.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${arsenica.variable} ${gagen.variable} ${schrifted.variable} ${schriftedSubhead.variable} ${alugfte.variable} ${nordstove.variable} ${machina.variable} ${fliege.variable} ${magnat.variable} ${craftwork.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        {children}
        <AmbientToggle src={AMBIENT_SRC} crackleSrc={CRACKLE_SRC} />
        <CursorFollower />
        <LetterboxIntro />
      </body>
    </html>
  );
}
