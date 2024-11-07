import PropTypes from 'prop-types'
import './List.css'
import Divider from '../Divider/Divider'

export default function List({ label, taskStatus, children }) {
  return (
    <section className="list-container">
      <h2 className="title">{label}</h2>
      <Divider taskStatus={taskStatus} />
      <div className="list-tasks">
        {children}
      </div>
    </section>
  )
}


List.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
}