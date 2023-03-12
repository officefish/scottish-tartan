import {useState, useEffect, createElement} from 'react'
import { SortableColorItem } from './ColorItem'

const cloneDeep = src => JSON.parse(JSON.stringify(src))
  
const ColorList = ({ colors }) => {

    const [items, setItems] = useState([])
    const [sortedItems, setSortedItems] = useState(createElement(()=><div></div>))

    const onSortItems = (items) => {
        setItems(items)
    }

    useEffect(() => {
        setItems(colors)
    }, [colors])

    const handleRemove = (itemId) => {
        const listItems = items.filter((_, i) => i !== itemId)
        setItems(listItems)
    }

    const handleUpdate = (itemId, color, size) => {
        const item = items.find((_, i) => i === itemId)
        item.color = color
        item.size = size
    }

    useEffect(() => {
        const listItems = items.map((item, i) => (
            <SortableColorItem
            key={i}
            onSortItems={onSortItems}
            items={items}
            sortId={i}
            id={i}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
            size={item.size}
            color={item.color}
            ></SortableColorItem>
        ))
        setSortedItems(listItems)
    }, [items])

    return (
        <ul className='flex flex-col'>
            {sortedItems}
        </ul>
    )
}

export default ColorList