import React from 'react'
import '../../App.css'

const Item = ({ item, setFavorCat }) => {

    return (
        <div key={item.id} className='item' style={{
            backgroundImage: `url(${item.url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            contentVisibility: item.status ? 'visible' : 'hidden'
        }}>
            <img className={
                item.status ? 'active_icon' : 'favor_icon'
            }
                onClick={() => setFavorCat(item)} />
        </div>
    )
}

export default Item