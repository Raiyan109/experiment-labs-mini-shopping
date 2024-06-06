import Navbar from '../components/Navbar';
import Hero from './Hero';
import Products from './products/Products';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Products />
        </div>
    );
};

export default Home;