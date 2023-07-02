"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// this component is used in the dashboard page as the template for a list item
// it will take in the arguments: item_name, item_completed
// the 
// if task completed is true then the checkmark will be ticked


function DeleteTask() {
    console.log("DeleteTask called");
}

export default function ListItem({ item_name, item_completed }) {
    return (
        <div className="item">
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
