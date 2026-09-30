import { useState, useEffect, useRef } from 'react'
import Display from './components/Display'
import DrumPad from './components/DrumPad'
import Controls from './components/Controls'
import { soundBank } from './data/soundBank'

export default function App() {
  // Main state lives here ("lifting state up")
  const [activeKey, setActiveKey] = useState(null)
  const [volume, setVolume] = useState(70)
  const [isPoweredOn, setIsPoweredOn] = useState(true)
  const [displayMessage, setDisplayMessage] = useState('READY')

  // audioRefs holds every <audio> element, so we never create new ones
  const audioRefs = useRef({})
  const registerAudio = (key, element) => {
    audioRefs.current[key] = element
  }

  // Play one pad: sound + display + glow animation
  const playPad = (pad) => {
    if (!isPoweredOn) return

    const audio = audioRefs.current[pad.key]
    if (audio) {
      audio.volume = volume / 100 // slider is 0-100, audio.volume is 0-1
      audio.currentTime = 0 // restart so fast taps still play
      // play() returns a Promise; catch stops errors if a file is missing
      audio.play().catch(() => {})
    }

    setDisplayMessage(`PLAYING: ${pad.name.toUpperCase()}`)
    setActiveKey(pad.key)
  }

  // Remove the glow after a short time
  useEffect(() => {
    if (!activeKey) return
    const timer = setTimeout(() => setActiveKey(null), 150)
    return () => clearTimeout(timer)
  }, [activeKey])

  // Keyboard controls: listen on the whole window
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat) return // ignore key held down
      const pad = soundBank.find((p) => p.key === event.key.toUpperCase())
      if (pad) playPad(pad)
    }
    window.addEventListener('keydown', handleKeyDown)
    // cleanup: remove the listener when the effect re-runs or component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPoweredOn, volume]) // re-attach when these change so playPad sees new values

  // Volume slider also updates sounds that are already playing
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) audio.volume = newVolume / 100
    })
  }

  const togglePower = () => {
    if (isPoweredOn) {
      // Turning OFF: stop every sound
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
        }
      })
      setActiveKey(null)
      setDisplayMessage('SYSTEM OFF')
    } else {
      setDisplayMessage('READY')
    }
    setIsPoweredOn(!isPoweredOn)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>NEON DRUM PAD</h1>
        <p>Interactive React Drum Machine</p>
      </header>

      <main className="machine">
        <Display message={displayMessage} volume={volume} isPoweredOn={isPoweredOn} />

        <div className={`pad-grid ${isPoweredOn ? '' : 'pad-grid-off'}`}>
          {soundBank.map((pad) => (
            <DrumPad
              key={pad.id}
              pad={pad}
              isActive={activeKey === pad.key}
              onPlay={playPad}
              registerAudio={registerAudio}
            />
          ))}
        </div>

        <Controls
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isPoweredOn={isPoweredOn}
          onTogglePower={togglePower}
        />
      </main>

      <footer className="footer">Built with React • Drum Pad Machine</footer>
    </div>
  )
}
