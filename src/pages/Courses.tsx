import React, { useState, useContext } from 'react';
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonPage,
	IonGrid,
	IonRow,
	IonCol,
	IonButton,
	IonButtons,
	IonIcon,
	isPlatform,
	IonFab,
	IonFabButton,
} from '@ionic/react';
// import { useHistory } from 'react-router-dom';
import { addOutline } from 'ionicons/icons';
import AddCourseModal from '../components/AddCourseModal';
import CourseItem from '../components/CourseItem';
import CoursesContext from '../data/courses-context';

export const COURSES_DATA = [
	{
		id: 'c1',
		title: 'Ionic + React - The Practical Guide',
		enrolled: new Date('03/22/2019'),
		goals: [
			{ id: 'c1g1', text: 'Finalizó el curso!' },
			{ id: 'c1g2', text: 'Aprender mucho!' },
		],
	},
	{
		id: 'c2',
		title: 'React.js - The Practical Guide',
		enrolled: new Date('05/15/2018'),
		goals: [
			{ id: 'c2g1', text: 'Finalizó el curso!' },
			{ id: 'c2g2', text: 'Aprender mucho!' },
			{ id: 'c2g3', text: 'Finalizó el curso!' },
			{ id: 'c2g4', text: 'Aprender mucho!' },
			{ id: 'c2g5', text: 'Finalizó el curso!' },
			{ id: 'c2g6', text: 'Aprender mucho!' },
			{ id: 'c2g7', text: 'Finalizó el curso!' },
			{ id: 'c2g8', text: 'Aprender mucho!' },
			{ id: 'c2g9', text: 'Finalizó el curso!' },
			{ id: 'c2g10', text: 'Aprender mucho!' },
			{ id: 'c2g11', text: 'Finalizó el curso!' },
			{ id: 'c2g12', text: 'Aprender mucho!' },
			{ id: 'c2g13', text: 'Finalizó el curso!' },
			{ id: 'c2g14', text: 'Aprender mucho!' },
			{ id: 'c2g15', text: 'Finalizó el curso!' },
			{ id: 'c2g16', text: 'Aprender mucho!' },
			{ id: 'c2g17', text: 'Finalizó el curso!' },
			{ id: 'c2g18', text: 'Aprender mucho!' },
		],
	},
	{
		id: 'c3',
		title: 'JavaScript - The Practical Guide',
		enrolled: new Date('01/22/2019'),
		goals: [
			{ id: 'c3g1', text: 'Finalizó el curso!' },
			{ id: 'c3g2', text: 'Aprender mucho!' },
		],
	},
];

const Courses: React.FC = () => {
	// const history = useHistory();

	/*const changePageHandler = () => {
		history.push('/courses-goals');
	};*/

	const [isAdding, setIsAdding] = useState(false);

	const coursesCtx = useContext(CoursesContext);

	const startAddCourseHandler = () => {
		setIsAdding(true);
	};

	const cancelAddCourseHandler = () => {
		setIsAdding(false);
	};

	const courseAddHandler = (title: string, date: Date) => {
		coursesCtx.addCourse(title, date);
		setIsAdding(false);
	};

	return (
		<React.Fragment>
			<AddCourseModal
				show={isAdding}
				onCancel={cancelAddCourseHandler}
				onSave={courseAddHandler}
			/>
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Cursos</IonTitle>
						{!isPlatform('android') && (
							<IonButtons slot="end">
								<IonButton onClick={startAddCourseHandler}>
									<IonIcon slot="icon-only" icon={addOutline} />
								</IonButton>
							</IonButtons>
						)}
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						{coursesCtx.courses.map((course) => (
							<IonRow key={course.id}>
								<IonCol size-md="4" offset-md="4">
									<CourseItem
										title={course.title}
										id={course.id}
										enrolmentDate={course.enrolled}
									/>
								</IonCol>
							</IonRow>
						))}
					</IonGrid>
					{isPlatform('android') && (
						<IonFab horizontal="end" vertical="bottom" slot="fixed">
							<IonFabButton onClick={startAddCourseHandler}>
								<IonIcon icon={addOutline} />
							</IonFabButton>
						</IonFab>
					)}
				</IonContent>
			</IonPage>
		</React.Fragment>
	);
};

export default Courses;
