import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-4">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#3a416f]" />
        <div className="absolute h-6 w-6 bg-[#82d616] rounded-full animate-pulse opacity-40" />
      </div>
      <span className="text-[#3a416f] font-bold tracking-tight animate-pulse">
        Carregando Módulo Payvex...
      </span>
    </div>
  );
}
