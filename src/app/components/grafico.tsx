import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { Investimento } from "../../utils/types";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type GraficoProps = {
    investimentos: Investimento[];
};

export default function Grafico({ investimentos }: GraficoProps) {
    // Conta a quantidade de investimentos por tipo
    const tipoCount: Record<string, number> = {};
    investimentos.forEach(inv => {
        tipoCount[inv.tipo] = (tipoCount[inv.tipo] || 0) + 1;
    });

    const tipos = Object.keys(tipoCount);
    const counts = Object.values(tipoCount);

    const data = {
        labels: tipos,
        datasets: [
            {
                label: 'Quantidade de Investimentos',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Investimentos por Tipo' },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return <Bar data={data} options={options} />;
};