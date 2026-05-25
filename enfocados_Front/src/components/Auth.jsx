import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../services/api';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Endpoints relativos a la baseURL con prefijo /api
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { nombre: formData.nombre, email: formData.email, password: formData.password };

    try {
      const response = await api.post(endpoint, payload);
      const data = response.data;
      
      // Guardamos el token y los datos básicos del usuario
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      localStorage.setItem('user', JSON.stringify(data.user || data));
      
      onLoginSuccess(data.user || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F7] p-6 font-sans">
      <div className="w-full max-w-[440px] overflow-hidden rounded-[2.5rem] bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/20">
        <div className="mb-10 text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          <p className="mt-3 text-[17px] text-[#86868B] leading-relaxed">
            {isLogin 
              ? 'Gestiona tu inventario con simplicidad.' 
              : 'Únete a la plataforma de control de stock.'}
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl bg-rose-50 p-4 text-center text-[14px] font-medium text-rose-600 animate-in fade-in zoom-in-95 duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <input
                name="nombre"
                type="text"
                required
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-[16px] text-[#1D1D1F] placeholder-[#86868B] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 border border-transparent focus:border-[#0071E3]"
              />
            </div>
          )}

          <div className="space-y-2">
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-[16px] text-[#1D1D1F] placeholder-[#86868B] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 border border-transparent focus:border-[#0071E3]"
            />
          </div>

          <div className="space-y-2">
            <input
              name="password"
              type="password"
              required
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[#F5F5F7] px-5 py-4 text-[16px] text-[#1D1D1F] placeholder-[#86868B] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 border border-transparent focus:border-[#0071E3]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#1D1D1F] py-4 text-[17px] font-medium text-white transition-all hover:bg-[#000000] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span>{isLogin ? 'Continuar' : 'Registrarse'}</span>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-[15px] font-medium text-[#0066CC] hover:underline"
          >
            {isLogin 
              ? '¿No tienes cuenta? Crea una ahora' 
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}
