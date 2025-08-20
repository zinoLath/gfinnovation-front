
export const investmentTypes = [
    { value: "ACAO", label: "Ações" },
    { value: "FUNDO", label: "Fundos" },
    { value: "TITULO", label: "Títulos" },
];


export type Investimento = {
    id: number;
    nome: string;
    tipo: string;
    valor: number;
    data: string; // formato ISO ou dd/mm/yyyy
};
