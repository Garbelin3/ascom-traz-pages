
export const getRedirectByRole = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'motorista':
      return '/motorista/dashboard';
    case 'passageiro':
      return '/passageiro/dashboard';
    default:
      return '/';
  }
};
