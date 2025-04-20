import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import Label from "./../../components/Label";

// ************************************************************************************************************************
const Login = () => {
  // ************************************************************************************************************************
  const navigate = useNavigate();
  // ************************************************************************************************************************
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // ************************************************************************************************************************
  const [errors, setErrors] = useState({});
  // ************************************************************************************************************************
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ************************************************************************************************************************
  async function handleLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // +++++++++++++ FETCH API REGISTER ++++++++++++++++
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      // Vérification du content-type
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Le serveur a répondu avec: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          const formattedErrors = {};
          Object.entries(data.errors || {}).forEach(([key, messages]) => {
            formattedErrors[key] = Array.isArray(messages)
              ? messages[0]
              : messages;
          });
          setErrors(formattedErrors);
        } else {
          throw new Error(
            data.message || `Erreur serveur (${response.status})`
          );
        }
        return;
      }
      
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setErrors({
        general: error.message.includes("Le serveur a répondu avec")
          ? "Erreur de configuration serveur"
          : error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // ************************************************************************************************************************
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
      <h1 className="text-3xl text-text text-center mb-8">Connexion</h1>
      <form id="loginForm" className="space-y-6" onSubmit={handleLogin}>
        <div>
          <Label for="email" labelname="Adresse Email" />
          <div className="relative">
            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-accent"></i>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
              hasError={!!errors.email}
            />
          </div>
          {errors.email && <Error errorMessage={errors.email[0]} />}
        </div>

        <div>
          <Label for="password" labelname="Mot de passe" />
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-accent"></i>
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              name="password"
              hasError={!!errors.password}
            />
          </div>
          {errors.password && <Error errorMessage={errors.password[0]} />}
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
