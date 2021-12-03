import React from 'react';
import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
} from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { list, trophyOutline } from 'ionicons/icons';

import Courses from './Courses';
import AllGoals from './AllGoals';
import CoursesGoals from './CoursesGoals';

const CoursesTabs: React.FC = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect path="/courses" to="/courses/all-goals" exact />
				<Switch>
					<Route path="/courses/list" exact>
						<Courses />
					</Route>
					<Route path="/courses/all-goals" exact>
						<AllGoals />
					</Route>
					<Route path="/courses/:courseId">
						<CoursesGoals />
					</Route>
				</Switch>
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="all-goals" href="/courses/all-goals">
					<IonIcon icon={list} />
					<IonLabel>Objetivos</IonLabel>
				</IonTabButton>
				<IonTabButton tab="courses" href="/courses/list">
					<IonIcon icon={trophyOutline} />
					<IonLabel>Cursos</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default CoursesTabs;
