/** Class representing a three-dimensional vector. */
export default class Vector3 {
    /**
     * Create a vector.
     * @param {Number} x - The horizontal vector component.
     * @param {Number} y - The vertical vector component.
     * @param {Number} z - The 3rd dimensional vector component.
     */
    constructor(x, y, z) {
        this.x = Number(x) || 0
        this.y = Number(y) || 0
        this.z = Number(z) || 0
    }

    /**
     * Calculate the length of the vector.
     * @return {Number} The length of the vector
     */
    norm() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
    }

    /**
     * changing the vector to a unit vector
     */
    normalisation(){
         this.x /= this.norm()
         this.y /= this.norm()
         this.z /= this.norm()
    }

    /**
     * Addition of a vector to the current vector.
     * @param {Vector3} v - The second vector.
     */
    add(v) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
    }

    /**
     * Subtraction of a vector from the current vector.
     * @param {Vector3} v - The second vector.
     */
    sub(v) {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
    }

    /**
     * Scalar multiplication. Multiplies a vector by a scalar.
     * @param {Number} a - The scalar value.
     */
    scalar(a) {
        this.x *= a
        this.y *= a
        this.z *= a
    }

    /**
     * Calculate the dot product of the current vector and another vector.
     * @param {Vector3} v - The second vector.
     * @return {Number} the dot product of the wzo
     */
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }
}