"use client";
import DropDownStyles from "./DropDown.module.css";

interface BasicItem {
    id: number;
    name: string;
}

interface DropDownInterface<T> {
    dataSource: T[];
    setValue: (id: number) => void;
}

export default function SimpleDropdownMenu<T extends BasicItem>({dataSource, setValue}: DropDownInterface<T>) {

    return (
        <select className={DropDownStyles.DropDownMenu} name="GenericSelector" onChange={(event) => setValue(parseInt(event.target.value))}>
            {dataSource.map((data) => (
                <option key={data.id} value={data.id}>{data.name}</option>
            ))}
        </select>
    )
}