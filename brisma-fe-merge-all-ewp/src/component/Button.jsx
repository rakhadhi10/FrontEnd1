import React, { forwardRef } from "react";
import { cls } from "../utils/helper";
import PropTypes from "prop-types";

const classes = {
  base: "focus:outline-none transition ease-in-out duration-300 font-mulish",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-3",
    large: "px-8 py-3 text-lg",
  },
  variant: {
    primary:
      "bg-primary-blue hover:bg-blue-800 focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 text-white",
    secondary:
      "bg-primary-gray hover:bg-secondary-gray focus:ring-2 focus:primary-gray focus:ring-opacity-50 text-white hover:text-secondary-light-black",
    danger:
      "bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
  },
};

const Button = forwardRef(
  (
    {
      children,
      type = "button",
      className,
      variant = "primary",
      size = "normal",
      pill,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  )
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["submit", "button"]),
  className: PropTypes.string,
  pill: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "normal", "large"]),
};

export default Button;
