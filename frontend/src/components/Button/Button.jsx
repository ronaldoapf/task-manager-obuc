import PropTypes from "prop-types";
import "./Button.css";
import clsx from "clsx";
export default function Button({
  children,
  onClick,
  secondaryStyle = false,
  typeSubmit = false,
  className,
}) {
  return (
    <div className="button-wrapper">
      <button
        className={clsx(
          {
            ["secondary-button"]: secondaryStyle, 
            ["primary-button"]: !secondaryStyle
          }, className)}
        onClick={onClick}
        type={typeSubmit ? "submit" : "button"}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  secondaryStyle: PropTypes.bool,
  typeSubmit: PropTypes.bool,
  className: PropTypes.string,
};
