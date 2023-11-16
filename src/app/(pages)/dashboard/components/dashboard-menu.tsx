import DashboardMenuItem from "./dashboard-menu-item";

import { ScrollTextIcon, UserPlusIcon } from "lucide-react";

const DashboardMenu = () => {
  return (
    <section>
      <nav>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <li>
            <DashboardMenuItem
              href="/cadastro-cliente"
              icon={<UserPlusIcon size={40} />}
              title="Cadastrar Cliente"
              description="Adicione um novo cliente ao sistema"
            />
          </li>

          <li>
            <DashboardMenuItem
              href="/listagem-clientes"
              icon={<ScrollTextIcon size={40} />}
              title="Lista de Clientes"
              description="Gerencie e visualize informações sobre clientes"
            />
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default DashboardMenu;
