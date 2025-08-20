"use client"
import { useState, useCallback } from "react";
import CadastroInvestimentos from "./components/cadastro";
import ListaInvestimentos from "./components/lista";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleInvestmentAdded = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center">Gerenciador de Investimentos</h1>
      <CadastroInvestimentos onInvestmentAdded={handleInvestmentAdded} />
      <ListaInvestimentos refreshTrigger={refreshTrigger} />
    </div>
  );
}
