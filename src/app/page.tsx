import Image from "next/image";
import CadastroInvestimentos from "./components/cadastro";
import ListaInvestimentos from "./components/lista";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center">Gerenciador de Investimentos</h1>
      <CadastroInvestimentos />
      <ListaInvestimentos />
    </div>
  );
}
