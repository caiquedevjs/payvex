"use client";

import { PageTransition } from "@/components/page-transition";
import { Wallet } from "lucide-react";

export default function TransactionsPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[#3a416f]">
          <Wallet className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Extratos</h1>
        </div>
        <p className="text-slate-500">
          Visualize e filtre todas as suas movimentações financeiras.
        </p>

        <div className="bg-white p-12 rounded-[0.625rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Wallet className="h-6 w-6 text-slate-300" />
          </div>
          <h3 className="text-[#3a416f] font-semibold">
            Nenhuma transação encontrada
          </h3>
          <p className="text-sm text-slate-400 max-w-[250px] mt-1">
            As vendas aparecerão aqui assim que você configurar um gateway de
            pagamento.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
