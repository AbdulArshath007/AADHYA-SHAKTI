'use client'

import { useEffect } from 'react'
import { balloons } from 'balloons-js'

export function BalloonsEffect({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (trigger) {
      // Small delay to ensure DOM is ready and it feels like a surprise
      const timer = setTimeout(() => {
        balloons()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  return null
}
