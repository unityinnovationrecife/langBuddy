'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

import Header from '@/components/ui/Header'
import Sidebar from '@/components/ui/Sidebar'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function DiscoverPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex min-h-screen bg-blue-50 text-gray-800">
      {/* Sidebar fixa */}
      <Sidebar />

      <div className="flex-1 flex flex-col ml-0 md:ml-64"> {/* deixa espaço para a sidebar */}
        {/* Header */}
        <Header />

        <main className="flex-1 flex flex-col items-center p-4">
          {/* Título */}
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-neutral-700 flex items-center gap-2 mb-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Globe className="text-blue-600" /> Escolha uma região para praticar idiomas
          </motion.h1>

          {/* Mapa interativo */}
          <motion.div
            className="bg-white shadow-xl rounded-3xl p-4 md:p-8 w-full max-w-[95%] md:max-w-[80%] flex flex-col items-center"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full overflow-hidden">
              <ComposableMap
                projectionConfig={{ scale: 160 }}
                width={1000}
                height={500}
                className="w-full h-[500px]"
              >
                <ZoomableGroup zoom={1} maxZoom={4} minZoom={1} center={[0, 20]}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: Array<any> }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => setSelected(geo.properties.name)}
                          className="transition-all duration-200 cursor-pointer"
                          style={{
                            default: {
                              fill: selected === geo.properties.name ? '#367ae7ff' : '#accef8ff',
                              outline: 'none',
                              stroke: '#fff',
                              strokeWidth: 0.4,
                            },
                            hover: {
                              fill: '#2f6ab3ff',
                              outline: 'none',
                              stroke: '#1a4a97ff',
                              strokeWidth: 0.7,
                            },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Cartão flutuante */}
            {selected && (
              <motion.div
                className={`mt-6 md:mt-0 ${
                  isMobile
                    ? 'fixed bottom-4 left-4 right-4 z-20'
                    : 'absolute bottom-6 z-20'
                } bg-blue-50 border border-blue-100 rounded-2xl md:rounded-3xl py-4 px-6 shadow-lg text-center w-full max-w-md`}
                initial={{
                  opacity: 0,
                  x: isMobile ? 0 : 100,
                  y: isMobile ? 100 : 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: isMobile ? 0 : 100,
                  y: isMobile ? 100 : 0,
                }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                🌍 Você escolheu: <strong>{selected}</strong>
                <p className="text-sm text-blue-500 mt-1">
                  Clique em “Encontrar falantes” para conversar com pessoas dessa região
                </p>
                <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2 text-sm transition-all">
                  Encontrar falantes
                </button>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
