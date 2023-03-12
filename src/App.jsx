import { useState, useEffect } from 'react'
import ColorList from './components/ColorList'
//import generator from './generator'
import patterns from './patterns'
import tartan from './tartan'
import SVGBuilder from './common/svg/svg-builder'


const pBLACK_WATCH = patterns.blackWatch
const pTWO_BROTHERS =  patterns.twoBrothers
const pROYAL_STEWART = patterns.royalStewart
const pMAC_LEOD = patterns.macLeod
const pWALLANCE = patterns.wallace
const pCARELLIA = patterns.carellia

const cloneDeep = src => JSON.parse(JSON.stringify(src))

function App() {

  const [colors, setColors] = useState(cloneDeep(pBLACK_WATCH))
  const [ishidden, setIsHidden] = useState(false)

  const addColor = _ => {
    const newColors = [...colors, {color:"#", size:10}]
    setColors(newColors)
  } 

  const generateHandle = e => {
    e.preventDefault()
    draw([{color:'#fff', size:2},{color:'#ddd', size:2}, {color:'#aaa', size:2}])
    //draw(colors)
  }

  const randomHandle = e => {
    e.preventDefault()
  }

  const draw = colors => {
    const t_canvas = document.getElementById("tartan_canvas")
    t_canvas.width = 500//window.innerWidth
    t_canvas.height = window.innerHeight
    tartan.draw(t_canvas, colors)
  }

  const fillColors = pattern => {
    const newColors = [...cloneDeep(pattern)]
    setColors(newColors)
  }

  const remomeEmptyColors = _ => {

  }

  const getRandomPattern = _ => {

  }

  const handleRS = e => {
    e.preventDefault()
    fillColors(pROYAL_STEWART)
  }

  const handleTW = e => {
    e.preventDefault()
    fillColors(pTWO_BROTHERS)
  }

  const handleBW = e => {
    e.preventDefault()
    fillColors(pBLACK_WATCH)
  }

  const handleML = e => {
    e.preventDefault()
    fillColors(pMAC_LEOD)
  }

  const handleWL = e => {
    e.preventDefault()
    fillColors(pWALLANCE)
  }

  const handleCL = e => {
    e.preventDefault()
    fillColors(pCARELLIA)
  }

  useEffect(() => {
    //draw(colors)
  }, [colors])

  const toggleHidden = _ => {
     setIsHidden(!ishidden)
  }

  return (
    <div className="app">
      <canvas id="tartan_canvas" className={`${ishidden && 'hidden'}`} ></canvas>
      <div className={`scottish ${!ishidden && 'hidden'}`}/>
      <SVGBuilder  colors={colors} />
      <aside>
        <h1>Sequence</h1>
        <ColorList colors={colors}/>
        <button id="addColor" onClick={addColor}>Add color</button>
        <div className="spacer"></div>
        <button id="hiddenCanvas" onClick={toggleHidden}>Toggle hidden canvas</button>
        <button className="bg-white text-black" id="generate" onClick={generateHandle}>Generate tartan</button>
        <button onClick={handleRS}>Royal Stewart</button>
        <button onClick={handleTW}>Two Brothers</button>
        <button onClick={handleBW}>Black Watch</button>
        <button onClick={handleML}>MacLeod</button>
        <button onClick={handleWL}>Wallace</button>
        <button onClick={handleCL}>Carellia</button>

        {/* 
        <button id="random">Random tartan</button> */}
      </aside>
    </div>
  )
}

export default App
