export type Theme = 'light' | 'dark';

export const resolveTheme = (savedTheme: string | null, prefersDark: boolean): Theme => {
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return prefersDark ? 'dark' : 'light';
};

export const applyTheme = (root: Pick<HTMLElement, 'dataset'>, theme: Theme) => {
  root.dataset.theme = theme;
};
