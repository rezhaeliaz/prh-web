'use client'

import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Mountain, Wind, Droplets } from 'lucide-react'
import type { Locale } from '@/lib/translations'
import styles from './WeatherWidget.module.css'

interface WeatherWidgetProps {
  locale?: Locale
}

export function WeatherWidget({ locale = 'id' }: WeatherWidgetProps) {
  const isEn = locale === 'en'

  const [weather, setWeather] = useState({
    temp: 24,
    condition: isEn ? 'Cool Mountain Breeze' : 'Sejuk & Berawan',
    humidity: 76,
    salakView: isEn ? 'Mount Salak: Clear Panorama' : 'Gunung Salak: Terlihat Jernih',
    isClear: true,
  })

  useEffect(() => {
    // Fetch live weather for BNR Bogor (-6.6190, 106.7986)
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-6.6190&longitude=106.7986&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
        )
        if (!res.ok) return
        const data = await res.json()
        if (data && data.current) {
          const temp = Math.round(data.current.temperature_2m)
          const humidity = Math.round(data.current.relative_humidity_2m)
          const code = data.current.weather_code

          let cond = isEn ? 'Pleasant & Cool' : 'Sejuk Berawan'
          let isClear = true

          if (code === 0) {
            cond = isEn ? 'Sunny & Clear Skies' : 'Cerah Berawan Sejuk'
          } else if (code <= 3) {
            cond = isEn ? 'Partly Cloudy Breeze' : 'Sejuk & Asri'
          } else if (code >= 51 && code <= 67) {
            cond = isEn ? 'Refreshing Mountain Rain' : 'Hujan Rintik Pegunungan'
            isClear = false
          } else if (code >= 80) {
            cond = isEn ? 'Tropical Mountain Rain' : 'Hujan Tropis Menyegarkan'
            isClear = false
          }

          setWeather({
            temp,
            condition: cond,
            humidity,
            salakView: isClear
              ? isEn
                ? 'Mount Salak: Clear View'
                : 'Gunung Salak: Terlihat Jernih'
              : isEn
              ? 'Mount Salak: Scenic Mountain Mist'
              : 'Gunung Salak: Berkabut Asri',
            isClear,
          })
        }
      } catch (err) {
        // Fallback already set in initial state
      }
    }

    fetchWeather()
  }, [isEn])

  return (
    <div className={styles.weatherBadge} title="Cuaca Real-Time Bogor Nirwana Residence (BNR)">
      {/* Live Indicator */}
      <span className={styles.pulseDot} />

      {/* Temperature */}
      <div className={styles.tempBlock}>
        <span>{weather.temp}°C</span>
        <span className={styles.tempUnit}>BNR Bogor</span>
      </div>

      <span className={styles.divider} />

      {/* Condition */}
      <div className={styles.conditionBlock}>
        {weather.isClear ? <Sun size={15} color="#c5a55a" /> : <Cloud size={15} color="#9ca3af" />}
        <span>{weather.condition}</span>
      </div>

      <span className={styles.divider} />

      {/* Salak View */}
      <div className={styles.salakStatus}>
        <Mountain size={15} color="#dfc888" />
        <span>{weather.salakView}</span>
      </div>
    </div>
  )
}
