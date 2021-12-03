import React, { useState } from 'react';

import CoursesContext, { Course, Goal } from './courses-context';

const CoursesContextProvider: React.FC = (props) => {
	const [courses, setCourses] = useState<Course[]>([
		{
			id: 'c1',
			title: 'React -The Complete Guide',
			enrolled: new Date(),
			goals: [],
			included: true,
		},
	]);

	const addCourse = (title: string, date: Date) => {
		const newCourse: Course = {
			id: Math.random().toString(),
			title,
			enrolled: date,
			goals: [],
			included: true,
		};
		setCourses((curCourses) => {
			return curCourses.concat(newCourse);
		});
	};

	const addGoal = (courseId: string, text: string) => {
		const newGoal: Goal = { id: Math.random().toString(), text };

		setCourses((curCourses) => {
			const updatedCourses = [...curCourses];
			const updatedCoursesIndex = updatedCourses.findIndex(
				(course) => course.id === courseId
			);
			const updatedCourseGoals =
				updatedCourses[updatedCoursesIndex].goals.concat(newGoal);
			const updatedCourse = { ...updatedCourses[updatedCoursesIndex] };
			updatedCourse.goals = updatedCourseGoals;
			updatedCourses[updatedCoursesIndex] = updatedCourse;
			return updatedCourses;
		});
	};

	const deleteGoal = (courseId: string, goalId: string) => {
		setCourses((curCourses) => {
			const updatedCourses = [...curCourses];
			const updatedCoursesIndex = updatedCourses.findIndex(
				(course) => course.id === courseId
			);
			const updatedCourseGoals = updatedCourses[
				updatedCoursesIndex
			].goals.filter((goal) => goal.id !== goalId);
			const updatedCourse = { ...updatedCourses[updatedCoursesIndex] };
			updatedCourse.goals = updatedCourseGoals;
			updatedCourses[updatedCoursesIndex] = updatedCourse;
			return updatedCourses;
		});
	};

	const updateGoal = (courseId: string, goalId: string, newText: string) => {
		setCourses((curCourses) => {
			const updatedCourses = [...curCourses];
			const updatedCoursesIndex = updatedCourses.findIndex(
				(course) => course.id === courseId
			);
			const updatedCourseGoals =
				updatedCourses[updatedCoursesIndex].goals.slice();
			const updatedCourseGoalsIndex = updatedCourseGoals.findIndex(
				(goal) => goal.id === goalId
			);
			const updateGoal = {
				...updatedCourseGoals[updatedCourseGoalsIndex],
				text: newText,
			};
			updatedCourseGoals[updatedCourseGoalsIndex] = updateGoal;
			const updatedCourse = { ...updatedCourses[updatedCoursesIndex] };
			updatedCourse.goals = updatedCourseGoals;
			updatedCourses[updatedCoursesIndex] = updatedCourse;
			return updatedCourses;
		});
	};

	const changeCoursesFilter = (courseId: string, isIncluded: boolean) => {
		setCourses((curCourses) => {
			const updatedCourses = [...curCourses];
			const updatedCoursesIndex = updatedCourses.findIndex(
				(course) => course.id === courseId
			);

			const updatedCourse = {
				...updatedCourses[updatedCoursesIndex],
				included: isIncluded,
			};
			updatedCourses[updatedCoursesIndex] = updatedCourse;
			return updatedCourses;
		});
	};

	return (
		<CoursesContext.Provider
			value={{
				courses,
				addGoal,
				addCourse,
				deleteGoal,
				updateGoal,
				changeCoursesFilter,
			}}
		>
			{props.children}
		</CoursesContext.Provider>
	);
};

export default CoursesContextProvider;
