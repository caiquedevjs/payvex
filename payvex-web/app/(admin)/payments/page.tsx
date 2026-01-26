/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Barcode,
  Building2,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  Loader2,
  Mail,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function NewPaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filiais, setFiliais] = useState<any[]>([]);

  // Estado do Formulário
  const [formData, setFormData] = useState({
    amount: "",
    filialId: "",
    gateway: "STRIPE",
    paymentMethod: "CREDIT_CARD",
    customerName: "",
    customerEmail: "",
  });

  // Carregar filiais para o seletor
  useEffect(() => {
    async function loadFiliais() {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("@payvex:user") || "{}",
        );
        const res = await api.get(`/companies/${savedUser.companyId}`);
        setFiliais(res.data.filiais || []);

        if (res.data.filiais?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            filialId: res.data.filiais[0].id,
          }));
        }
      } catch (e) {
        toast.error("Erro ao carregar filiais.");
      }
    }
    loadFiliais();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🚀 Consumindo seu serviço: POST /transactions/create
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount), // Converte para número
      };

      const response = await api.post("/transactions/create", payload);

      toast.success("Pagamento gerado com sucesso!");

      // Se o gateway retornar uma URL de pagamento ou QR Code, redirecionamos ou mostramos
      if (response.data.paymentUrl) {
        window.open(response.data.paymentUrl, "_blank");
      }

      router.push("/transactions"); // Redireciona para o histórico
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Erro ao processar transação.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <header className="space-y-1">
          <div className="flex items-center gap-2 text-[#3a416f]/60 font-semibold text-sm uppercase tracking-widest">
            <CircleDollarSign size={16} className="text-[#82d616]" />
            <span>Terminal de Vendas</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#3a416f]">
            Criar Novo <span className="text-[#82d616]">Pagamento</span>
          </h1>
          <p className="text-slate-500">
            Gere cobranças utilizando as credenciais de suas filiais.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* COLUNA 1 & 2: DADOS DA VENDA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[0.625rem] border border-slate-100 shadow-sm space-y-6">
              {/* SELETOR DE FILIAL (CRÍTICO PARA BYOK) */}
              <div className="space-y-3">
                <Label className="text-[#3a416f] font-bold flex items-center gap-2">
                  <Building2 size={16} className="text-[#82d616]" /> Selecionar
                  Filial (Emissor)
                </Label>
                <select
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#3a416f] outline-none focus:border-[#82d616] transition-all"
                  value={formData.filialId}
                  onChange={(e) =>
                    setFormData({ ...formData, filialId: e.target.value })
                  }
                  required
                >
                  {filiais.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} - {f.cnpj}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 italic">
                  A transação será processada com as chaves API desta unidade.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[#3a416f] font-bold">
                    Valor da Transação
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-[#82d616]" />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[#3a416f] font-bold">
                    Gateway de Destino
                  </Label>
                  <select
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#3a416f] outline-none"
                    value={formData.gateway}
                    onChange={(e) =>
                      setFormData({ ...formData, gateway: e.target.value })
                    }
                  >
                    <option value="STRIPE">Stripe (Global)</option>
                    <option value="MERCADO_PAGO">Mercado Pago (LATAM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-[#3a416f] font-bold text-sm uppercase tracking-wider">
                  Dados do Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Nome Completo"
                      className="pl-10 h-12 rounded-xl"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="E-mail para recibo"
                      className="pl-10 h-12 rounded-xl"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA 3: MÉTODO DE PAGAMENTO E RESUMO */}
          <div className="space-y-6">
            <div className="bg-[#3a416f] p-8 rounded-[0.625rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-[#82d616] rounded-full blur-[60px] opacity-20"></div>

              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Zap size={18} className="text-[#82d616]" /> Método
              </h3>

              <div className="space-y-3 relative z-10">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "CREDIT_CARD" })
                  }
                  className={cn(
                    "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                    formData.paymentMethod === "CREDIT_CARD"
                      ? "border-[#82d616] bg-[#82d616]/10"
                      : "border-white/10 hover:bg-white/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} />
                    <span className="font-bold text-sm">Cartão de Crédito</span>
                  </div>
                  {formData.paymentMethod === "CREDIT_CARD" && (
                    <div className="h-2 w-2 bg-[#82d616] rounded-full shadow-[0_0_10px_#82d616]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "PIX" })
                  }
                  className={cn(
                    "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                    formData.paymentMethod === "PIX"
                      ? "border-[#82d616] bg-[#82d616]/10"
                      : "border-white/10 hover:bg-white/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Wallet size={20} />
                    <span className="font-bold text-sm">PIX Instantâneo</span>
                  </div>
                  {formData.paymentMethod === "PIX" && (
                    <div className="h-2 w-2 bg-[#82d616] rounded-full shadow-[0_0_10px_#82d616]" />
                  )}
                </button>

                {/* BOLETO 🚀 */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "BOLETO" })
                  }
                  className={cn(
                    "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                    formData.paymentMethod === "BOLETO"
                      ? "border-[#82d616] bg-[#82d616]/10"
                      : "border-white/10 hover:bg-white/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Barcode size={20} />
                    <span className="font-bold text-sm">Boleto</span>
                  </div>
                  {formData.paymentMethod === "BOLETO" && (
                    <div className="h-2 w-2 bg-[#82d616] rounded-full shadow-[0_0_10px_#82d616]" />
                  )}
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total a pagar</span>
                  <span className="text-xl font-black text-[#82d616]">
                    R$ {formData.amount || "0,00"}
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f] font-black h-14 rounded-xl shadow-[0_0_20px_rgba(130,214,22,0.3)] transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      GERAR COBRANÇA <ArrowRight size={18} />
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-slate-50 p-6 border border-dashed border-slate-200 rounded-[0.625rem]">
              <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                Ao gerar esta cobrança, o sistema Payvex roteará automaticamente
                a transação para o gateway configurado na filial selecionada.
              </p>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
