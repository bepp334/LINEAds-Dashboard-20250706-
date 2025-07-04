
import React from 'react';

export const LineIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-line-green">
        <path d="M21.1 12a9.1 9.1 0 1 1-18.2 0 9.1 9.1 0 0 1 18.2 0z" fill="#06C755"></path>
        <path d="M15.5 13.6c-1 .8-2.3 1.2-3.6 1.2-2.1 0-3.9-1-4.8-2.5h.3c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.3c-.3 0-.5.2-.5.5v2.3c0 .3.2.5.5.5s.5-.2.5-.5v-.3c1.2 1.9 3.5 3.1 6 3.1 1.7 0 3.3-.6 4.5-1.6.2-.1.2-.4 0-.6l-.3-.3c-.2-.1-.4 0-.6.1zM8.5 10.4c1-.8 2.3-1.2 3.6-1.2 2.1 0 3.9 1 4.8 2.5h-.3c-.3 0-.5.2-.5.5s.2.5.5.5h2.3c.3 0 .5-.2.5-.5V9.9c0-.3-.2-.5-.5-.5s-.5.2-.5.5v.3c-1.2-1.9-3.5-3.1-6-3.1-1.7 0-3.3.6-4.5 1.6-.2.1-.2.4 0 .6l.3.3c.3.1.5 0 .6-.1z" fill="#fff"></path>
    </svg>
);

export const AiIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
        <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-6 h-6">{children}</div>
);

export const ImpressionsIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    </IconWrapper>
);

export const ClicksIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M15 4V2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
            <path d="M10 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z" />
            <path d="M3 13V9a2 2 0 0 1 2-2h4" />
            <path d="m14 17-2.3-2.3" />
            <path d="M4 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        </svg>
    </IconWrapper>
);

export const CostIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    </IconWrapper>
);

export const CtrIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
            <line x1="12" x2="12" y1="20" y2="4" />
            <polyline points="6 14 12 20 18 14" />
            <path d="M15.06 11.23a1 1 0 0 0-1.12-1.6l-1.94.7-1.94-.7a1 1 0 0 0-1.12 1.6l1.94 3.37h2.24Z" />
        </svg>
    </IconWrapper>
);

export const CpaIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M9 12h.01" /><path d="M15 12h.01" /><path d="M10 16s.5-1 2-1 2 1 2 1" />
        </svg>
    </IconWrapper>
);

export const ConversionsIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="m9 12 2 2 4-4"/>
        </svg>
    </IconWrapper>
);
