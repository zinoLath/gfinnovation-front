import Image from "next/image";
import CadastroInvestimentos from "./components/cadastro";
import ListaInvestimentos from "./components/lista";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Cadastro de Investimentos</h1>
      <p className="text-center">
        Preencha o formulário abaixo para cadastrar um novo investimento.
      </p>
      <CadastroInvestimentos />
      <ListaInvestimentos />
    </div>
  );
}
