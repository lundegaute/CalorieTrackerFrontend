'use client';
import { useState, useEffect, useCallback } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface toggleButtonProps {
    names: string[];
    value: string;
    setFunction: (value: string) => void;
}

export function ToggleButtons({ names, value, setFunction }: toggleButtonProps) {

    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLElement>, newValue: string) => {
            if (!newValue) return;
            else setFunction(newValue);
        },
        [value]
    );

    return (
        <div>
            <ToggleButtonGroup
                color="primary"
                value={value}
                exclusive
                onChange={handleChange}
            >
                {names.map((name: string) => (
                    <ToggleButton key={name} value={name}>{name}</ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}
