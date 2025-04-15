import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import Label from "./../../components/Label";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: { show: false, message: "Veuillez entrer une adresse email valide" },
    password: {
      show: false,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);

    setFieldErrors({
      email: { ...fieldErrors.email, show: false },
      password: { ...fieldErrors.password, show: false },
    });

    let isValid = true;
    const newErrors = { ...fieldErrors };

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email.show = true;
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password.show = true;
      isValid = false;
    }

    if (!isValid) {
      setFieldErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || "Erreur lors de la connexion");
      // }

      // console.log("Connexion réussie:", data);

      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 1000);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  }




  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h1 className="text-3xl text-text text-center mb-8">Connexion</h1>
      <form id="loginForm" className="space-y-6" onSubmit={handleLogin}>
        <div>
          <Label for="email" labelname="Adresse Email" />
          <div className="relative">
            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-accent"></i>
            <Input type="email" id="email" placeholder="Email" required
             value={formData.email}
             onChange={(e) =>
               setFormData({ ...formData, email: e.target.value })
             } />
          </div>
          <Error
            errorMessage={fieldErrors.email.message}
            showError={fieldErrors.email.show}
          />
        </div>

        <div>
          <Label for="password" labelname="Mot de passe" />
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-accent"></i>
            <Input
              type="password"
              id="password"
              placeholder="Mot de passe"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Error
            errorMessage={fieldErrors.password.message}
            showError={fieldErrors.password.show}
          />
        </div>
        <div id="errorMessage" className="text-red-500 text-sm hidden">
          Identifiants incorrects
        </div>
        <Button name="Se connecter"></Button>
      </form>
      <div className="text-center mt-4">
        <Link to="/register" className="text-accent hover:underline">
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

export default Login;
