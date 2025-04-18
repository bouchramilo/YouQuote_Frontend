import { Link } from 'react-router-dom';

const Error404 = () => {
    return ( 
        <div className="bg-secondary/80 w-screen h-screen flex flex-col gap-10 justify-center items-center">
            <h1 className="text-5xl ">Page not found</h1>
            <Link to="/" className="px-6 py-4 bg-primary border-none rounded-lg">Go to home</Link>
        </div>
     );
}
 
export default Error404;