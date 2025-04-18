// src/components/LayoutAuteur.jsx
import { Outlet, Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useContext, useState, useEffect } from "react";
import { Context } from "./../../context/UserContext";
import Error404 from "./../../components/Error404";

export default function LayoutAuteur() {
  const { role, user } = useContext(Context);
  const [access, setAccess] = useState(true);

  useEffect(() => {
    setAccess(role === "Auteur");
  }, [user]);

  if (!access) {
    return <Error404 backTo={"/"} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* <SideBar /> */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
