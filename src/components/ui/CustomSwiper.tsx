import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {ReactNode, useRef} from "react";
import SwiperCore from 'swiper';
import {Grid, Navigation, Pagination} from 'swiper/modules';

interface SlideItem {
    key: string;
    components: ReactNode;
}

interface CustomSwiperProps {
    slideItems: SlideItem[];

}

function CustomSwiper({slideItems}: CustomSwiperProps) {
    SwiperCore.use([Navigation, Pagination, Grid]);
    const swiperRef = useRef<SwiperCore>();
    return (
        <div className='w-full flex bg-white overflow-hidden z-0'>
            {/*<div className='bg-white grow-1'></div>*/}
            <Swiper
                className='swiper'
                slidesPerView={3}
                slidesPerGroup={3}
                loop={true}
                // spaceBetween={10}
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
                        ({key, components}) =>
                            <SwiperSlide key={key}>{components}</SwiperSlide>
                    )
                }
            </Swiper>
            {/*<div className='border border-red bg-white w-[50px] h-[50px]'></div>*/}
        </div>
    );
}

export default CustomSwiper;
