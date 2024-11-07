import PropTypes from 'prop-types'
import './Divider.css'
import clsx from 'clsx'
import { TaskStatus } from '../../types/TaskStatus'

export default function Divider({ taskStatus = "normal" }) {
  return (
    <hr 
      className={
        clsx(
          { ["normal"]: taskStatus === "normal" }, 
          { ["to-do"]: taskStatus === "pending" },
          { ["in-progress"]: taskStatus === "inProgress" },
          { ["done"]: taskStatus === "completed" } 
        )
      }
    />
  )
}

Divider.prototype = {
  taskStatus: PropTypes.oneOf(TaskStatus),
}