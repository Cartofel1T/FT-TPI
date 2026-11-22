import { Link } from 'wouter'
import './Boton.css'

export default function Boton({ variant = 'solid', size, className = '', href, children, ...props }) {
  const cls = ['btn', variant === 'ghost' && 'ghost', size === 'sm' && 'sm', className].filter(Boolean).join(' ')
  if (href) return <Link href={href} className={cls} {...props}>{children}</Link>
  return <button className={cls} {...props}>{children}</button>
}
