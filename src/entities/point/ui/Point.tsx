import './styles.scss';

type PointProps = {
	namePoint: string;
	initialPosition: number;
	rotatesCount: number;
	angleRotationCircle: number;
	totalCountPoints: number;
	activePoint: number;
	setAngleRotation: (num: number) => void;
	setRotatesCount: (num: number) => void;
	setActivePoint: (num: number) => void;
};

const calculate = (value: number, diff: number, totalCountPoints: number): number => {
	const total = value + diff;
	return ((total % totalCountPoints) + totalCountPoints) % totalCountPoints;
};

const calculateShortAngle = (activePoint: number, currentPosition: number, totalCountPoints: number) => {
	const singleDegries = 360 / totalCountPoints;
	const countWayPoints = Math.abs(activePoint - currentPosition);
	const shortAngle = 360 - singleDegries * countWayPoints;
	return shortAngle > countWayPoints * singleDegries ? countWayPoints * singleDegries : shortAngle;
};

const Point = ({
	namePoint,
	initialPosition,
	rotatesCount,
	angleRotationCircle,
	totalCountPoints,
	activePoint,
	setRotatesCount,
	setAngleRotation,
	setActivePoint,
}: PointProps) => {
	const degSingleRotate = 360 / totalCountPoints;
	let actualActivepoint = activePoint - 1;
	let currentPosition = calculate(initialPosition, rotatesCount, totalCountPoints);
	const diff = actualActivepoint - currentPosition;
	const nextRotatesCounts = calculate(rotatesCount, diff, totalCountPoints);
	const shortWay = calculateShortAngle(actualActivepoint, currentPosition, totalCountPoints);
	const angleRotationPoint = -currentPosition * degSingleRotate;
	if (actualActivepoint === 0) {
		actualActivepoint = currentPosition > totalCountPoints / 2 ? totalCountPoints : actualActivepoint;
	}
	if (currentPosition === 0) {
		currentPosition = actualActivepoint > totalCountPoints / 2 ? totalCountPoints : currentPosition;
	}
	const newAngleRotation = currentPosition < actualActivepoint ? shortWay : -shortWay;
	const isActive = currentPosition === actualActivepoint;

	const handlePointClick = () => {
		setAngleRotation(angleRotationCircle + newAngleRotation);
		setRotatesCount(nextRotatesCounts);
		setActivePoint(initialPosition + 1)
	};

	return (
		<div style={{ transform: `rotate(${initialPosition * degSingleRotate}deg)` }} className='point-block'>
			<div
				onClick={handlePointClick}
				style={{ transform: `rotate(${angleRotationPoint}deg)` }}
				className='point-wrapper'
			>
				<div className={`point ${isActive ? 'point_active' : ''}`}>
					<div className='point-number'>{initialPosition + 1}</div>
				</div>
				<div className={`point-text ${isActive ? 'point-text_active' : ''}`}>{namePoint}</div>
			</div>
		</div>
	);
};

export default Point;
