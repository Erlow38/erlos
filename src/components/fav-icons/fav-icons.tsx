import React from 'react';
import './fav-icons.css';

interface FavIconsProps {
    name: string;
    url: string;
    img: string;
}

const FavIcons: React.FC<FavIconsProps> = ({ name, url, img }) => {

    const deleteIcon = () => {
        if (window.confirm(`Are you sure you want to delete ${name} from your favorites?`)) {
            const favIcons = JSON.parse(localStorage.getItem('favIcons') || '[]');
            const newFavIcons = favIcons.filter((favIcon: any) => favIcon.url !== url);
            localStorage.setItem('favIcons', JSON.stringify(newFavIcons));
            window.location.reload();
        }
    }

    return (
        <div className="fav-icons-container">
            <span className='delete-icons' onClick={deleteIcon} >&times;</span>
            <a className='fav-icons-link' target='_blank' rel="noreferrer" href={url}>
                <img className='fav-icons-image' src={img} alt={name} />
                <span className='fav-icons-name'>{name}</span>
            </a>
        </div>
    )
}

export default FavIcons;
