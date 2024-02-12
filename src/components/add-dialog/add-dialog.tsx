import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Import de react-draggable
import './add-dialog.css';

interface FavIcon {
    name: string;
    url: string;
    img: string;
}

interface AddDialogProps {
    isAddDialogVisible: boolean;
    setIsAddDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
    favIcons: FavIcon[];
    setFavIcons: React.Dispatch<React.SetStateAction<FavIcon[]>>;
}

const AddDialog: React.FC<AddDialogProps> = ({ isAddDialogVisible, setIsAddDialogVisible, favIcons, setFavIcons }) => {
    const onClickAddfav = () => {
        const name = (document.getElementById('fav-name-input') as HTMLInputElement).value;
        const url = (document.getElementById('fav-url-input') as HTMLInputElement).value;
        const icon = (document.getElementById('fav-icon-input') as HTMLInputElement).value;

        setFavIcons([...favIcons, { name, url, img: icon }]);

        // Save to local storage
        localStorage.setItem('favIcons', JSON.stringify([...favIcons, { name, url, img: icon }]));

        setIsAddDialogVisible(!isAddDialogVisible);
    }

    const setDialogVisible = () => {
        setIsAddDialogVisible(!isAddDialogVisible);
    }

    return (
        <Draggable handle=".add-dialog-header">
            <div className="add-dialog-container">
                <div className="add-dialog">
                    <div className="add-dialog-content">
                        <div className="add-dialog-header">
                            <div className="add-dialog-title">Add</div>
                            <div className="add-dialog-close pointer" onClick={setDialogVisible}>
                                <span className="pi pi-times">&times;</span>
                            </div>

                        </div>

                        <div className="add-dialog-body">
                            <div className="p-grid-add">
                                <div>
                                    <label htmlFor="fav-name-input">Name</label>
                                    <input id="fav-name-input" type="text" placeholder="ex: Erlow" />
                                </div>
                                <div>
                                    <label htmlFor="fav-url-input">URL</label>
                                    <input id="fav-url-input" type="text" placeholder="ex: https://erlow.com" />
                                </div>
                                <div>
                                    <label htmlFor="fav-icon-input">Icon</label>
                                    <input id="fav-icon-input" type="text" placeholder="ex: https://erlow.com/favicon.ico" />
                                </div>
                            </div>
                            <button onClick={onClickAddfav}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default AddDialog;
