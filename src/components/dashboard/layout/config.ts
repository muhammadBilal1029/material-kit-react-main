import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'Leads', title: 'Leads', href: paths.dashboard.Leads, icon: 'users' },
  { key: 'Projects', title: 'Projetcs', href: paths.dashboard.project, icon: 'users' },
  { key: 'Properties', title: 'Properties', href: paths.dashboard.properties, icon: 'plugs-connected' },
  { key: 'Jobs', title: 'Jobs', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'News', title: 'News', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
