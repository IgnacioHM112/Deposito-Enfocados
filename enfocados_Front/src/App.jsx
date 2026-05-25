import { useEffect, useMemo, useState } from 'react';
import api from './services/api';
import Auth from './components/Auth';
import { LogOut, User as UserIcon } from 'lucide-react';

const tabList = [
  { key: 'inventory', label: 'Inventario Actual' },
  { key: 'ingreso', label: 'Carga de Stock' },
  { key: 'estuches', label: 'Configurador de Estuches' },
  { key: 'salida', label: 'Despacho' }
];

const initialIngreso = {
  itemId: '',
  quantity: 1,
  motivo: 'Carga de stock manual'
};

const initialSalida = {
  itemId: '',
  quantity: 1,
  motivo: 'Despacho'
};

const initialEstuche = {
  name: '',
  components: [{ itemId: '', quantity: 1 }]
};

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ingreso, setIngreso] = useState(initialIngreso);
  const [estuche, setEstuche] = useState(initialEstuche);
  const [salida, setSalida] = useState(initialSalida);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchInventory();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const simpleItems = useMemo(
    () => inventory.filter((item) => item.tipo === 'materia_prima'),
    [inventory]
  );

  async function fetchInventory() {
    setLoading(true);
    try {
      const response = await api.get('/articulos');
      setInventory(response.data || []);
    } catch (error) {
      console.error(error);
      setAlertMessage('No se pudo cargar el inventario');
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  async function handleIngresoSubmit(event) {
    event.preventDefault();
    setAlertMessage('');

    try {
      setLoading(true);
      await api.post('/movimientos', {
        id_articulo: ingreso.itemId,
        tipo_movimiento: 'entrada',
        cantidad: ingreso.quantity,
        motivo: ingreso.motivo
      });
      await fetchInventory();
      setIngreso(initialIngreso);
      setAlertMessage('Ingreso registrado con éxito.');
      setActiveTab('inventory');
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Error al cargar stock');
    } finally {
      setLoading(false);
    }
  }

  async function handleEstucheSubmit(event) {
    event.preventDefault();
    setAlertMessage('');
    const validComponents = estuche.components.filter((item) => item.itemId && item.quantity > 0);
    if (!estuche.name.trim() || validComponents.length === 0) {
      setAlertMessage('Completa el nombre del estuche y agrega al menos un componente.');
      return;
    }

    try {
      setLoading(true);
      // Asumiendo que el ensamblaje también se registra como movimiento o tiene endpoint propio
      // Si es un producto nuevo, podrías necesitar crear el artículo primero.
      // Aquí simulamos un ensamblaje si el backend lo permite vía /movimientos o similar.
      await api.post('/movimientos', {
        nombre_nuevo_articulo: estuche.name.trim(),
        tipo_movimiento: 'ensamblaje',
        componentes: validComponents,
        motivo: 'Ensamblaje de estuche'
      });
      await fetchInventory();
      setEstuche(initialEstuche);
      setAlertMessage('Estuche ensamblado y guardado correctamente.');
      setActiveTab('inventory');
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Error al crear el estuche');
    } finally {
      setLoading(false);
    }
  }

  async function handleSalidaSubmit(event) {
    event.preventDefault();
    setAlertMessage('');
    if (!salida.itemId) {
      setAlertMessage('Selecciona un artículo para despachar.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/despachos', {
        id_articulo: salida.itemId,
        cantidad: salida.quantity,
        motivo: salida.motivo
      });
      await fetchInventory();
      setSalida(initialSalida);
      setAlertMessage('Despacho registrado correctamente.');
      setActiveTab('inventory');
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Stock insuficiente o error en el despacho.');
    } finally {
      setLoading(false);
    }
  }

  function updateEstucheComponent(index, field, value) {
    setEstuche((prev) => {
      const next = { ...prev, components: [...prev.components] };
      next.components[index] = { ...next.components[index], [field]: value };
      return next;
    });
  }

  function addComponentRow() {
    setEstuche((prev) => ({
      ...prev,
      components: [...prev.components, { itemId: '', quantity: 1 }]
    }));
  }

  function removeComponentRow(index) {
    setEstuche((prev) => ({
      ...prev,
      components: prev.components.filter((_, indexToRemove) => indexToRemove !== index)
    }));
  }

  const filteredInventory = inventory.filter((item) => {
    const term = searchQuery.toLowerCase();
    return (
      (item.nombre || '').toLowerCase().includes(term) ||
      (item.sku || '').toLowerCase().includes(term)
    );
  });

  if (!user) {
    return <Auth onLoginSuccess={setUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-10 font-sans">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-soft">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#1D1D1F] flex items-center justify-center text-white">
              <UserIcon size={24} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Stock Real-Time</p>
              <h1 className="text-2xl font-bold text-[#1D1D1F]">Hola, {user.nombre || 'Operador'}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700">
              {loading ? 'Sincronizando...' : formatDate(new Date().toISOString())}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {alertMessage && (
          <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-800 animate-in fade-in slide-in-from-top-2">
            {alertMessage}
          </div>
        )}

        <nav className="mb-6 grid gap-2 sm:grid-cols-4">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`rounded-3xl border px-4 py-3 text-left text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'inventory' && (
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#1D1D1F]">Inventario de Depósito</h2>
                <p className="text-sm text-slate-500">Listado oficial sincronizado con la base de datos.</p>
              </div>
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre o SKU..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">SKU</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Artículo</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Ubicación</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Stock Actual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 bg-white">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic">
                        No se encontraron registros en la base de datos.
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4 text-sm font-mono text-slate-500">{item.sku || 'S/N'}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">{item.nombre}</div>
                          <div className="text-[11px] text-slate-400 uppercase tracking-tighter">{item.tipo?.replace('_', ' ')}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{item.ubicacion || 'No asignada'}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center justify-center min-w-[3.5rem] rounded-xl px-3 py-1 text-sm font-bold ${
                            item.stock_actual <= (item.stock_minimo || 5) 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}>
                            {item.stock_actual}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'ingreso' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-[#1D1D1F]">Registrar Entrada</h2>
              <p className="mt-2 text-slate-500">Aumenta el stock de un artículo existente por compra o reposición.</p>
            </div>
            <form onSubmit={handleIngresoSubmit} className="space-y-8 rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700 ml-1">Seleccionar Artículo</span>
                  <select
                    value={ingreso.itemId}
                    onChange={(e) => setIngreso({ ...ingreso, itemId: e.target.value })}
                    required
                    className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                  >
                    <option value="">Buscar artículo...</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.sku}] {item.nombre} — {item.stock_actual} en stock
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700 ml-1">Cantidad a Ingresar</span>
                  <input
                    type="number"
                    min="1"
                    value={ingreso.quantity}
                    onChange={(e) => setIngreso({ ...ingreso, quantity: Number(e.target.value) })}
                    className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700 ml-1">Motivo del Movimiento</span>
                <input
                  type="text"
                  value={ingreso.motivo}
                  onChange={(e) => setIngreso({ ...ingreso, motivo: e.target.value })}
                  placeholder="Ej: Compra a proveedor X"
                  className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                />
              </label>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIngreso(initialIngreso)}
                  className="rounded-2xl px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-[#1D1D1F] px-10 py-4 text-sm font-bold text-white shadow-lg hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                >
                  Confirmar Entrada
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'estuches' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-[#1D1D1F]">Ensamblaje de Productos</h2>
              <p className="mt-2 text-slate-500">Crea productos terminados a partir de materias primas existentes.</p>
            </div>
            {/* Lógica de estuches simplificada para conectar con /movimientos tipo ensamblaje */}
            <form onSubmit={handleEstucheSubmit} className="space-y-8 rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
               <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700 ml-1">Nombre del Producto Terminado</span>
                <input
                  type="text"
                  value={estuche.name}
                  onChange={(e) => setEstuche({ ...estuche, name: e.target.value })}
                  required
                  placeholder="Ej: Estuche Premium"
                  className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                />
              </label>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 ml-1">Materias Primas Necesarias</p>
                  <button type="button" onClick={addComponentRow} className="text-xs font-bold text-[#0066CC] hover:underline">Añadir Componente</button>
                </div>
                {estuche.components.map((comp, idx) => (
                  <div key={idx} className="grid gap-4 sm:grid-cols-[2fr_1fr_auto] items-center bg-[#F5F5F7] p-4 rounded-2xl">
                    <select
                      value={comp.itemId}
                      onChange={(e) => updateEstucheComponent(idx, 'itemId', e.target.value)}
                      className="bg-transparent text-sm outline-none"
                    >
                      <option value="">Seleccionar materia prima...</option>
                      {simpleItems.map(item => <option key={item.id} value={item.id}>{item.nombre} ({item.stock_actual} uds)</option>)}
                    </select>
                    <input
                      type="number"
                      min="1"
                      value={comp.quantity}
                      onChange={(e) => updateEstucheComponent(idx, 'quantity', Number(e.target.value))}
                      className="bg-transparent text-sm outline-none text-right font-bold"
                    />
                    <button type="button" onClick={() => removeComponentRow(idx)} className="text-rose-500 font-bold px-2">×</button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-[#1D1D1F] px-10 py-4 text-sm font-bold text-white shadow-lg hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                >
                  Registrar Ensamblaje
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'salida' && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-[#1D1D1F]">Despacho / Salida</h2>
              <p className="mt-2 text-slate-500">Registra el egreso de mercadería por ventas o consumo.</p>
            </div>
            <form onSubmit={handleSalidaSubmit} className="space-y-8 rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700 ml-1">Artículo a Despachar</span>
                  <select
                    value={salida.itemId}
                    onChange={(e) => setSalida({ ...salida, itemId: e.target.value })}
                    required
                    className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                  >
                    <option value="">Buscar artículo...</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.sku}] {item.nombre} — {item.stock_actual} uds
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700 ml-1">Cantidad a Salir</span>
                  <input
                    type="number"
                    min="1"
                    value={salida.quantity}
                    onChange={(e) => setSalida({ ...salida, quantity: Number(e.target.value) })}
                    className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700 ml-1">Motivo / Referencia</span>
                <input
                  type="text"
                  value={salida.motivo}
                  onChange={(e) => setSalida({ ...salida, motivo: e.target.value })}
                  placeholder="Ej: Venta #1023 o Consumo interno"
                  className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-sm text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 border border-transparent focus:border-slate-200 transition-all"
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-[#1D1D1F] px-10 py-4 text-sm font-bold text-white shadow-lg hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                >
                  Registrar Salida
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
