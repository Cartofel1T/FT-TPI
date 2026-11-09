import './Boton.css'
export default function Boton({ variant = 'solid', size, className = '', children, ...props }) {
  const cls = ['btn', variant === 'ghost' && 'ghost', size === 'sm' && 'sm', className].filter(Boolean).join(' ')
  return <button className={cls} {...props}>{children}</button>
}