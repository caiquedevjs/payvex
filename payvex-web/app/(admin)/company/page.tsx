/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CreateFilialModal } from "@/components/modals/create-filial-modal";
import { Button } from "@/components/ui/button";
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
  Plus,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function CompanyPage() {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanyData = async () => {
    try {
      const savedUser = localStorage.getItem("@payvex:user");
      if (!savedUser) return;
      const { companyId } = JSON.parse(savedUser);
      const response = await api.get(`/companies/${companyId}`);
      setCompany(response.data);
    } catch (error) {
      toast.error("Erro ao carregar dados completos da empresa.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  if (loading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#82d616]" />
      </div>
    );

  const adminMaster = company?.users?.[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#3a416f] tracking-tight">
            Hub Business
          </h1>
          <p className="text-slate-500">
            Gestão de unidades de negócio Payvex.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3a416f] text-[#82d616] hover:bg-[#2a3052] font-bold rounded-[0.625rem] shadow-lg gap-2"
          >
            <Plus size={18} /> Adicionar Filial
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* SEÇÃO 1: INFORMAÇÕES JURÍDICAS */}
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
                <Input value={company?.City} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500">UF / Estado</Label>
                <Input
                  value={company?.State}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: FILIAIS */}
          <div className="bg-white p-8 rounded-[0.625rem] border border-slate-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-[#3a416f] font-bold mb-6">
              <Briefcase className="text-[#82d616] h-5 w-5" /> Unidades de
              Negócio (Filiais)
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {company?.filiais?.length > 0 ? (
                company.filiais.map((filial: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#82d616]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Building2 className="h-10 w-10 text-[#3a416f]" />
                      <div>
                        <p className="font-bold text-[#3a416f]">
                          {filial.name}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          CNPJ: {filial.cnpj}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#82d616]/20 text-[#3a416f] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      ATIVA
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl italic">
                  Nenhuma filial cadastrada. Adicione sua primeira unidade.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="space-y-6">
          <div className="bg-[#3a416f] p-8 rounded-[0.625rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#82d616] rounded-full blur-[60px] opacity-20"></div>
            <h3 className="flex items-center gap-2 font-bold mb-6 relative z-10 text-[#82d616]">
              <User size={18} /> Administrador Master
            </h3>
            <div className="space-y-5 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                  Responsável
                </span>
                <span className="text-lg font-bold">
                  {adminMaster?.name || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                  E-mail
                </span>
                <span className="text-sm text-slate-300 italic">
                  {adminMaster?.email}
                </span>
              </div>
              <Separator className="bg-white/10 my-4" />
              <div className="flex items-center gap-2 text-[#82d616] text-[10px] font-black uppercase tracking-tighter">
                <ShieldCheck size={14} /> Criptografia AES-256 Ativa
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 border border-emerald-100 rounded-[0.625rem] flex items-start gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-md text-white">
              <FileText size={16} />
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
              Plano:{" "}
              <strong>{company?.subscription?.planName || "Trial"}</strong>.
              Suas quotas de transações são renovadas mensalmente.
            </p>
          </div>
        </div>
      </div>

      <CreateFilialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyId={company?.id}
        onSuccess={fetchCompanyData}
      />
    </div>
  );
}
