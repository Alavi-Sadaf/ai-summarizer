'use client';

import { usePathname } from 'next/navigation';
import { Navbar1 } from '@/components/ui/navbar-1';

export function NavbarSelector() {
    const pathname = usePathname();
    const hideNavbar = pathname === '/login' || pathname === '/register';

    if (hideNavbar) return null;

    return <Navbar1 />;
}
