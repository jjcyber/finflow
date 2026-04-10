const styles = {
  page: { padding: 28 },
  headline: { background: 'linear-gradient(135deg,#141824 0%,#1a1e2e 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '24px 28px', marginBottom: 24, position: 'relative', overflow: 'hidden' },
  headlinePhrase: { fontSize: 13, color: '#8a90a8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 },
  headlineAmount: { fontWeight: 800, fontSize: 38, color: '#4dffc3', letterSpacing: '-1px', lineHeight: 1 },
  headlineSub: { marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 32, flexWrap: 'wrap' },
  hsLabel: { fontSize: 11, color: '#5a5f74', textTransform: 'uppercase', letterSpacing: '0.6px' },
  hsVal: { fontWeight: 700, fontSize: 18, marginTop: 2 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 },
  card: { background: '#13161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 18, transition: 'transform 0.15s' },
  cardIcon: { width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 12 },
  cardLabel: { fontSize: 11, color: '#5a5f74', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 },
  cardAmount: { fontWeight: 700, fontSize: 20 },
  cardNote: { fontSize: 11, color: '#5a5f74', marginTop: 4 },
  secHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  secTitle: { fontWeight: 700, fontSize: 17 },
  list: { display: 'flex', flexDirection: 'column', gap: 10 },
  listItem: { background: '#13161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 },
  listIcon: { width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, background: '#1a1e29' },
  listName: { fontSize: 14, fontWeight: 600 },
  listMeta: { fontSize: 12, color: '#8a90a8', marginTop: 2 },
  listRight: { textAlign: 'right', flexShrink: 0, marginLeft: 'auto' },
  listAmount: { fontWeight: 700, fontSize: 16 },
  listDate: { fontSize: 11, color: '#5a5f74', marginTop: 2 },
  badge: { display: 'inline-flex', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '3px 8px', borderRadius: 20 },
  empty: { textAlign: 'center', padding: '40px 20px', color: '#5a5f74', fontSize: 14 },
}

function fmtUSD(n) { return '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) }
function fmtBs(n) { return 'Bs. ' + Math.round(n || 0).toLocaleString('es-VE') }

export default function Dashboard({ accounts, rate, expenses, receivables, payables, opportunities }) {
  // Calculos
  const usdAccounts = (accounts || []).filter(a => a.currency === 'USD' && a.type !== 'credit')
  const vesAccounts = (accounts || []).filter(a => a.currency === 'VES')
  const creditAccounts = (accounts || []).filter(a => a.type === 'credit')

  const totalUSA = usdAccounts.reduce((s, a) => s + Number(a.balance || 0), 0)
  const totalVES = vesAccounts.reduce((s, a) => s + Number(a.balance || 0), 0)
  const totalVESusd = totalVES / rate
  const totalDeudaTarjetas = creditAccounts.reduce((s, a) => s + Number(a.balance || 0), 0)

  const gastosPendientes = (expenses || []).filter(e => e.status === 'pending')
  const totalGastosPend = gastosPendientes.reduce((s, e) => s + Number(e.amount || 0), 0)

  const cobrarPendiente = (receivables || []).filter(r => r.status === 'pending')
  const totalCobrar = cobrarPendiente.reduce((s, r) => s + Number(r.amount || 0), 0)

  const pagarPendiente = (payables || []).filter(p => p.status === 'pending')
  const totalPagar = pagarPendiente.reduce((s, p) => s + Number(p.amount || 0), 0)

  const totalOpp = (opportunities || []).reduce((s, o) => s + (Number(o.amount || 0) * (o.probability || 0) / 100), 0)

  const saldoHoy = totalUSA + totalVESusd - totalDeudaTarjetas
  const siCobras = saldoHoy + totalCobrar
  const proyeccion = siCobras - totalGastosPend - totalPagar + totalOpp

  return (
    <div style={styles.page}>

      {/* HEADLINE */}
      <div style={styles.headline}>
        <div style={styles.headlinePhrase}>Hoy deberías tener (USD total)</div>
        <div style={styles.headlineAmount}>{fmtUSD(saldoHoy)}</div>
        <div style={styles.headlineSub}>
          <div>
            <div style={styles.hsLabel}>Si cobras todo</div>
            <div style={{ ...styles.hsVal, color: '#4dffc3' }}>{fmtUSD(siCobras)}</div>
          </div>
          <div>
            <div style={styles.hsLabel}>Gastos pendientes</div>
            <div style={{ ...styles.hsVal, color: '#ff6b6b' }}>{fmtUSD(totalGastosPend)}</div>
          </div>
          <div>
            <div style={styles.hsLabel}>Venezuela (VES)</div>
            <div style={{ ...styles.hsVal, color: '#f97316' }}>{fmtBs(totalVES)}</div>
          </div>
          <div>
            <div style={styles.hsLabel}>Venezuela en USD</div>
            <div style={{ ...styles.hsVal, color: '#eef0f5' }}>≈ {fmtUSD(totalVESusd)}</div>
          </div>
          <div>
            <div style={styles.hsLabel}>Proyección final</div>
            <div style={{ ...styles.hsVal, color: proyeccion > 0 ? '#4dffc3' : '#ff6b6b' }}>{fmtUSD(proyeccion)}</div>
          </div>
        </div>
      </div>

      {/* SUMMARY GRID */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={{ ...styles.cardIcon, background: 'rgba(77,255,195,0.12)' }}>🏦</div>
          <div style={styles.cardLabel}>Bancos USA</div>
          <div style={{ ...styles.cardAmount, color: '#4dffc3' }}>{fmtUSD(totalUSA)}</div>
          <div style={styles.cardNote}>{usdAccounts.length} cuentas</div>
        </div>
        <div style={styles.card}>
          <div style={{ ...styles.cardIcon, background: 'rgba(249,115,22,0.12)' }}>🇻🇪</div>
          <div style={styles.cardLabel}>Venezuela ≈ USD</div>
          <div style={{ ...styles.cardAmount, color: '#f97316' }}>{fmtUSD(totalVESusd)}</div>
          <div style={styles.cardNote}>{fmtBs(totalVES)}</div>
        </div>
        <div style={styles.card}>
          <div style={{ ...styles.cardIcon, background: 'rgba(255,107,107,0.12)' }}>💳</div>
          <div style={styles.cardLabel}>Deuda Tarjetas</div>
          <div style={{ ...styles.cardAmount, color: '#ff6b6b' }}>-{fmtUSD(totalDeudaTarjetas)}</div>
          <div style={styles.cardNote}>{creditAccounts.length} tarjetas</div>
        </div>
        <div style={styles.card}>
          <div style={{ ...styles.cardIcon, background: 'rgba(255,217,123,0.12)' }}>💰</div>
          <div style={styles.cardLabel}>Por Cobrar</div>
          <div style={{ ...styles.cardAmount, color: '#ffd97b' }}>{fmtUSD(totalCobrar)}</div>
          <div style={styles.cardNote}>{cobrarPendiente.length} pendientes</div>
        </div>
        <div style={styles.card}>
          <div style={{ ...styles.cardIcon, background: 'rgba(123,142,255,0.12)' }}>📋</div>
          <div style={styles.cardLabel}>Gastos Pendientes</div>
          <div style={{ ...styles.cardAmount, color: '#7b8eff' }}>{fmtUSD(totalGastosPend)}</div>
          <div style={styles.cardNote}>{gastosPendientes.length} sin pagar</div>
        </div>
        <div style={styles.card}>
          <div style={{ ...styles.cardIcon, background: 'rgba(255,217,123,0.12)' }}>🎯</div>
          <div style={styles.cardLabel}>Oportunidades</div>
          <div style={{ ...styles.cardAmount, color: '#ffd97b' }}>{fmtUSD(totalOpp)}</div>
          <div style={styles.cardNote}>ponderado {(opportunities||[]).length} prospectos</div>
        </div>
      </div>

      {/* POR COBRAR */}
      <div style={styles.secHeader}>
        <div style={styles.secTitle}>💰 Por Cobrar</div>
        <span style={{ fontSize: 13, color: '#8a90a8' }}>{fmtUSD(totalCobrar)} pendiente</span>
      </div>
      <div style={styles.list}>
        {cobrarPendiente.length === 0 && <div style={styles.empty}>No hay cuentas por cobrar pendientes</div>}
        {cobrarPendiente.slice(0, 4).map(r => (
          <div key={r.id} style={styles.listItem}>
            <div style={styles.listIcon}>💼</div>
            <div>
              <div style={styles.listName}>{r.client}</div>
              <div style={styles.listMeta}>{r.concept} · {r.expected_date || 'Sin fecha'}</div>
            </div>
            <div style={styles.listRight}>
              <div style={{ ...styles.listAmount, color: '#4dffc3' }}>{fmtUSD(r.amount)}</div>
              <div style={styles.listDate}>
                <span style={{ ...styles.badge, background: 'rgba(255,217,123,0.12)', color: '#ffd97b' }}>Pendiente</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POR PAGAR */}
      <div style={{ ...styles.secHeader, marginTop: 24 }}>
        <div style={styles.secTitle}>⚠️ Por Pagar</div>
        <span style={{ fontSize: 13, color: '#8a90a8' }}>{fmtUSD(totalPagar)} pendiente</span>
      </div>
      <div style={styles.list}>
        {pagarPendiente.length === 0 && <div style={styles.empty}>No hay cuentas por pagar pendientes</div>}
        {pagarPendiente.slice(0, 3).map(p => (
          <div key={p.id} style={styles.listItem}>
            <div style={styles.listIcon}>💸</div>
            <div>
              <div style={styles.listName}>{p.concept}</div>
              <div style={styles.listMeta}>{p.due_date || 'Sin fecha'} · {p.priority === 'high' ? '🔴 Alta' : p.priority === 'medium' ? '🟡 Media' : '🟢 Normal'}</div>
            </div>
            <div style={styles.listRight}>
              <div style={{ ...styles.listAmount, color: '#ff6b6b' }}>{fmtUSD(p.amount)}</div>
              <div style={styles.listDate}>
                <span style={{ ...styles.badge, background: 'rgba(255,107,107,0.12)', color: '#ff6b6b' }}>
                  {p.priority === 'high' ? 'Urgente' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
