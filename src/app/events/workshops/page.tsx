export default function WorkshopsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          Workshops
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
          Hands-on learning sessions covering the latest technologies.
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
