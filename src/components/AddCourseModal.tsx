import React, { useRef, useState } from 'react';
import {
	IonButton,
	IonCol,
	IonContent,
	IonDatetime,
	IonGrid,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonModal,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

const AddCourseModal: React.FC<{
	show: boolean;
	onCancel: () => void;
	onSave: (title: string, date: Date) => void;
}> = (props) => {
	const [error, setError] = useState('');

	const titleRef = useRef<HTMLIonInputElement>(null);
	const dateRef = useRef<HTMLIonDatetimeElement>(null);

	const saveHandler = () => {
		const enteredTitle = titleRef.current!.value;
		const selectedDate = dateRef.current!.value;

		if (
			!enteredTitle ||
			!selectedDate ||
			enteredTitle.toString().trim().length === 0 ||
			selectedDate.trim().length === 0
		) {
			setError(
				'Por favor ingrese un título válido y seleccione una fecha válida'
			);
			return;
		}
		setError('');

		props.onSave(enteredTitle.toString(), new Date(selectedDate));
	};

	return (
		<IonModal isOpen={props.show}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Add Course</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel position="floating">Título del Curso</IonLabel>
								<IonInput type="text" ref={titleRef} />
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel>Inscripto el </IonLabel>
								<IonDatetime displayFormat="MM DD YY" ref={dateRef} />
							</IonItem>
						</IonCol>
					</IonRow>
					{error && (
						<IonRow className="ion-text-center">
							<IonCol>
								<IonText color="danger">
									<p>{error}</p>
								</IonText>
							</IonCol>
						</IonRow>
					)}
					<IonRow className="ion-text-center">
						<IonCol>
							<IonButton color="dark" fill="clear" onClick={props.onCancel}>
								Cancelar
							</IonButton>
						</IonCol>
						<IonCol>
							<IonButton expand="block" color="secondary" onClick={saveHandler}>
								Guardar
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonModal>
	);
};

export default AddCourseModal;
