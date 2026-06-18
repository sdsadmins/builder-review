export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(245,158,11,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(217,119,6,0.08) 0%, transparent 50%)',
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative z-10 w-full max-w-md px-4 py-16">{children}</div>
    </div>
  );
}
