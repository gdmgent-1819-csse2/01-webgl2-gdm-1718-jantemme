import Matrix2 from '../../../Library/Math/Matrix2.js'
import TestMatrix from './TestMatrix.js'

/** Class for testing the Matrix2 class. */
export default class TestMatrix2 extends TestMatrix {
    /**
     * Create and run the tests.
     */
    constructor() {
        super()
        console.info('testing Matrix2')
        this.testAddingMatrices()
        this.testSubtractingMatrices()
        this.testMultiplyingMatrices()
        this.testMultiplyingMatricesIdentity()
        this.testRotatingMatrix()
    }

    /**
     * Test the addition method.
     */
    testAddingMatrices() {
        console.info('test Matrix2.addMatrices()')
        const firstMatrixElements = [
            1, 2,
            3, 4,
        ]
        const secondMatrixElements = [
            5, 6,
            7, 8,
        ]
        const expectedMatrixElements = [
            6, 8,
            10, 12,
        ]
        const matrix = new Matrix2(firstMatrixElements)
        matrix.addMatrices(secondMatrixElements)
        const actualMatrixElements = matrix.elements
        this.assertIdentical(actualMatrixElements, expectedMatrixElements)
    }

    /**
     * Test the subtraction method.
     */
    testSubtractingMatrices() {
        console.info('test Matrix2.subtractMatrices()')
        const firstMatrixElements = [
            1, 2,
            3, 4,
        ]
        const secondMatrixElements = [
            9, 8,
            7, 6,
        ]
        const expectedMatrixElements = [
            -8, -6,
            -4, -2,
        ] 
        const matrix = new Matrix2(firstMatrixElements)
        matrix.subtractMatrices(secondMatrixElements)
        const actualMatrixElements = matrix.elements
        this.assertIdentical(actualMatrixElements, expectedMatrixElements)
    }

    /**
     * Test the multiplication method.
     */
    testMultiplyingMatrices() {
        console.info('test Matrix2.multiplyMatrices()')
        const firstMatrixElements = [
            1, 2,
            3, 4,
        ]
        const secondMatrixElements = [
            2, -1,
            -1, 2,
        ]
        const expectedMatrixElements = [
            0, 3,
            2, 5,
        ]
        const m = new Matrix2(firstMatrixElements)
        matrix.multiplyMatrices(secondMatrixElements)
        const actualMatrixElements = matrix.elements
        this.assertIdentical(actualMatrixElements, expectedMatrixElements)
    }

    /**
     * Test the multiplication method with an identity matrix.
     */
    testMultiplyingMatricesIdentity() {
        console.info('test Matrix2.multiplyMatrices() by identity matrix')
        const firstMatrixElements = [
            1, 2,
            3, 4,
        ]
        const identityMatrixElements = [
            1, 0,
            0, 1,
        ]
        const expectedMatrixElements = [
            1, 2,
            3, 4,
        ]
        const matrix = new Matrix2(firstMatrixElements)
        matrix.multiplyMatrices(identityMatrixElements)
        const actualMatrixElements = matrix.elements
        this.assertIdentical(actualMatrixElements, expectedMatrixElements)
    }

    /**
     * Test the rotation method.
     */
    testRotatingMatrix() {
        console.info('test Matrix2.rotateMatrix()')
        const rotationAngle = 90
        const matrixElements = [
            3, 0,
            1, 0,
        ]
        const expectedMatrixElements = [
            -1, 0,
            3, 0,
        ]
        const matrix = new Matrix2(matrixElements)
        matrix.rotateMatrix(rotationAngle)
        const actualMatrixElements = matrix.elements
        this.assertIdenticalRounded(actualMatrixElements, expectedMatrixElements)
    }
}