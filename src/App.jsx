import React, { useRef, useState } from 'react'

function App() {
	const [time, setTime] = useState(25 * 60)
	const [isRun, setIsRun] = useState(false)

	const interval = useRef(null)

	const minutes = Math.floor(time / 60)
		.toString()
		.padStart(2, '0')
	const seconds = (time - minutes * 60).toString().padStart(2, '0')

	function startTimer() {
		if (interval.current !== null) return

		setIsRun(true)
		interval.current = setInterval(() => {
			setTime(time => {
				if (time >= 1) return time - 1

				resetTimer()
				return 0
			})
		}, 1000)
	}

	function stopTimer() {
		if (interval.current === null) return
		clearInterval(interval.current)
		interval.current = null
		setIsRun(false)
	}

	function resetTimer() {
		clearInterval(interval.current)
		interval.current = null
		setTime(25 * 60)
		setIsRun(false)
	}

	return (
		<div className='flex items-center justify-center w-full min-h-screen overflow-hidden font-sans bg-gradient-to-r from-cyan-500 to-blue-500'>
			<div className='space-y-6 text-center'>
				<h1 className='text-2xl font-bold text-white'>POMODORO TIMER</h1>
				<div className='font-bold text-white text-9xl'>
					<span>{minutes}</span>
					<span>:</span>
					<span>{seconds}</span>
				</div>
				<div className='flex items-center justify-center space-x-6'>
					{!isRun && (
						<button
							onClick={startTimer}
							className='inline-block px-8 py-2 text-lg font-medium text-black bg-white rounded-sm'
						>
							START
						</button>
					)}
					{isRun && (
						<button
							onClick={stopTimer}
							className='inline-block px-8 py-2 text-lg font-medium text-black bg-white rounded-sm'
						>
							STOP
						</button>
					)}

					<button
						onClick={resetTimer}
						className='inline-block px-8 py-2 text-lg font-medium text-black bg-white rounded-sm'
					>
						RESET
					</button>
				</div>
			</div>
		</div>
	)
}

export default App
