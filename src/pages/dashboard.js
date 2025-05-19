// pages/dashboard.js
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { FiLogOut, FiLoader, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/dashboard',
        permanent: false,
      }
    }
  }
  return { props: { session } }
}

export default function Dashboard({ session }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { data: clientSession } = useSession()

  // Dark mode sync
  useEffect(() => {
    const theme = localStorage.theme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/protected-data')
      
      if (!res.ok) throw new Error(`API Error: ${res.status}`)
      
      setData(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
      >
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Quantum Dashboard
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={session?.user?.image} 
              alt="Profile" 
              className="w-8 h-8 rounded-full ring-2 ring-blue-400"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {session?.user?.name}
            </span>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300"
            >
              <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-md shadow"
            >
              <FiLogOut />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <FiLoader className="text-4xl text-blue-500" />
            </motion.div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading quantum data...
            </p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg"
          >
            <FiAlertTriangle className="text-3xl text-red-500 mb-3" />
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Quantum Flux Detected!</h3>
            <p className="text-center text-red-500 dark:text-red-400">{error}</p>
            <button 
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              Stabilize Connection
            </button>
          </motion.div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                ✨ Quantum Data Stream
              </h2>
              <span className="text-sm text-blue-500 dark:text-blue-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto"
            >
              <pre className="text-sm text-gray-800 dark:text-gray-300">
                {JSON.stringify(data, null, 2)}
              </pre>
            </motion.div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 dark:text-blue-300">Magic Number</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {data?.magicNumber}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700 dark:text-purple-300">User Email</h3>
                <p className="text-sm font-mono text-purple-600 dark:text-purple-400 truncate">
                  {data?.user?.email}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 dark:text-green-300">Last Updated</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {new Date(data?.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}