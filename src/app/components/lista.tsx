"use client"
import React from "react";
import { useState } from "react";
import { investmentTypes } from "../../utils/types";
import type { Investimento } from "../../utils/types";

function InvestimentoLinha({ investimento, handleEditClick, handleDeleteClick }: 
                { 
                    investimento: Investimento, 
                    handleEditClick: (e: React.FormEvent, id: number) => void, 
                    handleDeleteClick: (id: number) => void 
                }) {
    return (
        <>
            <td className="border border-gray-300 p-2">{investimento.nome}</td>
            <td className="border border-gray-300 p-2">{investimento.tipo}</td>
            <td className="border border-gray-300 p-2">
                {investimento.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </td>
            <td className="border border-gray-300 p-2">
                {new Date(investimento.data).toLocaleDateString("pt-BR")}
            </td>
            <td className="border border-gray-300 p-2">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={(e) => handleEditClick(e, investimento.id)}
                >
                    Editar
                </button>
                <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteClick(investimento.id)}
                >
                    Excluir
                </button>
            </td>
        </>
    );
}

function FormularioEdicao({ investimento, handleConfirm }: 
                { 
                    investimento: Investimento,
                    handleConfirm: (id: number, updatedInvestimento: Investimento) => void
                }) {
    const [editNome, setEditNome] = useState(investimento.nome);
    const [editTipo, setEditTipo] = useState(investimento.tipo);
    const [editValor, setEditValor] = useState(investimento.valor);
    const [editData, setEditData] = useState(investimento.data);    

    const handleConfirmClick = (e: React.FormEvent) => {
        e.preventDefault();
        handleConfirm(investimento.id, {
            ...investimento,
            nome: editNome,
            tipo: editTipo,
            valor: editValor,
        });
    };
    return (
        <td colSpan={5} className="p-0">
            <form
                className="flex flex-col m-auto align-center p-4 bg-gray-100 rounded-lg"
                onSubmit={handleConfirmClick}
            >
                <label className="place-self-center my-2">
                    <p className="inline-block mr-5">Nome:</p>
                    <input
                        type="text"
                        value={editNome}
                        onChange={(e) => setEditNome(e.target.value)}
                        className="border border-gray-300 p-2 w-3xs"
                        placeholder="Nome"
                    />
                </label>

                <label className="place-self-center my-2">
                    <p className="inline-block mr-5">Tipo:</p>
                    <select
                        value={editTipo}
                        onChange={(e) => setEditTipo(e.target.value)}
                        className="border border-gray-300 p-2 w-3xs"
                    >
                        {investmentTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="place-self-center my-2">
                    <p className="inline-block mr-5">Valor:</p>
                    <input
                        type="number"
                        value={editValor}
                        onChange={(e) => setEditValor(Number(e.target.value))}
                        className="border border-gray-300 p-2 w-3xs"
                        placeholder="Valor"
                    />
                </label>
                <label className="place-self-center my-2">
                    <p className="inline-block mr-5">Data:</p>
                    <input
                        type="date"
                        value={editData}
                        onChange={(e) => setEditData(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 my-2"
                >
                    Salvar
                </button>
            </form>
        </td>
    );
}


export default function ListaInvestimentos() {
    const [investimentos, setInvestimentos] = useState<Investimento[]>([
        {
            id: 1,
            nome: "Ação XYZ",
            tipo: "ACAO",
            valor: 1000.0,
            data: "2023-10-01",
        },
        {
            id: 2,
            nome: "Fundo ABC",
            tipo: "FUNDO",
            valor: 5000.0,
            data: "2023-10-02",
        },
        {
            id: 3,
            nome: "Título DEF",
            tipo: "TITULO",
            valor: 2000.0,
            data: "2023-10-03",
        },
    ]);

    const [editID, setEditID] = useState<number | null>(null);

    const handleEditClick = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setEditID(id);
    };
    const handleDeleteClick = (id: number) => {
        setInvestimentos(investimentos.filter(i => i.id !== id));
    };

    const handleEditConfirm = (id: number, updatedInvestimento: Investimento) => {
        setInvestimentos(investimentos.map(i => (i.id === id ? updatedInvestimento : i)));
        setEditID(null);
    };

    return (
        <table className="w-full max-w-2xl m-auto mt-6 bg-white shadow-md rounded-lg">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Nome</th>
                    <th className="border border-gray-300 p-2">Tipo</th>
                    <th className="border border-gray-300 p-2">Valor</th>
                    <th className="border border-gray-300 p-2">Data</th>
                    <th className="border border-gray-300 p-2"></th>
                </tr>
            </thead>
            <tbody>
                {investimentos.map((inv) => (
                    <tr key={inv.id}>
                        {editID !== inv.id ? (
                            <InvestimentoLinha
                                investimento={inv}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            />
                        ) :
                        (
                            <FormularioEdicao
                                investimento={inv}
                                handleConfirm={handleEditConfirm}
                            />
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}