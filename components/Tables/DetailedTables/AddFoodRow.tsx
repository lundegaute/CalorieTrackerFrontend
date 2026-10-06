import { DetailedFoodDTO, DetailedMealComponentDTO } from "@/Types/DetailedTypes";
import { TextField, Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { DetailedMealComponentRequest } from "@/Types/DetailedRequests";
import {ChangeEvent, useState} from "react";

interface IAddFoodRow {
    food: DetailedFoodDTO;
    AddFoodToMeal: (item: DetailedFoodDTO, quantity: number) => void;
}

export default function AddFoodRow({food, AddFoodToMeal}: IAddFoodRow) {
    const [quantity, setQuantity] = useState<number | "">(100);

    const handleSetQuantity = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        if (value == ""){
            setQuantity(value);
        }
        else {
            const parsed = parseFloat(value);
            setQuantity(isNaN(parsed) ? "" : parsed);
        }

    };

    const handleAddFood = () => {
        const parsedQuantity = quantity === "" ? 0 : quantity; 
        AddFoodToMeal(food, parsedQuantity);
    }

    return(
        <tr key={food.id} className="hover:bg-slate-700/20 transition-colors">
            <td className="px-6 py-4 font-medium text-white">
                {food.foodName}
            </td>
            <td>
                <div className="flex items-center justify-center gap-1 mx-auto pl-3 pr-3">
                    <TextField 
                        variant="standard" 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => handleSetQuantity(e)} 
                        size="small"
                    />
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
                <Button 
                    variant="text" 
                    color="primary" 
                    onClick={() => handleAddFood()}
                    >
                        <AddIcon />
                </Button>
            </td>
        </tr>
    )
}