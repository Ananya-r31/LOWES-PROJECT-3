// One drum pad. It shows the name + key, plays when clicked,
// and tells App when it is pressed (onPlay).
export default function DrumPad({ pad, isActive, onPlay, registerAudio }) {
  return (
    <button
      className={`pad ${isActive ? 'pad-active' : ''}`} // dynamic CSS class
      onClick={() => onPlay(pad)}
      aria-label={`${pad.name} drum - ${pad.key} key`}
      aria-pressed={isActive}
    >
      <span className="pad-name">{pad.name}</span>
      <span className="pad-key">{pad.key}</span>
      {/* The <audio> element is stored in App through a ref */}
      <audio ref={(el) => registerAudio(pad.key, el)} src={pad.sound} preload="auto" />
    </button>
  )
}
