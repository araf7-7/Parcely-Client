
import { Helmet } from 'react-helmet';
import Stat from '../../Stat/Stat';
import Banner from './Banner/Banner';
import DeliveryCard from './DeliveryCard/DeliveryCard';
import FeatureCard from './FeatureCard/FeatureCard';


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <FeatureCard></FeatureCard>
                <Stat></Stat>
                <DeliveryCard></DeliveryCard>
            </div>
        </>
    );
};

export default Home;