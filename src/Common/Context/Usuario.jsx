import { createContext, useContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName = "UsuarioContext";

export const UsuarioProvider = ({ children }) => {
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState(0);
  return (
    <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuarioContext = () => {
  const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext);

  return {
    nome,
    setNome,
    saldo,
    setSaldo,
  };
};

export default UsuarioProvider;
