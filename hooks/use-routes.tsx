import { CoinsIcon, HomeIcon, Layers2Icon, LucideIcon, ShieldCheckIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type Route = {
    href: string;
    label: string;
    icon: LucideIcon;
};

const routes: Route[] = [
    {
        href: '',
        label: 'Home',
        icon: HomeIcon,
    },
    {
        href: 'workflows',
        label: 'Workflows',
        icon: Layers2Icon,
    },
    {
        href: 'credentials',
        label: 'Credentials',
        icon: ShieldCheckIcon,
    },
    {
        href: 'billing',
        label: 'Billing',
        icon: CoinsIcon,
    },
];

export function useRoutes() {
    return routes;
}

export function useActiveRoute() {
    const pathname = usePathname();
    const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];
    return activeRoute;
}