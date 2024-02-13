import React, { useEffect, useState } from 'react';
import { Dock } from 'primereact/dock';
import './OS.css';
import ThemesDialog from '../themes-dialog/themes-dialog.tsx';
import ChartsDialog from '../charts-dialog/charts-dialog.tsx';
import DateHour from '../date-hour/date.tsx';
import AddDialog from '../add-dialog/add-dialog.tsx';
import FavIcons from '../fav-icons/fav-icons.tsx';
import SearchBar from '../search-bar/search-bar.tsx';
import HelpDialog from '../help-dialog/help-dialog.tsx';
import Minesweeper from '../minesweeper/minesweeper.tsx';

interface OSProps {
    visits: string | null;
}

interface FavIcon {
    name: string;
    url: string;
    img: string;
    position: { x: number; y: number };
}

const OS: React.FC<OSProps> = ({ visits }) => {
    const [isThemesDialogVisible, setIsThemesDialogVisible] = useState<boolean>(false);
    const [isChartsDialogVisible, setIsChartsDialogVisible] = useState<boolean>(false);
    const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
    const [isHelpDialogVisible, setIsHelpDialogVisible] = useState<boolean>(false);
    const [isMinesweeperDialogVisible, setIsMinesweeperDialogVisible] = useState<boolean>(false);

    // get from local storage
    const [favIcons, setFavIcons] = useState<Array<any>>(JSON.parse(localStorage.getItem('favIcons') as string) || []);
    const storedTheme = localStorage.getItem('selectedTheme');
    const initialTheme = storedTheme ? JSON.parse(storedTheme) : 'url(./img/themes/original.jpg)';
    const storedMode = localStorage.getItem('selectedMode');
    const initialMode = storedMode ? JSON.parse(storedMode) : 'light';

    const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);
    const [selectedMode, setSelectedMode] = useState<string>(initialMode);

    const [favIconsList, setFavIconsList] = useState<Array<FavIcon>>([]);

    useEffect(() => {
        // Charger les icônes de favoris depuis le stockage local
        const storedFavIcons = JSON.parse(localStorage.getItem('favIcons') || '[]');
        setFavIconsList(storedFavIcons);
    }, []);

    // On click on Erlow item, open my personal website
    const items: Array<{ label: string; icon: () => JSX.Element; command?: () => void }> = [
        {
            label: 'Erlow',
            icon: () => <img alt="Erlow" src="./img/icons/e.png" width="100%" />,
        },
        {
            label: 'Web',
            icon: () => <img alt="Web" src="./img/icons/web.png" width="100%" />,
        },
        {
            label: 'Themes',
            icon: () => <img alt="Themes" src="./img/icons/themes.png" width="100%" />,
        },
        {
            label: 'Charts',
            icon: () => <img alt="Charts" src="./img/icons/charts.png" width="100%" />,
        },
        {
            label: 'Add',
            icon: () => <img alt="Add" src="./img/icons/add.png" width="100%" />,
        },
        {
            label: 'Trash',
            icon: () => <img alt="trash" src="./img/icons/trash.png" width="100%" />,
        },
        {
            label: 'Minesweeper',
            icon: () => <img alt="minesweeper" src="./img/icons/minesweeper.png" width="100%" />,
        },
        {
            label: 'Help',
            icon: () => <img alt="help" src="./img/icons/help.png" width="100%" />,
        }
    ];

    const erlowItem = items.find(item => item.label === 'Erlow');
    if (erlowItem) {
        erlowItem.command = () => {
            window.open('https://erlow38.github.io/');
        };
    }

    const webItem = items.find(item => item.label === 'Web');
    if (webItem) {
        webItem.command = () => {
            window.open('https://google.com/');
        };
    }

    // On click on Themes item, open a select theme dialog
    const themesItem = items.find(item => item.label === 'Themes');
    if (themesItem) {
        themesItem.command = () => {
            if (isThemesDialogVisible) {
                setIsThemesDialogVisible(false);
            } else {
                setIsThemesDialogVisible(true);
            }
        };
    }

    // On click on Charts item, open a charts dialog
    const chartsItem = items.find(item => item.label === 'Charts');
    if (chartsItem) {
        chartsItem.command = () => {
            if (isChartsDialogVisible) {
                setIsChartsDialogVisible(false);
            } else {
                setIsChartsDialogVisible(true);
            }
        };
    }

    // On click on Add item, open a add dialog
    const addItem = items.find(item => item.label === 'Add');
    if (addItem) {
        addItem.command = () => {
            if (isAddDialogVisible) {
                setIsAddDialogVisible(false);
            } else {
                setIsAddDialogVisible(true);
            }
        };
    }

    // On click on Trash item, show delete-icons
    const trashItem = items.find(item => item.label === 'Trash');
    if (trashItem) {
        trashItem.command = () => {
            const deleteIcons = document.querySelectorAll('.delete-icons') as NodeListOf<HTMLElement>;
            // If delete-icons are visible, hide them
            if (deleteIcons[0].style.display === 'flex') {
                deleteIcons.forEach(deleteIcon => {
                    deleteIcon.style.display = 'none';
                });
            } else {
                deleteIcons.forEach(deleteIcon => {
                    deleteIcon.style.display = 'flex';
                });
            }
        };
    }

    // On click on Minesweeper item, open a minesweeper dialog
    const minesweeperItem = items.find(item => item.label === 'Minesweeper');
    if (minesweeperItem) {
        minesweeperItem.command = () => {
            if (isMinesweeperDialogVisible) {
                setIsMinesweeperDialogVisible(false);
            } else {
                setIsMinesweeperDialogVisible(true);
            }
        };
    }

    // On click on Help item, open a help dialog
    const helpItem = items.find(item => item.label === 'Help');
    if (helpItem) {
        helpItem.command = () => {
            if (isHelpDialogVisible) {
                setIsHelpDialogVisible(false);
            } else {
                setIsHelpDialogVisible(true);
            }
        };
    }

    if (selectedMode === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }

    return (
        <div className="card dock">
            <div className='dock-menu'>
                <div>
                    <img alt="ErlOS" src="./img/icons/e.png" width="30px" />
                    <span className='os-title'>ErlOS</span>
                </div>
                <DateHour />
            </div>
            <div className="dock-window" style={{backgroundImage: selectedTheme}}>
                <div className='fav-icons-display'>
                    {favIcons.map((favIcon, index) => {
                        return (
                            <FavIcons key={index} name={favIcon.name} url={favIcon.url} img={favIcon.img} position={favIcon.position} />
                        );
                    })}
                </div>

                <SearchBar />

                {isThemesDialogVisible ? <ThemesDialog setIsThemesDialogVisible={setIsThemesDialogVisible} isThemesDialogVisible={isThemesDialogVisible} setSelectedTheme={setSelectedTheme} setSelectedMode={setSelectedMode} /> : null}
                {isChartsDialogVisible ? <ChartsDialog setIsChartsDialogVisible={setIsChartsDialogVisible} isChartsDialogVisible={isChartsDialogVisible} visits={visits} /> : null}
                {isAddDialogVisible ? <AddDialog setIsAddDialogVisible={setIsAddDialogVisible} isAddDialogVisible={isAddDialogVisible} favIcons={favIcons} setFavIcons={setFavIcons} /> : null}
                {isHelpDialogVisible ? <HelpDialog setIsHelpDialogVisible={setIsHelpDialogVisible} isHelpDialogVisible={isHelpDialogVisible} /> : null}
                {isMinesweeperDialogVisible ? <Minesweeper setIsMinesweeperDialogVisible={setIsMinesweeperDialogVisible} isMinesweeperDialogVisible={isMinesweeperDialogVisible} /> : null}

                <Dock model={items} position={'bottom'} />
            </div>
        </div>
    )
}

export default OS;
