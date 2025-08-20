"use client"
import React from "react";
import { useState, useEffect } from "react";
import { tiposInvestimentos } from "../../utils/types";
import type { Investimento } from "../../utils/types";
import api from "../../utils/server";

interface ListaInvestimentosProps {
    refreshTrigger: number;
}

function InvestimentoLinha({ investimento, handleEditClick, handleDeleteClick, loading }: 
                { 
                    investimento: Investimento, 
                    handleEditClick: (e: React.FormEvent, id: number) => void, 
                    handleDeleteClick: (id: number) => void,
                    loading: boolean
                }) {
    return (
        <>
            <td className="border border-gray-300 p-2">{investimento.nome}</td>
            <td className="border border-gray-300 p-2">{tiposInvestimentos.find((type) => type.value === investimento.tipo)?.label}</td>
            <td className="border border-gray-300 p-2">
                {investimento.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </td>
            <td className="border border-gray-300 p-2">
                {new Date(investimento.data).toLocaleDateString("pt-BR")}
            </td>
            <td className="border border-gray-300 p-2">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => handleEditClick(e, investimento.id)}
                    disabled={loading}
                >
                    Editar
                </button>
                <button
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDeleteClick(investimento.id)}
                    disabled={loading}
                >
                    Excluir
                </button>
            </td>
        </>
    );
}

function FormularioEdicao({ investimento, handleConfirm, handleCancel }: 
                { 
                    investimento: Investimento,
                    handleConfirm: (id: number, updatedInvestimento: Investimento) => void,
                    handleCancel: () => void
                }) {
    const [editNome, setEditNome] = useState(investimento.nome);
    const [editTipo, setEditTipo] = useState(investimento.tipo);
    const [editValor, setEditValor] = useState(investimento.valor);
    
    const formatDateForInput = (dateString: string) => {
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateString;
        }
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    
    const [editData, setEditData] = useState(formatDateForInput(investimento.data));

    const handleConfirmClick = (e: React.FormEvent) => {
        e.preventDefault();
        handleConfirm(investimento.id, {
            ...investimento,
            nome: editNome,
            tipo: editTipo,
            valor: editValor,
            data: editData,
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
                        {tiposInvestimentos.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="place-self-center my-2">
                    <p className="inline-block mr-5">Valor (R$):</p>
                    <input
                        type="number"
                        value={editValor}
                        onChange={(e) => setEditValor(Number(e.target.value))}
                        className="border border-gray-300 p-2 w-3xs"
                        placeholder="0,00"
                        min="0"
                        step="0.01"
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
                <button
                    type="button"
                    className="bg-gray-500 text-white px-2 py-1 rounded my-2"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
            </form>
        </td>
    );
}


export default function ListaInvestimentos({ refreshTrigger }: ListaInvestimentosProps) {
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [message, setMessage] = useState<{label: string, className: string} | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchInvestimentos() {
            try {
                const response = await api.get("/investment");
                setInvestimentos(response.data);
            } catch (error) {
                console.error("Erro ao buscar investimentos:", error);
            }
        }
        fetchInvestimentos();
    }, [refreshTrigger]); // Adiciona refreshTrigger como dependência

    const [editID, setEditID] = useState<number | null>(null);

    const handleEditClick = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setEditID(id);
    };

    const handleCancelEdit = () => {
        setEditID(null);
    };
    const handleDeleteClick = async (id: number) => {
        setLoading(true);
        try {
            await api.delete(`/investment/${id}`);
            setMessage({ label: "Investimento excluído com sucesso!", className: "text-green-600 text-center font-bold p-2" });
            // Recarrega a lista após exclusão
            const response = await api.get("/investment");
            setInvestimentos(response.data);
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Erro ao excluir investimento:", error);
            setMessage({ label: "Erro ao excluir investimento!", className: "text-red-600 text-center font-bold p-2" });
            setTimeout(() => setMessage(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleEditConfirm = async (id: number, updatedInvestimento: Investimento) => {
        setLoading(true);
        try {
            await api.put(`/investment/${id}`, {
                nome: updatedInvestimento.nome,
                tipo: updatedInvestimento.tipo,
                valor: updatedInvestimento.valor,
                data: updatedInvestimento.data
            });
            setMessage({ label: "Investimento atualizado com sucesso!", className: "text-green-600 text-center font-bold p-2" });
            setEditID(null);
            // Recarrega a lista após edição
            const response = await api.get("/investment");
            setInvestimentos(response.data);
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Erro ao atualizar investimento:", error);
            setMessage({ label: "Erro ao atualizar investimento!", className: "text-red-600 text-center font-bold p-2" });
            setTimeout(() => setMessage(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {message && <div className={message.className}>{message.label}</div>}
            {loading && <div className="text-blue-600 text-center font-bold p-2">Carregando...</div>}
            <table className="w-full max-w-2xl m-auto mt-6 bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Nome</th>
                        <th className="border border-gray-300 p-2">Tipo</th>
                        <th className="border border-gray-300 p-2">Valor (R$)</th>
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
                                    loading={loading}
                                />
                            ) :
                            (
                                <FormularioEdicao
                                    investimento={inv}
                                    handleConfirm={handleEditConfirm}
                                    handleCancel={handleCancelEdit}
                                />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}