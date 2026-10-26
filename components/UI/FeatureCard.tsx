'use client';
import { useState } from 'react';
import { StatusDot } from './StatusDot';
import { Button } from '@mui/material';

interface IFeatureCard {
    title: string;
    description: string;
    status: 'done' | 'wip' | 'planned';
    isClickable?: boolean;
}

export function FeatureCard({ title, description, status, isClickable = false }: IFeatureCard) {
    //const statuses = ['done', 'wip', 'planned'];
    const [activeStatus, setActiveStatus] = useState(status);
    const nextStatus = {done: 'planned', planned: 'wip', wip: 'done'} as const;
    const statusUI = {
       done:    { color: 'bg-emerald-500', label: 'Done' },
       wip:     { color: 'bg-amber-400',   label: 'In Progress' },
       planned: { color: 'bg-rose-500',    label: 'Planned' },
   } as const;

    const changeStatusWithClick = () => setActiveStatus(nextStatus[activeStatus]);


    return (
        <div tabIndex={isClickable ? 0 : undefined} onClick={ isClickable ? changeStatusWithClick : undefined} className={`group relative rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/10 transition`}>
            <div className="flex items-center gap-2 mb-2">
                <StatusDot className={statusUI[activeStatus].color} />
                <span className="text-xs uppercase tracking-wide text-slate-400">
                    {statusUI[activeStatus].label}
                </span>
            </div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm text-slate-300">{description}</p>
        </div>
    );
}
