"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { formatIndianNumber, formatIndianCurrency } from "@/lib/format";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: any;
  stock: number;
};

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export default function ProductCharts() {
  const { data, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  if (isLoading) return <div>Loading charts...</div>;
  if (error || !data) return <div>Could not load charts.</div>;
  if (data.length === 0) return <div>No products to chart.</div>;

  const labels = data.slice(0, 8).map((p) => p.name);
  const stocks = data.slice(0, 8).map((p) => p.stock);
  const sales = data.slice(0, 8).map((p) => Math.round(Number(p.price) * (10 + (p.stock % 7))));

  const stockOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const v = ctx.parsed?.y ?? ctx.parsed ?? 0;
            return String(formatIndianNumber(Number(v)));
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val: any) => formatIndianNumber(Number(val)),
        },
      },
    },
  } as any;

  const salesOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const v = ctx.parsed?.y ?? ctx.parsed ?? 0;
            return String(formatIndianCurrency(Number(v)));
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val: any) => formatIndianCurrency(Number(val)),
        },
      },
    },
  } as any;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={{ border: "1px solid #222", borderRadius: 10, padding: 12 }}>
        <h3 style={{ marginTop: 0 }}>Stock by Product</h3>
        <Bar data={{ labels, datasets: [{ label: "Stock", data: stocks, backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }] }} options={stockOptions} />
      </div>

      <div style={{ border: "1px solid #222", borderRadius: 10, padding: 12 }}>
        <h3 style={{ marginTop: 0 }}>Sales Trend (sample)</h3>
        <Line data={{ labels, datasets: [{ label: "Sales", data: sales, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)', fill: true }] }} options={salesOptions} />
      </div>
    </div>
  );
}
