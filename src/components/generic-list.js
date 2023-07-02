"use client"
import Link from 'next/link';
import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
// this component is used in the dashboard page as the template for a list item
// it will take in the arguments: item_name, item_completed
// the 
// if task completed is true then the checkmark will be ticked


function DeleteTask() {
    console.log("DeleteTask called");
}


function checkbox(item_completed) {
    const [checked, setChecked] = item_completed ? useState(true) : useState(false);

    const handleCheckbox = (e) => {
        // we need to comunicate the change of state of the checkbox to the database
        

    }

        

    if (item_completed != undefined) {
        return (
            <div className="list-item-completed">
                <input onChange={handleCheckbox} type="checkbox"  />
            </div>
        );
    }
}



export default function ListItem({ item_name, item_completed }) {
    // if item_completed is true or false then we need to display the checkbox with or without being checked
    // if its undefined then we need to display the delete button

    console.log(item_completed);
    return (
        <div className="item">
            {
                checkbox(item_completed)
            }
            <div className="list-item-name">
                {item_name}
            </div>
            {item_completed ? 
            <div onClick={DeleteTask} className="list-item-completed">
                X
            </div>
            : ""}
        </div>
    );
}
