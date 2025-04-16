import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Label from "../../components/Label";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
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

      // localStorage.setItem("auth_token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general: error.message.includes("Le serveur a répondu avec")
          ? "Erreur de configuration serveur"
          : error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-heading font-bold text-center text-text mb-8">
        Inscription
      </h1>

      {errors.general && (
        <div className="mb-4 text-red-500 text-center">{errors.general}</div>
      )}

      <form className="space-y-6" onSubmit={handleRegister}>
        <div>
          <Label for="name" labelname="Nom" />
          <Input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            name="name"
            hasError={!!errors.name}
          />
          {errors.name && <Error errorMessage={errors.name[0]} />}
        </div>

        <div>
          <Label for="email" labelname="Adresse Email" />
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
          {errors.email && <Error errorMessage={errors.email[0]} />}
        </div>

        <div>
          <Label for="password" labelname="Mot de passe" />
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
          {errors.password && <Error errorMessage={errors.password[0]} />}
        </div>

        <div>
          <Label
            for="password_confirmation"
            labelname="Confirmation du mot de passe"
          />
          <Input
            type="password"
            id="password_confirmation"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            name="password_confirmation"
            hasError={!!errors.password_confirmation}
          />
          {errors.password_confirmation && (
            <Error errorMessage={errors.password_confirmation[0]} />
          )}
        </div>

        <Button name="Créer un compte" disabled={isSubmitting} />
      </form>

      <p className="mt-6 text-center text-sm text-text">
        <span>Déjà un compte ? </span>
        <Link to="/login" className="text-accent hover:text-primary font-bold">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Register;
