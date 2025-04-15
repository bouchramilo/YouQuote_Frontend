import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Label from "../../components/Label";

// ************************************************************************************************************************
const Register = () => {
  // ************************************************************************************************************************
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // ************************************************************************************************************************
  const [fieldErrors, setFieldErrors] = useState({
    name: { show: false, message: "Le nom est requis" },
    email: { show: false, message: "Veuillez entrer une adresse email valide" },
    password: {
      show: false,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    },
    password_confirmation: {
      show: false,
      message: "Les mots de passe ne correspondent pas",
    },
  });

  // ************************************************************************************************************************
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ************************************************************************************************************************

  async function handleRegister(e) {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("submited form");

    setFieldErrors({
      name: { ...fieldErrors.name, show: false },
      email: { ...fieldErrors.email, show: false },
      password: { ...fieldErrors.password, show: false },
      password_confirmation: {
        ...fieldErrors.password_confirmation,
        show: false,
      },
    });

    let isValid = true;
    const newErrors = { ...fieldErrors };

    if (!formData.name.trim()) {
      newErrors.name.show = true;
      isValid = false;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email.show = true;
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password.show = true;
      isValid = false;
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation.show = true;
      isValid = false;
    }

    if (!isValid) {
      setFieldErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // +++++++++++++ FETCH API REGISTER ++++++++++++++++

    try {
      console.log(formData);
      // -------------------------------- logique de register ----------

      // -------------------------------- ----------
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // ************************************************************************************************************************
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-heading font-bold text-center text-text mb-8">
        Inscription
      </h1>

      <form className="space-y-6" onSubmit={handleRegister}>
        <div>
          <Label for="name" labelname="Nom" />
          <Input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            name="name"
          />
          <Error
            errorMessage={fieldErrors.name.message}
            showError={fieldErrors.name.show}
          />
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
          />
          <Error
            errorMessage={fieldErrors.email.message}
            showError={fieldErrors.email.show}
          />
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
          />
          <Error
            errorMessage={fieldErrors.password.message}
            showError={fieldErrors.password.show}
          />
        </div>

        <div>
          <Label
            for="confirmPassword"
            labelname="Confirmation du mot de passe"
          />
          <Input
            type="password"
            id="confirmPassword"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            name="confirmPassword"
          />
          <Error
            errorMessage={fieldErrors.password_confirmation.message}
            showError={fieldErrors.password_confirmation.show}
          />
        </div>

        <Button name="Créer un compte" />
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
