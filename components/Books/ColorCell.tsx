import { Button, Popover } from '@mui/material';
import { useState } from 'react';
import { HexColorPicker, HexColorInput, HexAlphaColorPicker} from 'react-colorful';

interface IColorPicker {
    value: string;
    rowId: number;
    onSave: (hex: string, rowId: number) => void;
}

export function ColorPicker({ value, rowId, onSave }: IColorPicker) {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [color, setColor] = useState(value);
    const onClose = () => {
        onSave(color, rowId);
        setAnchor(null);
    };

    return (
        <div>
            <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={(e) => {
                    (setColor(value), setAnchor(e.currentTarget));
                }}
            >
                Color
            </Button>
            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <div className="flex flex-col gap-2 p-3">
                    <HexAlphaColorPicker color={color} onChange={setColor} />
                    <HexColorInput color={color} onChange={setColor} prefixed />
                </div>
            </Popover>
        </div>
    );
}
