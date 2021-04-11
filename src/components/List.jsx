import React from 'react'
import Item from './Item/Item'

const List = ({ arr, setFavorCat, visibleItem, changePage, page }) => {

    return (
        <div className='list_container' onWheel={changePage}>
            {
                arr.map(item => {
                    if ( visibleItem == undefined || page == undefined || changePage == undefined) {
                        return <Item item={item} setFavorCat={setFavorCat} />
                    }
                    if (arr.indexOf(item) >= visibleItem * (page - 1)
                        && arr.indexOf(item) < visibleItem * page) {
                        return <Item item={item} setFavorCat={setFavorCat} />
                    }
                })
            }
        </div>
    )
}

export default List