"use client";

import { PageTransition } from "@/components/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3a416f]">Dashboard</h1>
          <p className="text-slate-500">
            Bem-vindo ao centro de operações da Payvex.
          </p>
        </div>

        {/* Cards de Métricas Rápidas */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            className="border-none shadow-sm"
            style={{ borderRadius: "0.625rem" }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Volume Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#82d616]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3a416f]">R$ 0,00</div>
              <p className="text-xs text-slate-400">
                +0% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-none shadow-sm"
            style={{ borderRadius: "0.625rem" }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Transações
              </CardTitle>
              <CreditCard className="h-4 w-4 text-[#82d616]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3a416f]">0</div>
              <p className="text-xs text-slate-400">Processadas hoje</p>
            </CardContent>
          </Card>

          <Card
            className="border-none shadow-sm"
            style={{ borderRadius: "0.625rem" }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Taxas Economizadas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#82d616]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3a416f]">R$ 0,00</div>
              <p className="text-xs text-slate-400">Otimização Payvex</p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder para o Gráfico */}
        <div className="h-[350px] w-full bg-white rounded-[0.625rem] border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 italic">
          O gráfico de performance será renderizado aqui...
        </div>
      </div>
    </PageTransition>
  );
}
