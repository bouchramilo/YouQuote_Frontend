const Button = ({name}) => {
    return ( 
        <button type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-accent transition-colors">{name}</button>
     );
}
 
export default Button;