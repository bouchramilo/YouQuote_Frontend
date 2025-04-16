const Hero = () => {
  return (
    <section className="hero-section py-12 md:py-20 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-heading font-bold text-text mb-8">
            Citation du Jour
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-secondary">
            <blockquote className="quote-text text-xl md:text-2xl text-text italic mb-6 leading-relaxed">
              "La vie est un mystère qu'il faut vivre, et non un problème à
              résoudre."
            </blockquote>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="font-semibold text-gray-700">Gandhi</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Philosophie
                  </span>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                    Sagesse
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Vie
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors !rounded-button">
                  <span className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-heart-line"></i>
                  </span>
                  <span className="text-sm whitespace-nowrap">128</span>
                </button>

                <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors !rounded-button">
                  <span className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-star-line"></i>
                  </span>
                  <span className="text-sm whitespace-nowrap">Favoris</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
