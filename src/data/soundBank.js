// One object per pad. The UI is built from this array with .map()
// The audio files live in public/audio/ (served from "/audio/...").
export const soundBank = [
  { id: 1, key: 'Q', name: 'Kick',        sound: '/audio/kick.mp3' },
  { id: 2, key: 'W', name: 'Snare',       sound: '/audio/snare.mp3' },
  { id: 3, key: 'E', name: 'Hi-Hat',      sound: '/audio/hihat.mp3' },
  { id: 4, key: 'A', name: 'Clap',        sound: '/audio/clap.mp3' },
  { id: 5, key: 'S', name: 'Tom',         sound: '/audio/tom.mp3' },
  { id: 6, key: 'D', name: 'Open Hi-Hat', sound: '/audio/open-hihat.mp3' },
  { id: 7, key: 'Z', name: 'Low Tom',     sound: '/audio/low-tom.mp3' },
  { id: 8, key: 'X', name: 'Crash',       sound: '/audio/crash.mp3' },
  { id: 9, key: 'C', name: 'Ride',        sound: '/audio/ride.mp3' },
]
