function ScreenWarning() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-8 text-center text-cream">
      <div className="max-w-md">
        <h1 className="font-display text-4xl font-bold">
          A bigger desk is required.
        </h1>

        <p className="mt-4 font-sans">
          The Night Shift is designed for screens 1040px and wider.
        </p>
      </div>
    </main>
  );
}

export default ScreenWarning;
