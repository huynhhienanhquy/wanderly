import type { PropsWithChildren } from 'react';
import { Pressable, Text, View, type PressableProps, type ViewProps } from 'react-native';

export function Button({ children, className = '', ...props }: PropsWithChildren<PressableProps & { className?: string }>) {
  return <Pressable className={`min-h-11 items-center justify-center rounded-control bg-wanderly-600 px-5 active:opacity-80 ${className}`} accessibilityRole="button" {...props}>
    <Text className="text-base font-bold text-white">{children}</Text>
  </Pressable>;
}

export function Card({ children, className = '', ...props }: PropsWithChildren<ViewProps & { className?: string }>) {
  return <View className={`rounded-card border border-slate-200 bg-white p-5 ${className}`} {...props}>{children}</View>;
}

export const typography = {
  title: 'text-4xl font-bold tracking-tight text-wanderly-950',
  body: 'text-base leading-6 text-slate-600',
  label: 'text-sm font-bold text-wanderly-600',
} as const;
