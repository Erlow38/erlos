import { useState } from 'react';
import './add-dialog.css';

export default function AddDialog({isAddDialogVisible, setIsAddDialogVisible, favIcons, setFavIcons}) {
    function onClickAddfav() {
        const name = document.getElementById('fav-name-input').value;
        const url = document.getElementById('fav-url-input').value;
        const icon = document.getElementById('fav-icon-input').value;
    
        setFavIcons([...favIcons, { name, url, img: icon }]);

        // Save to local storage
        localStorage.setItem('favIcons', JSON.stringify([...favIcons, { name, url, img: icon }]));
    
        setIsAddDialogVisible(!isAddDialogVisible);
    }

    function setDialogVisible() {
        setIsAddDialogVisible(!isAddDialogVisible);
    }

    return (
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
                                <input id="fav-name-input" type="text" />
                            </div>
                            <div>
                                <label htmlFor="fav-url-input">URL</label>
                                <input id="fav-url-input" type="text" />
                            </div>
                            <div>
                                <label htmlFor="fav-icon-input">Icon</label>
                                <input id="fav-icon-input" type="text" />
                            </div>
                        </div>
                        <button onClick={onClickAddfav}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
