import Hero from './../components/home/Hero';
import SearchSection from './../components/home/SearchSection';
import ListPopulaire from './../components/home/ListPopulaire';

const Home = () => {
    return ( 
        <main>
        {/* <!-- Hero Section - Citation du Jour --> */}
        <Hero />
        
        {/* <!-- Search Section --> */}
        <SearchSection />
        
        {/* <!-- Citations Populaires --> */}
        <ListPopulaire />
    </main>
     );
}
 
export default Home;