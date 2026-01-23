// src/components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Calendar,
  Settings,
  HelpCircle,
  PlusCircle,
  Bell,
  DollarSign,
  Download,
  CheckCircle,
  Clock,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarProvider as ShadcnSidebarProvider,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserButton, useUser } from '@clerk/nextjs';

// Navigation items
const navItems = [
  {
    title: 'Navigation',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
      },
      {
        title: 'Clients',
        url: '/dashboard/clients',
        icon: Users,
        badge: '24',
      },
      {
        title: 'Factures',
        url: '/dashboard/invoices',
        icon: FileText,
        badge: '3',
      },
      {
        title: 'Paiements',
        url: '/dashboard/payments',
        icon: CreditCard,
      },
      {
        title: 'Rapports',
        url: '/dashboard/reports',
        icon: BarChart3,
      },
      {
        title: 'Calendrier',
        url: '/dashboard/calendar',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Outils',
    items: [
      {
        title: 'Téléchargements',
        url: '/dashboard/exports',
        icon: Download,
      },
      {
        title: 'Acomptes',
        url: '/dashboard/advances',
        icon: DollarSign,
      },
    ],
  },
];

// Quick stats
const quickStats = [
  { label: 'Chiffre du mois', value: '2 450 €', icon: DollarSign },
  { label: 'En attente', value: '3 factures', icon: Clock },
  { label: 'Payées', value: '12 factures', icon: CheckCircle },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <ShadcnSidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-white text-xl">F</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Facturation Pro</h1>
              <p className="text-sm text-muted-foreground">Gestion simplifiée</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3">
          {/* Bouton Nouvelle Facture */}
          <div className="mb-6 px-2">
            <Link href="/dashboard/invoices/create">
              <Button className="w-full" size="lg">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouvelle facture
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          {navItems.map((group) => (
            <SidebarGroup key={group.title} className="px-1">
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                    
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.url} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge 
                                variant={item.title === 'Factures' ? "destructive" : "secondary"}
                                className="ml-auto"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

          <SidebarSeparator className="my-4" />

          {/* Statistiques rapides */}
          <SidebarGroup className="px-1">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Vue d'ensemble
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3 p-2">
                {quickStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                      <span className="text-sm font-medium">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {user?.fullName || user?.firstName || 'Utilisateur'}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Link href="/dashboard/settings" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-3 w-3" />
                Paramètres
              </Button>
            </Link>
            <Link href="/dashboard/help" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <HelpCircle className="mr-2 h-3 w-3" />
                Aide
              </Button>
            </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
    </ShadcnSidebarProvider>
  );
}