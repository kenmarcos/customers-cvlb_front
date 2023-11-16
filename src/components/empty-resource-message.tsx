interface EmptyResourceMessageProps {
  message: string;
}

const EmptyResourceMessage = ({ message }: EmptyResourceMessageProps) => {
  return (
    <div className="col-span-full flex h-[50vh] items-center justify-center">
      <p className="text-center text-muted-foreground">{message} </p>
    </div>
  );
};

export default EmptyResourceMessage;
