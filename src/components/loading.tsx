import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center">
      <Loader2Icon size={64} className="animate-spin" />
      <p className="animate-pulse text-muted-foreground">Carregando...</p>
    </div>
  );
};

export default Loading;
