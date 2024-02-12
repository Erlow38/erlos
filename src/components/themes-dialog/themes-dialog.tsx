import React, { useState } from "react";
import './themes-dialog.css';

interface Theme {
    name: string;
    class: string;
}

interface Mode {
    name: string;
    class: string;
}

interface ThemesDialogProps {
    isThemesDialogVisible: boolean;
    setIsThemesDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
    setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
}

const ThemesDialog: React.FC<ThemesDialogProps> = ({ isThemesDialogVisible, setIsThemesDialogVisible, setSelectedTheme, setSelectedMode }) => {
    const [themes, setThemes] = useState<Theme[]>([
        { name: 'Original', class: 'original'},
        { name: 'Blue', class: 'blue' },
        { name: 'Green', class: 'green' },
        { name: 'Yellow', class: 'yellow' },
        { name: 'Red', class: 'red' },
        { name: 'Purple', class: 'purple' },
    ]);

    const [modes, setModes] = useState<Mode[]>([
        { name: 'Light', class: 'light'},
        { name: 'Dark', class: 'dark' },
    ]);

    const onThemeSelect = (theme: Theme) => {
        setSelectedTheme(`url(../img/themes/${theme.class}.jpg)`);

        // Save selected theme to local storage
        localStorage.setItem('selectedTheme', JSON.stringify(`url(./img/themes/${theme.class}.jpg)`));

        // Reload the page to apply the new theme
        window.location.reload();

        setIsThemesDialogVisible(false);
    }

    const onModeSelect = (mode: Mode) => {
        setSelectedMode(mode.class);

        // Save selected mode to local storage
        localStorage.setItem('selectedMode', JSON.stringify(mode.class));

        // Reload the page to apply the new mode
        window.location.reload();

        setIsThemesDialogVisible(false);
    }

    const setDialogVisible = () => {
        setIsThemesDialogVisible(!isThemesDialogVisible);
    }

    const themeItems = themes.map((theme, index) => {
        return (
            <div key={index} className="themes-dialog-item">
                <div className={`theme-box pointer ${theme.class}`} onClick={() => onThemeSelect(theme)}>
                    <span className="theme-name">{theme.name}</span>
                </div>
            </div>
        );
    });

    const modeItems = modes.map((mode, index) => {
        return (
            <div key={index} className="themes-dialog-item">
                <div className={`theme-box pointer ${mode.class}`} onClick={() => onModeSelect(mode)}>
                    <span className="theme-name">{mode.name}</span>
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

                    <div className="themes-dialog-header">
                        <div className="themes-dialog-title">Modes</div>
                    </div>

                    <div className="themes-dialog-body">
                        <div className="p-grid">
                            {modeItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemesDialog;
