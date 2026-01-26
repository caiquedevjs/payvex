/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, ShieldCheck, Trash2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  publicKey: z.string().min(5, "A chave pública é obrigatória"),
  secretKey: z.string().min(5, "A chave secreta é obrigatória"),
  webhookKey: z.string().min(5, "O Webhook Signing Secret é obrigatório"),
});

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: any;
  filialId: string | undefined;
  onSuccess: () => void;
}

export function IntegrationModal({
  isOpen,
  onClose,
  integration,
  filialId,
  onSuccess,
}: IntegrationModalProps) {
  const [loading, setLoading] = useState(false);
  const isConnected = !!integration?.isConnected;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { publicKey: "", secretKey: "", webhookKey: "" },
  });

  // ⚡ Reset imediato ao abrir para evitar o delay visual das chaves
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
    if (!filialId) return toast.error("Selecione uma filial primeiro.");
    setLoading(true);
    try {
      const payload = {
        [`${integration.id}PublicKey`]: values.publicKey,
        [`${integration.id}SecretKey`]: values.secretKey,
        [`${integration.id}WebhookSecret`]: values.webhookKey,
      };
      await api.patch(`/filiais/${filialId}/gateways`, payload);
      toast.success(`${integration.name} atualizado com sucesso!`);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erro ao salvar credenciais.");
    } finally {
      setLoading(false);
    }
  }

  const handleDisconnect = async () => {
    if (!filialId) return;
    setLoading(true);
    try {
      const payload = {
        [`${integration.id}PublicKey`]: null,
        [`${integration.id}SecretKey`]: null,
        [`${integration.id}WebhookSecret`]: null,
      };
      await api.patch(`/filiais/${filialId}/gateways`, payload);
      toast.success(`${integration.name} desconectado.`);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Erro ao remover credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-[#3a416f] text-white border-none shadow-2xl rounded-[0.625rem] outline-none z-[9999]">
        {integration && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-lg p-2 shrink-0 shadow-inner">
                  <img
                    src={integration.logo}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <DialogTitle className="text-white font-bold text-xl">
                    {isConnected ? "Gerenciar" : "Configurar"}{" "}
                    {integration.name}
                  </DialogTitle>
                  <DialogDescription className="text-slate-300 text-xs">
                    Unidade:{" "}
                    <span className="text-[#82d616] font-bold uppercase">
                      {integration.filialName}
                    </span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Form {...form}>
              {/* Removido o delay de opacity e translate-y para abrir junto com o modal */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="publicKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Public Key
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off" // 👈 Bloqueia sugestões genéricas
                          placeholder="pk_live_..."
                          className="rounded-[0.625rem] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#82d616] autofill:shadow-[inset_0_0_0_1000px_#3a416f] transition-all"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secretKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Secret Key
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          autoComplete="new-password" // 👈 Engana o gerenciador de senhas
                          placeholder="sk_live_..."
                          className="rounded-[0.625rem] bg-white/10 border-white/20 text-white focus:border-[#82d616] autofill:shadow-[inset_0_0_0_1000px_#3a416f] transition-all"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="webhookKey"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-[#82d616]" />
                        <FormLabel className="text-slate-200">
                          Webhook Secret
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          autoComplete="new-password" // 👈 Engana o gerenciador de senhas
                          placeholder="whsec_..."
                          className="rounded-[0.625rem] bg-white/10 border-white/20 text-white focus:border-[#82d616] autofill:shadow-[inset_0_0_0_1000px_#3a416f] transition-all"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <div className="bg-[#2a3052] p-3 rounded-[0.625rem] flex items-start gap-2 border border-white/10 mt-2">
                  <ShieldCheck className="h-5 w-5 text-[#82d616] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-300 leading-tight italic">
                    Criptografia AES-256 ativa. BYOK configurado para esta
                    unidade.
                  </p>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 items-center">
                  {isConnected && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleDisconnect}
                      disabled={loading}
                      className="text-red-400 hover:bg-red-500/10 font-bold w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Desconectar
                    </Button>
                  )}
                  <div className="flex-1" />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f] font-bold h-12 rounded-[0.625rem]"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        <Save className="mr-2" size={18} />
                        {isConnected ? "Salvar Alterações" : "Ativar Gateway"}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
