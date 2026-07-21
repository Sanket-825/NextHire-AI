import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center">
      <div className="bg-surface border border-border rounded-xl p-8">
        <h1 className="text-2xl font-sans">Design token test</h1>
        <p className="text-text-secondary">Secondary text color check</p>
        <span className="text-accent-green">Green accent check</span>
      </div>
    </div>
  )
}
