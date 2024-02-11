import React, { useState } from 'react';
import { Dock } from 'primereact/dock';
import './OS.css';
import ThemesDialog from '../themes-dialog/themes-dialog.tsx';
import ChartsDialog from '../charts-dialog/charts-dialog.tsx';
import DateHour from '../date-hour/date.tsx';
import AddDialog from '../add-dialog/add-dialog.tsx';
import FavIcons from '../fav-icons/fav-icons.tsx';
import SearchBar from '../search-bar/search-bar.tsx';

export default function OS() {
    const [isThemesDialogVisible, setIsThemesDialogVisible] = useState<boolean>(false);
    const [isChartsDialogVisible, setIsChartsDialogVisible] = useState<boolean>(false);
    const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);

    // get from local storage
    const [favIcons, setFavIcons] = useState<Array<any>>(JSON.parse(localStorage.getItem('favIcons') as string) || []);
    const storedTheme = localStorage.getItem('selectedTheme');
    const initialTheme = storedTheme ? JSON.parse(storedTheme) : 'url(./img/themes/original.jpg)';
    const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);

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
            icon: () => <img alt="trash" src="https://primefaces.org/cdn/primereact/images/dock/trash.png" width="100%" />,
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
                            <FavIcons key={index} name={favIcon.name} url={favIcon.url} img={favIcon.img} />
                        );
                    })}
                </div>

                <SearchBar />

                {isThemesDialogVisible ? <ThemesDialog setIsThemesDialogVisible={setIsThemesDialogVisible} isThemesDialogVisible={isThemesDialogVisible} setSelectedTheme={setSelectedTheme} /> : null}
                {isChartsDialogVisible ? <ChartsDialog setIsChartsDialogVisible={setIsChartsDialogVisible} isChartsDialogVisible={isChartsDialogVisible} /> : null}
                {isAddDialogVisible ? <AddDialog setIsAddDialogVisible={setIsAddDialogVisible} isAddDialogVisible={isAddDialogVisible} favIcons={favIcons} setFavIcons={setFavIcons} /> : null}

                <Dock model={items} position={'bottom'} />
            </div>
        </div>
    )
}