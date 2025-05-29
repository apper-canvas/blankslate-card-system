import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [template, setTemplate] = useState({
    name: 'My Template',
    headerText: 'Apper Blank Template',
    textColor: '#ef4444',
    backgroundColor: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    position: { x: 'left', y: 'top' },
    fontFamily: 'Inter'
  })

  const [isExporting, setIsExporting] = useState(false)
  const [activeTab, setActiveTab] = useState('style')
  const canvasRef = useRef(null)

  const handleTemplateChange = (field, value) => {
    setTemplate(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePositionChange = (axis, value) => {
    setTemplate(prev => ({
      ...prev,
      position: { ...prev.position, [axis]: value }
    }))
  }

  const generateCode = () => {
    const positionStyles = {
      x: {
        left: 'justify-start text-left',
        center: 'justify-center text-center',
        right: 'justify-end text-right'
      },
      y: {
        top: 'items-start',
        center: 'items-center',
        bottom: 'items-end'
      }
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: '${template.fontFamily}', sans-serif;
      background-color: ${template.backgroundColor};
      height: 100vh;
      display: flex;
      ${positionStyles.x[template.position.x]};
      ${positionStyles.y[template.position.y]};
    }
    .header-text {
      color: ${template.textColor};
      font-size: ${template.fontSize}px;
      font-weight: ${template.fontWeight};
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="header-text">${template.headerText}</div>
</body>
</html>`
  }

  const exportTemplate = async () => {
    setIsExporting(true)
    try {
      const code = generateCode()
      const blob = new Blob([code], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('Template exported successfully!')
    } catch (error) {
      toast.error('Failed to export template')
    } finally {
      setIsExporting(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode())
    toast.success('Code copied to clipboard!')
  }

  const resetTemplate = () => {
    setTemplate({
      name: 'My Template',
      headerText: 'Apper Blank Template',
      textColor: '#ef4444',
      backgroundColor: '#ffffff',
      fontSize: 24,
      fontWeight: '600',
      position: { x: 'left', y: 'top' },
      fontFamily: 'Inter'
    })
    toast.success('Template reset to defaults')
  }

  const getPreviewStyles = () => {
    const positions = {
      x: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
      },
      y: {
        top: 'items-start',
        center: 'items-center',
        bottom: 'items-end'
      }
    }

    return {
      container: `flex h-full ${positions.x[template.position.x]} ${positions.y[template.position.y]}`,
      text: {
        color: template.textColor,
        fontSize: `${template.fontSize}px`,
        fontWeight: template.fontWeight,
        fontFamily: template.fontFamily
      }
    }
  }

  const tabs = [
    { id: 'style', label: 'Style', icon: 'Palette' },
    { id: 'position', label: 'Position', icon: 'Move' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Editor Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Template Name */}
          <div className="floating-card p-6">
            <label className="block text-sm font-semibold text-surface-700 mb-3">
              Template Name
            </label>
            <input
              type="text"
              value={template.name}
              onChange={(e) => handleTemplateChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus-ring transition-all"
              placeholder="Enter template name"
            />
          </div>

          {/* Tab Navigation */}
          <div className="floating-card p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="floating-card p-6"
            >
              {activeTab === 'style' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">Style Settings</h3>
                  
                  {/* Header Text */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Header Text
                    </label>
                    <input
                      type="text"
                      value={template.headerText}
                      onChange={(e) => handleTemplateChange('headerText', e.target.value)}
                      className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus-ring"
                      placeholder="Enter header text"
                    />
                  </div>

                  {/* Color Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Text Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={template.textColor}
                          onChange={(e) => handleTemplateChange('textColor', e.target.value)}
                          className="w-12 h-12 border border-surface-200 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={template.textColor}
                          onChange={(e) => handleTemplateChange('textColor', e.target.value)}
                          className="flex-1 px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg focus-ring text-sm font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={template.backgroundColor}
                          onChange={(e) => handleTemplateChange('backgroundColor', e.target.value)}
                          className="w-12 h-12 border border-surface-200 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={template.backgroundColor}
                          onChange={(e) => handleTemplateChange('backgroundColor', e.target.value)}
                          className="flex-1 px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg focus-ring text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Font Size
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="12"
                          max="72"
                          value={template.fontSize}
                          onChange={(e) => handleTemplateChange('fontSize', parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-surface-600 w-10 text-right">
                          {template.fontSize}px
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Font Weight
                      </label>
                      <select
                        value={template.fontWeight}
                        onChange={(e) => handleTemplateChange('fontWeight', e.target.value)}
                        className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg focus-ring"
                      >
                        <option value="300">Light</option>
                        <option value="400">Normal</option>
                        <option value="500">Medium</option>
                        <option value="600">Semibold</option>
                        <option value="700">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'position' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">Position Settings</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-3">
                        Horizontal Position
                      </label>
                      <div className="space-y-2">
                        {['left', 'center', 'right'].map((pos) => (
                          <label key={pos} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="x-position"
                              value={pos}
                              checked={template.position.x === pos}
                              onChange={(e) => handlePositionChange('x', e.target.value)}
                              className="w-4 h-4 text-primary border-surface-300 focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-surface-700 capitalize">
                              {pos}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-3">
                        Vertical Position
                      </label>
                      <div className="space-y-2">
                        {['top', 'center', 'bottom'].map((pos) => (
                          <label key={pos} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="y-position"
                              value={pos}
                              checked={template.position.y === pos}
                              onChange={(e) => handlePositionChange('y', e.target.value)}
                              className="w-4 h-4 text-primary border-surface-300 focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-surface-700 capitalize">
                              {pos}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Position Preview Grid */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-surface-700 mb-3">
                      Visual Position Guide
                    </label>
                    <div className="grid grid-cols-3 gap-2 p-4 bg-surface-50 rounded-xl border border-surface-200">
                      {['top', 'center', 'bottom'].map((y) =>
                        ['left', 'center', 'right'].map((x) => (
                          <button
                            key={`${x}-${y}`}
                            onClick={() => {
                              handlePositionChange('x', x)
                              handlePositionChange('y', y)
                            }}
                            className={`aspect-square rounded-lg border-2 transition-all ${
                              template.position.x === x && template.position.y === y
                                ? 'border-primary bg-primary/10'
                                : 'border-surface-300 bg-white hover:border-primary/50'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full mx-auto ${
                              template.position.x === x && template.position.y === y
                                ? 'bg-primary'
                                : 'bg-surface-400'
                            }`} />
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'export' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">Export Template</h3>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={exportTemplate}
                      disabled={isExporting}
                      className="w-full flex items-center justify-center space-x-3 bg-primary hover:bg-primary-dark disabled:bg-surface-400 text-white font-semibold px-6 py-4 rounded-xl transition-all shadow-soft hover:shadow-lg"
                    >
                      {isExporting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Exporting...</span>
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Download" className="w-5 h-5" />
                          <span>Export HTML File</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={copyCode}
                      className="w-full flex items-center justify-center space-x-3 bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-4 rounded-xl transition-all shadow-soft hover:shadow-lg"
                    >
                      <ApperIcon name="Copy" className="w-5 h-5" />
                      <span>Copy HTML Code</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetTemplate}
                      className="w-full flex items-center justify-center space-x-3 bg-surface-600 hover:bg-surface-700 text-white font-semibold px-6 py-4 rounded-xl transition-all shadow-soft hover:shadow-lg"
                    >
                      <ApperIcon name="RotateCcw" className="w-5 h-5" />
                      <span>Reset Template</span>
                    </motion.button>
                  </div>

                  {/* Code Preview */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-3">
                      Generated Code Preview
                    </label>
                    <div className="relative">
                      <pre className="code-display max-h-40 overflow-auto text-xs">
                        {generateCode()}
                      </pre>
                      <button
                        onClick={copyCode}
                        className="absolute top-2 right-2 p-2 bg-surface-800 hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <ApperIcon name="Copy" className="w-4 h-4 text-surface-300" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="floating-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-surface-900">Live Preview</h3>
              <div className="flex items-center space-x-2 text-sm text-surface-500">
                <ApperIcon name="Eye" className="w-4 h-4" />
                <span>Real-time</span>
              </div>
            </div>

            {/* Preview Container */}
            <div className="relative">
              <div 
                ref={canvasRef}
                className="w-full h-80 sm:h-96 border-2 border-surface-200 rounded-xl overflow-hidden"
                style={{ backgroundColor: template.backgroundColor }}
              >
                <div className={getPreviewStyles().container + ' h-full p-6'}>
                  <motion.div
                    key={`${template.headerText}-${template.position.x}-${template.position.y}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={getPreviewStyles().text}
                    className="font-heading select-none"
                  >
                    {template.headerText}
                  </motion.div>
                </div>
              </div>

              {/* Preview Info */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-lg text-xs font-mono">
                {template.position.x}-{template.position.y}
              </div>
            </div>

            {/* Preview Controls */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-200">
              <div className="text-sm text-surface-600">
                <span className="font-medium">{template.fontSize}px</span> · 
                <span className="ml-1 capitalize">{template.fontWeight}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-surface-300"
                  style={{ backgroundColor: template.textColor }}
                ></div>
                <span className="text-xs font-mono text-surface-500">
                  {template.textColor}
                </span>
              </div>
            </div>
          </div>

          {/* Template Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="floating-card p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {template.headerText.length}
              </div>
              <div className="text-sm text-surface-600">Characters</div>
            </div>
            <div className="floating-card p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {template.fontSize}
              </div>
              <div className="text-sm text-surface-600">Font Size</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainFeature