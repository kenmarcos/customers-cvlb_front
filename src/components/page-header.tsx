import { ComponentProps } from "react";

interface PageHeaderProps extends ComponentProps<"header"> {
  title: string;
}

const PageHeader = ({ title, ...rest }: PageHeaderProps) => {
  return (
    <header {...rest}>
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
  );
};

export default PageHeader;
