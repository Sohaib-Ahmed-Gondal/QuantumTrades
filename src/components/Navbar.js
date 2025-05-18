export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>Logo</div>
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm"
        >
          {document.documentElement.classList.contains('dark') ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}
