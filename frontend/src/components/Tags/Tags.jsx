import PropTypes from "prop-types"
import './Tags.css'

export default function Tags({ label }) {
  return (
    <div className="tags-container">
      <p className="label">
        {label}
      </p>
    </div>
  )
}

Tags.Proptypes = {
  label: PropTypes.string
}