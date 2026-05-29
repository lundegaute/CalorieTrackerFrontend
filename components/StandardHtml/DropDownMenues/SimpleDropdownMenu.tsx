"use client";
import { DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";
import DropDownStyles from "./DropDown.module.css";

interface BasicItem {
    id: number;
    name: string;
}

interface DropDownInterface<T> {
    dataSource: T[];
    setActiveMealPlanId: (id: number) => void;
    activeMealPlanId: number | null;
}

export default function SimpleDropdownMenu<T extends BasicItem>({dataSource, setActiveMealPlanId, activeMealPlanId}: DropDownInterface<T>) {

    return (
        <select className={DropDownStyles.DropDownMenu} name="GenericSelector" value={activeMealPlanId ? activeMealPlanId : 0} onChange={(event) => setActiveMealPlanId(parseInt(event.target.value))}>
            {dataSource.map((data) => (
                <option key={data.id} value={data.id}>{data.name}</option>
            ))}
        </select>
    )
}