import React, { useState } from 'react';

const Button = ({ onClick, text }) => (
	<button onClick={onClick}> {text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
	if (good + neutral + bad === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<table>
			<tbody>
				<Statistic text="good" value={good} />
				<Statistic text="neutral" value={neutral} />
				<Statistic text="bad" value={bad} />
				<tr>
					<td>all</td>
					<td> {good + neutral + bad}</td>
				</tr>
				<tr>
					<td> average</td>
					<td> {(good - bad) / (good + neutral + bad)}</td>
				</tr>
				<tr>
					<td> positive</td>
					<td> {(good / (good + neutral + bad)) * 100}%</td>
				</tr>
			</tbody>
		</table>
	);
};

const Statistic = ({ value, text }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h2>give feedback</h2>
			<Button onClick={() => setGood(good + 1)} text={'good'} />
			<Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
			<Button onClick={() => setBad(bad + 1)} text={'bad'} />
			<h2> statistics </h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
}

export default App;
