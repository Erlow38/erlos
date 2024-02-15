import React from 'react';
import './fav-icons.css';
import Draggable from 'react-draggable';

interface FavIconsProps {
    name: string;
    url: string;
    img: string;
    position: { x: number; y: number };
}

const FavIcons: React.FC<FavIconsProps> = ({ name, url, img, position }) => {
    const handleDrag = (e: any, ui: any) => {
        const { x, y } = ui;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const iconWidth = 100; // Taille de l'icône
        const iconHeight = 100; // Taille de l'icône

        // Vérifier si l'icône sort de l'écran en x
        if (x < 0) {
            ui.x = 0;
        } else if (x + iconWidth > windowWidth) {
            ui.x = windowWidth - iconWidth;
        }

        // Vérifier si l'icône sort de l'écran en y
        if (y < 0) {
            ui.y = 0;
        } else if (y + iconHeight > windowHeight) {
            ui.y = windowHeight - iconHeight;
        }

        const favIcons = JSON.parse(localStorage.getItem('favIcons') || '[]');
        const newFavIcons = favIcons.map((favIcon: any) => {
            if (favIcon.url === url) {
                favIcon.position = { x: ui.x, y: ui.y };
            }
            return favIcon;
        });
        localStorage.setItem('favIcons', JSON.stringify(newFavIcons));
    }

    const deleteIcon = () => {
        if (window.confirm(`Are you sure you want to delete ${name} from your favorites?`)) {
            const favIcons = JSON.parse(localStorage.getItem('favIcons') || '[]');
            const newFavIcons = favIcons.filter((favIcon: any) => favIcon.url !== url);
            localStorage.setItem('favIcons', JSON.stringify(newFavIcons));
            window.location.reload();
        }
    }

    return (
        <Draggable bounds="parent" handle=".fav-icons-container" defaultPosition={position} onStop={handleDrag} grid={[100, 100]}>
            <div className="fav-icons-container">
                <span className='delete-icons' onClick={deleteIcon} >&times;</span>
                <a className='fav-icons-link' target='_blank' rel="noreferrer" href={url}>
                    <img className='fav-icons-image' src={img} alt={name} />
                </a>
                <div className='fav-icons-name-container'>
                    <span className='fav-icons-name' >{name}</span>
                </div>
            </div>
        </Draggable>
    )
}

export default FavIcons;
