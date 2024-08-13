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
                                        Welcome to ErlOS! This is a home page of a web browser with lots of features!
                                    </p>
                                    <p>
                                        - You can add your favorite websites to the home page by clicking on the "Add" button.
                                        <br />
                                        - You can remove a website by clicking on the "Remove" button.
                                        <br />
                                        - You can change the theme and the background image by clicking on the "Themes" button.
                                        <br />
                                        - You can export or import your settings by clicking on the "Save" button.
                                        <br />
                                        - You can play minesweeper by clicking on the "Minesweeper" button.
                                        <br />
                                        - You can visualize charts by clicking on the "Charts" button.
                                        <br />
                                        - You can calculate by clicking on the "Calculator" button.
                                        <br />
                                        - You can navigate on the web by clicking on the "Browser" button or by searching in the search bar.
                                    </p>
                                    <p>
                                        If you want to put this page in first place when you open your browser, you can search on the web how to do it with your browser! (<a className='help-link' href="https://support.google.com/chrome/answer/95314?hl=en&co=GENIE.Platform%3DDesktop" target="_blank" rel="noreferrer">Here is an example for Chrome</a>).
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
