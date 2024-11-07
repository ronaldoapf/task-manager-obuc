import Divider from '../Divider/Divider';
import Tags from '../Tags/Tags'
import './CardTask.css'
import PropTypes from "prop-types";

export default function CardTask({ description, tag, title }) {
  return (
    <div className="card-task-container">
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <Divider />
      <Tags label={tag} />
    </div>
  )
}

CardTask.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
