'use client';

interface IStatusDot {
    className: string;
}

export function StatusDot({ className }: IStatusDot) {
    return (
        <span
            className={`inline-block h-3 w-3 rounded-full ring-2 ring-white/10 shadow ${className}`}
            aria-hidden="true"
        />
    );
}
