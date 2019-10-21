import React from 'react';

const Total = ({ parts }) => {
	const initialValue = 0;
	const reducer = (s, p) => {
		return s + p.exercises;
	};

	return <h4>total of {parts.reduce(reducer, initialValue)} exercises</h4>;
};

const CoursePart = ({ parts }) =>
	parts.map(part => <Part part={part} key={part.id} />);

const Part = ({ part }) => (
	<p>
		{part.name} - {part.exercises}
	</p>
);

const Course = ({ course }) => {
	return (
		<div>
			<h2>{course.name}</h2>
			<div>
				<CoursePart parts={course.parts} />
			</div>
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
