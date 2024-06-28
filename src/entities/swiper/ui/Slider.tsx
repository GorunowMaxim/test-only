import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useEffect, useRef } from 'react';

import { pointData } from '../../../assets/data/data';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import './styles.scss';

type SliderProps = {
	activePoint: number | ((num: number) => void);
};

const data = pointData;

const Slider = ({ activePoint }: SliderProps) => {
	const prevRef = useRef<HTMLDivElement | null>(null);
	const nextRef = useRef<HTMLDivElement | null>(null);

	const swiperRef = useRef<SwiperType | null>(null);

	useEffect(() => {
		const swiper = swiperRef.current;

		if (swiper && prevRef.current && nextRef.current) {
			if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
				const navigationParams = swiper.params.navigation;
				navigationParams.prevEl = prevRef.current;
				navigationParams.nextEl = nextRef.current;

				swiper.navigation.init();
				swiper.navigation.update();
			}
		}
	}, [activePoint]);

	return (
		<>
			{data.map((pointData) => {
				if (pointData.id === activePoint) {
					return (
						<div key={pointData.id} className='slider-block'>
							<div className='category-name'>{pointData.text}</div>
							<div className='swiper-button-prev' ref={prevRef}></div>
							<div className='swiper-button-next' ref={nextRef}></div>
							<Swiper
								modules={[Navigation]}
								navigation={{
									prevEl: prevRef.current,
									nextEl: nextRef.current,
								}}
								breakpoints={{
									720: {
										slidesPerView: 3,
										spaceBetween: 40,
									},
									500: {
										slidesPerView: 2,
										spaceBetween: 40,
									},
									320: {
										slidesPerView: 1.5,
										spaceBetween: 20,
									},
								}}
								spaceBetween={80}
								slidesPerView={3}
								onSwiper={(swiper: SwiperType) => {
									swiperRef.current = swiper;
								}}
							>
								{pointData.slides.map((slide, index) => {
									return (
										<SwiperSlide key={index}>
											<div className='slider-year'>{slide.year}</div>
											<div className='slider-text'>{slide.text}</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					);
				}
			})}
		</>
	);
};

export default Slider;
