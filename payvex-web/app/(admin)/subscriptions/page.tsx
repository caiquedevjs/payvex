/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from "@/lib/api";
import {
  ArrowUpCircle,
  Check,
  CreditCard,
  Globe,
  Loader2,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, plansRes] = await Promise.all([
          api.get("/my-subscription"),
          api.get("/plans"),
        ]);
        setData(subRes.data);
        setPlans(plansRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#82d616]" />
      </div>
    );

  const usagePercent = Math.min(
    (data.currentUsage / data.transactionsLimit) * 100,
    100,
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1400px] mx-auto">
      {/* HEADER IDENTIDADE PAYVEX */}
      <div>
        <h1 className="text-2xl font-bold text-[#3a416f]">
          Assinatura e Planos
        </h1>
        <p className="text-slate-500">
          Gerencie sua conta, limites e escala sua operação.
        </p>
      </div>

      {/* CARD STATUS ATUAL */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82d616] mb-1 block">
              Plano Ativo
            </span>
            <h2 className="text-3xl font-black text-[#3a416f]">
              {data.planName.toUpperCase()}
            </h2>
          </div>
          <div className="bg-[#ECFDF5] text-[#059669] px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold border border-[#D1FAE5]">
            <ShieldCheck size={16} /> Status: {data.status}
          </div>
        </div>

        {/* Grid ajustado para 4 colunas em telas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* PROGRESSO REAL */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-500">Uso de Transações</span>
              <span className="text-slate-800">
                {data.currentUsage} / {data.transactionsLimit}
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${usagePercent > 90 ? "bg-red-500" : "bg-[#3a416f]"}`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>

          {/* GATEWAYS */}
          <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-tight">
                Limites de Gateways
              </p>
              <p className="font-bold text-[#3a416f]">
                {data.gatewaysLimit} Conexões
              </p>
            </div>
          </div>

          {/* NOVO: LIMITE E-COMMERCE */}
          <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-tight">
                Apps E-commerce
              </p>
              <p className="font-bold text-[#3a416f]">
                Até {data.multiAppLimit}{" "}
                {data.multiAppLimit > 1 ? "Lojas" : "Loja"}
              </p>
            </div>
          </div>

          {/* IA STATUS */}
          <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div
              className={`h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm ${data.hasAiAnalyst ? "text-yellow-500" : "text-slate-400"}`}
            >
              {data.hasAiAnalyst ? (
                <Zap size={20} fill="currentColor" />
              ) : (
                <Lock size={20} />
              )}
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-tight">
                Analista de IA
              </p>
              <p className="font-bold text-[#3a416f]">
                {data.hasAiAnalyst ? "Liberado" : "Bloqueado"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PLANOS PARA UPGRADE (Mantido igual) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan: any) => (
          <div
            key={plan.key}
            className={`bg-white rounded-[32px] p-8 border ${plan.key === "EXPERT_AI" ? "border-[#82d616] ring-4 ring-[#82d616]/5" : "border-slate-100"} flex flex-col`}
          >
            <h3 className="text-lg font-bold text-[#3a416f]">{plan.name}</h3>
            <div className="my-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#3a416f]">
                R$ {plan.price.toLocaleString("pt-BR")}
              </span>
              <span className="text-slate-400 text-sm">/mês</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                {
                  label: `${plan.transactionsLimit.toLocaleString()} transações`,
                  check: true,
                },
                { label: `${plan.gatewaysLimit} Gateways`, check: true },
                {
                  label: `${plan.multiAppLimit} integração e-commerce`,
                  check: true,
                },
                { label: "Analista de IA Data-Bot", check: plan.hasAiAnalyst },
              ].map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 text-sm ${item.check ? "text-slate-700" : "text-slate-300"}`}
                >
                  {item.check ? (
                    <Check size={18} className="text-[#059669]" />
                  ) : (
                    <Lock size={18} />
                  )}
                  {item.label}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                data.planName.toUpperCase() === plan.name.toUpperCase()
                  ? "bg-slate-100 text-slate-400 cursor-default"
                  : "bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f] shadow-lg shadow-[#82d616]/20"
              }`}
            >
              {data.planName.toUpperCase() === plan.name.toUpperCase() ? (
                "Plano Atual"
              ) : (
                <>
                  <ArrowUpCircle size={20} /> Assinar Plano
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
