function main() {
    console.log("OnLoad");

    const canvas = document.getElementById("canvas");
    canvas.width = this.canvas.clientWidth;
    canvas.height = this.canvas.clientHeight;

    // draw peter-centered.jpg to the canvas
    const image = new Image();
    image.src = "peter-centered.jpg";
    image.onload = () => {
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("click", (event) => {
        console.log("OnClick");
        console.log(event.target);

        // Select a random color from a list of 10 colors
        const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "black"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        event.target.style.backgroundColor = randomColor;


    });
}

function resize() {
    console.log("OnResize");

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {

        // step 1
        const oc = document.createElement('canvas');
        const octx = oc.getContext('2d');
        oc.width = image.width;
        oc.height = image.height;

        // step 2: pre-filter image using steps as radius
        const steps = (oc.width / canvas.width)>>1;
        octx.filter = `blur(${steps}px)`;
        octx.drawImage(image, 0, 0);

        // step 3, draw scaled
        ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height);

    };
    image.src = "peter-centered.jpg";


}

window.onload = main;
window.onresize = resize;
