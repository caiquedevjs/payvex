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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { Building2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface CreateFilialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  companyId: string;
}

export function CreateFilialModal({
  isOpen,
  onClose,
  onSuccess,
  companyId,
}: CreateFilialModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", cnpj: "" });

  const handleCreate = async () => {
    if (!formData.name || !formData.cnpj) {
      return toast.error("Preencha todos os campos.");
    }

    setLoading(true);
    try {
      // Endpoint que você deve criar no NestJS: POST /filiais
      await api.post("/filiais", {
        ...formData,
        companyId,
      });

      toast.success("Nova unidade cadastrada com sucesso!");
      onSuccess();
      onClose();
      setFormData({ name: "", cnpj: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao criar filial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl rounded-[0.625rem] bg-[#3a416f] text-white overflow-hidden transition-all">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#3a416f]">
            <Building2 className="text-[#82d616]" /> Nova Unidade de Negócio
          </DialogTitle>
          <DialogDescription>
            Adicione uma nova filial para gerenciar integrações e pagamentos
            exclusivos.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Nome da Unidade (Ex: Sede Norte)</Label>
            <Input
              placeholder="Digite o nome da filial"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>CNPJ da Unidade</Label>
            <Input
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={(e) =>
                setFormData({ ...formData, cnpj: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="bg-[#82d616] hover:bg-[#71bd13] text-[#3a416f] font-bold"
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Confirmar Cadastro"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
