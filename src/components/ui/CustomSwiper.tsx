'use client';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {ReactNode, useEffect, useRef} from "react";
import SwiperCore from 'swiper';
import {Grid, Navigation, Pagination} from 'swiper/modules';
import {useRecoilState, useRecoilValue} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";

interface SlideItem {
    key: string;
    components: ReactNode;
}

interface CustomSwiperProps {
    slideItems: SlideItem[];

}

function CustomSwiper({slideItems}: CustomSwiperProps) {
    const {slideIndex} = useRecoilValue(milestoneActiveStateStore);

    SwiperCore.use([Navigation, Pagination, Grid]);
    const swiperRef = useRef<SwiperCore>();

    useEffect(() => {
        swiperRef.current?.slideToLoop(slideIndex);
    },[slideIndex]);

    return (
        <div className='w-full flex bg-white overflow-hidden z-0'>
            <Swiper
                className='swiper'
                slidesPerView={3}
                slidesPerGroup={1}
                loopAddBlankSlides={true}
                loop={true}
                modules={[Navigation, Pagination, Grid]}
                navigation={true}
                pagination={{
                    clickable: true
                }}
                onSwiper={(swiper) =>
                    swiperRef.current = swiper}
            >
                {
                    slideItems.map(
                        ({key, components}, index) =>
                            <SwiperSlide key={key} >{components}</SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
}

export default CustomSwiper;
