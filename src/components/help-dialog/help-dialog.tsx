import React from 'react';
import Draggable from 'react-draggable'; // Import de react-draggable
import './help-dialog.css';

interface HelpDialogProps {
    isHelpDialogVisible: boolean;
    setIsHelpDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isHelpDialogVisible, setIsHelpDialogVisible }) => {
    const setDialogVisible = () => {
        setIsHelpDialogVisible(!isHelpDialogVisible);
    }

    return (
        <Draggable handle=".help-dialog-header">
            <div className="help-dialog-container">
                <div className="help-dialog">
                    <div className="help-dialog-content">
                        <div className="help-dialog-header">
                            <div className="help-dialog-title">Help</div>
                            <div className="help-dialog-close pointer" onClick={setDialogVisible}>
                                <span className="pi pi-times">&times;</span>
                            </div>
                        </div>
                        <div className="help-dialog-body">
                            <div className="p-grid-help">
                                <div>
                                    <p>
                                        Welcome to ErlOS! This is a home page of a web browser. You can add your favorite websites to the home page by clicking on the Add button and choose your favorite theme by clicking on the Themes button!
                                    </p>
                                    <p>
                                        You can put this page in first place when you open your browser in the settings of your browser.
                                    </p>
                                    <p>
                                        Thank you for using ErlOS!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default HelpDialog;
