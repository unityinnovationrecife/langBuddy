'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

import Header from '@/components/ui/Header'

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
    <main>
      <Header />
      <div className=" bg-gradient-to-b from-[#e6f0ff] to-[#f8fbff] flex flex-col items-center  p-4">
        <motion.h1
          className="text-xl md:text-3xl font-bold text-neutral-700 flex items-center gap-2 mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Globe className="text-neutral-800" /> Escolha uma região para praticar idiomas
        </motion.h1>

        <motion.div
          className="bg-white shadow-xl rounded-3xl p-6 md:p-10 w-full max-w-[95%] md:max-w-[70%] flex flex-col items-center"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full overflow-hidden">
            <ComposableMap
              projectionConfig={{ scale: 300 }}
              width={800}
              height={400}
              className="w-full h-auto"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<any> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => setSelected(geo.properties.name)} className="transition-all duration-200 cursor-pointer"
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
            </ComposableMap>
          </div>

          {selected && (
            <motion.div
              className="fixed md:static bottom-0 left-0 right-0 md:bottom-auto bg-blue-50 border border-blue-100 rounded-t-3xl md:rounded-2xl py-5 px-6 text-blue-700 shadow-lg text-center"
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
      </div>
    </main>
  )
}
