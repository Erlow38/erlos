import { useState } from 'react';
import { Dock } from 'primereact/dock';
import './OS.css';
import ThemesDialog from '../themes-dialog/themes-dialog';
import ChartsDialog from '../charts-dialog/charts-dialog';
import DateHour from '../date-hour/date';
import AddDialog from '../add-dialog/add-dialog';
import FavIcons from '../fav-icons/fav-icons';

export default function OS() {
    const [position, setPosition] = useState('bottom');

    const [isThemesDialogVisible, setIsThemesDialogVisible] = useState(false);
    const [isChartsDialogVisible, setIsChartsDialogVisible] = useState(false);
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);

    // get favIcons from local storage
    const [favIcons, setFavIcons] = useState(JSON.parse(localStorage.getItem('favIcons')) || []);
    const [selectedTheme, setSelectedTheme] = useState(JSON.parse(localStorage.getItem('selectedTheme')) || 'url(../img/themes/original.jpg)');

    const items = [
        {
            label: 'Erlow',
            icon: () => <img alt="Erlow" src="../img/icons/e.png" width="100%" />,
        },
        {
            label: 'Web',
            icon: () => <img alt="Web" src="../img/icons/web.png" width="100%" />,
        },
        {
            label: 'Themes',
            icon: () => <img alt="Themes" src="../img/icons/themes.png" width="100%" />,
        },
        {
            label: 'Charts',
            icon: () => <img alt="Charts" src="../img/icons/Charts.png" width="100%" />,
        },
        {
            label: 'Add',
            icon: () => <img alt="Add" src="../img/icons/add.png" width="100%" />,
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

    // On click on Charts item, open a charts dialog
    items.find(item => item.label === 'Charts').command = () => {
        if (isChartsDialogVisible) {
            setIsChartsDialogVisible(false);
        } else {
            setIsChartsDialogVisible(true);
        }
    };

    // On click on Add item, open a add dialog
    items.find(item => item.label === 'Add').command = () => {
        if (isAddDialogVisible) {
            setIsAddDialogVisible(false);
        } else {
            setIsAddDialogVisible(true);
        }
    };

    // On click on Trash item, show delete-icons
    items.find(item => item.label === 'Trash').command = () => {
        const deleteIcons = document.querySelectorAll('.delete-icons');
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

    return (
        <div className="card dock">
            <div className='dock-menu'>
                <div>
                    <img alt="ErlOS" src="../img/icons/e.png" width="30px" />
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

                {isThemesDialogVisible ? <ThemesDialog setIsThemesDialogVisible={setIsThemesDialogVisible} isThemesDialogVisible={isThemesDialogVisible} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} /> : null}
                {isChartsDialogVisible ? <ChartsDialog setIsChartsDialogVisible={setIsChartsDialogVisible} isChartsDialogVisible={isChartsDialogVisible} /> : null}
                {isAddDialogVisible ? <AddDialog setIsAddDialogVisible={setIsAddDialogVisible} isAddDialogVisible={isAddDialogVisible} favIcons={favIcons} setFavIcons={setFavIcons} /> : null}

                <Dock model={items} position={position} />
            </div>
        </div>
    )
}
        