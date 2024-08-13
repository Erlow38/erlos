import React from 'react';
import Draggable from 'react-draggable';
import './save-dialog.css';

interface SaveDialogProps {
    isSaveDialogVisible: boolean;
    setIsSaveDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveDialog: React.FC<SaveDialogProps> = ({ isSaveDialogVisible, setIsSaveDialogVisible }) => {
    const setDialogVisible = () => {
        setIsSaveDialogVisible(!isSaveDialogVisible);
    };

    // Function to export settings
    const exportSettings = () => {
        const localStorageData = JSON.stringify(localStorage);
        const blob = new Blob([localStorageData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        // Name of the file to download with current date
        link.download = 'ErlOS-settings-' + new Date().toISOString().slice(0, 10) + '.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    // Function to import settings
    const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target?.result as string;
                const importedData = JSON.parse(contents);
                localStorage.clear();
                for (const key in importedData) {
                    localStorage.setItem(key, importedData[key]);
                }
                window.location.reload(); // Reload the page to apply the new settings
            };
            reader.readAsText(file);
        }
    };

    return (
        <Draggable handle=".save-dialog-header">
            <div className="save-dialog-container">
                <div className="save-dialog">
                    <div className="save-dialog-content">
                        <div className="save-dialog-header">
                            <div className="save-dialog-title">Save</div>
                            <div className="save-dialog-close pointer" onClick={setDialogVisible}>
                                <span className="pi pi-times">&times;</span>
                            </div>
                        </div>

                        <div className="save-dialog-body">
                            <div className="p-grid-save">
                                <div>
                                    <button id="save-input" className="save-button" onClick={exportSettings}>
                                        Export settings
                                    </button>
                                </div>
                                <div>
                                    <label className='import-label' htmlFor="import-input">Import settings</label>
                                    <input id="import-input" className='import-input' type="file" onChange={importSettings} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default SaveDialog;
