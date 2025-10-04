export default function TutorialsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          Tutorials
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
          Step-by-step guides on programming languages and tools.
        </p>
        <div className="glass-card p-12 rounded-2xl mt-12">
          <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
            Content coming soon...
          </p>
        </div>
      </div>
    </main>
  );
}
