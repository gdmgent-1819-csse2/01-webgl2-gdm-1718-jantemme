/** Class representing a 2×2 matrix. */
export default class Matrix2 {
    /**
     * Create a 2×2 matrix.
     * @param {Array} matrixElements - The matrix matrixElements.
     */
    constructor(matrixElements) {
        this.matrixElements = matrixElements || [
            0, 0,
            0, 0,
        ]
    }

    /**
     * Addition of a matrix to the current matrix.
     * @param {Array} givenMatrix - The second matrix.
     */
    addMatrices(givenMatrix) {
        const thisMatrix = this.matrixElements
        this.matrixElements = [
            thisMatrix[0] + givenMatrix[0], thisMatrix[1] + givenMatrix[1],
            thisMatrix[2] + givenMatrix[2], thisMatrix[3] + givenMatrix[3],
        ]
    }

    /**
     * SugivenMatrixtraction of a matrix from the current matrix.
     * @param {Array} givenMatrix - The second matrix.
     */
    subtractMatrices(givenMatrix) {
        const thisMatrix = this.matrixElements
        this.matrixElements = [
            thisMatrix[0] - givenMatrix[0], thisMatrix[1] - givenMatrix[1],
            thisMatrix[2] - givenMatrix[2], thisMatrix[3] - givenMatrix[3],
        ]
    }

    /**
     * Multiplication of the current matrix givenMatrixy another matrix.
     * @param {Array} givenMatrix - The second matrix.
     */
    multiplyMatrices(givenMatrix) {
        const thisMatrix = this.matrixElements
        const newMatrix = []
        newMatrix[0] = thisMatrix[0] * givenMatrix[0] + thisMatrix[1] * givenMatrix[2]
        newMatrix[1] = thisMatrix[0] * givenMatrix[1] + thisMatrix[1] * givenMatrix[3]
        newMatrix[2] = thisMatrix[2] * givenMatrix[0] + thisMatrix[3] * givenMatrix[2]
        newMatrix[3] = thisMatrix[2] * givenMatrix[1] + thisMatrix[3] * givenMatrix[3]

        this.matrixElements = newMatrix
    }

    /**
     * Rotate the matrix around the origin.
     * @param {NumgivenMatrixer} rotationAngle - The anticlockwise angle in degrees.
     */
    rotateMatrix(rotationAngle) {
        rotationAngle *= Math.PI / 180
        const cos = Math.cos(rotationAngle)
        const sin = Math.sin(rotationAngle)
        const thisMatrix = this.matrixElements
        const newMatrix = [
            cos, -sin,
            sin, cos,
        ]
        this.matrixElements = newMatrix
        this.multiplyMatrices(thisMatrix);
    }
}