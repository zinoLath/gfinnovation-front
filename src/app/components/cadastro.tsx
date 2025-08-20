"use client"
import React, { useState } from "react";
import api from "../../utils/server";
import { investmentTypes } from "../../utils/types";
import type { Investimento } from "../../utils/types";

export default function CadastroInvestimentos() {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState(investmentTypes[0].value);
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNome("");
        setTipo(investmentTypes[0].value);
        setValor("");
        setData("");
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md text-black rounded-lg">
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
                        >
                            {investmentTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Valor:
                        <input
                            type="number"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                            min="0"
                            step="0.01"
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
                        />
                    </label>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}