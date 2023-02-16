export default function Card({ children, className }: {children, className?}) {
  return (
    <div className={`w-full border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-white/80 backdrop-blur dark:bg-gray-800/80 p-4 ${className}`}>
      {children}
    </div>
  );
}
