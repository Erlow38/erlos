import { useState } from "react";
import './themes-dialog.css';

export default function ThemesDialog({isThemesDialogVisible, setIsThemesDialogVisible, selectedTheme, setSelectedTheme}) {
    const [themes, setThemes] = useState([
        { name: 'Original', class: 'original'},
        { name: 'Blue', class: 'blue' },
        { name: 'Green', class: 'green' },
        { name: 'Yellow', class: 'yellow' },
        { name: 'Red', class: 'red' },
        { name: 'Purple', class: 'purple' },
    ]);

    const onThemeSelect = (theme) => {
        setSelectedTheme(`url(../img/themes/${theme.class}.jpg)`);
        setIsThemesDialogVisible(false);
    }

    function setDialogVisible() {
        setIsThemesDialogVisible(!isThemesDialogVisible);
    }

    const themeItems = themes.map((theme, index) => {
        return (
            <div key={index} className="themes-dialog-item">
                <div className={`theme-box pointer ${theme.class}`} onClick={() => onThemeSelect(theme)}>
                    <span className="theme-name" onClick={onThemeSelect}>{theme.name}</span>
                </div>
            </div>
        );
    });

    return (
        <div className="themes-dialog-container">
            <div className="themes-dialog">
                <div className="themes-dialog-content">
                    <div className="themes-dialog-header">
                        <div className="themes-dialog-title">Themes</div>
                        <div className="themes-dialog-close pointer" onClick={setDialogVisible}>
                            <span className="pi pi-times">&times;</span>
                        </div>

                    </div>

                    <div className="themes-dialog-body">
                        <div className="p-grid">
                            {themeItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
