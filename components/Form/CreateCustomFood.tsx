"use client";
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function CreateCustomFood() {

    function handleCustomFood(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if ( formData.get("Calories") == "" || formData.get("Protein") == "" || formData.get("Carbs") == "" || formData.get("Fat") == "") {
            return;
        }
        console.log(formData.get("Name"));
        return;
        // If all is good, add to database
    }

    return (
        <form onSubmit={handleCustomFood}>
            <TextField variant="outlined" type="text" name="Name" placeholder="Food Name" />
            <TextField variant="outlined" type="text" name="Calories" placeholder="Calories"/>
            <TextField variant="outlined" type="text" name="Protein" placeholder="Protein"/>
            <TextField variant="outlined" type="text" name="Carbs" placeholder="Carbs"/>
            <TextField variant="outlined" type="text" name="Fat" placeholder="Fat"/>
            <Button variant="contained" type="submit" > Add Custom Food </Button>
        </form>
    );
}