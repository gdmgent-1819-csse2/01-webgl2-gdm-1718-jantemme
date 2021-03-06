import Vector2 from './Math/Vector2.js'

/** Class representing a canvas element for WebGL2 */
export default class Canvas {
    constructor(width, height, shaderSources) {
        this.width = width
        this.height = height
        this.shaderSources = shaderSources

        this.colors = {
            black: [0, 0, 0, 0],
            blue: [0, 0, 255, 0],
            cyan: [0, 255, 255, 0],
            green: [0, 255, 0, 0],
            magenta: [255, 0, 255, 0],
            red: [255, 0, 0, 0],
            white: [255, 255, 255, 0],
            yellow: [255, 255, 0, 0],
        }
        this.properties = {
            colors: [],
            positions: [],
        }

        this.gl = null
        this.program = null
        this.run()

        window.addEventListener('updateCanvas', event => {
            this.updateCanvasHandler(event)
        }, false);

    }

    updateCanvasHandler(event) {
        console.log('updateCanvas')
        this.clearproperties()

        // White point in the middle
        this.properties.positions.push(0, 0)
        this.properties.colors.push(...this.colors.white)

        const v = new Vector2(0, 0.5)
        this.properties.positions.push(v.x, v.y)
        this.properties.colors.push(...this.colors.red)

        const indicators = new Vector2(0, 0.48)
        this.properties.positions.push(indicators.x, indicators.y)
        this.properties.colors.push(...this.colors.magenta)

        const colors = [
            'magenta',
            'magenta',
            'magenta',
            'magenta',
            'magenta',
            'magenta',
            'magenta'
        ]

        colors.forEach(color => {
            indicators.rotateVectorateVector(45)
            this.properties.positions.push(indicators.x, indicators.y)
            this.properties.colors.push(...this.colors[color])
        });

        const time = new Date()

        console.log((time.getHoursVector() * -30) - time.getMinutesVector()/2)


        for(let i = 0; i < 0.45; i+=0.0001) {
            const secondsVector = new Vector2(0, i)
            secondsVector.rotateVector(time.getSeconds() * -6)
            this.properties.positions.push(secondsVector.x, secondsVector.y)
            this.properties.colors.push(...this.colors.white) 

            if(i <= 0.35) {
                const minutesVector = new Vector2(0, i)
                minutesVector.rotateVector(time.getMinutes() * -6)
                this.properties.positions.push(minutesVector.x, minutesVector.y)
                this.properties.colors.push(...this.colors.white)
            }


            if(i <= 0.15) {
                const hoursVector = new Vector2(0, i)
                hoursVector.rotateVector((time.getHours() * -30) - time.getMinutes()/2)
                this.properties.positions.push(hoursVector.x, hoursVector.y)
                this.properties.colors.push(...this.colors.white)
            }
        }

        for(let i = 0; i < 360; i++) {
            v.rotateVector(1)
            this.properties.positions.push(v.x, v.y)
            this.properties.colors.push(...this.colors['green'])
        }

        this.drawScene()
    }
    refreshCanvas() {
        setTimeout(() => {
            this.updateCanvasHandler()
            this.refreshCanvas()
        }, 1000)
    }

    run() {
        try {
            this.createCanvas()
            this.createShaders()
            this.createProgram()
            this.createVertexArray()
            // Initial drawing on the canvas
            {
                // Random points
                for (let i = 0, max = 100000; i < max; i++) {
                    this.properties.positions.push(Math.random() * 2 - 1, Math.random() * 2 - 1)
                    this.properties.colors.push(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 0)
                }
                // White point in the middle.
                this.properties.positions.push(0, 0)
                this.properties.colors.push(...this.colors.white)
            }
            this.drawScene()
            this.refreshCanvas()

        } catch (error) {
            console.error(error)
        }
    }

    clearproperties() {
        this.properties = {
            colors: [],
            positions: [],
        }
    }

    createBuffers() {
        this.createBuffer('COLOR')
        this.createBuffer('POSITION')
    }

    createBuffer(bufferType) {
        const gl = this.gl
        const program = this.program

        let name // Name of attribute used in GLSL.
        let normalized // Should it be normalized to a value between 0 and 1.
        let size // Number of components per vertex attribute, can be 1 through 4.
        let srcproperties
        let type // propertiestype.
        const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position.
        const offset = 0 // Start at the beginning of the buffer.

        switch (bufferType) {
            case 'COLOR':
                name = 'a_VertexColor'
                normalized = true
                size = 4
                srcproperties = new Uint8Array(this.properties.colors)
                type = gl.UNSIGNED_BYTE // Integer from 0 through 255.
                break
            case 'POSITION':
                name = 'a_VertexPosition'
                normalized = false
                size = 2
                srcproperties = new Float32Array(this.properties.positions)
                type = gl.FLOAT
                break
            default:
                return null
        }

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferproperties(gl.ARRAY_BUFFER, srcproperties, gl.STATIC_DRAW)

        const index = gl.getAttribLocation(program, name)
        gl.enableVertexAttribArray(index)
        gl.vertexAttribPointer(index, size, type, normalized, stride, offset) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.height = this.height
        canvas.width = this.width
        const gl = this.gl = canvas.getContext('webgl2')
        gl.clearColor(0, 0, 0, 0) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
    }

    createProgram() {
        const gl = this.gl

        const program = gl.createProgram()
        gl.attachShader(program, this.vertexShader)
        gl.attachShader(program, this.fragmentShader)
        gl.linkProgram(program)

        const success = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (success) {
            this.program = program
            gl.useProgram(program)
        } else {
            console.error(gl.getProgramInfoLog(program))
            gl.deleteProgram(program)
        }
    }

    createShaders() {
        const gl = this.gl

        this.vertexShader = this.createShader(gl.VERTEX_SHADER)
        this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER)
    }

    createShader(type) {
        const gl = this.gl

        let source
        switch (type) {
            case gl.FRAGMENT_SHADER:
                source = this.shaderSources.fragment
                break
            case gl.VERTEX_SHADER:
                source = this.shaderSources.vertex
                break
            default:
                console.error('Shader type does not exist.')
                return null
        }

        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) {
            return shader
        }
        console.error(type, gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
    }

    createVertexArray() {
        const gl = this.gl

        const vertexArray = gl.createVertexArray()
        gl.bindVertexArray(vertexArray)
    }

    drawScene() {
        const gl = this.gl

        this.createBuffers()

        gl.clear(gl.COLOR_BUFFER_BIT) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear

        const modes = [ // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Rendering_primitives
            gl.POINTS,
            gl.LINES,
            gl.LINE_STRIP,
            gl.LINE_LOOP,
            gl.TRIANGLES,
            gl.TRIANGLE_STRIP,
            gl.TRIANGLE_FAN,
        ]
        const dimensions = 2
        const mode = modes[0]
        const first = 0
        const count = this.properties.positions.length / dimensions
        gl.drawArrays(mode, first, count) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
    }
}