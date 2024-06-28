import { useEffect, useRef, useState } from 'react';

import Point from '../../entities/point/ui/Point';
import Switcher from '../switcher/ui/Switcher';
import AnimatedYears from '../../entities/animatedYears/ui/AnimatedYears';

import { pointData } from '../../assets/data/data';

import './styles.scss';

const data = pointData;

type CircleProps = {
	totalCountPoints: number;
	activePoint: number;
	numberActivePosition: number;
	setActivePoint: (num: number | ((num: number) => void)) => void;
};

const Circle: React.FC<CircleProps> = ({ totalCountPoints, activePoint, numberActivePosition, setActivePoint }) => {
	const [angleRotationCircle, setAngleRotationCircle] = useState<number>(0);
	const [rotatesCount, setRotatesCount] = useState(0);
	const [ages, setAges] = useState<number[] | null>(null);

	const prevAges = useRef<number[] | null>(ages);

	const degSingleRotate = 360 / totalCountPoints;

	useEffect(() => {
		pointData.forEach((point) => {
			if (point.id === Math.abs(activePoint)) {
				setAges(point.ages);
				prevAges.current = ages;
			}
		});
	}, [activePoint]);

	const leftHandleClick = () => {
		setAngleRotationCircle((angleRotationCircle) => angleRotationCircle + degSingleRotate);
		setRotatesCount((rotatesCount) => (rotatesCount > totalCountPoints - 1 ? 1 : rotatesCount + 1));
		setActivePoint((activePoint) => (activePoint <= 1 ? totalCountPoints : activePoint - 1));
	};

	const rightHandleClick = () => {
		setAngleRotationCircle((angleRotationCircle) => angleRotationCircle - degSingleRotate);
		setRotatesCount((rotatesCount) => (rotatesCount < 1 - totalCountPoints ? -1 : rotatesCount - 1));
		setActivePoint((activePoint) => (activePoint > totalCountPoints - 1 ? 1 : activePoint + 1));
	};

	return (
		<>
			<div className='circle-wrapper'>
				<div style={{ transform: `rotate(${angleRotationCircle}deg)` }} className='circle'>
					{data.map(
						(el, index) =>
							el.id <= totalCountPoints && (
								<Point
									key={index}
									namePoint={el.text}
									rotatesCount={rotatesCount}
									angleRotationCircle={angleRotationCircle}
									initialPosition={index}
									activePoint={numberActivePosition}
									totalCountPoints={totalCountPoints}
									setActivePoint={setActivePoint}
									setRotatesCount={setRotatesCount}
									setAngleRotation={setAngleRotationCircle}
								/>
							)
					)}
				</div>
				<AnimatedYears years={ages} prevAges={prevAges} />
			</div>
			<Switcher
				totalCountPoints={totalCountPoints}
				activePoint={activePoint}
				leftHandleClick={leftHandleClick}
				rightHandleClick={rightHandleClick}
				setActivePoint={setActivePoint}
			/>
		</>
	);
};

export default Circle;
