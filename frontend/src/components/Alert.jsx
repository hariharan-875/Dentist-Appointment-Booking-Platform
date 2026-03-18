export function Alert({ variant = 'info', title, children }) {
  const styles = {
    info: 'border-sky-200 bg-sky-50 text-sky-900',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    error: 'border-rose-200 bg-rose-50 text-rose-900',
  }

  return (
    <div className={`rounded-lg border p-3 ${styles[variant] || styles.info}`}>
      {title ? <div className="mb-1 font-medium">{title}</div> : null}
      <div className="text-sm">{children}</div>
    </div>
  )
}

