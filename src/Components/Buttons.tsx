import React from "react";
import "./Button.css";

const STYLES = ["btn--primary", "btn--outline", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];

interface IButtonProps{
  children?: string,
  type?: any,
  onClick?: () => void,
  buttonStyle: any,
  buttonSize: any
}

const Buttons = (props: IButtonProps) => {
  const {children, type, onClick, buttonSize, buttonStyle} = props
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Buttons;
