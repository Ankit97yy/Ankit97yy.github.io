var canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let yellow_car= document.getElementById('yellow-car');
let red_car=document.getElementById('red-car');
let d1=0,d2=0;
var sc = 0;
let l_but=document.getElementById('left');
let r_but=document.getElementById('right');

//home screen
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='red';
ctx.font="20px arial";
ctx.fillText("press here to start", 90,280);
//


//score border
if(localStorage.length==0)
localStorage.setItem('highscore', '0');
function drawline() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(270, 0);
    ctx.lineTo(270, 500);
    ctx.stroke();
}
//

function draw_score() {
    ctx.fillStyle='red';
    ctx.font = "18px Arial";
    ctx.fillText("Score:",275,29);
    ctx.fillText(sc, 275, 45);
    let hc=localStorage.getItem('highscore');
    ctx.fillText('Highscore',275,100);
    ctx.fillText(hc,275,120);
    
}

class Player {
    constructor(ctx) {
        this.xpos = 100;
        this.ypos = 425;
        this.widht = 72;
        this.height = 83;
        this.ctx = ctx;

    }
    draw_player() {
        // this.ctx.fillStyle = 'red';
        // this.ctx.fillRect(this.xpos, this.ypos - 20, this.widht, this.height);
        ctx.drawImage(yellow_car,this.xpos,this.ypos,this.widht,this.height);
    }
    right() {
        if (this.xpos + 95 < 270) this.xpos += 95;

    }
    left() {
        if (this.xpos - 95 > 0) this.xpos -= 95;
    }
}

class traffic {
    constructor(y1, y2, y3, ctx) {
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.ctx = ctx;
        this.dy = 10;
        this.widht=72;
        this.height=83;

    }

    draw() {
        ctx.drawImage(red_car,5,this.y1,this.widht,this.height);
        ctx.drawImage(red_car,100,this.y2,this.widht,this.height);
        ctx.drawImage(red_car,195,this.y3,this.widht,this.height);

        this.y1 += this.dy;
        this.y2 += this.dy;
        this.y3 += this.dy;


        if (this.y1 > canvas.height) {
            this.y1 = -Math.random() * 1020;
            sc += 5;
            if(sc%100==0 && sc!=0) this.dy+=1;
        }
        if (this.y2 > canvas.height) {
            this.y2 = -Math.random() * 500;
        sc+=5;
        }
        if (this.y3 > canvas.height) {
            this.y3 = -Math.random() * 720;
        sc+=5;
        if(sc%100==0 && sc!=0) this.dy+=1;
        }
        if (Math.abs(this.y1 - this.y2) < 200) this.y1 -= 150;
        if (Math.abs(this.y2 - this.y3) < 180) this.y3 -= 180;
    }
}
let ob = new traffic(0, -700, -480, ctx);
var player = new Player(ctx);

function collision() {
    if (ob.y1+50 >= player.ypos && player.xpos == 5) return true;
    if (ob.y2+50 >= player.ypos && player.xpos == 100) return true;
    if (ob.y3+50 >= player.ypos && player.xpos == 195) return true;
    else false;
}

function draw_divider(){
    var temp=Math.random()*100;
    if(d1==0) d1=temp
    else d1=0;
    if(d2==0)d2=temp;
    else d2=0;
    ctx.setLineDash([5,10]);
    ctx.beginPath();
    ctx.strokeStyle='white';
    ctx.moveTo(87, d1);
    ctx.lineTo(87, 500);
    ctx.moveTo(180, d2);
    ctx.lineTo(180, 500);
    ctx.stroke();
    
}

function animate() {
    if (collision()) {
        let a=parseInt(localStorage.getItem('highscore'));
        if(sc>a) localStorage.setItem('highscore', sc);
        ctx.fillStyle='white'
        ctx.font = "50px Arial";
        ctx.fillText("GAMEOVER", 30, 255);
        ctx.font = "35px Arial";
        ctx.fillText("Press here to restart", 15, 300);
        ob.y1=0;
        ob.y2=-100;
        ob.y3=-480;
        sc=0;
        return;
    };
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    draw_score()
    drawline();
    ob.draw();
    player.draw_player();
    draw_divider()
}


document.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) player.left();
    if (event.keyCode == 39) player.right();
})

l_but.addEventListener('click',()=>{
    player.left();
})
r_but.addEventListener('click',()=>{
    player.right();
})


canvas.addEventListener('click',()=>{
    animate();
})





