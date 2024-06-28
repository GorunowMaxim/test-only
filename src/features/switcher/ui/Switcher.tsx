import leftArrow from './../../../assets/images/left-arrow.svg';
import rightArrow from './../../../assets/images/right-arrow.svg';

import './styles.scss';

type SwitcherProps = {
	totalCountPoints: number;
	activePoint: number;
	leftHandleClick: () => void;
	rightHandleClick: () => void;
	setActivePoint: (num: number) => void;
};

const Switcher: React.FC<SwitcherProps> = ({
	activePoint,
	totalCountPoints,
	leftHandleClick,
	rightHandleClick,
	setActivePoint,
}) => {
	const renderPaginationButtons = () => {
		return [...new Array(totalCountPoints)].map((_, index) => {
			return (
				<div
					key={index}
					onClick={() => setActivePoint(index + 1)}
					className={`switcher__pag-button ${activePoint === index + 1 ? 'switcher__pag-button_active' : ''}`}
				></div>
			);
		});
	};
	return (
		<div className='switcher'>
			<div className='switcher-counter'>
				0{activePoint}/0{totalCountPoints}
			</div>
			<div className='switcher-buttons'>
				<div className='switcher__button-block'>
					<button onClick={leftHandleClick} className='switcher-button'>
						<img src={leftArrow} alt='arrow-left' />
					</button>
					<button onClick={rightHandleClick} className='switcher-button'>
						<img src={rightArrow} alt='arrow-right' />
					</button>
				</div>
				<div className='switcher-pagination'>{renderPaginationButtons()}</div>
			</div>
		</div>
	);
};

export default Switcher;
