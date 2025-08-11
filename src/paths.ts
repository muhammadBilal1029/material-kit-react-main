export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up',sendotp:"/auth/sign-up/send-otp", signUpBussiness: '/auth/signupbussiness', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    news: '/dashboard/news',
    Leads: '/dashboard/Leads',
    project: '/dashboard/project',
    addproject: '/dashboard/project/addproject',
    specificLeads: '/dashboard/project/specific-leads',
    properties: '/dashboard/properties',
    jobs: '/dashboard/jobs',
    myApplications: '/dashboard/jobs/myApplications',
    allApplicants: '/dashboard/jobs/allApplicants',
    freelancerJobs: '/dashboard/jobs/freelancerJobs',

  },
  errors: { notFound: '/errors/not-found' },
} as const;
