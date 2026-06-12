import { DetailedFoodDTO } from "@/Types/DetailedTypes";
import { TextField, Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { DetailedMealComponentRequest } from "@/Types/DetailedRequests";
import {useState} from "react";

interface IAddFoodRow {
    food: DetailedFoodDTO;
    foodsToAdd: DetailedMealComponentRequest[];
    toggleFoodToAdd: (newFood: DetailedFoodDTO, quantity: number) => void;
}

export default function AddFoodRow({food, foodsToAdd, toggleFoodToAdd}: IAddFoodRow) {
    const [quantity, setQuantity] = useState<number>(100);

    return(
        <tr key={food.id} className="hover:bg-slate-700/20 transition-colors">
            <td className="px-6 py-4 font-medium text-white">
                {food.foodName}
            </td>
            <td>
                <div className="flex items-center justify-center gap-1 mx-auto pl-3 pr-3">
                    <TextField variant="standard" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.currentTarget.value))} size="small"/>
                    <CreateIcon className="text-emerald-300" fontSize="inherit" />
                </div>
            </td>
            <td className="font-semibold text-emerald-300 tabular-nums">
                {food.calories}
            </td>
            <td className="font-semibold text-emerald-300 tabular-nums">
                {food.constituents.find(nut => nut.nutrientId === "Protein")?.quantity ?? 0}
            </td>
            <td className="font-semibold text-emerald-300 tabular-nums">
                {food.constituents.find(nut => nut.nutrientId === "Karbo")?.quantity ?? 0}
            </td>
            <td className="font-semibold text-emerald-300 tabular-nums">
                {food.constituents.find(nut => nut.nutrientId === "Fett")?.quantity ?? 0}
            </td>
            <td className="font-semibold text-emerald-300 tabular-nums">
                <Button variant="text" color={foodsToAdd.find(f => f.detailedFoodId === food.id) ? "success" : "primary"} onClick={() => toggleFoodToAdd(food, quantity)}>
                    <AddIcon />
                </Button>
            </td>
        </tr>
    )
}