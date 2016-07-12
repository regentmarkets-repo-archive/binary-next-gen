/* eslint-disable */
import { defaultMemoize, createSelectorCreator } from 'reselect'

export function debugMemoize(func, equalityCheck = (a, b) => a === b) {
    let lastArgs = null
    let lastResult = null
    return (...args) => {
        if (
            lastArgs !== null &&
            lastArgs.length === args.length &&
            args.every((value, index) => equalityCheck(value, lastArgs[index]))
        ) {
            return lastResult
        }
        if (lastArgs !== null) {
            console.groupCollapsed()
            console.log(`Debug: ${func.name} recompute`);
            const diffVal = args
                .map((value, index) => [!equalityCheck(value, lastArgs[index]), index])
                .find(v => v[0])
            console.log(`Index: ${diffVal[1]}`)
            console.log(`Old: ${lastArgs[diffVal[1]]}`)
            console.log(`New: ${args[diffVal[1]]}`)
            console.groupEnd()
        }

        lastResult = func(...args)
        lastArgs = args
        return lastResult
    }
}

export function createDebugSelector(...args) {
    return createSelectorCreator(debugMemoize)(...args)
}
