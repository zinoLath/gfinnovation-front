"use client"
import React, { useState } from "react";
import api from "../../utils/server";
import { tiposInvestimentos } from "../../utils/types";
import type { Investimento } from "../../utils/types";

interface CadastroInvestimentosProps {
    onInvestmentAdded: () => void;
}

export default function CadastroInvestimentos({ onInvestmentAdded }: CadastroInvestimentosProps) {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState(tiposInvestimentos[0].value);
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    // Submete o formulário e faz POST para /investment com tratamento de erros
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/investment", {
                nome,
                tipo,
                valor: parseFloat(valor),
                data,
            });
            setNome("");
            setTipo(tiposInvestimentos[0].value);
            setValor("");
            setData("");
            onInvestmentAdded(); // Notifica que um novo investimento foi adicionado
        } catch (error) {
            console.error("Erro ao cadastrar investimento:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md text-black rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">Cadastro de Investimentos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="border border-gray-300 p-2 w-full mb-2"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Tipo:
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                            className="border border-gray-300 p-2 w-full mb-2"
                        >
                            {tiposInvestimentos.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Valor (R$):
                        <input
                            type="number"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                            className="border border-gray-300 p-2 w-full mb-2"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Data:
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                            className="border border-gray-300 p-2 w-full mb-2"
                        />
                    </label>
                </div>
                <button type="submit" className="my-2 mx-auto block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}