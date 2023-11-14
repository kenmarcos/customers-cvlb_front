import Link from "next/link";

interface MenuItemCardProps {
  href: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

const MenuItemCard = ({
  href,
  icon,
  title,
  description,
}: MenuItemCardProps) => {
  return (
    <Link href={href}>
      <div className="group flex h-full items-center gap-2 space-x-4 rounded-lg border p-4 shadow-xl hover:ring-1 hover:ring-secondary">
        <div>{icon}</div>

        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>

          <p className="text-muted-foreground group-hover:text-secondary">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MenuItemCard;
