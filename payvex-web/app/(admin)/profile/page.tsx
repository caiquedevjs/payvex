/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { Building2, Loader2, Mail, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        // 1. Pegamos o objeto do usuário salvo no login
        const savedUser = localStorage.getItem("@payvex:user");
        if (!savedUser) return;

        const { id } = JSON.parse(savedUser);

        // 2. Chamada para a sua nova rota NestJS: identity/:id
        const response = await api.get(`/identity/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error("Erro ao carregar dados do perfil.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#82d616]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-[#3a416f]">Meu Perfil</h1>
        <p className="text-slate-500">
          Gerencie suas informações pessoais e da sua empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUNA ESQUERDA: Dados do Usuário */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[0.625rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[#3a416f] font-bold">
              <User className="h-5 w-5 text-[#82d616]" />
              Informações Pessoais
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input value={user?.name} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label>E-mail Profissional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={user?.email}
                    readOnly
                    className="pl-10 bg-slate-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nível de Acesso</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={user?.role}
                    readOnly
                    className="pl-10 bg-slate-50 uppercase text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DADOS DA EMPRESA (Vindo do include: company: true) */}
          <div className="bg-white p-6 rounded-[0.625rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[#3a416f] font-bold">
              <Building2 className="h-5 w-5 text-[#82d616]" />
              Dados da Organização
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Razão Social</Label>
                <Input
                  value={user?.company?.name || "Não informada"}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label>Documento / CNPJ</Label>
                <Input
                  value={user?.company?.document || "00.000.000/0001-00"}
                  readOnly
                  className="bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Card de Status */}
        <div className="space-y-6">
          <div className="bg-[#3a416f] text-white p-6 rounded-[0.625rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#82d616] rounded-full blur-[60px] opacity-20"></div>
            <div className="relative z-10">
              <div className="h-16 w-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black mb-4">
                {user?.name?.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold">{user?.name}</h3>
              <p className="text-slate-300 text-sm mb-4">{user?.email}</p>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#82d616] text-[#3a416f]">
                Conta Verificada
              </div>
            </div>
          </div>

          <Button className="w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent font-bold">
            Alterar Senha
          </Button>
        </div>
      </div>
    </div>
  );
}
