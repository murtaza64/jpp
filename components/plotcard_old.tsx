function plotCard(word: Array<string>, pitches: Array<number>, cvs: HTMLCanvasElement) {
    var ctx = cvs.getContext("2d");
    if (ctx === null) {
      return
    }
    let mql = window.matchMedia('(prefers-color-scheme: dark)');
    let fg: string;
    let bg: string;
    if (mql.matches) {
      fg = "#ccc"
      bg = "#171717"
    }
    else {
      fg = "#171717"
      bg = "#ccc"
    }
    const moraCount = word.length;
    cvs.width = moraCount > 9 ? 1.5 * 1200 : 1200;
    cvs.height = moraCount > 9 ? 1.5 * 800 : 800;
    const spacing = 120;
    const totalWidth = (1 - moraCount) * spacing;
    const BARWIDTH = 12;
    const radius = 55;
    ctx.save();
    ctx.translate((cvs.width - totalWidth) / 2, cvs.height * 0.7);
    ctx.fillStyle = fg;
    ctx.fillRect(BARWIDTH, 0, totalWidth - BARWIDTH, 25);
    ctx.font = "100px Helvetica";
    for (var i = 0; i < moraCount; i++) {
        let height = -pitches[i] * cvs.height * 0.5;
        let xpos = -((moraCount - i - 1) * spacing);
        ctx.fillStyle = fg;
        ctx.fillText(word[i], xpos - 50, 150, radius * 2.3);
        ctx.fillRect(xpos, 0, BARWIDTH, height);
        ctx.beginPath();
        ctx.arc(xpos + BARWIDTH / 2, height, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = fg;
        ctx.stroke();
    }
    ctx.restore();
  }