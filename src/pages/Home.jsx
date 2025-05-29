import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
              <div className="relative bg-white p-3 rounded-xl shadow-soft border border-surface-200">
                <ApperIcon name="Code2" className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">BlankSlate</h1>
              <p className="text-xs sm:text-sm text-surface-500 font-medium">Template Platform</p>
            </div>
          </motion.div>

          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="neu-button p-3 rounded-xl"
          >
            <ApperIcon 
              name={isDarkMode ? "Sun" : "Moon"} 
              className="w-5 h-5 text-surface-600" 
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <ApperIcon name="Sparkles" className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Development Template Platform</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-6">
              Build Templates
              <span className="block gradient-text">Faster Than Ever</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
              Create customizable development templates with real-time preview, 
              export functionality, and a powerful visual editor.
            </p>
          </motion.div>

          {/* Main Feature Component */}
          <MainFeature />

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 sm:mt-20"
          >
            {[
              {
                icon: "Palette",
                title: "Visual Styling",
                description: "Real-time color picker and typography controls"
              },
              {
                icon: "Layout",
                title: "Position Control",
                description: "Precise positioning with visual guides"
              },
              {
                icon: "Download",
                title: "Export Ready",
                description: "Generate clean, production-ready code"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="floating-card p-6 lg:p-8 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
      </main>
    </div>
  )
}

export default Home