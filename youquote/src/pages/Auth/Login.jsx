const Login = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h1 className="text-3xl text-text text-center mb-8">Connexion</h1>
      <form id="loginForm" className="space-y-6">
        <div className="relative">
          <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-accent"></i>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            className="w-full pl-10 pr-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
        <div className="relative">
          <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-accent"></i>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            required
            className="w-full pl-10 pr-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
        <div id="errorMessage" className="text-red-500 text-sm hidden">
          Identifiants incorrects
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-accent transition-colors"
        >
          Se connecter
        </button>
      </form>
      <div className="text-center mt-4">
        <a href="#" className="text-accent hover:underline">
          Créer un compte
        </a>
      </div>
    </div>
  );
};

export default Login;
