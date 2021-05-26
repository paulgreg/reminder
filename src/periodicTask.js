import { useEffect } from 'react'

export const MINUTE = 60 * 1000

const periodicTask = (interval) => (fn) =>
    useEffect(() => {
        const id = setInterval(fn, interval)
        return () => clearInterval(id)
    }, [fn])

export default periodicTask
