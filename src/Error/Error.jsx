
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import ErrorImg from "./ErrorPage.json";
import { TypeAnimation } from "react-type-animation";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Error = () => {
    useEffect(() => {
        Aos.init({ duration: 3000 })
    }, [])
    const error = useRouteError();
    return (
        <div className="text-center mt-[100px] mb-20">
            <Helmet>
                <title>Error</title>
            </Helmet>
            <p className="text-4xl">{error.statusText || error.message}</p>
            {
                error.status === 404 && <div>
                    <Lottie animationData={ErrorImg} />
                    {/* <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldnt find this page.</p> */}
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            'Sorry',
                            1000,
                            'Sorry We Couldnt ',
                            2000,
                            'Sorry We Couldnt Find',
                            2000,
                            'Sorry We Couldnt Find This Page',
                            2000,
                        ]}
                        speed={50}
                        style={{ fontSize: '2em' }}
                        repeat={Infinity}
                    />
                    <p data-aos="fade-right" className="mt-4 mb-8 dark:text-gray-600">But don&apos;t worry, you can find plenty of other things on our homepage.</p>
                    <Link to="/"><button className="px-8  py-3 font-semibold rounded dark:bg-green-500 dark:text-gray-50">Home</button></Link>
                </div>
            }
        </div>
    );
};

export default Error;