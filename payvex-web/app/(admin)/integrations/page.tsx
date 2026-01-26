/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { IntegrationModal } from "@/components/IntegrationModal.component";
import { PageTransition } from "@/components/page-transition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Blocks,
  Building2,
  ChevronRight,
  Settings2
} from "lucide-react";
import { useEffect, useState } from "react";

const integrations = [
  {
    id: "stripe",
    name: "Stripe",
    category: "Pagamentos Internacionais",
    description:
      "Infraestrutura global com suporte a Cartões, Apple Pay e Google Pay.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/stripe.svg",
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    category: "América Latina",
    description:
      "Líder regional com suporte total a PIX, Checkout Pro e Parcelamento.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mercadopago.svg",
  },
  {
    id: "pagarme",
    name: "Pagar.me",
    category: "Recorrência e Split",
    description:
      "Ideal para Marketplaces e assinaturas com split de pagamento automático.",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pagarme.svg",
  },
  {
    id: "cielo",
    name: "Cielo",
    category: "Adquirente Nacional",
    description:
      "A maior adquirente do Brasil. Suporte a mais de 80 bandeiras de cartão.",
    logo: "https://logodownload.org/wp-content/uploads/2014/07/cielo-logo-1.png",
  },
  {
    id: "picpay",
    name: "PicPay",
    category: "Carteira Digital",
    description: "Pagamentos instantâneos via QR Code com altíssima conversão.",
    logo: "https://logodownload.org/wp-content/uploads/2018/05/picpay-logo.png",
  },
];

export default function IntegrationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [filiais, setFiliais] = useState<any[]>([]);
  const [selectedFilial, setSelectedFilial] = useState<any>(null);

  const loadData = async () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("@payvex:user") || "{}",
      );
      if (!savedUser.companyId) return;
      const res = await api.get(`/companies/${savedUser.companyId}`);
      setFiliais(res.data.filiais || []);

      if (selectedFilial) {
        const updated = res.data.filiais.find(
          (f: any) => f.id === selectedFilial.id,
        );
        setSelectedFilial(updated);
      } else if (res.data.filiais?.length > 0) {
        setSelectedFilial(res.data.filiais[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (gate: any) => {
    if (!selectedFilial) return;
    const isConnected =
      !!selectedFilial[`${gate.id}SecretKey`] ||
      !!selectedFilial.mercadoPagoAccessToken;

    setSelectedIntegration({
      ...gate,
      isConnected,
      filialName: selectedFilial.name,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <PageTransition>
        <div className="max-w-[1200px] mx-auto space-y-10 pb-10">
          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#3a416f]/60 font-semibold text-sm uppercase tracking-wider">
                <Blocks size={16} />
                <span>Hub Config</span>
              </div>
              <h1 className="text-4xl font-extrabold text-[#3a416f] tracking-tight">
                Gateways de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a416f] to-blue-500">
                  Pagamento
                </span>
              </h1>
            </div>

            {/* SELETOR DE FILIAL */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] w-full md:w-80">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block text-center tracking-widest">
                Configurar Unidade:
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-[#82d616]" />
                <select
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-[#3a416f] outline-none hover:border-[#82d616]/30 transition-all cursor-pointer"
                  value={selectedFilial?.id}
                  onChange={(e) =>
                    setSelectedFilial(
                      filiais.find((f) => f.id === e.target.value),
                    )
                  }
                >
                  {filiais.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.cnpj})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </header>

          {/* GRID DE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((item) => {
              const isConnected =
                !!selectedFilial?.[`${item.id}SecretKey`] ||
                (item.id === "mercadopago" &&
                  !!selectedFilial?.mercadoPagoAccessToken);

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div
                    className={cn(
                      "relative h-full flex flex-col bg-white border border-slate-100 p-6 transition-all duration-300 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] rounded-[0.625rem]",
                      "before:absolute before:inset-0 before:rounded-[0.625rem] before:opacity-0 hover:before:opacity-100 before:pointer-events-none before:border-2 before:border-[#82d616]/20",
                    )}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <Badge
                        className={cn(
                          "px-3 py-1 font-bold transition-colors",
                          isConnected
                            ? "bg-[#82d616]/10 text-[#82d616]"
                            : "bg-slate-50 text-slate-400 border-slate-100",
                        )}
                      >
                        {isConnected ? (
                          <span className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82d616] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82d616]"></span>
                            </span>
                            ATIVO
                          </span>
                        ) : (
                          "PENDENTE"
                        )}
                      </Badge>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[#82d616] uppercase tracking-[0.15em]">
                          {item.category}
                        </p>
                        <h3 className="text-xl font-bold text-[#3a416f]">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Button
                        onClick={() => handleOpenModal(item)}
                        className={cn(
                          "w-full h-12 rounded-[0.625rem] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md",
                          isConnected
                            ? "bg-[#3a416f] hover:bg-[#2a3052] text-white"
                            : "bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f]",
                        )}
                      >
                        {isConnected ? (
                          <>
                            <Settings2 className="h-4 w-4" /> Gerenciar Gateway
                          </>
                        ) : (
                          <>
                            Configurar Agora
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </PageTransition>

      <IntegrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        integration={selectedIntegration}
        filialId={selectedFilial?.id}
        onSuccess={loadData}
      />
    </div>
  );
}
