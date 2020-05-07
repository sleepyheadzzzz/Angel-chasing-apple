const APPLE_SIZE = 50;
const NUM_APPLE = 8;
const ANGEL_STEP_SIZE = 100;
const ANGLE_SIZE = 150;
const [UP, DOWN, LEFT, RIGHT] = [38, 40, 37, 39];

class AngelComponent extends HTMLElement {
    constructor() {
        super();
        this.state = {
            x: 50,
            y: 100,
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            needNotify: false
        };
        this.shadow = this.attachShadow({ mode: 'open' })
        this.image = document.createElement('img');
        this.image.setAttribute('src', './angel.png');
        this.image.setAttribute('class', 'angel');

        this.apples = [];

        window.addEventListener('keydown', this.handleKeydown);

        this.renderangel();
        this.initApples();
    }

    initApples() {
        const {innerWidth, innerHeight} = this.state;
        for (let i = 0; i < NUM_APPLE; i ++) {
            const apple = document.createElement("apple-component")
            const [x, y] = [Math.random()* (innerWidth - APPLE_SIZE), Math.random()* (innerHeight - APPLE_SIZE)]
            apple.setAttribute("x", x)
            apple.setAttribute("y", y)
            this.apples.push({apple, x, y})
        }
        this.renderApple();
    }

    renderApple() {
        if (this.appleContainer) {
            this.shadow.removeChild(this.appleContainer);
        }
        this.appleContainer = document.createElement('div');
        this.apples.forEach(({apple}) => this.appleContainer.appendChild(apple))
        this.shadow.appendChild(this.appleContainer);
    }

    setState = (data) => {
        this.state = { ...this.state, ...data };
    }

    checkEatApple() {
        const { x:angelX, y:angelY } = this.state;
        let appleChanged = false;
        this.apples = this.apples.filter(({x, y}) => {
            const shouldEatApple = (((angelX - ANGEL_STEP_SIZE) < x && x < (angelX + ANGEL_STEP_SIZE)) && ((angelY - ANGEL_STEP_SIZE) < y && y < (angelY + ANGEL_STEP_SIZE)));
            appleChanged = appleChanged || shouldEatApple;
            return !shouldEatApple
        })
        if (appleChanged) {
            this.renderApple()
        };
        if (this.apples.length === 0) {
            this.setState({needNotify: true})
            return true;
        }
        return false;

    }
 
    handleKeydown = (evt) => {
        const { x, y, innerHeight, innerWidth } = this.state;
        switch (evt?.keyCode) {
            case UP:
                if (y <= 0) break;
                this.setState({ y: y - APPLE_SIZE })
                break;
            case DOWN:
                if (y + ANGLE_SIZE >= innerHeight) break;
                this.setState({ y: y + APPLE_SIZE })
                break;
            case LEFT:
                if (x <= 0) break;
                this.setState({ x: x - APPLE_SIZE })
                break;
            case RIGHT:
                if (x + ANGLE_SIZE >= innerWidth) break;
                this.setState({ x: x + APPLE_SIZE })
                break;

        }
        this.renderangel()
        if (this.apples.length > 0) {
            if (this.checkEatApple()) {
                this.setState({needNotify: false})
                alert("Offer!")
            }
        }
    }

    renderangel = () => {
        if (this.container) this.shadow.removeChild(this.container);
        this.container = document.createElement('div');

        const { x, y } = this.state;

        const style = document.createElement('style');
        style.textContent =
            `  
        .angel {
            width: ${ANGLE_SIZE}px;  
            position: fixed; left: ${x}px; top:${y}px;
        }  
        `;

        this.container.appendChild(style)
        this.container.appendChild(this.image)
        this.shadow.appendChild(this.container);
    }
}

customElements.define('angel-component', AngelComponent);