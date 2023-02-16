export default function Button({
  children,
  className = "",
  onClick,
}: {
  children;
  className?;
  onClick?;
}) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center font-normal text-lg border rounded w-60 px-4 py-2 shadow-sm mx-2 hover:bg-gray-100 md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 bg-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
