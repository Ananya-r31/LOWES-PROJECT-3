// Props: message, volume and isPoweredOn all come from App
export default function Display({ message, volume, isPoweredOn }) {
  return (
    <div className={`display ${isPoweredOn ? '' : 'display-off'}`} aria-live="polite">
      <p className="display-title">DRUM MACHINE</p>
      <p className="display-message">{message}</p>
      <div className="display-info">
        <span>Volume: {volume}%</span>
        <span>Power: {isPoweredOn ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  )
}
