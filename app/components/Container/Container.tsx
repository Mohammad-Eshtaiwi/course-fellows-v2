import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export default function Container<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';
  
  return (
    <Component 
      className={`container ${className}`.trim()} 
      {...props}
    >
      {children}
    </Component>
  );
}