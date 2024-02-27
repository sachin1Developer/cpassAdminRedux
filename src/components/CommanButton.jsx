import React, { useState } from 'react';
import './CommanButton.css'; // Make sure to import the CSS file

export default function CommanButton(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const buttonStyles = {
        padding: '8px 14px',
        fontSize: '16px',
        fontWeight: '600',
        backgroundColor: isClicked ? '#6366f1' : 'white',
        color: isClicked ? 'white' : '#6366f1',
        border: isHovered ? '1px solid #6366f1' : '1px solid #6366f1',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: isHovered ? '1px 2px 7px grey' : 'none'
    };

    const handleClick = () => {
        // Set the wave effect state
        setIsClicked(true);

        // Reset the wave effect after a delay (adjust as needed)
        setTimeout(() => {
            setIsClicked(false);
        }, 300);

        // Call the onClick handler passed from the parent component
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button
            style={buttonStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            type={props.type}
            disabled={props.disabled}
            className={props.className}
        >
            {props.children}
            {props.text}
            <span className={`wave-effect ${isClicked ? 'active' : ''}`}></span>
        </button>
    );
}
