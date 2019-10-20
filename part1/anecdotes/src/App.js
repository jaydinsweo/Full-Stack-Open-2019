import React, { useState } from 'react';

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

function App() {
	const [selected, setSelected] = useState(0);

	const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

	const Vote = () => {
		const copy = [...points];
		copy[selected] += 1;
		setPoints(copy);
	};

	const Next = () => {
		setSelected((selected + 1) % 6);
	};

	const MostVotes = () => {
		const maxVotes = Math.max(...points);
		return anecdotes[points.indexOf(maxVotes)];
	};

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<p> {anecdotes[selected]}</p>
			<p>has {Object.values(points)[selected]} votes</p>
			<button onClick={Vote}>vote</button>
			<button onClick={Next}>next anecdote</button>

			<h2> Anecdote with most votes</h2>
			<p> {MostVotes()}</p>
		</div>
	);
}

export default App;
