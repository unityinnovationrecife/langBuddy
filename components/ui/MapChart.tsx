'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const regions = [
  { name: 'América do Sul', color: '#4f9fef', languages: ['Português', 'Espanhol'] },
  { name: 'América do Norte', color: '#ffb347', languages: ['Inglês', 'Espanhol', 'Francês'] },
  { name: 'Europa', color: '#a86deb', languages: ['Inglês', 'Francês', 'Alemão', 'Espanhol', 'Italiano'] },
  { name: 'África', color: '#f96c6c', languages: ['Árabe', 'Francês', 'Inglês', 'Suaíli'] },
  { name: 'Ásia', color: '#4fd19c', languages: ['Chinês', 'Japonês', 'Coreano', 'Hindi', 'Indonésio'] },
  { name: 'Oceania', color: '#5ac8fa', languages: ['Inglês'] },
];

export default function MapChart({ setSelectedRegion }: { setSelectedRegion: any }) {
  return (
    <div className="w-full max-w-5xl h-[450px] bg-white rounded-2xl shadow-lg p-4">
      <ComposableMap projectionConfig={{ scale: 140 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo) => {
              const continent = geo.properties.continent;
              const region = regions.find((r) =>
                continent?.toLowerCase().includes(r.name.split(' ')[0].toLowerCase())
              );
              const color = region ? region.color : '#BBDDFD';
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (region) setSelectedRegion(region);
                  }}
                  style={{
                    default: { fill: color, outline: 'none' },
                    hover: { fill: '#1e90ff', outline: 'none' },
                    pressed: { fill: '#005ecb', outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
