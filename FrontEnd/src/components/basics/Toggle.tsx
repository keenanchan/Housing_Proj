import React, { useState, useEffect } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { Icon as IconType, IconProps } from '../../assets/icons/all';

interface ToggleProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  hideLabel?: boolean;
  icon?: IconType;
  iconConfig?: IconProps;
  selected?: boolean;
  initialSelected?: boolean;
  onClick?: (
    selected: boolean,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => any;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  hideLabel,
  icon,
  iconConfig,
  selected,
  initialSelected = false,
  className = '',
  onClick,
  children,
  ...buttonProps
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected);
  const [Icon, setIcon] = useState<IconType | undefined>(icon);

  useEffect(() => {
    if (selected !== undefined) setIsSelected(selected);
  }, [selected]);

  useEffect(() => {
    setIcon(icon);
  }, [icon]);

  return (
    <Button
      variant=""
      {...buttonProps}
      className={
        (isSelected
          ? 'homehub-toggle-selected '
          : 'homehub-toggle-unselected ') + className
      }
      onClick={(e) => {
        if (onClick) onClick(!isSelected, e);
        setIsSelected(!isSelected);
      }}
    >
      <div>
        {Icon && <Icon className="homehub-toggle-icon" {...iconConfig} />}
      </div>
      <div>{!hideLabel && label}</div>
      {children}
    </Button>
  );
};

export default Toggle;
