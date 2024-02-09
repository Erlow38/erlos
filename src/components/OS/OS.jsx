import { useState } from 'react';
import { Dock } from 'primereact/dock';
import './OS.css';
import ThemesDialog from '../themes-dialog/themes-dialog';

export default function OS() {
    const [position, setPosition] = useState('bottom');
    const [isThemesDialogVisible, setIsThemesDialogVisible] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('url(../img/themes/original.jpg)');
    const [currentHour, setCurrentHour] = useState(new Date().toLocaleTimeString());

    useState(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const items = [
        {
            label: 'Erlow',
            icon: () => <img alt="Erlow" src="../img/e.png" width="100%" />,
        },
        {
            label: 'Web',
            icon: () => <img alt="Web" src="../img/web.png" width="100%" />,
        },
        {
            label: 'Themes',
            icon: () => <img alt="Themes" src="../img/themes.png" width="100%" />,
        },
        {
            label: 'Add',
            icon: () => <img alt="Add" src="../img/add.png" width="100%" />,
        },
        {
            label: 'Trash',
            icon: () => <img alt="trash" src="https://primefaces.org/cdn/primereact/images/dock/trash.png" width="100%" />,
        }
    ];

    // On click on Erlow item, open my personal website
    items.find(item => item.label === 'Erlow').command = () => {
        window.open('https://erlow38.github.io/');
    };

    // On click on Web item, open a new tab with google.com
    items.find(item => item.label === 'Web').command = () => {
        window.open('https://google.com/');
    };

    // On click on Themes item, open a select theme dialog
    items.find(item => item.label === 'Themes').command = () => {
        if (isThemesDialogVisible) {
            setIsThemesDialogVisible(false);
        } else {
            setIsThemesDialogVisible(true);
        }
    };

    return (
        <div className="card dock">
            <div className='dock-menu'>
                <div>
                    <img alt="ErlOS" src="../img/e.png" width="30px" />
                    <span className='os-title'>ErlOS</span>
                </div>
                <span className='hour'>{currentHour}</span>
            </div>
            <div className="dock-window" style={{backgroundImage: selectedTheme}}>
                {isThemesDialogVisible ? <ThemesDialog setIsThemesDialogVisible={setIsThemesDialogVisible} isThemesDialogVisible={isThemesDialogVisible} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} /> : null
                }
                <Dock model={items} position={position} />
            </div>
        </div>
    )
}
        