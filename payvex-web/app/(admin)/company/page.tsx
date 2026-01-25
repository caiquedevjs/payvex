/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import {
    Briefcase,
    Building2,
    FileText,
    Globe,
    Loader2,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function CompanyPage() {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const savedUser = localStorage.getItem("@payvex:user");
        if (!savedUser) return;

        const { companyId } = JSON.parse(savedUser);

        // Chamada para o seu controller de empresas
        const response = await api.get(`/companies/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar dados completos da empresa.");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanyData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#82d616]" />
      </div>
    );
  }

  // Pegamos o primeiro usuário da lista como o Administrador Master
  const adminMaster = company?.users?.[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#3a416f] tracking-tight">
            Hub Business
          </h1>
          <p className="text-slate-500">
            Gestão de dados cadastrais e unidades de negócio Payvex.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="bg-[#3a416f] p-3 rounded-xl text-[#82d616]">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Empresa Ativa
            </p>
            <p className="text-sm font-bold text-[#3a416f]">{company?.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUNA ESQUERDA: DADOS JURÍDICOS E ENDEREÇO */}
        <div className="lg:col-span-2 space-y-8">
          {/* SEÇÃO 1: DADOS JURÍDICOS */}
          <div className="bg-white p-8 rounded-[0.625rem] border border-slate-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-[#3a416f] font-bold mb-6">
              <Globe className="text-[#82d616] h-5 w-5" /> Informações Jurídicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-500 font-semibold">
                  Nome Fantasia
                </Label>
                <Input
                  value={company?.name}
                  readOnly
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 font-semibold">
                  Telefone Comercial
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={company?.phone}
                    readOnly
                    className="pl-10 bg-slate-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: LOCALIZAÇÃO DA SEDE */}
          <div className="bg-white p-8 rounded-[0.625rem] border border-slate-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-[#3a416f] font-bold mb-6">
              <MapPin className="text-[#82d616] h-5 w-5" /> Localização da Sede
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-500">CEP</Label>
                <Input
                  value={company?.postalCode}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-slate-500">Logradouro / Endereço</Label>
                <Input
                  value={company?.address}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500">Bairro</Label>
                <Input
                  value={company?.neighborhood}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500">Cidade</Label>
                {/* Nota: Usando 'City' conforme seu Prisma Schema */}
                <Input value={company?.City} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500">UF / Estado</Label>
                {/* Nota: Usando 'State' conforme seu Prisma Schema */}
                <Input
                  value={company?.State}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: UNIDADES DE NEGÓCIO (FILIAIS) */}
          <div className="bg-white p-8 rounded-[0.625rem] border border-slate-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-[#3a416f] font-bold mb-6">
              <Briefcase className="text-[#82d616] h-5 w-5" /> Unidades de
              Negócio (Filiais)
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {company?.filiais && company.filiais.length > 0 ? (
                company.filiais.map((filial: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#82d616]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm text-[#3a416f]">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-[#3a416f]">
                          {filial.name}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          CNPJ: {filial.cnpj}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#82d616]/10 text-[#3a416f] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#82d616] animate-pulse" />
                      Ativa
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  Nenhuma filial cadastrada.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: STATUS E ADMIN MASTER */}
        <div className="space-y-6">
          <div className="bg-[#3a416f] p-8 rounded-[0.625rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#82d616] rounded-full blur-[60px] opacity-20"></div>

            <h3 className="flex items-center gap-2 font-bold mb-6 relative z-10 text-[#82d616]">
              <User size={18} /> Administrador Master
            </h3>

            <div className="space-y-5 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                  Nome do Responsável
                </span>
                <span className="text-lg font-bold">
                  {adminMaster?.name || "Não atribuído"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                  E-mail de Acesso
                </span>
                <span className="text-sm text-slate-300 italic">
                  {adminMaster?.email || "N/A"}
                </span>
              </div>

              <Separator className="bg-white/10 my-4" />

              <div className="flex items-center gap-2 text-[#82d616] text-[10px] font-black uppercase tracking-tighter">
                <ShieldCheck size={14} />
                Criptografia AES-256 Ativa
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 border border-emerald-100 rounded-[0.625rem] flex items-start gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-md text-white">
              <FileText size={16} />
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Sua empresa está operando sob o plano{" "}
              <strong>{company?.subscription?.planName || "Trial"}</strong>. Os
              limites de transações e filiais estão configurados de acordo com
              seu contrato.
            </p>
          </div>

          <div className="p-6 border border-dashed border-slate-300 rounded-[0.625rem] bg-slate-50">
            <p className="text-[11px] text-slate-500 leading-relaxed italic text-center">
              Alterações em dados sensíveis (CNPJ/Razão Social) requerem
              validação documental via Payvex AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
