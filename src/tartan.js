
/* Convert Color objects to array of pixel sequence
   Example: Array with two Colors [ {color:'#fff', size:3}, {color:'#000', size:2} ] 
   becomes a sequence [ '#fff', '#fff', '#fff', '#000', '#000', '#000', '#fff', '#fff']
 */  
const asSequence = colors => {
    const sequence = []
    for (let c = 0; c < colors.length; c++) {
      const color = colors[c]
      for (let i = 0; i < color.size; i++) {
        sequence.push(color.color)
      }
    }
    for (let c = colors.length - 2; c > 0; c--) {
      const color = colors[c]
      for (let i = 0; i < color.size; i++) {
        sequence.push(color.color)
      }
    }
    return sequence
}

/* Horizontal filling */
const wFirstFill = (x, y, seamSize) => { 
    return {    
        x: (seamSize * x - y) * seamSize, 
        y: y * seamSize,
        width: seamSize * seamSize,
        height: seamSize
    }
}
const wFirstStroke = (x, y, seamSize, lineWidth, halfLineWidth) => { 
  return {    
    x: (seamSize * x - y) * seamSize + halfLineWidth,
    y: y * seamSize + halfLineWidth,
    width: seamSize * seamSize - lineWidth,
    height: seamSize - lineWidth
  }
}
const wSecondFill = (x, y, seamSize, lineWidth, halfLineWidth) => { 
  return {    
    x: (seamSize * x - y) * seamSize,
    y: y * seamSize,
    width: seamSize * seamSize - halfLineWidth,
    height: seamSize - lineWidth
  }
}

/* Vertical filling */
const hFirstFill = (x, y, seamSize) => { 
  return {    
      x: x * seamSize,
      y: (seamSize * y - x + seamSize) * seamSize,
      width: seamSize,
      height: seamSize * seamSize 
  }
}
const hFirstStroke = (x, y, seamSize, lineWidth, halfLineWidth) => { 
  return {    
    x:  x * seamSize + halfLineWidth,
    y: (seamSize * y - x + seamSize) * seamSize + halfLineWidth,
    width: seamSize - lineWidth,
    height: seamSize * seamSize - lineWidth
  }
}
const hSecondFill = (x, y, seamSize, halfLineWidth) => { 
  return {    
    x: x * seamSize,
    y: (seamSize * y - x + seamSize) * seamSize,
    width: seamSize - halfLineWidth,
    height: seamSize * seamSize - halfLineWidth
  }
}
const whiteFill = (x, y, seamSize, lineWidth, halfLineWidth) => { 
  return {    
    x: x * seamSize,
    y: (seamSize * y - x + seamSize) * seamSize + lineWidth,
    width: seamSize - halfLineWidth,
    height: seamSize * seamSize - 3 * lineWidth
  }
}
/** Let's magic happens */
const draw = (canvas, colors) => {
  const ctx = canvas.getContext("2d") 
  const seamSize = 2
  
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height

  ctx.fillStyle = "white"
  ctx.strokeStyle = "#0008"
  
  const lineWidth = 1
  const halfLineWidth = lineWidth / 2
  ctx.lineWidth = lineWidth

  const sequence = asSequence(colors)

  for (let y = 0; y < 10; y++) {
  //for (let y = 0; y < canvasHeight / seamSize; y++) {    
    ctx.fillStyle = sequence[y % sequence.length]

    for (let x = 0; x < 10; x += 2) {
    //for (let x = 0; x < canvasWidth / seamSize + y; x += seamSize) {
      if (x >= canvasWidth) continue

      const fl = wFirstFill(x, y, seamSize)
      //console.log(fl)
      //ctx.fillRect(fl.x, fl.y, fl.width, fl.height)

      const fs = wFirstStroke(x, y, seamSize, lineWidth, halfLineWidth)
      console.log(fs)
      ctx.strokeRect(fs.x, fs.y, fs.width, fs.height)

      const sf = wSecondFill(x, y, seamSize, lineWidth, halfLineWidth)
      //ctx.fillRect(sf.x, sf.y, sf.width, sf.height)
    }
  }

  for (let x = 0; x < canvasWidth / seamSize; x++) {
    ctx.fillStyle = sequence[x % sequence.length]

    for (let y = 0; y < canvasHeight / seamSize + x; y += seamSize) {
      if (y >= canvasHeight) continue

      const fl = hFirstFill(x, y, seamSize)
      //ctx.fillRect(fl.x, fl.y, fl.width, fl.height)

      const fs = hFirstStroke(x, y, seamSize, lineWidth, halfLineWidth)
      //ctx.strokeRect(fs.x, fs.y, fs.width, fs.height)

      const sf = hSecondFill(x, y, seamSize, halfLineWidth)
      //ctx.fillRect(sf.x, sf.y, sf.width, sf.height)

      if (x % 4 == 0) {
         ctx.save()
         ctx.fillStyle = "#fffff3"
         const white = whiteFill(x, y, seamSize, lineWidth, halfLineWidth)
         //ctx.fillRect(white.x, white.y, white.width, white.height)
         ctx.restore()
      }
    }
 }
}

export default {
  draw,
}
