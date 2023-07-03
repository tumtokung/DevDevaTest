import React from 'react';

interface ButtonProps {
    title: string;
    variant: 'primary' | 'success' | 'warning' | 'error' | 'gray';
    onClick?: () => void;
    className?: string
}

const Button = ({ title, variant, onClick, className }: ButtonProps) => {

    const getBgColor = (): string => {
        switch (variant) {
            case 'primary':
                return "bg-blue-500";
            case 'success':
                return "bg-green-500"
            case 'warning':
                return "bg-yellow-500";
            case 'error':
                return "bg-red-500";
            case 'gray':
                return "bg-gray-500"
        }
    }

    const getTextColor = (): string => {
        switch (variant) {
            default:
                return "text-white";
        }
    }

    return (
        <button type="button" className={`${getBgColor()} w-16 h-10 rounded-md ${className}`} onClick={onClick}>
            <span className={`${getTextColor()}`}>
                {title}
            </span>
        </button>
    )
}

export default Button