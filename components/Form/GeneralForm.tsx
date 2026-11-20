import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

type fieldType = 'string' | 'date' | 'number';

interface FieldConfig<T> {
    name: keyof T & string;
    label: string;
    type: fieldType;
    required?: boolean;
}

interface IGeneralForm<T> {
    title: string;
    fields: FieldConfig<T>[];
    //onSubmit: (values: Record<string, unknown>) => void;
    submitLabel: string;
}

export function GeneralForm<T extends object>({
    title,
    fields,
    //onSubmit,
    submitLabel = "Save",
}: IGeneralForm<T>) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [values, setValues] = useState<Record<string, string>>({title: "", series: "", pages: "", startedReading: "", releaseYear: ""});

    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Working");
        console.log(values);
        
        
        //onSubmit(values);
    };

    return (
        <div className="border rounded-lg p-3">
            
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} >
                <h3 className="text-sm font-medium">{title}</h3>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`} >
                <form onSubmit={handleForm} className="flex flex-col gap-2 mt-4" >
                    {fields.map((f) => (
                        <TextField
                            key={f.name}
                            required
                            placeholder={f.label}
                            size="small"
                            variant="outlined"
                            type={f.type}
                            name={f.name}
                            value={values[f.name]}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    [f.name]: e.target.value,
                                })
                            }
                        />
                    ))}
                    <Button variant="contained" type="submit">
                        {submitLabel}
                    </Button>
                </form>
            </div>
        </div>
    );
}
