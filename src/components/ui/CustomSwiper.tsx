'use client';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {ReactNode, useEffect, useRef, useState} from "react";
import SwiperCore from 'swiper';
import {Grid, Navigation, Pagination} from 'swiper/modules';
import {useRecoilState, useRecoilValue} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";
import {useMediaQuery} from "react-responsive";

interface SlideItem {
    key: string;
    components: ReactNode;
}

interface CustomSwiperProps {
    slideItems: SlideItem[];

}

function CustomSwiper({slideItems}: CustomSwiperProps) {
    const mobile = useMediaQuery({ maxWidth: 700 });
    const [slidePerView, setSlidePerView] = useState(() => slideItems.length <= 4 ? slideItems.length - 1 : 3);
    const activeMilestone = useRecoilValue(milestoneActiveStateStore);
    const slideIndex = activeMilestone?.slideIndex || 0;

    SwiperCore.use([Navigation, Pagination, Grid]);
    const swiperRef = useRef<SwiperCore>();

    // 모바일: 한 View당 슬라이드 갯수 1개
    useEffect(() => {
        if(mobile) setSlidePerView(1);
    },[])

    useEffect(() => {
        swiperRef.current?.slideToLoop(slideIndex);
    },[slideIndex]);


    return (
        <div className='w-full flex bg-white overflow-hidden z-0'>
            <Swiper
                className='swiper'
                slidesPerView={slidePerView}
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
