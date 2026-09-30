// Volume slider and power button. State lives in App, so we get
// the values and the change functions as props.
export default function Controls({ volume, onVolumeChange, isPoweredOn, onTogglePower }) {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="volume" className="control-label">MASTER VOLUME</label>
        <div className="volume-row">
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
          />
          <span className="volume-value">{volume}%</span>
        </div>
      </div>

      <div className="control-group">
        <span className="control-label">POWER</span>
        <button
          className={`power-btn ${isPoweredOn ? 'power-on' : 'power-off'}`}
          onClick={onTogglePower}
          aria-pressed={isPoweredOn}
        >
          {isPoweredOn ? '[ ON ]' : '[ OFF ]'}
        </button>
      </div>
    </div>
  )
}
