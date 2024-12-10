import React, { useState } from 'react'
import './App.css'

const LongestSequence = ({ numbers }) => {
	const [result, setResult] = useState('')

	const findLongestSequence = numbers => {
		const n = numbers.length

		// Функція для обчислення накладання між двома числами
		const getOverlap = (a, b) => {
			for (let i = Math.min(a.length, b.length); i > 0; i--) {
				if (a.slice(-i) === b.slice(0, i)) {
					return i
				}
			}
			return 0
		}

		// Матриця накладань
		const overlapMatrix = Array.from({ length: n }, () => Array(n).fill(0))

		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (i !== j) {
					overlapMatrix[i][j] = getOverlap(numbers[i], numbers[j])
				}
			}
		}

		// Побудова найбільшого шляху (жадібний підхід)
		const visited = new Array(n).fill(false)
		let currentIndex = 0
		let sequence = numbers[currentIndex]
		visited[currentIndex] = true

		for (let step = 1; step < n; step++) {
			let maxOverlap = 0
			let nextIndex = -1

			for (let i = 0; i < n; i++) {
				if (!visited[i] && overlapMatrix[currentIndex][i] > maxOverlap) {
					maxOverlap = overlapMatrix[currentIndex][i]
					nextIndex = i
				}
			}

			if (nextIndex === -1) break

			sequence += numbers[nextIndex].slice(maxOverlap)
			visited[nextIndex] = true
			currentIndex = nextIndex
		}

		return sequence
	}

	const handleFindSequence = () => {
		if (!numbers || numbers.length === 0) {
			alert('No numbers to process!')
			return
		}
		const sequence = findLongestSequence(numbers)
		setResult(sequence)
	}

	return (
		<div style={{ padding: '20px' }}>
			<h2>Find Longest Sequence</h2>
			<button className='button' onClick={handleFindSequence}>
				Find Sequence
			</button>
			{result && (
				<div>
					<h3>Result:</h3>
					<p>{result}</p>
				</div>
			)}
		</div>
	)
}

export default LongestSequence
