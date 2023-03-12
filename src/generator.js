console.log($('#tartan')[0])

const tartan = $("#tartan")[0];

if (tartan) {
    tartan.width = innerWidth;
    tartan.height = innerHeight;
}

const twoBrothers = [
  { color: "#003820", size: 22 },
  { color: "#006818", size: 10 },
  { color: "#a0a0a0", size: 1 },
  { color: "#1474b4", size: 15 },
  { color: "#003c64", size: 12 }
];

const royalStewart = [
  { color: "red", size: 50 },
  { color: "blue", size: 10 },
  { color: "black", size: 15 },
  { color: "yellow", size: 5 },
  { color: "black", size: 3 },
  { color: "white", size: 5 },
  { color: "black", size: 20 },
  { color: "red", size: 12 },
  { color: "black", size: 3 },
  { color: "red", size: 5 },
  { color: "white", size: 5 }
];

const blackWatch = [
  { color: "#000059", size: 5 },
  { color: "#000000", size: 5 },
  { color: "#000059", size: 25 },
  { color: "#000000", size: 20 },
  { color: "#004700", size: 25 },
  { color: "#000000", size: 5 }
];

const macLeod = [
  { color: "#000000", size: 20 },
  { color: "#949400", size: 4 },
  { color: "#000000", size: 20 },
  { color: "#949400", size: 30 },
  { color: "#000000", size: 4 }
];

const wallace=[{color:'black',size:2},
              {color:'red',size:40},
              {color:'black',size:36},
              {color:'yellow',size:6}]

$(() => {
  appendColor();
  appendColor();

  $("#colors").sortable();

  $("#addColor").click(() => {
    appendColor();
    $("#colors")
      .find("input")
      .eq(-2)
      .focus();
  });

  $("#generate").click(() => {
    const colors = [];
    $("#colors div").each((i, elem) => {
      const color = $(elem)
        .children()
        .eq(1)
        .val();
      const size = $(elem)
        .children()
        .eq(2)
        .val();
      if (color && size) {
        colors.push({ color: color, size: size });
      }
    });

    removeEmptyColors();
    draw(colors);
  });

  $("#rs").click(() => {
    draw(royalStewart);
    fillColors(royalStewart);
  });

  $("#bw").click(() => {
    draw(blackWatch);
    fillColors(blackWatch);
  });

  $("#ml").click(() => {
    draw(macLeod);
    fillColors(macLeod);
  });

  $('#wl').click(()=>{
    draw(wallace)
    fillColors(wallace)
  })
  
  $("#random").click(() => {
    const allowedValues = "0123456789abcdef";

    const numberOfColors = Math.floor(Math.random() * 5) + 2;
    const numberOfSteps = Math.floor(Math.random() * 10) + numberOfColors;

    const steps = [];
    const colors = {};

    for (let i = 0; i < numberOfColors; i++) {
      let color = "#";
      for (let c = 0; c < 6; c++) {
        color += allowedValues.charAt(
          Math.floor(Math.random() * allowedValues.length)
        );
      }
      colors[color] = false;
    }

    let previousColor = null;
    for (let i = 0; i < numberOfSteps; i++) {
      const critical =
        numberOfSteps - i <=
        Object.values(colors).filter(value => value).length;
      let color;
      let newColor = false;
      let tries = 0;
      do {
        if (tries > 10) {
          break;
        }
        color = Object.keys(colors)[
          Math.floor(Math.random() * Object.keys(colors).length)
        ];
        newColor = !colors[color];
        colors[color] = true;
        tries++;
      } while (color === previousColor || (critical && !newColor));
      if (tries > 10) {
        continue;
      }
      previousColor = color;
      const size = Math.floor(Math.random() * 40) + 1;
      steps.push({ color: color, size: size });
    }

    draw(steps);
    fillColors(steps);
  });
});

const appendColor = () => {
  $("#colors").append(
    $("<div>", {
      html:
        '<span style="cursor:grab;font-size:1.2rem">☰</span><input type="text" placeholder="Write color" style="width:100px"><input type="number" min="1" value="20" style="width:50px">'
    })
  );
};

const draw = colors => {
  const ctx = tartan.getContext("2d");
  const seamSize = 2;

  ctx.fillStyle = "white";
  ctx.strokeStyle = "#0008";
  ctx.lineWidth = 1;

  const sequence = [];
  for (let c = 0; c < colors.length; c++) {
    const color = colors[c];
    for (let i = 0; i < color.size; i++) {
      sequence.push(color.color);
    }
  }
  for (let c = colors.length - 2; c > 0; c--) {
    const color = colors[c];
    for (let i = 0; i < color.size; i++) {
      sequence.push(color.color);
    }
  }

  for (let y = 0; y < tartan.height / seamSize; y++) {
    ctx.fillStyle = sequence[y % sequence.length];
    for (let x = 0; x < tartan.width / seamSize + y; x += 2) {
      ctx.fillRect(
        (2 * x - y) * seamSize,
        y * seamSize,
        2 * seamSize,
        seamSize
      );
      ctx.strokeRect(
        (2 * x - y) * seamSize + ctx.lineWidth / 2,
        y * seamSize + ctx.lineWidth / 2,
        2 * seamSize - ctx.lineWidth,
        seamSize - ctx.lineWidth
      );
      ctx.fillRect(
        (2 * x - y) * seamSize,
        y * seamSize,
        2 * seamSize - ctx.lineWidth / 2,
        seamSize - ctx.lineWidth
      );
    }
  }

  for (let x = 0; x < tartan.width / seamSize; x++) {
    ctx.fillStyle = sequence[x % sequence.length];
    for (let y = 0; y < tartan.height / seamSize + x; y += 2) {
      ctx.fillRect(
        x * seamSize,
        (2 * y - x + 2) * seamSize,
        seamSize,
        2 * seamSize
      );
      ctx.strokeRect(
        x * seamSize + ctx.lineWidth / 2,
        (2 * y - x + 2) * seamSize + ctx.lineWidth / 2,
        seamSize - ctx.lineWidth,
        2 * seamSize - ctx.lineWidth
      );
      ctx.fillRect(
        x * seamSize,
        (2 * y - x + 2) * seamSize,
        seamSize - ctx.lineWidth / 2,
        2 * seamSize - ctx.lineWidth / 2
      );

      if (x % 4 == 0) {
        ctx.save();
        ctx.fillStyle = "#fff3";
        ctx.fillRect(
          x * seamSize,
          (2 * y - x + 2) * seamSize + ctx.lineWidth,
          seamSize - ctx.lineWidth / 2,
          2 * seamSize - 3 * ctx.lineWidth
        );
        ctx.restore();
      }
    }
  }
};

const fillColors = colors => {
  $("#colors").html("");
  colors.forEach(color => {
    appendColor();
    $("#colors")
      .children()
      .eq(-1)
      .find("input")
      .eq(0)
      .val(color.color);
    $("#colors")
      .children()
      .eq(-1)
      .find("input")
      .eq(1)
      .val(color.size);
  });
};

const removeEmptyColors = () => {
  $("#colors")
    .children()
    .each((id, color) => {
      if (
        $(color)
          .children()
          .eq(1)
          .val() == ""
      ) {
        $(color).remove();
      }
    });
};

export default _ => draw(twoBrothers)
