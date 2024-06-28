import { useEffect, useState } from 'react';
import Circle from '../../features/circle/Circle';
import Slider from '../../entities/swiper/ui/Slider';
import './styles.scss';

type CircleWidgetProps = {
	totalCountPoints: number;
	numberActivePosition: number;
};

const CircleWidget: React.FC<CircleWidgetProps> = ({ totalCountPoints, numberActivePosition }) => {
	const [activePoint, setActivePoint] = useState<number | ((num: number) => void)>(numberActivePosition);

	return (
		<div className='circle-widget'>
			{typeof activePoint === 'number' && (
				<Circle
					numberActivePosition={numberActivePosition}
					activePoint={activePoint}
					setActivePoint={setActivePoint}
					totalCountPoints={totalCountPoints}
				/>
			)}
			<Slider activePoint={activePoint} />
		</div>
	);
};

export default CircleWidget;
