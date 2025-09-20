import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'Leads', title: 'Leads', href: paths.dashboard.Leads, icon: 'users' },
  { key: 'Projects', title: 'Projetcs', href: paths.dashboard.project, icon: 'user' },
  { key: 'Properties', title: 'Properties', href: paths.dashboard.properties, icon: 'plugs-connected' },
{
  key: 'Jobs',
  title: 'Jobs',
  icon: 'gear-six',
  items: [
    { key: 'MyApplications', title: 'My Applications', href: paths.dashboard.myApplications },
    { key: 'AllApplicants', title: 'All Applicants', href: paths.dashboard.allApplicants },
    { key: 'JobsList', title: 'Jobs', href: paths.dashboard.jobs },
    { key: 'FreelnacerJobs', title: 'Freelnacer Jobs', href: paths.dashboard.freelancerJobs },
  ]
}
,
  { key: 'News', title: 'News', href: paths.dashboard.news, icon: 'plugs-connected' },
  { key: 'Persons', title: 'Persons', href: paths.dashboard.persons, icon: 'users' },
] satisfies NavItemConfig[];
