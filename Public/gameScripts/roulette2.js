class Ball {
    x;
    y;
    r;
    angle;
    rand;

    constructor(x, y, r) {
        //set up properties
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = 0;
        this.rand = Math.floor(Math.random() * 38);
        console.log(this.rand)
    }

    /**
     * Draw the actor on the canvas.
     */
    draw() {
        // Use ctx to draw. A sample (drawing a small circle):
        ctx.beginPath();
        // let x = this.x + Math.cos(this.angle/30)*300;
        // let y = this.y + Math.sin(this.angle/30)*300;
        let x = this.x + Math.cos(this.angle)*300;
        let y = this.y + Math.sin(this.angle)*300;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    /**
     * Update this actor for the next frame.
     */
    update() {
        // Update properties or other Actors in the actorList.
        // while (this.angle < (4 * Math.PI)+((2*Math.PI)/38)*this.rand) {
        //     this.angle+= (2 * Math.PI)/190;
        // }
        if (this.angle <= (4 * Math.PI) + ((2*Math.PI)/38)*this.rand) {
            this.angle += (2 * Math.PI)/76;
        }
    }

    //Add more methods as helpful:
}