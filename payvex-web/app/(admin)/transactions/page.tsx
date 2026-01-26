/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PageTransition } from "@/components/page-transition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Building2,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Receipt,
  RefreshCcw,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filiais, setFiliais] = useState<any[]>([]);
  const [selectedFilialId, setSelectedFilialId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const loadInitialData = async () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("@payvex:user") || "{}",
      );
      const res = await api.get(`/companies/${savedUser.companyId}`);
      const data = res.data.filiais || [];
      setFiliais(data);

      if (data.length > 0) {
        setSelectedFilialId(data[0].id);
        loadTransactions(data[0].id);
      }
    } catch (e) {
      console.error("Erro ao carregar dados iniciais");
    }
  };

  const loadTransactions = async (filialId: string) => {
    setLoading(true);
    try {
      // 🚀 Ajustado para usar Query Params (?filialId=...)
      const res = await api.get("/transactions", {
        params: {
          filialId: filialId,
        },
      });
      setTransactions(res.data);
    } catch (e) {
      console.error("Erro ao carregar transações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Helpers de UI
  const getStatusBadge = (status: string) => {
    const styles: any = {
      PAID: "bg-[#82d616]/10 text-[#82d616] border-[#82d616]/20",
      PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    const labels: any = {
      PAID: "Pago",
      PENDING: "Pendente",
      CANCELLED: "Cancelado",
    };
    const icons: any = {
      PAID: <CheckCircle2 size={12} />,
      PENDING: <Clock size={12} />,
      CANCELLED: <XCircle size={12} />,
    };

    return (
      <Badge
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 font-bold border",
          styles[status],
        )}
      >
        {icons[status]} {labels[status]}
      </Badge>
    );
  };

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-8 pb-10">
        {/* HEADER COM FILTRO */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#3a416f]/60 font-semibold text-sm uppercase tracking-widest">
              <Receipt size={16} />
              <span>Gestão de Recebíveis</span>
            </div>
            <h1 className="text-4xl font-extrabold text-[#3a416f]">
              Histórico de <span className="text-[#82d616]">Vendas</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl border flex items-center gap-2 shadow-sm">
              <Building2 size={18} className="text-[#82d616] ml-2" />
              <select
                className="bg-transparent text-sm font-bold text-[#3a416f] outline-none pr-4 cursor-pointer"
                value={selectedFilialId}
                onChange={(e) => {
                  setSelectedFilialId(e.target.value);
                  loadTransactions(e.target.value);
                }}
              >
                {filiais.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="outline"
              className="rounded-xl border-slate-200"
              onClick={() => loadTransactions(selectedFilialId)}
            >
              <RefreshCcw size={18} className={cn(loading && "animate-spin")} />
            </Button>
          </div>
        </header>

        {/* TABELA DE TRANSAÇÕES */}
        <div className="bg-white rounded-[0.625rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Data/Hora
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Método / Gateway
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-6">
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center space-y-3"
                    >
                      <div className="flex justify-center">
                        <Search size={40} className="text-slate-200" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Nenhuma transação encontrada nesta unidade.
                      </p>
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#3a416f]">
                            {format(new Date(tx.createdAt), "dd 'de' MMM", {
                              locale: ptBR,
                            })}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {format(new Date(tx.createdAt), "HH:mm")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#3a416f]">
                            {tx.customerName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {tx.customerEmail}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] border-slate-200 text-slate-500 font-bold uppercase tracking-tighter"
                          >
                            {tx.paymentMethod.replace("_", " ")}
                          </Badge>
                          <span className="text-xs font-semibold text-slate-400">
                            via {tx.gateway}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-black text-[#3a416f]">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(tx.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-5">{getStatusBadge(tx.status)}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center gap-2">
                          {tx.paymentUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-[#82d616]"
                              onClick={() =>
                                window.open(tx.paymentUrl, "_blank")
                              }
                            >
                              <ExternalLink size={16} />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-[#3a416f]"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
