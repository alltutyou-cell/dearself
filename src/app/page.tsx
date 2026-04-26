import { FadeIn } from "@/components/FadeIn";
import { AudioPlayer } from "@/components/AudioPlayer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { RevealText } from "@/components/RevealText";
import { MagneticLink } from "@/components/MagneticLink";
import { HeroScratch } from "@/components/HeroScratch";
import { PortraitReveal } from "@/components/PortraitReveal";
import { ChapterIndex } from "@/components/ChapterIndex";

const CHAPTERS = [
  { id: "hero", num: "01", label: "vol. 01" },
  { id: "wound", num: "02", label: "The wound" },
  { id: "missing", num: "03", label: "Missing piece" },
  { id: "bridge", num: "04", label: "Vision → voice" },
  { id: "morning", num: "05", label: "The morning" },
  { id: "architecture", num: "06", label: "Architecture" },
  { id: "product", num: "07", label: "What it is" },
  { id: "timeline", num: "08", label: "First 90 days" },
  { id: "promises", num: "09", label: "What it isn't" },
  { id: "founder", num: "10", label: "From Julia" },
  { id: "objections", num: "11", label: "Three answers" },
  { id: "offer", num: "12", label: "Founding member" },
  { id: "faq", num: "13", label: "Questions" },
];

// When Julia drops the 30-sec sample at /public/audio/dear-self-sample.mp3,
// flip this to "/audio/dear-self-sample.mp3". Until then the player renders
// in placeholder state ("Sample · uploading shortly").
const SAMPLE_AUDIO_SRC: string | undefined = undefined;

export default function Home() {
  return (
    <main className="bg-bone text-ink">
      <ChapterIndex chapters={CHAPTERS} />

      {/* HEADER */}
      <header className="container-wide flex items-center justify-between pt-8 pb-4">
        <span className="handwritten text-3xl md:text-4xl text-earth leading-none">my dear self</span>
        <span className="tag text-ink/60 hidden sm:block">
          Future-self audio ritual
        </span>
      </header>

      {/* HERO — Option B: text panel left, image right (magazine spread) */}
      <section id="hero" className="relative min-h-[92vh] flex flex-col md:grid md:grid-cols-12 overflow-hidden">
        {/* LEFT: text panel on bone */}
        <div className="md:col-span-6 bg-bone paper-grain relative flex flex-col justify-between px-6 md:px-12 lg:px-16 py-12 md:py-14 order-2 md:order-1">
          <span className="corner-label tl text-ink hidden md:block">
            my dear self · vol. 01
          </span>

          {/* Top — clarifier */}
          <div className="md:pt-8">
            <FadeIn>
              <p className="tag text-earth mb-6">vol. 01</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-sm md:text-base text-ink-soft max-w-md leading-snug">
                An AI-powered app that clones your voice and turns your future
                self into someone you hear from every day.
              </p>
            </FadeIn>
          </div>

          {/* Middle — H1 + body */}
          <div className="my-12 md:my-10 max-w-xl">
            <RevealText
              as="h1"
              mode="word"
              delay={0.15}
              stagger={0.06}
              blur={14}
              duration={1.05}
              className="display-italic text-balance leading-[1.02]"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              The first voice you hear every morning is yours.
            </RevealText>
            <FadeIn delay={0.3}>
              <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-md">
                You&apos;ve been writing to yourself in your head for years.
                Tomorrow morning, she says it back. In your voice.
              </p>
            </FadeIn>
          </div>

          {/* Bottom — Audio + CTA */}
          <div className="flex flex-col gap-7">
            <FadeIn delay={0.4}>
              <div data-cursor-label="press play" className="max-w-md">
                <AudioPlayer
                  src={SAMPLE_AUDIO_SRC}
                  label="Listen · 30-sec sample"
                  caption="vol. 01"
                  variant="light"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.55}>
              <div className="flex flex-col items-start gap-3">
                <span data-cursor-label="claim it →">
                  <MagneticLink
                    href="#offer"
                    className="inline-block bg-ink text-bone px-10 py-5 text-sm tracking-[0.2em] uppercase hover:bg-earth transition-colors duration-500"
                  >
                    Claim founding spot · $97
                  </MagneticLink>
                </span>
                <p className="tag text-ink/50">
                  Lifetime · 100 seats · 30-day refund
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* RIGHT: image with scratch-reveal */}
        <div className="md:col-span-6 relative h-[60vh] md:h-auto order-1 md:order-2 overflow-hidden">
          <HeroScratch
            src="/images/hero.png"
            alt="Hand holding a phone in soft morning light, motion blur"
          />
          <span className="corner-label tr text-bone z-10 hidden md:block pointer-events-none">
            Founding member · 100 seats
          </span>
        </div>
      </section>

      {/* BEAT — one word. The audio just played. The breath after. */}
      <section
        className="beat bg-bone paper-grain border-t border-ink/10 beat-hover"
        data-cursor-label="(it landed)"
      >
        <FadeIn>
          <span className="beat-rule beat-rule-anim text-ink" />
        </FadeIn>
        <RevealText
          as="p"
          mode="char"
          stagger={0.08}
          blur={24}
          duration={1.15}
          className="display-italic text-ink beat-word"
        >
          Oh.
        </RevealText>
      </section>

      {/* BLOCK 2 — DARK INK, BIG TYPE */}
      <section id="wound" className="section bg-ink text-bone paper-grain">
        <span className="corner-label tl text-bone">
          № 02 · The wound
        </span>
        <span className="corner-label tr text-bone">
          Best-friend standard
        </span>
        <div className="container-wide">
          <div className="max-w-5xl">
            <FadeIn>
              <h2
                className="display-italic text-balance text-bone"
                style={{ fontSize: "var(--text-display-lg)" }}
              >
                You would never speak to your best friend the way you spoke to
                yourself today.
              </h2>
            </FadeIn>
          </div>

          <div className="mt-20 grid md:grid-cols-12 gap-8">
            <div className="md:col-start-5 md:col-span-7 space-y-7 text-base md:text-lg leading-relaxed text-bone/80">
              <FadeIn delay={0.1}>
                <p>
                  You have the vision. The apartment with the morning
                  light…the work that finally feels like yours… the version of
                  Saturday you&apos;ve been writing toward. You&apos;ve drawn
                  it, you&apos;ve journaled toward her or you&apos;ve made the
                  boards.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  And every day, something pulls you off course: the
                  comparison, the doubt, the voice in your head that won&apos;t
                  stop weighing you against everyone else, that says you&apos;re
                  behind, that whispers maybe this isn&apos;t going to work for
                  you specifically.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p
                  className="display-italic text-bone leading-snug pt-2"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  And underneath all of it, the question you&apos;ve never said
                  out loud:
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p
                  className="display-italic text-bone leading-snug"
                  style={{ fontSize: "var(--text-display-sm)" }}
                >
                  &ldquo;What if I&apos;m doing everything right and nothing is
                  changing because something is wrong with me?&rdquo;
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p>
                  You know that voice isn&apos;t kind. You know you&apos;d never
                  let a friend talk to you that way. And somehow knowing it has
                  made it worse, because now there&apos;s guilt on top of
                  everything else.
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p>
                  The voice in the room has been running unopposed for
                  thirty-something years, and no one ever thought to put
                  another voice in the room with it.
                </p>
              </FadeIn>
              <FadeIn delay={0.7}>
                <p
                  className="display-italic text-bone leading-snug pt-6"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  You didn&apos;t fail the work, but the work was missing a piece.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 3 — INTIMATE NARROW BEAT (rhythm shift after monumental block 02) */}
      <section id="missing" className="section bg-bone paper-grain">
        <span className="corner-label tl text-ink">№ 03 · The missing piece</span>
        <div className="container-narrow">
          <FadeIn>
            <h2
              className="display-italic text-balance leading-[1.02]"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              The piece it was missing was you.
            </h2>
          </FadeIn>

          <div className="mt-12 space-y-7 text-base md:text-lg leading-relaxed text-ink-soft">
            <FadeIn delay={0.1}>
              <p>
                Not the fixed version of you, but the you that already exists,
                the one who speaks to the people she loves with patience and
                generosity and the kind of steadiness she has never once
                turned inward.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                That voice exists and you use it every day… but you
                haven&apos;t been on the receiving end of it.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p
                className="display-italic text-ink leading-snug pt-6"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                She&apos;s just you. A little further down the road. And she
                has things to say.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p
                className="display-italic text-ink leading-snug"
                style={{ fontSize: "var(--text-display-sm)" }}
              >
                my dear self puts you there.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="pt-6 text-base md:text-lg text-ink-soft italic">
                And here&apos;s where she arrives.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BEAT — short fragment. Connecting tissue between Block 03 and the bridge. */}
      <section
        className="beat bg-sage text-bone paper-grain beat-hover"
        data-cursor-label="(she's looking back)"
      >
        <RevealText
          as="p"
          mode="word"
          stagger={0.09}
          blur={16}
          duration={1.05}
          className="display-italic text-bone beat-line"
        >
          She remembers this moment.
        </RevealText>
      </section>

      {/* BRIDGE — vision board → voice */}
      <section id="bridge" className="section bg-bone-soft paper-grain">
        <span className="corner-label tl text-ink">№ 04 · The shift</span>
        <span className="corner-label tr text-ink">From silent to spoken</span>
        <div className="container-wide">
          <FadeIn>
            <h2
              className="display-italic text-balance leading-[1.05] max-w-5xl"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              From vision board to voice.
            </h2>
          </FadeIn>

          <div className="mt-20 max-w-2xl mx-auto space-y-7 text-base md:text-lg leading-relaxed text-ink-soft">
            <FadeIn delay={0.1}>
              <p>
                You&apos;ve made the boards, cut the magazines… Pinned the
                apartment, the partner, the place you&apos;re going. You&apos;ve
                stared at them, felt into them, tried to call them in.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                The boards are silent. They don&apos;t say your name and they
                don&apos;t tell you that the morning has already arrived,
                somewhere, in some version of you who&apos;s already living it.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p
                className="display-italic text-ink leading-snug pt-4"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                my dear self gives the future you&apos;ve been imagining a voice.
                Yours.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p>
                Not a picture you look at, but a voice you hear. Speaking
                back to you about the specific life on the board, as if it&apos;s
                already happening, in the only voice your subconscious has ever
                trusted: the one that finally talks to you the way you talk to
                everyone else.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HOW YOU WAKE UP — DEEP SAGE BG */}
      <section id="morning" className="section bg-sage text-bone paper-grain">
        <span className="corner-label tl text-bone">№ 05 · The morning</span>
        <span className="corner-label tr text-bone">Two people only</span>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <FadeIn>
                <h2
                  className="display-italic text-balance text-bone"
                  style={{ fontSize: "var(--text-display-lg)" }}
                >
                  How you wake up decides who you are that day.
                </h2>
              </FadeIn>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-7 text-base md:text-lg leading-relaxed text-bone/80">
              <FadeIn delay={0.1}>
                <p>Think about the last 30 mornings.</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  The first voice in your head was almost never yours. Email,
                  the news, a feed, the worry already waiting — by the time you
                  stand up, you&apos;ve taken in a dozen voices, none of them
                  you.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>
                  You wake up tuned to other people&apos;s frequencies. Then
                  you wonder why your own feels far away.
                </p>
              </FadeIn>
            </div>

            <div className="md:col-start-8 md:col-span-5 space-y-7 text-base md:text-lg leading-relaxed text-bone/80">
              <FadeIn delay={0.4}>
                <p
                  className="display-italic text-bone leading-snug"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  There are only two people you should be comparing yourself
                  to. You at 8. You at 80. Everyone else is noise.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p>
                  my dear self changes what wakes you up. Not the alarm sound, not
                  a meditation prompt, your own voice, the version of you who
                  already made it, speaking to you before the world gets a
                  chance to.
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="pt-6 text-base md:text-lg text-bone/70 italic">
                  And what you&apos;re doing here isn&apos;t superstition.
                  It&apos;s how the brain works.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* WHY APPS FELT LIKE STRANGERS — headline-first editorial */}
      <section id="architecture" className="section bg-bone-soft paper-grain">
        <span className="corner-label tl text-ink">№ 06 · The architecture</span>
        <span className="corner-label tr text-ink">Hal Hershfield · NYU</span>
        <div className="container-wide">
          {/* The headline IS the moment — full width, big breath */}
          <FadeIn>
            <h2
              className="display-italic text-ink leading-[1.05] text-balance max-w-6xl"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              Your brain processes your future self as a stranger.
            </h2>
          </FadeIn>

          {/* Body in single editorial column — like a magazine essay */}
          <div className="mt-24 max-w-2xl mx-auto space-y-8 text-base md:text-lg leading-relaxed text-ink-soft">
            <FadeIn delay={0.1}>
              <p>
                There&apos;s a neuroscientist at NYU named Hal Hershfield. His
                research found something that should change how we think about
                every affirmation, every visualization, every &ldquo;future
                self&rdquo; exercise we&apos;ve ever done.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p>
                Not a version of you, a stranger. Someone neurologically
                unfamiliar, processed the way you&apos;d process a person
                you&apos;ve never met. Which means when you visualize her, when
                you write to her, when you try to become her, your brain is
                taking life advice from someone you don&apos;t know.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                Then there&apos;s what happens when you hear someone else&apos;s
                voice say your affirmations.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p>
                The brain has a specific response to self-voice. A region
                called the anterior insula activates differently when you hear
                yourself speak versus when you hear anyone else, including the
                most soothing, carefully chosen voice on any app you&apos;ve
                ever tried. Your brain correctly identified that voice as{" "}
                <em>not you</em>, and filtered it out.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p
                className="display-italic text-ink leading-snug pt-4"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                You weren&apos;t failing to believe hard enough, but the
                architecture was wrong.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p>
                The voice was a stranger. The future self was a stranger. And
                your brain, which is on your side, always, knew.
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="pt-6 text-base md:text-lg text-ink-soft italic">
                Which means the architecture has to be different. Like this.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BEAT — one sentence. The pivot from "why nothing worked" to "what does." */}
      <section
        className="beat bg-bone paper-grain beat-hover"
        data-cursor-label="(for years)"
      >
        <RevealText
          as="p"
          mode="word"
          stagger={0.06}
          blur={14}
          duration={1.0}
          className="display-italic text-ink beat-line max-w-3xl mx-auto px-6"
        >
          You kept handing the job to a stranger.
        </RevealText>
      </section>

      {/* WHAT DEAR SELF IS — SPLIT EDITORIAL */}
      <section id="product" className="section bg-bone paper-grain">
        <span className="corner-label tl text-ink">№ 07 · What it is</span>
        <span className="corner-label tr text-ink">Two voices a day</span>
        <div className="container-wide">
          <div className="max-w-3xl">
            <FadeIn>
              <h2
                className="display-italic text-balance"
                style={{ fontSize: "var(--text-display-lg)" }}
              >
                Your voice, speaking your future, every morning.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-10 text-base md:text-lg leading-relaxed text-ink-soft">
                my dear self is an iOS and web app that uses AI to clone your voice
                and build a personalized affirmation library, trained on the
                specific life you describe.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft">
                You speak your future into the app — your apartment, your work,
                your people, the version of Saturday you&apos;re working
                toward. The same recording captures your voice. Then AI builds
                personalized tracks, in your voice, about your specific life.
              </p>
            </FadeIn>
          </div>

          <div className="mt-24 max-w-3xl mx-auto">
            <FadeIn delay={0.3}>
              <div className="border-t border-ink/15 pt-10">
                <p className="tag text-earth mb-6">Your morning ritual</p>
                <h3
                  className="display-italic leading-tight"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  Specific, spoken, already true.
                </h3>
                <p className="mt-6 text-base leading-relaxed text-ink-soft">
                  Five personalized tracks. Spoken in your voice. Specific
                  statements about your future life, said as if they&apos;re
                  already happening. Not &ldquo;I am worthy of abundance.&rdquo;
                  Not generic. Hers, written from her actual answers:
                </p>
                <div className="mt-10 border-l-2 border-earth pl-6 space-y-5 display-italic text-lg text-ink leading-snug">
                  <p>
                    It&apos;s Tuesday. I&apos;m in my apartment in Paris. The
                    window is open. I&apos;m not rushing.
                  </p>
                  <p>
                    My phone shows a deposit from a client. I don&apos;t check
                    the amount. I already know it&apos;s enough.
                  </p>
                  <p>
                    My friends are coming over tonight. They&apos;re the kind
                    of people who show up with wine and ask real questions.
                  </p>
                  <p>I look in the mirror and I recognize myself.</p>
                </div>
                <p className="mt-10 text-base leading-relaxed text-ink-soft">
                  Yours will be different. About your specific apartment, your
                  specific work, your specific people. The audio plays
                  automatically before your alarm, no app to open, no button to
                  press. You wake up already inside the version of you
                  who&apos;s already there.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-16" data-cursor-label="press play">
                <p className="tag text-earth mb-5 text-center">
                  Hear what one sounds like
                </p>
                <AudioPlayer
                  src={SAMPLE_AUDIO_SRC}
                  label=""
                  caption="vol. 01 · pre-launch sample"
                  variant="light"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FIRST 90 DAYS — ASYMMETRIC TIMELINE */}
      <section id="timeline" className="section bg-bone-soft paper-grain">
        <span className="corner-label tl text-ink">№ 08 · The first 90 days</span>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-7">
              <FadeIn>
                <h2
                  className="display-italic text-balance"
                  style={{ fontSize: "var(--text-display-lg)" }}
                >
                  What this becomes.
                </h2>
              </FadeIn>
            </div>
          </div>

          <div className="space-y-24">
            {/* Day 01 */}
            <FadeIn>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <p className="tag text-earth mb-2">Day 01</p>
                  <p
                    className="display-italic text-ink leading-none"
                    style={{ fontSize: "var(--text-display-lg)" }}
                  >
                    01
                  </p>
                </div>
                <div className="md:col-span-9 space-y-6 text-base md:text-lg leading-relaxed text-ink-soft">
                  <p>
                    It&apos;s early. The audio starts on its own. Your own voice
                    fills the room, saying things about your life as if
                    they&apos;re already true.
                  </p>
                  <p className="display-italic text-ink border-l-2 border-earth pl-6 leading-snug text-xl md:text-2xl">
                    &ldquo;I wake up in the apartment with the gold light. The
                    work I do matters. The people in my life are real.&rdquo;
                  </p>
                  <p>
                    Your voice. Said as fact, not as wish. Not asking you to
                    believe. Telling you. You listen the whole way through. You
                    don&apos;t skip it. You&apos;re not sure why.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Day 30 */}
            <FadeIn delay={0.1}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <p className="tag text-earth mb-2">Day 30</p>
                  <p
                    className="display-italic text-ink leading-none"
                    style={{ fontSize: "var(--text-display-lg)" }}
                  >
                    30
                  </p>
                </div>
                <div className="md:col-span-9 space-y-6 text-base md:text-lg leading-relaxed text-ink-soft">
                  <p>
                    Something has shifted that you can&apos;t fully explain. The
                    gap between your life and your future life hasn&apos;t
                    closed, but it doesn&apos;t feel like evidence anymore.
                    More like distance you&apos;re crossing.
                  </p>
                  <p>
                    You&apos;ve stopped reaching for Instagram before your eyes
                    are open, stopped comparing your morning to thirty other
                    people&apos;s. And you&apos;ve started making small
                    decisions differently, not because you&apos;re following a
                    system but because when you&apos;re about to make a choice
                    that doesn&apos;t belong to her, something in you notices.
                  </p>
                  <p>
                    Some mornings you press repeat. The same five tracks.
                    Yours. You&apos;re starting to recognize her.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Day 90 */}
            <FadeIn delay={0.2}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <p className="tag text-earth mb-2">Day 90</p>
                  <p
                    className="display-italic text-ink leading-none"
                    style={{ fontSize: "var(--text-display-lg)" }}
                  >
                    90
                  </p>
                </div>
                <div className="md:col-span-9 space-y-6 text-base md:text-lg leading-relaxed text-ink-soft">
                  <p>
                    You go back to the answers you gave on Day 1. The future you
                    described. The Tuesday. The apartment. The work.
                  </p>
                  <p
                    className="display-italic text-ink leading-snug"
                    style={{ fontSize: "var(--text-display-md)" }}
                  >
                    Some of it has already happened.
                  </p>
                  <p>
                    Not all of it. Not most of it. But some of the small,
                    specific things, they&apos;re your life now. You didn&apos;t
                    manifest them. You became the person who would naturally
                    have them. That&apos;s the only way it ever works.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ANTI-PROMISES — DARK INK */}
      <section id="promises" className="section bg-ink text-bone paper-grain">
        <span className="corner-label tl text-bone">№ 09 · What this isn&apos;t</span>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <FadeIn>
                <h2
                  className="display-italic text-balance text-bone"
                  style={{ fontSize: "var(--text-display-lg)" }}
                >
                  What my dear self will not do.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-7 space-y-8 text-base md:text-lg leading-relaxed text-bone/80">
              <FadeIn delay={0.1}>
                <p>
                  my dear self will not make you a millionaire by Friday. Anyone
                  who promises that is selling a feeling, not a process.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  my dear self will not do the becoming for you. The tool is
                  yours. The work is yours. The voice is yours. We&apos;re
                  making sure it&apos;s loud enough to hear.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>
                  my dear self will not feel like magic. It will feel like your
                  own voice, which is stranger and more powerful than magic,
                  and considerably more honest.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p>
                  my dear self will not fix the gap between who you are and who
                  you&apos;re becoming. It will change your relationship to
                  that gap. Which is the only thing that has ever closed one.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p>
                  my dear self is not a replacement for therapy. If you&apos;re
                  dealing with something serious, please go talk to a human.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE — bone-soft, editorial 2-column with portrait */}
      <section id="founder" className="section bg-bone-soft paper-grain">
        <span className="corner-label tl text-ink">№ 10 · Note from the founder</span>
        <span className="corner-label tr text-ink">Why I built this</span>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            {/* Portrait — left column, sticky on desktop */}
            <div className="md:col-span-5">
              <FadeIn>
                <div className="md:sticky md:top-24">
                  <PortraitReveal
                    src="/images/julia.jpg"
                    alt="Julia, founder of my dear self"
                    signature="— Julia"
                  />
                  <p className="tag text-earth mt-4">Julia · founder, my dear self</p>
                </div>
              </FadeIn>
            </div>

            {/* Text — right column */}
            <div className="md:col-span-7">
              <FadeIn>
                <h2
                  className="display-italic text-balance leading-[1.05]"
                  style={{ fontSize: "var(--text-display-lg)" }}
                >
                  I built this because I couldn&apos;t find it.
                </h2>
              </FadeIn>

              <div className="mt-12 space-y-7 text-base md:text-lg leading-relaxed text-ink-soft">
              <FadeIn delay={0.1}>
                <p>
                  A few months ago I watched a friend buy herself flowers. She
                  picked out the prettiest ones. She said, out loud,{" "}
                  <em className="text-ink">
                    &ldquo;everything for you, my princess.&rdquo;
                  </em>
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>That was the moment.</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>
                  I realized I couldn&apos;t remember the last time I&apos;d
                  spoken to myself that way. The voice in my head had been
                  someone different. Harsher. And I&apos;d been listening to her
                  without noticing.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p>
                  I move a lot. I travel. Vision boards never quite worked,
                  I&apos;d make them, leave them in another apartment, lose the
                  thread between cities. The life I was reaching for kept
                  getting blurry between flights, between feeds, between
                  everyone else&apos;s noise.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p>
                  What I needed was something I could carry. A voice in my ear
                  that knew where I was going, and could remind me, every
                  morning, who I was and what I was building toward.
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p
                  className="display-italic text-ink leading-snug pt-2"
                  style={{ fontSize: "var(--text-display-sm)" }}
                >
                  In my own voice, so I&apos;d believe it.
                </p>
              </FadeIn>
              <FadeIn delay={0.7}>
                <p>
                  I&apos;d tried everything else. Mentors, journals, the apps
                  that remind you to breathe and be grateful. None of them
                  sounded like me. None of them knew where I was trying to go.
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <p>
                  Most of us know what we want. We can see it clearly for about
                  five minutes. Then someone posts something, or says something,
                  or we scroll past a life that looks easier — and suddenly we
                  forget what we were reaching for.
                </p>
              </FadeIn>
              <FadeIn delay={0.9}>
                <p
                  className="display-italic text-ink leading-snug pt-2"
                  style={{ fontSize: "var(--text-display-sm)" }}
                >
                  I want to live a life where, when I&apos;m old, I look back
                  and know I didn&apos;t get smaller. I didn&apos;t get afraid.
                  I lived it all the way, as the most honest version of me.
                </p>
              </FadeIn>
              <FadeIn delay={1.0}>
                <p>
                  my dear self is the tool I wished existed. I&apos;m building it
                  for the women who know what they want. The ones who need a
                  voice that reminds them it&apos;s theirs.
                </p>
              </FadeIn>
              <FadeIn delay={1.1}>
                <p className="pt-6 tag text-earth">— Julia, founder</p>
              </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEAT — one word. The pause before the ask. */}
      <section
        className="beat bg-ink text-bone paper-grain beat-hover"
        data-cursor-label="(say it again)"
      >
        <FadeIn>
          <span className="beat-rule beat-rule-anim text-bone" />
        </FadeIn>
        <RevealText
          as="p"
          mode="char"
          stagger={0.07}
          blur={26}
          duration={1.2}
          className="display-italic text-bone beat-word"
        >
          Enough.
        </RevealText>
      </section>

      {/* INLINE OBJECTIONS — narrow tight beat right before the ask */}
      <section id="objections" className="section section-tight bg-bone paper-grain border-t border-ink/10">
        <span className="corner-label tl text-ink">№ 11 · Before you decide</span>
        <span className="corner-label tr text-ink">Three honest answers</span>
        <div className="container-tight">
          <FadeIn>
            <h2
              className="display-italic text-balance leading-[1.05]"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Three things you&apos;re probably wondering.
            </h2>
          </FadeIn>

          <div className="mt-12 space-y-10">
            <FadeIn delay={0.1}>
              <div>
                <p className="tag text-earth mb-3">01 · The hardest one</p>
                <h3 className="display-italic text-ink leading-snug text-lg md:text-xl">
                  What if I hear my own voice and feel worse?
                </h3>
                <div className="mt-4 space-y-3 text-sm md:text-base leading-relaxed text-ink-soft">
                  <p>
                    Hearing your own voice say things you haven&apos;t let
                    yourself believe yet can feel strange at first. Sometimes
                    uncomfortable. That discomfort isn&apos;t a sign something
                    is wrong. It&apos;s the sound of your brain updating its
                    model of you.
                  </p>
                  <p className="italic text-ink">
                    By the third or fourth day, the voice stops feeling
                    foreign and starts feeling like a memory of something
                    true.
                  </p>
                  <p>
                    If it doesn&apos;t work for you within 30 days, full
                    refund. No conversation required.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <p className="tag text-earth mb-3">02 · The practical one</p>
                <h3 className="display-italic text-ink leading-snug text-lg md:text-xl">
                  How does the voice clone work?
                </h3>
                <div className="mt-4 space-y-3 text-sm md:text-base leading-relaxed text-ink-soft">
                  <p>
                    Sixty seconds. You, talking normally, in a quiet room.
                    The model trains on that sample. Your five tracks come
                    back in your voice, about your specific life.
                  </p>
                  <p>
                    Not ready to record yet? Pick from six pre-made voices
                    and switch later.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div>
                <p className="tag text-earth mb-3">03 · The trust one</p>
                <h3 className="display-italic text-ink leading-snug text-lg md:text-xl">
                  What about my voice data?
                </h3>
                <div className="mt-4 space-y-3 text-sm md:text-base leading-relaxed text-ink-soft">
                  <p>
                    Enterprise privacy terms. Not shared, not sold, not used
                    to train any public model. Delete your voice and all
                    data from settings, anytime.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <p className="tag text-ink/45 mt-12 text-center">
              More below in the FAQ ↓
            </p>
          </FadeIn>
        </div>
      </section>

      {/* OFFER — bone, single editorial column */}
      <section id="offer" className="section bg-bone paper-grain">
        <span className="corner-label tl text-ink">№ 12 · Founding member</span>
        <span className="corner-label tr text-ink">100 seats · $97</span>
        <div className="container-wide">
          {/* H1 + intro — top */}
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <FadeIn>
                <h2
                  className="display-italic text-balance"
                  style={{ fontSize: "var(--text-display-xl)" }}
                >
                  100 seats. $97. Lifetime.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <FadeIn delay={0.1}>
                <p className="text-base md:text-lg leading-relaxed text-ink-soft">
                  After these seats are gone, my dear self will be $19.99/month,
                  $149/year, or $497 for a fully done-for-you setup. The
                  founding-member tier will not return.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Single editorial column — what's included + math + emotional close */}
          <div className="mt-24 max-w-2xl mx-auto">
            <FadeIn delay={0.2}>
              <p className="tag text-earth mb-8 text-center">What you get</p>
              <ul className="space-y-5 text-base md:text-lg text-ink-soft border-y border-ink/15 py-10">
                <li className="flex gap-4">
                  <span className="text-earth">→</span>
                  <span>
                    Lifetime access to the app, no subscription, no renewal
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-earth">→</span>
                  <span>
                    Onboarding within 24 hours of payment, with your five
                    personalized tracks delivered
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-earth">→</span>
                  <span>A founding-member badge in the app</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-earth">→</span>
                  <span>
                    A direct line to the founder for feature requests, because
                    the first hundred people shape what this becomes
                  </span>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-12 text-center space-y-4">
                <p className="text-sm text-ink-soft">
                  After the 100 founding spots are gone, my dear self goes to
                  <span className="text-ink"> $19.99/month </span>
                  ({" "}
                  <span className="text-ink">$240/year</span>
                  {" "}) or
                  <span className="text-ink"> $497 done-for-you</span>.
                </p>
                <p
                  className="display-italic text-ink leading-snug pt-2"
                  style={{ fontSize: "var(--text-display-sm)" }}
                >
                  You&apos;re getting lifetime access for less than two months
                  of the regular plan.
                </p>
              </div>
            </FadeIn>

            {/* The emotional climax — full width, big, centered */}
            <FadeIn delay={0.4}>
              <p
                className="mt-16 display-italic text-ink leading-snug text-center text-balance"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                But the math isn&apos;t the reason. The reason is that
                you&apos;ve been waiting for her to write back for years.
              </p>
            </FadeIn>
          </div>

          {/* CTA — large, centered, with breath */}
          <FadeIn delay={0.5}>
            <div className="mt-20 flex flex-col items-center gap-5">
              <span data-cursor-label="claim it →">
                <MagneticLink
                  href="#"
                  pull={18}
                  className="inline-block bg-ink text-bone px-14 py-6 text-sm tracking-[0.2em] uppercase hover:bg-earth transition-colors duration-500"
                >
                  I&apos;m ready · claim founding spot
                </MagneticLink>
              </span>
              <p className="tag text-ink/50">
                $97 · 30-day refund · 100 seats
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ — DEEP SAGE */}
      <section id="faq" className="section bg-sage text-bone paper-grain">
        <span className="corner-label tl text-bone">№ 13 · Questions</span>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-7">
              <FadeIn>
                <h2
                  className="display-italic text-balance text-bone"
                  style={{ fontSize: "var(--text-display-lg)" }}
                >
                  Questions you&apos;re probably sitting with.
                </h2>
              </FadeIn>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-start-3 md:col-span-9 space-y-12">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={0.05 + i * 0.04}>
                  <div className="border-t border-bone/25 pt-8">
                    <h3 className="display-italic text-bone leading-snug text-xl md:text-2xl">
                      {faq.q}
                    </h3>
                    <div className="mt-5 space-y-4 text-sm md:text-base leading-relaxed text-bone/80">
                      {faq.a.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING — BONE — narrowed for intimate final rhythm */}
      <section className="section section-loose bg-bone paper-grain">
        <span className="corner-label tl text-ink">One more thing</span>
        <div className="container-mid">
          <div>
            <div>
              <FadeIn>
                <div className="space-y-7 text-base md:text-lg leading-relaxed text-ink-soft text-balance">
                  <p>Imagine tomorrow morning.</p>
                  <p>
                    It&apos;s early, the light still soft. You haven&apos;t
                    checked your phone yet — not email, not Instagram, not
                    anything that belongs to someone else&apos;s world.
                  </p>
                  <p>
                    You don&apos;t reach for it. The audio starts on its own.
                  </p>
                  <p>
                    You hear yourself. Saying the things about your life as if
                    they&apos;re already done. Your apartment. Your work. The
                    people who see you. The version of Saturday morning
                    you&apos;ve been writing toward.
                  </p>
                  <p>
                    Your voice, telling you about your life as if she&apos;s
                    already living it. Because somewhere, she is.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div
                  className="mt-20 space-y-3 display-italic text-ink leading-tight"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  <p>You&apos;ve been writing letters for years.</p>
                  <p>She heard all of them.</p>
                  <p>This is her writing back.</p>
                </div>
              </FadeIn>

              {/* Handwritten signature — Julia's actual hand. The page is a letter; this is its sign-off. */}
              <FadeIn delay={0.45}>
                <div className="mt-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo-handwritten.png"
                    alt="my dear self"
                    className="block w-72 md:w-96 h-auto select-none pointer-events-none -ml-3"
                    draggable={false}
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="mt-20 flex flex-col md:flex-row items-start gap-6">
                  <span data-cursor-label="claim it →">
                    <MagneticLink
                      href="#offer"
                      pull={16}
                      className="inline-block bg-ink text-bone px-12 py-6 text-sm tracking-[0.18em] uppercase hover:bg-earth transition-colors duration-500"
                    >
                      Claim founding spot · $97
                    </MagneticLink>
                  </span>
                  <p className="tag text-ink/50 self-end pb-2">
                    100 seats · once they&apos;re gone, they&apos;re gone
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/15 py-10 pb-24 md:pb-10">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="handwritten text-2xl text-earth leading-none">my dear self</span>
          <p className="tag text-ink/50 text-center md:text-right">
            iOS &amp; web · founding-member onboarding within 24 hours · 30-day
            refund
          </p>
        </div>
      </footer>

      <StickyMobileCTA />
    </main>
  );
}

const faqs = [
  {
    q: "How does the voice clone work?",
    a: [
      "You record 60 seconds of your natural speaking voice, you, talking normally, in a quiet room. AI processes that sample and creates a voice model that sounds like you. Your five affirmation tracks are then generated in that voice, reading affirmations created from your onboarding answers.",
      "If you're not comfortable recording your voice yet, you can choose from six pre-made AI voices and switch to your own voice later.",
    ],
  },
  {
    q: "What if I hear my own voice and feel worse?",
    a: [
      "This is one of the most honest questions we get, and it deserves an honest answer.",
      "Hearing your own voice, saying things you haven't let yourself believe yet, can feel strange at first. Sometimes uncomfortable. That discomfort isn't a sign that something is wrong. It's the sound of your brain updating its model of you.",
      "Most people describe the first listen as \"weird.\" By the third or fourth day, something shifts. The voice stops feeling foreign and starts feeling like a memory of something true.",
      "If you try it and it doesn't work for you within 30 days, we'll refund you completely. No conversation required.",
    ],
  },
  {
    q: "Will the AI know me, or will it feel generic?",
    a: [
      "Your tracks are built specifically from your spoken onboarding answers. The deeper and more specific your answers, the more specific your affirmations are in return.",
      "This is not a generic wellness app. It does not pull from a template library. Your tracks are written from your own stated future, in your own voice, about your specific life.",
    ],
  },
  {
    q: "How does the morning audio arrive?",
    a: [
      "You choose your wake time. The audio plays automatically at that time, through your phone speaker or your AirPods if they're connected. No app to open. No button to press. The first thing your nervous system processes that day is your own voice.",
      "You can adjust the volume, the time, and the track. You can also turn auto-play off if you'd rather press play yourself.",
    ],
  },
  {
    q: "What if I want to change my future self later?",
    a: [
      "You can. Your future isn't locked. Your onboarding answers can be updated, and your tracks can be regenerated. The version of your future self you describe today is allowed to look different a year from now. She's not a contract. She's a direction.",
    ],
  },
  {
    q: "What about my privacy? Is my voice data safe?",
    a: [
      "Your voice sample is processed under enterprise privacy terms and is not shared, sold, or used to train any public model. Your onboarding answers are stored securely and are never used for any purpose other than generating your personalized tracks. You can delete your voice model and all associated data at any time from your account settings.",
    ],
  },
  {
    q: "Is this too woo for someone who also likes evidence?",
    a: [
      "The Hershfield research is published and peer-reviewed. The anterior insula self-voice differentiation is documented neuroscience. The mechanism is real.",
      "The experience of hearing your future self speak to you is, admittedly, a little strange and a little sacred. Both things are allowed to be true at the same time.",
    ],
  },
];
