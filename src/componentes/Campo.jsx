import './Campo.css'
export default function Campo({ label, as = 'input', children, ...props }) {
  const Tag = as
  return (
    <label className="f">
      <span>{label}</span>
      <Tag {...props}>{children}</Tag>
    </label>
  )
}
