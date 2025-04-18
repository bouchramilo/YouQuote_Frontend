const Favories = () => {
    return (
      <div className="md:ml-64 p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-zen mb-6">Favories</h2>
  
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(20).fill().map((_, index) => (
              <div
                key={index}
                style={{ 
                    borderRadius: "88% 12% 90% 10% / 12% 91% 9% 88%" ,
                 }}
                className="bg-secondary/50 p-4 border-2 border-primary rounded-lg shadow-md shadow-gray-200 hover:shadow-2xl hover:scale-110 hover:shadow-accent"
              >
                <p className="font-semibold">Nom de l'utilisateur</p>
                <p className="text-sm text-gray-700">user@gmail.com</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Favories;
  