export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`bg-white shadow-sm rounded-lg p-4 z-10 border border-border px-3 py-4 backdrop-blur-[2px] md:p-6 grid w-full gap-4`}
    >
      {children}
    </div>
  );
}