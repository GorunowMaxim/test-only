import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/all';
import gsap from 'gsap';

import { useRef } from 'react';

import './styles.scss';

type AnimatedYearsProps = {
	years: number[] | null;
	prevAges: React.MutableRefObject<number[] | null>;
};

gsap.registerPlugin(TextPlugin);

const AnimatedYears: React.FC<AnimatedYearsProps> = ({ years, prevAges }) => {
	const blueRef = useRef(null);
	const purpleRef = useRef(null);

	useGSAP(() => {
		if (years && prevAges.current) {
			if (prevAges.current[0] !== years[0] && prevAges.current[1] !== years[1]) {
				const activateAnimation = (prev: number, nextNumber: number, selector: string) => {
					gsap.fromTo(
						selector,
						{
							innerHTML: prev,
						},
						{
							innerHTML: nextNumber,
							duration: 0.5,
							ease: 'power1',
							snap: { innerHTML: 1 },
						}
					);
				};
				activateAnimation(prevAges.current[0], years[0], '.year_blue');
				activateAnimation(prevAges.current[1], years[1], '.year_purple');
			}
			prevAges.current = years;
		}
	}, [years]);

	return (
		<div className='years'>
			<span ref={blueRef} className='year year_blue'>
				{years && years[0]}
			</span>
			<span ref={purpleRef} className='year year_purple'>
				{years && years[1]}
			</span>
		</div>
	);
};

export default AnimatedYears;
