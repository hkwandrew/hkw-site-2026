const NEWTON_ITERATIONS = 4
const NEWTON_MIN_SLOPE = 0.001
const SUBDIVISION_PRECISION = 0.0000001
const SUBDIVISION_MAX_ITERATIONS = 10
const SPLINE_TABLE_SIZE = 11
const SAMPLE_STEP_SIZE = 1 / (SPLINE_TABLE_SIZE - 1)

const calcBezier = (time, a1, a2) => {
    return (
        (((1 - 3 * a2 + 3 * a1) * time + (3 * a2 - 6 * a1)) * time +
            3 * a1) *
        time
    )
}

const getSlope = (time, a1, a2) => {
    return (
        3 * (1 - 3 * a2 + 3 * a1) * time * time +
        2 * (3 * a2 - 6 * a1) * time +
        3 * a1
    )
}

const binarySubdivide = (x, lowerBound, upperBound, mX1, mX2) => {
    let currentX = 0
    let currentT = 0
    let iteration = 0

    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2
        currentX = calcBezier(currentT, mX1, mX2) - x

        if (currentX > 0) {
            upperBound = currentT
        } else {
            lowerBound = currentT
        }

        iteration += 1
    } while (
        Math.abs(currentX) > SUBDIVISION_PRECISION &&
        iteration < SUBDIVISION_MAX_ITERATIONS
    )

    return currentT
}

const newtonRaphsonIterate = (x, guessT, mX1, mX2) => {
    let currentT = guessT

    for (let iteration = 0; iteration < NEWTON_ITERATIONS; iteration += 1) {
        const currentSlope = getSlope(currentT, mX1, mX2)
        if (currentSlope === 0) return currentT

        const currentX = calcBezier(currentT, mX1, mX2) - x
        currentT -= currentX / currentSlope
    }

    return currentT
}

export const createCubicBezierEase = (mX1, mY1, mX2, mY2) => {
    if (![mX1, mY1, mX2, mY2].every(Number.isFinite)) {
        throw new TypeError('Cubic bezier control points must be finite numbers')
    }

    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
        throw new RangeError(
            'Cubic bezier x control points must be within the [0, 1] range',
        )
    }

    if (mX1 === mY1 && mX2 === mY2) {
        return (progress) => progress
    }

    const sampleValues = new Float32Array(SPLINE_TABLE_SIZE)

    for (let index = 0; index < SPLINE_TABLE_SIZE; index += 1) {
        sampleValues[index] = calcBezier(index * SAMPLE_STEP_SIZE, mX1, mX2)
    }

    const getTForX = (x) => {
        let intervalStart = 0
        let currentSample = 1

        while (
            currentSample !== SPLINE_TABLE_SIZE - 1 &&
            sampleValues[currentSample] <= x
        ) {
            intervalStart += SAMPLE_STEP_SIZE
            currentSample += 1
        }

        currentSample -= 1

        const sampleDelta =
            sampleValues[currentSample + 1] - sampleValues[currentSample]
        const dist =
            sampleDelta === 0
                ? 0
                : (x - sampleValues[currentSample]) / sampleDelta
        const guessT = intervalStart + dist * SAMPLE_STEP_SIZE
        const initialSlope = getSlope(guessT, mX1, mX2)

        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(x, guessT, mX1, mX2)
        }

        if (initialSlope === 0) {
            return guessT
        }

        return binarySubdivide(
            x,
            intervalStart,
            intervalStart + SAMPLE_STEP_SIZE,
            mX1,
            mX2,
        )
    }

    return (progress) => {
        if (progress <= 0) return 0
        if (progress >= 1) return 1

        return calcBezier(getTForX(progress), mY1, mY2)
    }
}

export const ABOUT_STAGE_EASE = createCubicBezierEase(0.22, 1, 0.36, 1)
