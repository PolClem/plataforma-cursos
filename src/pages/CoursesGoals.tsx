import React, { useState, useRef, useContext } from 'react';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonPage,
	IonButton,
	IonButtons,
	IonBackButton,
	IonList,
	IonIcon,
	IonFab,
	IonFabButton,
	IonAlert,
	IonToast,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { addOutline } from 'ionicons/icons';

import { isPlatform } from '@ionic/core';
import EditModal from '../components/EditModal';
import EditableGoalItem from '../components/EditableGoalItem';
import CoursesContext from '../data/courses-context';

const CoursesGoals: React.FC = () => {
	const [startDeleting, setStartDeleting] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState<any>();

	const coursesCtx = useContext(CoursesContext);

	const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
	const selectedGoalIdRef = useRef<string | null>(null);

	const selectedCourseId = useParams<{ courseId: string }>().courseId;

	const selectedCourse = coursesCtx.courses.find(
		(c) => c.id === selectedCourseId
	);

	const startDeleteGoalHandler = (goalId: string) => {
		setToastMessage('');
		setStartDeleting(true);
		selectedGoalIdRef.current = goalId;
	};

	const deleteGoalHandler = () => {
		setStartDeleting(false);
		coursesCtx.deleteGoal(selectedCourseId, selectedGoalIdRef.current!);
		setToastMessage('Eliminado!');
	};

	const startEditGoalHandler = (goalId: string, event: React.MouseEvent) => {
		event.stopPropagation();
		const goal = selectedCourse?.goals.find((g) => g.id === goalId);
		slidingOptionRef.current?.closeOpened();
		if (!goal) {
			return;
		}
		setIsEditing(true);
		setSelectedGoal(goal);
	};

	const cancelEditGoalHandler = () => {
		setIsEditing(false);
		setSelectedGoal(null);
	};

	const startAddGoalHandler = () => {
		setIsEditing(true);
		setSelectedGoal(null);
	};

	const saveGoalHandler = (text: string) => {
		if (selectedGoal) {
			coursesCtx.updateGoal(selectedCourseId, selectedGoal.id, text);
		} else {
			coursesCtx.addGoal(selectedCourseId, text);
		}
		setIsEditing(false);
	};

	let content = (
		<h2 className="ion-text-center">No se encontraron obetivos!</h2>
	);
	if (!selectedCourse) {
		content = <h2 className="ion-text-center">No se encontro el curso!</h2>;
	}

	if (selectedCourse && selectedCourse.goals.length > 0) {
		content = (
			<IonList>
				{selectedCourse.goals.map((goal) => (
					<EditableGoalItem
						key={goal.id}
						slidingRef={slidingOptionRef}
						text={goal.text}
						onStartDelete={startDeleteGoalHandler.bind(null, goal.id)}
						onStartEdit={startEditGoalHandler.bind(null, goal.id)}
					/>
				))}
			</IonList>
		);
	}

	return (
		<React.Fragment>
			<EditModal
				show={isEditing}
				onCancel={cancelEditGoalHandler}
				onSave={saveGoalHandler}
				editedGoal={selectedGoal}
			/>
			<IonToast
				isOpen={!!toastMessage}
				message={toastMessage}
				duration={2000}
			/>
			<IonAlert
				isOpen={startDeleting}
				header="¿Estas seguro?"
				message="¿Quieres borrar éste obetivo? No podrás volver atrás. "
				buttons={[
					{
						text: 'No',
						role: 'Cancelar',
						handler: () => {
							setStartDeleting(false);
						},
					},
					{
						text: 'Si',
						handler: deleteGoalHandler,
					},
				]}
			/>
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonBackButton defaultHref="/courses/list" />
						</IonButtons>
						<IonTitle>
							{selectedCourse
								? selectedCourse.title
								: 'No se ha encontrado el curso'}
						</IonTitle>
						{!isPlatform('android') && (
							<IonButtons slot="end">
								<IonButton onClick={startAddGoalHandler}>
									<IonIcon slot="icon-only" icon={addOutline} />
								</IonButton>
							</IonButtons>
						)}
					</IonToolbar>
				</IonHeader>
				<IonContent>
					{content}
					{isPlatform('android') && (
						<IonFab horizontal="end" vertical="bottom" slot="fixed">
							<IonFabButton onClick={startAddGoalHandler}>
								<IonIcon icon={addOutline} />
							</IonFabButton>
						</IonFab>
					)}
				</IonContent>
			</IonPage>
		</React.Fragment>
	);
};

export default CoursesGoals;
