/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, Trash2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

// 1. SCHEMA DE VALIDAÇÃO
const formSchema = z.object({
  publicKey: z.string().min(5, "A chave pública é obrigatória"),
  secretKey: z.string().min(5, "A chave secreta é obrigatória"),
  webhookKey: z.string().min(5, "O Webhook Signing Secret é obrigatório"),
});

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: any;
}

export function IntegrationModal({
  isOpen,
  onClose,
  integration,
}: IntegrationModalProps) {
  const [loading, setLoading] = useState(false);
  const [showFields, setShowFields] = useState(false); // Estado para o delay visual
  const isConnected = integration?.status === "connected";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { publicKey: "", secretKey: "", webhookKey: "" },
  });

  // Efeito para Delay Visual: Evita o "lag" do popup de senhas do navegador
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowFields(true), 350);
      return () => clearTimeout(timer);
    } else {
      setShowFields(false);
    }
  }, [isOpen]);

  // Efeito para Resetar o Formulário
  useEffect(() => {
    if (isOpen && integration) {
      form.reset({
        publicKey: isConnected ? "••••••••••••••••••••" : "",
        secretKey: isConnected ? "••••••••••••••••••••" : "",
        webhookKey: isConnected ? "••••••••••••••••••••" : "",
      });
    }
  }, [isOpen, integration, isConnected, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Simulação de chamada ao seu backend NestJS
    setTimeout(() => {
      setLoading(false);
      onClose();
      toast.success(`Integração ${integration.name} atualizada com sucesso!`);
    }, 1500);
  }

  const handleDisconnect = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Desconectando gateway...",
      success: () => {
        onClose();
        return `Gateway ${integration.name} desconectado.`;
      },
      error: "Erro ao desconectar.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] border-none shadow-2xl rounded-[0.625rem] bg-[#3a416f] text-white overflow-hidden transition-all">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-lg p-2 border border-slate-100 shrink-0">
              <img
                src={integration?.logo}
                alt={integration?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <DialogTitle className="text-white font-bold text-xl">
                {isConnected ? "Gerenciar" : "Configurar"} {integration?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-300">
                Insira as credenciais de produção para transações reais.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "space-y-4 py-4 transition-all duration-500 ease-in-out",
              showFields
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none",
            )}
          >
            {/* PUBLIC KEY */}
            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-semibold">
                    Public Key
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="pk_live_..."
                      autoComplete="new-password"
                      className="rounded-[0.625rem] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#82d616] focus:ring-[#82d616] focus:bg-white/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* SECRET KEY */}
            <FormField
              control={form.control}
              name="secretKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-semibold">
                    Secret Key
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="sk_live_..."
                      autoComplete="new-password"
                      {...field}
                      className="rounded-[0.625rem] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#82d616] focus:ring-[#82d616] focus:bg-white/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* WEBHOOK SECRET */}
            <FormField
              control={form.control}
              name="webhookKey"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-[#82d616]" />
                    <FormLabel className="text-slate-200 font-semibold">
                      Webhook Signing Secret
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="whsec_..."
                      autoComplete="new-password"
                      {...field}
                      className="rounded-[0.625rem] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#82d616] focus:ring-[#82d616] focus:bg-white/20 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* SEGURANÇA BANNER */}
            <div className="bg-[#2a3052] p-3 rounded-[0.625rem] flex items-start gap-2 border border-white/10 mt-2">
              <ShieldCheck className="h-5 w-5 text-[#82d616] mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-300 leading-tight italic">
                Criptografia AES-256 ativa. Seus dados sensíveis são processados
                em ambiente isolado e seguro.
              </p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 items-center">
              {isConnected && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDisconnect}
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Desconectar
                </Button>
              )}
              <div className="flex-1" />

              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "font-bold rounded-[0.625rem] px-8 h-12 transition-all w-full sm:w-auto",
                  "bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f] shadow-[0_0_20px_rgba(130,214,22,0.2)] hover:shadow-[0_0_25px_rgba(130,214,22,0.4)]",
                )}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isConnected ? (
                  "Salvar Alterações"
                ) : (
                  "Ativar Gateway"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
