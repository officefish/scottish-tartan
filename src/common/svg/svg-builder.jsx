import {useState, useEffect} from 'react'
import parse from 'html-react-parser'
import { getSvgData } from './svg-data-bulder'

const SVGBuilder = ({colors}) => {

  const [svgData, setSvgData] = useState('')
 
  useEffect(_ => {
    const svgData = getSvgData(colors)
    setSvgData(svgData)
  }, [colors])
  
  return (
    <div className="block absolute top-0 left-0" >
      {parse(svgData)}
    </div>
  )
}

export default SVGBuilder