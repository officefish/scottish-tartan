import {useEffect, useState} from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { sortable } from 'react-sortable'

const rCOLOR_INPUT = /^[#][a-fA-f0-9]{0,6}$/
const rCSS_COLOR_HEX = /#(?:[A-Fa-f0-9]{3}){1,2}\b/i

const between = (min, max, value) => value >= min && value <= max

const ColorItem = ({size, color, id, handleRemove, handleUpdate}) => {

  const [itemColor, setItemColor] = useState(color)
  const [itemSize, setSize] = useState(size)

  const onRemove = () => {
    handleRemove(id)
  }

  const onColorChange = (e) => {
    e.preventDefault()
    if (e.target.value.match(rCOLOR_INPUT)) 
      setItemColor(e.target.value)
  }

  const onSizeChange = (e) => {
    e.preventDefault()
    
    if (between(1, 100, +e.target.value)) 
      setSize(+e.target.value)
    else if (!+e.target.value)  
      setSize("") 
  }

  useEffect(() => {
    if (itemColor != color && itemColor.match(rCSS_COLOR_HEX))
      handleUpdate(id, itemColor, itemSize)
  }, [itemColor])

  useEffect(() => {
    if (itemSize != size)
      handleUpdate(id, itemColor, itemSize)
  }, [itemSize])
 
  return (
    <li className='text-black bg-gray-200 flex border-2'>
        <span className='cursor-grab flex items-center justify-center w-5 text-white bg-black text-base'>☰</span>
        <input type="text" placeholder="#fff" className='w-24 mx-1' value={color} onChange={onColorChange}/>
        <input type="number" min="1" style={{width:"50px"}} value={size} onChange={onSizeChange}/>
        <button type='none' className='flex items-center justify-center w-5 h-5 cursor-pointer'
        onClick={onRemove}
        >
        <CloseOutlined />
        </button>
    </li>
  )
}

export const SortableColorItem = sortable(ColorItem)