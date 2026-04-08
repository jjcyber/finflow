import { useState } from 'react'

const s = {
  page: { padding: 28 },
  banner: { background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 14, padding: '14px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  bannerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  bannerTitle: { fontSize: 13, fontWeight: 600, color: '#f97316' },
  bannerSub: { fontSize: 11, color: '#8a90a8', marginTop: 1 },
  sectionTitle: { fontWeight: 700, fontSize: 17, marginBottom: 16, marginTop: 24, color: '#eef0f5' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 },
  card: { background: '#13161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 18, position: 'relative' },
  cardVes: { background: '#13161e', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 16, padding: 18, position: 'relative' },
  cardCredit: { background: '#13161e', border: '1px solid rgba(255,107,107,0.2)', borderRadius: 16, padding: 18, position: 'relative' },
  cardHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 },
  cardName: { fontSize: 14, fontWeight: 600, marginBottom: 2, color: '#eef0f5' },
  cardLast: { fontSize: 11, color: '#5a5f74' },
  editBtn: { width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, flexShrink: 0 },
  chip: { fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', padding: '3px 8px', borderRadius: 20, fontWeight: 600 },
  chipBank: { background: 'rgba(123,142,255,0.15)', color: '#7b8eff' },
  chipCredit: { background: 'rgba(255,107,107,0.15)', color: '#ff6b6b' },
  chipCash: { background: 'rgba(77,255,195,0.15)', color: '#4dffc3' },
  chipSavings: { background: 'rgba(255,217,123,0.15)', color: '#ffd97b' },
  chipVes: { background: 'rgba(249,115,22,0.15)', color: '#f97316' },
  amount: { fontFamily: 'sans-serif', fontSize: 22, fontWeight: 700, color: '#eef0f5' },
  amountNeg: { fontFamily: 'sans-serif', fontSize: 22, fontWeight: 700, color: '#ff6b6b' },
  amountVes: { fontFamily: 'sans-serif', fontSize: 20, fontWeight: 700, color: '#f97316' },
  amountVesSub: { fontSize: 12, color: '#8a90a8', marginTop: 3 },
  cardFooter: { marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  progressWrap: { height: 4, background: '#222738', borderRadius: 10, overflow: 'hidden', marginTop: 8 },
  tasaBadge: { fontSize: 10, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', padding: '2px 8px', borderRadius: 20 },
  addBtn: { width: '100%', marginTop: 14, padding: 12, background: 'rgba(77,255,195,0.08)', border: '1px dashed rgba(77,255,195,0.3)', borderRadius: 12, color: '#4dffc3', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalBox: { background: '#13161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 380, maxHeight: '90vh', overflowY: 'auto' },
  modalTitle: { fontWeight: 700, fontSize: 18, marginBottom: 20, color: '#eef0f5' },
  field: { marginBottom: 14 },
  label: { display: 'block', fontSize: 12, color: '#8a90a8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.6px' },
  input: { width: '100%', background: '#1a1e29', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', color: '#eef0f5', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', background: '#1a1e29', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', color: '#eef0f5', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  hint: { fontSize: 11, color: '#5a5f74', marginTop: 4 },
  btnPrimary: { width: '100%', padding: 12, background: '#4dffc3', border: 'none', borderRadius: 10, color: '#0d0f14', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 4 },
  btnSecondary: { width: '100%', padding: 11, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#8a90a8', fontSize: 14, cursor: 'pointer', marginTop: 8 },
  btnDanger: { width: '100%', padding: 11, background: 'transparent', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 10, color: '#ff6b6b', fontSize: 14, cursor: 'pointer', marginTop: 8 },
  divider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '16px 0' },
  creditInfo: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 },
  creditInfoItem: { background: '#1a1e29', borderRadius: 10, padding: '10px 12px' },
  creditInfoLabel: { fontSize: 10, color: '#5a5f74', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 },
  creditInfoVal: { fontSize: 15, fontWeight: 700 },
}

const chipStyle = (type) => {
  const map = { bank: s.chipBank, credit: s.chipCredit, cash: s.chipCash, savings: s.chipSavings, ves: s.chipVes }
  return { ...s.chip, ...(map[type] || s.chipBank) }
}
const chipLabel = { bank: 'Banco', credit: 'Crédito', cash: 'Efectivo', savings: 'Ahorros', ves: 'VES' }

function fmtBs(bs) { return 'Bs. ' + Math.round(bs).toLocaleString('es-VE') }
function fmtUSD(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 }) }

const emptyForm = { name: '', type: 'bank', currency: 'USD', balance: '', credit_limit: '', available: '', notes: '' }

export default function Cuentas({ accounts, addAccount, updateAccount, deleteAccount, rate }) {
  const [showModal, setShowModal] = useState(false)
  const [editAccount, setEditAccount] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const usaAccounts = accounts.filter(a => a.currency === 'USD' && a.type !== 'credit')
  const creditAccounts = accounts.filter(a => a.type === 'credit')
  const vesAccounts = accounts.filter(a => a.currency === 'VES')

  const openAdd = () => {
    setEditAccount(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (account) => {
    setEditAccount(account)
    setForm({
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: account.balance,
      credit_limit: account.credit_limit || '',
      available: account.available || '',
      notes: account.notes || ''
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name) return
    setSaving(true)
    const payload = {
      name: form.name,
      type: form.type,
      currency: form.type === 'ves' ? 'VES' : 'USD',
      balance: form.type === 'credit'
        ? parseFloat(form.credit_limit || 0) - parseFloat(form.available || 0)
        : parseFloat(form.balance || 0),
      credit_limit: parseFloat(form.credit_limit || 0),
      available: parseFloat(form.available || 0),
      notes: form.notes,
    }
    if (editAccount) {
      await updateAccount(editAccount.id, payload)
    } else {
      await addAccount({ ...payload, sort_order: accounts.length })
    }
    setShowModal(false)
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!editAccount) return
    if (!window.confirm(`¿Eliminar "${editAccount.name}"?`)) return
    await deleteAccount(editAccount.id)
    setShowModal(false)
  }

  const isCredit = form.type === 'credit'
  const isVes = form.type === 'ves'
  const debtCalc = isCredit && form.credit_limit && form.available
    ? parseFloat(form.credit_limit) - parseFloat(form.available)
    : null

  const AccountCard = ({ account }) => {
    const isVesCard = account.currency === 'VES'
    const isCreditCard = account.type === 'credit'
    const debt = isCreditCard ? (account.credit_limit - account.available) : 0
    const usedPct = isCreditCard && account.credit_limit > 0
      ? Math.min((debt / account.credit_limit) * 100, 100) : 0
    const barColor = usedPct > 70 ? '#ff6b6b' : usedPct > 40 ? '#ffd97b' : '#4dffc3'

    return (
      <div style={isCreditCard ? s.cardCredit : isVesCard ? s.cardVes : s.card}>
        <div style={s.cardHeader}>
          <div>
            <div style={s.cardName}>{account.name}</div>
            <div style={s.cardLast}>{account.last_movement ? `Últ. mov: ${account.last_movement}` : 'Sin movimientos'}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={chipStyle(account.type)}>{chipLabel[account.type]}</span>
            <div style={s.editBtn} onClick={() => openEdit(account)}>✏️</div>
          </div>
        </div>

        {isVesCard ? (
          <>
            <div style={s.amountVes}>{fmtBs(account.balance)}</div>
            <div style={s.amountVesSub}>≈ <span style={{ color: '#4dffc3', fontWeight: 600 }}>{fmtUSD(account.balance / rate)} USD</span></div>
          </>
        ) : isCreditCard ? (
          <>
            <div style={s.amountNeg}>-{fmtUSD(debt)}</div>
            <div style={{ ...s.progressWrap, marginTop: 10 }}>
              <div style={{ height: '100%', borderRadius: 10, background: barColor, width: `${usedPct}%`, transition: 'width 0.4s' }} />
            </div>
            <div style={s.creditInfo}>
              <div style={s.creditInfoItem}>
                <div style={s.creditInfoLabel}>Deuda</div>
                <div style={{ ...s.creditInfoVal, color: '#ff6b6b' }}>{fmtUSD(debt)}</div>
              </div>
              <div style={s.creditInfoItem}>
                <div style={s.creditInfoLabel}>Disponible</div>
                <div style={{ ...s.creditInfoVal, color: '#4dffc3' }}>{fmtUSD(account.available)}</div>
              </div>
              <div style={s.creditInfoItem}>
                <div style={s.creditInfoLabel}>Límite</div>
                <div style={{ ...s.creditInfoVal, color: '#8a90a8' }}>{fmtUSD(account.credit_limit)}</div>
              </div>
              <div style={s.creditInfoItem}>
                <div style={s.creditInfoLabel}>Usado</div>
                <div style={{ ...s.creditInfoVal, color: usedPct > 70 ? '#ff6b6b' : '#ffd97b' }}>{usedPct.toFixed(0)}%</div>
              </div>
            </div>
          </>
        ) : (
          <div style={s.amount}>{fmtUSD(account.balance)}</div>
        )}

        <div style={s.cardFooter}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8a90a8' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4dffc3', display: 'inline-block' }} />
            {account.notes || 'Activa'}
          </div>
          {isVesCard && <span style={s.tasaBadge}>@ Bs. {rate}/$</span>}
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>

      {/* VES Banner */}
      <div style={s.banner}>
        <div style={s.bannerLeft}>
          <span style={{ fontSize: 22 }}>🇻🇪</span>
          <div>
            <div style={s.bannerTitle}>Tasa de cambio activa</div>
            <div style={s.bannerSub}>Los bolívares se convierten automáticamente a USD</div>
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#f97316' }}>
          Bs. {rate}
          <div style={{ fontSize: 11, fontWeight: 400, color: '#5a5f74', textAlign: 'right' }}>por 1 USD</div>
        </div>
      </div>

      {/* USA */}
      {usaAccounts.length > 0 && <>
        <div style={s.sectionTitle}>🏦 Bancos USA</div>
        <div style={s.grid}>{usaAccounts.map(a => <AccountCard key={a.id} account={a} />)}</div>
      </>}

      {/* Venezuela */}
      {vesAccounts.length > 0 && <>
        <div style={s.sectionTitle}>🇻🇪 Venezuela</div>
        <div style={s.grid}>{vesAccounts.map(a => <AccountCard key={a.id} account={a} />)}</div>
      </>}

      {/* Credit */}
      {creditAccounts.length > 0 && <>
        <div style={s.sectionTitle}>💳 Tarjetas de Crédito</div>
        <div style={s.grid}>{creditAccounts.map(a => <AccountCard key={a.id} account={a} />)}</div>
      </>}

      <button style={s.addBtn} onClick={openAdd}>+ Agregar cuenta</button>

      {/* MODAL */}
      {showModal && (
        <div style={s.modal} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={s.modalBox}>
            <div style={s.modalTitle}>{editAccount ? `✏️ Editar — ${editAccount.name}` : '+ Nueva Cuenta'}</div>

            <div style={s.field}>
              <label style={s.label}>Nombre</label>
              <input style={s.input} placeholder="Chase Checking, Mercantil..." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>

            <div style={s.field}>
              <label style={s.label}>Tipo</label>
              <select style={s.select} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="bank">Banco (USD)</option>
                <option value="credit">Tarjeta de Crédito</option>
                <option value="cash">Efectivo</option>
                <option value="savings">Ahorros</option>
                <option value="ves">Venezuela (VES)</option>
              </select>
            </div>

            {isCredit ? (
              <>
                <div style={s.field}>
                  <label style={s.label}>Límite de crédito</label>
                  <input style={s.input} type="number" placeholder="1300.00" value={form.credit_limit} onChange={e => setForm({ ...form, credit_limit: e.target.value })} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Disponible actualmente</label>
                  <input style={s.input} type="number" placeholder="300.00" value={form.available} onChange={e => setForm({ ...form, available: e.target.value })} />
                  <div style={s.hint}>Lo que te queda libre para usar</div>
                </div>
                {debtCalc !== null && (
                  <div style={{ background: 'rgba(255,107,107,0.06)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#8a90a8', marginBottom: 14 }}>
                    Deuda calculada: <strong style={{ color: '#ff6b6b' }}>{fmtUSD(debtCalc)}</strong>
                  </div>
                )}
              </>
            ) : (
              <div style={s.field}>
                <label style={s.label}>{isVes ? 'Saldo en Bolívares (Bs.)' : 'Saldo (USD)'}</label>
                <input style={s.input} type="number" placeholder={isVes ? '65000' : '1200.00'} value={form.balance} onChange={e => setForm({ ...form, balance: e.target.value })} />
                {isVes && form.balance && (
                  <div style={s.hint}>≈ {fmtUSD(parseFloat(form.balance) / rate)} USD @ Bs. {rate}</div>
                )}
              </div>
            )}

            <div style={s.field}>
              <label style={s.label}>Notas (opcional)</label>
              <input style={s.input} placeholder="****4821, reservado, cierre día 15..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>

            <button style={s.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando...' : '✓ Guardar'}
            </button>
            <button style={s.btnSecondary} onClick={() => setShowModal(false)}>Cancelar</button>
            {editAccount && (
              <button style={s.btnDanger} onClick={handleDelete}>🗑 Eliminar cuenta</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
