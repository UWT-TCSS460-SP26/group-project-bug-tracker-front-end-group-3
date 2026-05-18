import BugReportForm from "@/components/BugReportForm";

export default function Home() {
  return (
    <div className="futuristic-bg relative z-[1] flex flex-1 flex-col items-center justify-center px-6 py-16">
      <main className="futuristic-panel relative flex w-full max-w-3xl flex-col items-center gap-8 overflow-hidden rounded-sm p-8 sm:p-10">
        <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/35 to-transparent" />
        <div className="pointer-events-none absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-900/35 to-transparent" />

        <header className="flex flex-col items-center gap-3 text-center">
          <p className="font-[family-name:var(--font-orbitron)] text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
            TCSS 460 · Group 3
          </p>
          <h1 className="futuristic-title text-3xl font-bold sm:text-4xl">
            Bug Tracker
          </h1>
          <p className="max-w-md text-base leading-relaxed text-zinc-400">
            Please report any bugs you have seen. Thank you!
          </p>
        </header>

        <BugReportForm />
      </main>
    </div>
  );
}
