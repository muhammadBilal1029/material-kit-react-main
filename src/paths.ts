export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    news: '/dashboard/news',
    Leads: '/dashboard/Leads',
    project: '/dashboard/project',
    addproject: '/dashboard/project/addproject',
    properties: '/dashboard/properties',
    jobs: '/dashboard/jobs',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
