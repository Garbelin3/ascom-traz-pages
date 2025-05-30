
export const getRedirectByRole = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'entregador':
      return '/entregador/dashboard';
    case 'comercio':
      return '/comercio/dashboard';
    default:
      return '/';
  }
};
