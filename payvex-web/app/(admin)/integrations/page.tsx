/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { IntegrationModal } from "@/components/IntegrationModal.component";
import { PageTransition } from "@/components/page-transition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Blocks, ChevronRight, ExternalLink, Settings2 } from "lucide-react";
import { useState } from "react";

// --- DADOS DAS INTEGRAÇÕES (O que estava faltando) ---
const integrations = [
  {
    id: "stripe",
    name: "Stripe",
    category: "Pagamentos Internacionais",
    description:
      "Infraestrutura global com suporte a Cartões, Apple Pay e Google Pay.",
    status: "connected",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/stripe.svg",
    color: "#635BFF",
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    category: "América Latina",
    description:
      "Líder regional. Suporte total a PIX, Parcelamento e Checkout Pro.",
    status: "pending",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mercadopago.svg",
    color: "#009EE3",
  },
  {
    id: "pagarme",
    name: "Pagar.me",
    category: "Recorrência e Split",
    description:
      "Ideal para Marketplaces e assinaturas com split de pagamento automático.",
    status: "pending",
    logo: "Selo - Versão Mínima - Fundo branco.svg",
    color: "#F15A24",
  },
  {
    id: "cielo",
    name: "Cielo",
    category: "Adquirente Nacional",
    description:
      "A maior adquirente do Brasil. Suporte a mais de 80 bandeiras de cartão.",
    status: "pending",
    logo: "https://logodownload.org/wp-content/uploads/2014/07/cielo-logo-1.png",
    color: "#0067b1",
  },
  {
    id: "picpay",
    name: "PicPay",
    category: "Carteira Digital",
    description:
      "Pagamentos instantâneos via QR Code e saldo em conta com altíssima conversão.",
    status: "pending",
    logo: "https://logodownload.org/wp-content/uploads/2018/05/picpay-logo.png",
    color: "#21C25E",
  },
];
// --- VARIANTES DE ANIMAÇÃO ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function IntegrationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  const handleOpenModal = (integration: any) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto space-y-10 pb-10">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#3a416f]/60 font-semibold text-sm uppercase tracking-wider">
              <Blocks className="h-4 w-4" />
              <span>Configurações Hub</span>
            </div>
            <h1 className="text-4xl font-extrabold text-[#3a416f] tracking-tight">
              Gateways de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a416f] to-blue-500">
                Pagamento
              </span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Conecte suas contas e comece a processar vendas com taxas
              otimizadas pela Payvex.
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-[0.625rem] border-slate-200 text-[#3a416f] gap-2 hover:bg-white shadow-sm"
          >
            Ver Documentação <ExternalLink className="h-4 w-4" />
          </Button>
        </header>

        {/* GRID ANIMADO */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {integrations.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div
                className={cn(
                  "relative h-full flex flex-col bg-white border border-slate-100 p-6 transition-all duration-300 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]",
                  "before:absolute before:inset-0 before:rounded-[0.625rem] before:transition-opacity before:opacity-0 hover:before:opacity-100 before:pointer-events-none before:border-2 before:border-[#82d616]/20",
                )}
                style={{ borderRadius: "0.625rem" }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {item.status === "connected" ? (
                    <Badge className="bg-[#82d616]/10 text-[#82d616] border-[#82d616]/20 px-3 py-1 font-bold">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82d616] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82d616]"></span>
                      </span>
                      ATIVO
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-slate-400 border-slate-200 bg-slate-50/50 px-3 py-1"
                    >
                      PENDENTE
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 flex-1 mt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#82d616] uppercase tracking-[0.15em]">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold text-[#3a416f]">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={() => handleOpenModal(item)}
                    className={cn(
                      "w-full h-12 rounded-[0.625rem] font-bold text-sm transition-all duration-300 gap-2 flex items-center justify-center shadow-md",
                      item.status === "connected"
                        ? "bg-[#3a416f] hover:bg-[#2a3052] text-white"
                        : "bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f] hover:shadow-[#82d616]/20",
                    )}
                  >
                    {item.status === "connected" ? (
                      <>
                        <Settings2 className="h-4 w-4" /> Gerenciar Gateway
                      </>
                    ) : (
                      <>
                        Configurar Agora{" "}
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <IntegrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          integration={selectedIntegration}
        />
      </div>
    </PageTransition>
  );
}
