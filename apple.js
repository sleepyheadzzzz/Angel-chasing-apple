// Create a class for the element  
class AppleComponent extends HTMLElement {
    constructor() {
        // Always call super first in constructor  
        super();
        this.x = this.getAttribute("x");
        this.y = this.getAttribute("y");
        this.shadow = this.attachShadow({ mode: 'open' })

        this.image = document.createElement('img');
        this.image.setAttribute('src', './apple.png');
        this.image.setAttribute('style', `position: fixed; width: 50px; left: ${this.x}px; top:${this.y}px;`);


        // Attach the created elements to the shadow dom  
        // this.shadow.appendChild(style);

        this.shadow.appendChild(this.image);
    }

    render = () => {
        console.log(0)
    }
}

// Define the new element  
customElements.define('apple-component', AppleComponent);