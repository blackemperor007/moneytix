// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { Menu, Bell, Search, Plus, Settings, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Fonction utilitaire pour les classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  // Obtenir le titre de la page
  const getPageTitle = () => {
    const titles: Record<string, string> = {
      '/dashboard': 'Tableau de bord',
      '/dashboard/clients': 'Clients',
      '/dashboard/invoices': 'Factures',
      '/dashboard/payments': 'Paiements',
      '/dashboard/settings': 'Paramètres',
      '/dashboard/reports': 'Rapports',
    };

    return titles[pathname] || 'Tableau de bord';
  };

  // Navigation pour le menu mobile
  const mobileNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Clients', href: '/dashboard/clients', icon: '👥' },
    { name: 'Factures', href: '/dashboard/invoices', icon: '🧾' },
    { name: 'Paiements', href: '/dashboard/payments', icon: '💳' },
    { name: 'Rapports', href: '/dashboard/reports', icon: '📈' },
  ];

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        {/* Partie gauche : Logo + Menu mobile */}
        <div className="flex items-center gap-4">
          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="font-bold text-white">F</span>
                  </div>
                  <span>Facturation Pro</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg transition-colors",
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="space-y-3">
                  <Link href="/dashboard/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Button>
                  </Link>
                  <Link href="/dashboard/help">
                    <Button variant="ghost" className="w-full justify-start">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Aide
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-white">F</span>
            </div>
            <span className="hidden md:inline font-bold text-xl">
              Facturation
            </span>
          </Link>

          {/* Titre de la page (desktop) */}
          <div className="hidden md:block ml-4">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>
        </div>

        {/* Partie centre : Recherche */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher clients, factures..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Partie droite : Actions */}
        <div className="flex items-center gap-2">
          {/* Bouton Nouvelle Facture */}
          <Link href="/dashboard/invoices/create">
            <Button size="sm" className="hidden md:flex">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle facture
            </Button>
            <Button size="icon" className="md:hidden">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>

          {/* Recherche mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]"
                  variant="destructive"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto p-1">
                <div className="p-3 hover:bg-muted rounded cursor-pointer">
                  <p className="text-sm font-medium">Nouveau paiement reçu</p>
                  <p className="text-xs text-muted-foreground">Client A - 500€</p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-3 hover:bg-muted rounded cursor-pointer">
                  <p className="text-sm font-medium">Facture en retard</p>
                  <p className="text-xs text-muted-foreground">INV-001 - Échéance hier</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                Voir toutes les notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profil utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}{user?.lastName?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.fullName || 'Utilisateur'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/help">Aide & Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <UserButton afterSignOutUrl="/" />
                <span className="ml-2">Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Titre de la page (mobile) */}
      <div className="md:hidden px-4 pb-3">
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>
    </header>
  );
}