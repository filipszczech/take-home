import { FC, useState } from "react";

type ButtonProps = React.ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

type ToggleButtonProps = {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
  size?: number;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({ initialState = false, onToggle, size = 2 }) => {

  if (size <= 0) {
    throw new Error("Size must be greater than 0");
  }

  const [isOn, setIsOn] = useState<boolean>(initialState);

  const toggleHandler = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const wrapperStyles = {
    height: `${size}rem`,
    width: `${2 * size}rem`,
  };

  const circleStyles = {
    height: `${0.8 * size}rem`,
    width: `${0.8 * size}rem`,
    top: "50%",
    transform: "translateY(-50%)",
    left: isOn ? `${size}rem` : `${0.1 * size}rem`,
  };

  return (
    <button
      className={`relative border-2 border-black bg-gray-100 rounded-full`}
      style={wrapperStyles}
      onClick={toggleHandler}
    >
      <div 
        className={`absolute rounded-full transition-all duration-300 ${ isOn ? 'bg-green-700' : 'bg-red-500' }`}
        style={circleStyles}
      ></div>
    </button>
  );
};
