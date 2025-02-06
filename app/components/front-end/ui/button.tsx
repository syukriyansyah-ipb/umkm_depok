import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantStyles = {
    default: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
  }
  
  const sizeStyles = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1 text-xs',
    lg: 'px-6 py-3 text-base',
  }

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

