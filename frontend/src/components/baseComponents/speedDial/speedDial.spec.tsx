import React from 'react';

export interface SpeedDialSpec {
    children: React.ReactNode;
}

export interface SpeedDialActionSpec {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
}