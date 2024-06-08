import Lottie from "lottie-react";
import BannerImg from './Banner.json'
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
    return (
        <div className="bg-[#20262b] m-10 rounded-xl  lg:flex">
            <div className="lg:w-[700px] rounded-lg w-auto items-center justify-center md:flex">
                <Lottie animationData={BannerImg} />
            </div>
            <div className="text-white flex-1 p-10 lg:px-0 font-reddit py-24 ">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed once, initially
                        'Welcome',
                        1000,
                        'Welcome To ',
                        2000,
                        'Welcome To Parcely',
                        2000,
                    ]}
                    speed={50}
                    style={{ fontSize: '3em' }}
                    repeat={Infinity}
                />
                <h2 className="text-2xl my-5 lg:w-auto md:w-auto w-56"><span className="text-sky-400">Track</span>,<span className="text-sky-400">Manage</span>,<span className="text-sky-400 w-24">Simplify</span>. <br /> Your one-stop shop for effortless parcel control.
                </h2>
                <label className="input mt-2 mr-4 border-2 border-white  bg-transparent flex items-center ">
                    <input type="text" className="grow border-none" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Banner;