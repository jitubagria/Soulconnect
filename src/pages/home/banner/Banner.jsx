import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import image1 from "../../../assets/banner1.jpg"
import image2 from "../../../assets/banner2.jpg"
import image3 from "../../../assets/banner3.jpg"
import useAuth from '../../../hooks/useAuth';

const Banner = () => {
    const user = useAuth()
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-1/2 md:h-[calc(100vh-4rem)]"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            src={image1}
                            alt="Romantic Couple"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold">Celebrate Your Love</h2>
                                <p className="mt-2 text-lg">Make every moment unforgettable with our perfect engagement ideas.</p>
                                <div className='mt-8'></div>
                                <Link to={user ? "/biodatas" : "/login"} className=' text-white border-2 border-white hover:bg-primary hover:border-primary hover:font-bold transition rounded py-2 px-6 font-semibold'>Get Started</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            src={image2}
                            alt="Groom Putting Ring"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold">The Perfect Proposal</h2>
                                <p className="mt-2 text-lg">Witness a timeless moment of love and commitment.</p>
                                <div className='mt-8'></div>
                                <Link to={user ? "/biodatas" : "/login"} className=' text-white border-2 border-white hover:bg-primary hover:border-primary hover:font-bold transition rounded py-2 px-6 font-semibold'>Find a Match</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            src={image3}
                            alt="Wedding Ceremony"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold">Your Dream Wedding</h2>
                                <p className="mt-2 text-lg">Turn your dream day into a reality with our expert planning.</p>
                                <div className='mt-8'></div>
                                <Link to={"/contact-us"} className=' text-white border-2 border-white hover:bg-primary hover:border-primary hover:font-bold transition rounded py-2 px-6 font-semibold'>Get Support</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
