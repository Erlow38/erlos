import React from 'react';
import './fav-icons.css';

export default function FavIcons({name, url, img}) {

    function deleteIcon() {
        if (window.confirm(`Are you sure you want to delete ${name} from your favorites?`)) {
            const favIcons = JSON.parse(localStorage.getItem('favIcons'));
            const newFavIcons = favIcons.filter(favIcon => favIcon.url !== url);
            localStorage.setItem('favIcons', JSON.stringify(newFavIcons));
            window.location.reload();
        }
    }

    return (
        <div className="fav-icons-container">
            <span className='delete-icons' onClick={deleteIcon} >&times;</span>
            <a className='fav-icons-link' target='_blank' href={url}>
                <img className='fav-icons-image' src={img}/>
                <span className='fav-icons-name'>{name}</span>
            </a>
        </div>
    )
}