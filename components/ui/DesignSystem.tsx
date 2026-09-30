import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'quiet'
type SurfaceVariant = 'sheet' | 'card' | 'note' | 'highlight'

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={joinClasses('ds-label', className)}>{children}</div>
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={joinClasses('ds-button', `ds-button-${variant}`, className)} {...props}>{children}</button>
}

export function IconButton({ label, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className={joinClasses('ds-button ds-button-quiet', className)} {...props}>{children}</button>
}

export function Surface({ variant = 'sheet', className, children, ...props }: HTMLAttributes<HTMLElement> & { variant?: SurfaceVariant }) {
  return <section className={joinClasses(`surface-${variant}`, className)} {...props}>{children}</section>
}

export function Divider({ className }: { className?: string }) {
  return <hr className={joinClasses('ds-divider', className)} />
}

export function Field({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={joinClasses('ds-control ds-focus w-full', className)} {...props} />
}