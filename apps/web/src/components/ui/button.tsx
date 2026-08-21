import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg';

export const buttonVariants = ({ variant = 'default', size = 'default' }: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}) => [
  'inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variant === 'default' && 'bg-[#277253] text-white hover:bg-[#1f5c43]',
  variant === 'outline' && 'border border-[#277253] text-[#277253] hover:bg-[#e6f2ec]',
  variant === 'ghost' && 'text-[#277253] hover:bg-[#e6f2ec]',
  size === 'sm' && 'h-9 px-3 text-sm',
  size === 'default' && 'h-11 px-5',
  size === 'lg' && 'h-12 px-7 text-lg',
].filter(Boolean).join(' ');

export function Button({ className = '', variant, size, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={`${buttonVariants({ variant, size })} ${className}`.trim()} {...props} />;
}
