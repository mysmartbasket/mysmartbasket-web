import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBasket,
  Search,
  Users,
  TrendingDown,
  Clock,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Apple,
  Play,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Zap,
  Leaf,
} from 'lucide-react';

const STORES = [
  { label: 'FreshMart',   price: '41,20€', status: 'Mejor precio', width: '70%',  color: 'bg-brand-green', active: true  },
  { label: 'MaxiMarket',  price: '43,80€', status: '+2.60€',        width: '85%',  color: 'bg-slate-200',   active: false },
  { label: 'EcoSuper',    price: '44,30€', status: '+3.10€',        width: '100%', color: 'bg-slate-200',   active: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setMobileMenuOpen(false);

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#top" className="flex items-center gap-2.5 group">
          <img
            src="/android-chrome-192x192.png"
            alt="MySmartBasket logo"
            className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-brand-black">MySmartBasket</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#problem"      className="hover:text-brand-green transition-colors">Problema</a>
          <a href="#solution"     className="hover:text-brand-green transition-colors">Solución</a>
          <a href="#features"     className="hover:text-brand-green transition-colors">Funcionalidades</a>
          <a href="#how-it-works" className="hover:text-brand-green transition-colors">Cómo funciona</a>
          <a
            href="#waitlist"
            className="bg-brand-black text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
          >
            Acceso anticipado
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 p-2"
          onClick={() => setMobileMenuOpen(v => !v)}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#problem"      onClick={close} className="text-base font-medium text-slate-700 hover:text-brand-green transition-colors">Problema</a>
            <a href="#solution"     onClick={close} className="text-base font-medium text-slate-700 hover:text-brand-green transition-colors">Solución</a>
            <a href="#features"     onClick={close} className="text-base font-medium text-slate-700 hover:text-brand-green transition-colors">Funcionalidades</a>
            <a href="#how-it-works" onClick={close} className="text-base font-medium text-slate-700 hover:text-brand-green transition-colors">Cómo funciona</a>
            <a
              href="#waitlist"
              onClick={close}
              className="w-full bg-brand-green text-white py-4 rounded-xl font-bold mt-2 shadow-lg shadow-green-100 text-center block"
            >
              Unirme a la lista de espera
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, title, subtitle, centered = false }: { children?: React.ReactNode, title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <span className="text-brand-green font-bold tracking-widest text-xs uppercase mb-3 block">{title}</span>
    <h2 className="text-3xl md:text-5xl font-bold text-brand-black tracking-tight mb-6">{subtitle}</h2>
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-green-100 hover:-translate-y-1 transition-all duration-200">
    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-brand-green mb-6">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-brand-black mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const SCREENS = [
  {
    tab: 'Listas',
    tabIcon: <ShoppingBasket size={14} />,
    content: (
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-bold text-slate-900">Hola, Mario 👋</p>
            <p className="text-[10px] text-slate-400">2 listas activas</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-white text-[9px] font-bold">MC</div>
        </div>
        {[
          { name: 'Compra Semanal', items: 12, price: '42,50€', saving: '8,00€' },
          { name: 'Mercadona Hoy', items: 7, price: '18,90€', saving: '3,40€' },
        ].map((l, i) => (
          <div key={i} className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <ShoppingBasket size={14} className="text-brand-green" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold truncate">{l.name}</p>
              <p className="text-[9px] text-slate-400">{l.items} productos</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[11px] font-bold text-brand-green">{l.price}</p>
              <p className="text-[9px] text-slate-400">–{l.saving}</p>
            </div>
          </div>
        ))}
        <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-2">
          <p className="text-[10px] font-bold text-slate-400">PENDIENTES</p>
          {['🥦 Brócoli', '🥛 Leche entera', '🍳 Huevos L'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-slate-200 flex-shrink-0" />
              <span className="text-[11px] text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tab: 'Comparar',
    tabIcon: <TrendingDown size={14} />,
    content: (
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <p className="text-[11px] font-bold text-slate-900">Comparador de precios</p>
        <div className="p-3 bg-green-50 border border-brand-green/30 rounded-2xl">
          <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Lista activa</p>
          <p className="text-[11px] font-bold text-slate-900">Compra Semanal · 12 productos</p>
        </div>
        <div className="space-y-2">
          {[
            { name: 'FreshMart',  price: '41,20€', width: '70%',  best: true },
            { name: 'MaxiMarket', price: '43,80€', width: '85%',  best: false },
            { name: 'EcoSuper',   price: '44,30€', width: '100%', best: false },
          ].map((s, i) => (
            <div key={i} className={`p-3 rounded-xl border ${s.best ? 'border-brand-green bg-green-50/50' : 'border-slate-100 bg-white'}`}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-medium">{s.name}</span>
                <span className={`text-[11px] font-bold ${s.best ? 'text-brand-green' : 'text-slate-700'}`}>{s.price}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${s.best ? 'bg-brand-green' : 'bg-slate-300'}`} style={{ width: s.width }} />
              </div>
              {s.best && <p className="text-[9px] text-brand-green font-bold mt-1">✓ Mejor precio</p>}
            </div>
          ))}
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl text-center">
          <p className="text-[9px] text-slate-400">Ahorro estimado</p>
          <p className="text-base font-bold text-brand-green">8,00€</p>
        </div>
      </div>
    ),
  },
  {
    tab: 'Recetas',
    tabIcon: <Search size={14} />,
    content: (
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <p className="text-[11px] font-bold text-slate-900">Recetas de la semana</p>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
          <Search size={10} className="text-slate-400" />
          <span className="text-[10px] text-slate-400">Buscar receta…</span>
        </div>
        {[
          { emoji: '🥗', name: 'Ensalada mediterránea', time: '10 min', items: 6 },
          { emoji: '🍝', name: 'Pasta carbonara',       time: '20 min', items: 5 },
          { emoji: '🥘', name: 'Pollo al curry',         time: '35 min', items: 8 },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{r.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold truncate">{r.name}</p>
              <p className="text-[9px] text-slate-400">⏱ {r.time} · {r.items} ingredientes</p>
            </div>
            <ChevronRight size={12} className="text-slate-300 flex-shrink-0" />
          </div>
        ))}
      </div>
    ),
  },
  {
    tab: 'Asistente',
    tabIcon: <Zap size={14} />,
    content: (
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <p className="text-[11px] font-bold text-slate-900 mb-3">Asistente IA</p>
        <div className="flex-1 space-y-3 overflow-hidden">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
              <Zap size={10} className="text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-2.5 max-w-[80%]">
              <p className="text-[10px] text-slate-700">¡Hola! Puedo ayudarte a optimizar tu compra. ¿Qué necesitas?</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="bg-brand-green rounded-2xl rounded-tr-none p-2.5 max-w-[80%]">
              <p className="text-[10px] text-white">¿Cuánto ahorro esta semana?</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
              <Zap size={10} className="text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-2.5 max-w-[80%]">
              <p className="text-[10px] text-slate-700">Esta semana ahorras <span className="font-bold text-brand-green">11,40€</span> comprando en FreshMart. 🎉</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
          <span className="text-[10px] text-slate-400 flex-1">Escribe un mensaje…</span>
          <ArrowRight size={12} className="text-brand-green" />
        </div>
      </div>
    ),
  },
  {
    tab: 'Perfil',
    tabIcon: <Users size={14} />,
    content: (
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="flex flex-col items-center py-3">
          <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-white text-lg font-bold mb-2">MC</div>
          <p className="text-[12px] font-bold text-slate-900">Mario Cohen</p>
          <p className="text-[10px] text-slate-400">mario@email.com</p>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Mi Hogar', value: '3 miembros' },
            { label: 'Ahorro total', value: '1.240€' },
            { label: 'Listas creadas', value: '47' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] text-slate-600">{stat.label}</span>
              <span className="text-[11px] font-bold text-slate-900">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="p-3 bg-green-50 border border-brand-green/20 rounded-2xl text-center">
          <p className="text-[10px] text-brand-green font-bold">Plan Premium · Activo</p>
          <p className="text-[9px] text-slate-400 mt-0.5">Comparte con hasta 5 personas</p>
        </div>
      </div>
    ),
  },
];

const MockupApp = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SCREENS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] aspect-[9/19] bg-slate-900 rounded-[3rem] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.25)] border-[7px] border-slate-800 overflow-hidden mx-auto lg:mx-0">
      {/* Notch */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-full z-30" />

      <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden flex flex-col font-sans relative">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-7 pb-1 flex-shrink-0">
          <span className="text-[9px] font-bold text-slate-900">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5 items-end h-3">
              {[2, 3, 4, 4].map((h, i) => (
                <div key={i} className="w-1 bg-slate-900 rounded-sm" style={{ height: `${h * 3}px` }} />
              ))}
            </div>
            <svg viewBox="0 0 24 12" className="w-5 h-2.5 fill-slate-900"><rect x="0" y="0" width="21" height="12" rx="3" fillOpacity="0.3"/><rect x="1" y="1" width="15" height="10" rx="2"/><rect x="22" y="3" width="2" height="6" rx="1"/></svg>
          </div>
        </div>

        {/* Slides */}
        <div className="flex-1 relative overflow-hidden">
          {SCREENS.map((screen, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${(i - active) * 100}%)`,
                opacity: i === active ? 1 : 0.4,
              }}
            >
              {/* Screen header */}
              <div className="px-4 py-2 flex justify-between items-center border-b border-slate-50 flex-shrink-0">
                <span className="text-[11px] font-bold text-brand-green">MySmartBasket</span>
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[8px]">MC</div>
              </div>
              {screen.content}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 py-2 flex-shrink-0">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-4 h-1.5 bg-brand-green' : 'w-1.5 h-1.5 bg-slate-200'}`}
            />
          ))}
        </div>

        {/* Tab bar */}
        <div className="border-t border-slate-100 flex justify-around pb-3 pt-2 flex-shrink-0">
          {SCREENS.map((screen, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-0.5 transition-colors ${i === active ? 'text-brand-green' : 'text-slate-300'}`}
            >
              {screen.tabIcon}
              <span className="text-[8px] font-medium">{screen.tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute top-1/4 -right-14 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 hidden lg:flex items-center gap-2 z-20">
        <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-brand-green">
          <TrendingDown size={13} />
        </div>
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">AHORRO</div>
          <div className="text-sm font-bold text-brand-black">1.240€<span className="text-[9px] text-brand-green">/año</span></div>
        </div>
      </div>
    </div>
  );
};

const SECTIONS: { id: string; label: string }[] = [
  { id: 'top',          label: 'MySmartBasket'                        },
  { id: 'problem',      label: 'MySmartBasket - El Problema'          },
  { id: 'solution',     label: 'MySmartBasket - La Solución'          },
  { id: 'features',     label: 'MySmartBasket - Funcionalidades'      },
  { id: 'demo',         label: 'MySmartBasket - Demo interactiva'     },
  { id: 'how-it-works', label: 'MySmartBasket - Cómo funciona'        },
  { id: 'social-proof', label: 'MySmartBasket - Métricas'             },
  { id: 'waitlist',     label: 'MySmartBasket - Únete'                },
];

export default function App() {
  const [formState, handleSubmit] = useForm('mwvybvog');
  const [isVideoOpen, setIsVideoOpen]   = useState(false);
  const [isCanvaOpen, setIsCanvaOpen]   = useState(false);
  const year = new Date().getFullYear();

  // Dynamic page title based on visible section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) document.title = label; },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsVideoOpen(false); setIsCanvaOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div id="top" className="min-h-screen selection:bg-green-100 selection:text-brand-green">
      <Navbar />

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            role="dialog" aria-modal="true" aria-label="Vídeo demo"
          >
            <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" onClick={() => setIsVideoOpen(false)} />
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.2)] z-10 border border-white/10"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all active:scale-90"
                aria-label="Cerrar vídeo"
              >
                <X size={20} />
              </button>
              <div className="w-full h-full bg-slate-900">
                <iframe
                  src="https://ai.studio/apps/514a1199-3642-43b6-b69d-0e1b2043b314"
                  title="MySmartBasket Demo"
                  className="w-full h-full border-none rounded-[1.5rem]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CANVA MODAL */}
      <AnimatePresence>
        {isCanvaOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            role="dialog" aria-modal="true" aria-label="Presentación"
          >
            <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" onClick={() => setIsCanvaOpen(false)} />
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl h-[85vh] bg-white rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] z-10"
            >
              <button
                onClick={() => setIsCanvaOpen(false)}
                className="absolute top-4 right-4 z-20 bg-brand-black/10 hover:bg-brand-black/20 text-brand-black p-3 rounded-full transition-all active:scale-90"
                aria-label="Cerrar presentación"
              >
                <X size={20} />
              </button>
              <iframe
                src="https://www.canva.com/design/DAG_-1iv9dM/YLG74bW3M2fHwS-ZTzSfGA/view?embed"
                title="MySmartBasket Presentación"
                className="w-full h-full border-none"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <a
              href="https://mysmartbasket.github.io/MySmartBasket-MVP/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full text-brand-green text-sm font-bold mb-8 hover:bg-green-100 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Demo disponible — pruébala ahora
            </a>

            <h1 className="text-5xl lg:text-7xl font-bold text-brand-black leading-[1.1] tracking-tight mb-8">
              La compra que te conoce,{' '}
              <span className="text-brand-green">el ahorro que mereces.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Deja de perder tiempo y dinero en el súper. MySmartBasket automatiza tu lista de la compra,
              compara precios en tiempo real y te ayuda a comer mejor sin esfuerzo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="#waitlist"
                className="w-full sm:w-auto bg-brand-green text-white px-8 py-5 rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-green-100"
              >
                Reservar mi plaza <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsCanvaOpen(true)}
                className="w-full sm:w-auto bg-brand-black text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                Conócenos mejor
              </button>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto bg-white text-brand-black border border-slate-200 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Vídeo Demo <Play size={18} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-brand-green" /> Sin spam</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-brand-green" /> Acceso early</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-brand-green" /> Cancelas cuando quieras</span>
            </div>

            {/* Store Banners */}
            <div className="mt-8 flex flex-wrap gap-4 opacity-70">
              <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl border border-white/10 cursor-not-allowed select-none">
                <Apple size={20} fill="white" />
                <div className="leading-none">
                  <div className="text-[9px] uppercase opacity-60">Próximamente en</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl border border-white/10 cursor-not-allowed select-none">
                <Play size={18} fill="white" />
                <div className="leading-none">
                  <div className="text-[9px] uppercase opacity-60">Próximamente en</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="perspective-1000"
          >
            <MockupApp />
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading centered title="El Problema" subtitle="¿Por qué comprar comida sigue siendo un dolor de cabeza?" />
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Clock,        title: 'Pérdida de tiempo',    text: 'Pasamos más de 200 horas al año planificando y comprando sin una estrategia clara.' },
              { icon: TrendingDown, title: 'Inflación invisible',   text: 'Los precios varían hasta un 30% entre supermercados para los mismos productos.' },
              { icon: Leaf,         title: 'Mala alimentación',    text: 'La falta de tiempo nos lleva a elegir ultraprocesados en lugar de cestas equilibradas.' },
            ].map((p, i) => (
              <div key={i} className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-6 text-slate-400">
                  <p.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                <p className="text-slate-500">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=600"
                  alt="Cesta de la compra saludable"
                  className="rounded-[2.5rem] shadow-2xl border-4 border-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-green-200/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-10 -right-10 bg-brand-black text-white p-6 rounded-3xl shadow-2xl z-20 max-w-[200px]">
                <div className="text-3xl font-bold mb-1">Ahorro</div>
                <div className="text-sm text-slate-400">Nuestro algoritmo detecta bajadas de precios en tiempo real.</div>
              </div>
            </div>

            <div>
              <SectionHeading title="La Solución" subtitle="La primera app que hace la compra por ti.">
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  MySmartBasket no es solo una lista. Es un copiloto financiero y nutricional.
                  Analizamos miles de productos en tus supermercados favoritos para entregarte la cesta
                  óptima cada semana.
                </p>
                <div className="space-y-4">
                  {[
                    'Comparativas de precios automáticas',
                    'Listas inteligentes basadas en tus hábitos',
                    'Planificación de menús saludables',
                    'Integración con pedidos a domicilio',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 text-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </SectionHeading>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-slate-50 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading centered title="Funcionalidades" subtitle="Ingeniería de datos para tu nevera" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Zap}         title="Listas Proactivas"  description="Sabemos cuándo se te va a acabar la leche. Generamos tu lista básica antes de que te des cuenta." />
            <FeatureCard icon={TrendingDown} title="Split Shopping"     description="Detectamos en qué tienda cada producto es más barato y te proponemos el mix perfecto para ahorrar al máximo." />
            <FeatureCard icon={Users}        title="Cestas Familiares"  description="Sincroniza la lista con tu pareja o compañeros de piso en tiempo real. Se acabó el comprar dos veces lo mismo." />
            <FeatureCard icon={ShieldCheck}  title="Nutri-Scan"         description="Sustituimos automáticamente productos procesados por alternativas más saludables con el mismo sabor." />
            <FeatureCard icon={Leaf}         title="Impacto Zero"       description="Priorizamos productos locales y de temporada para reducir la huella de carbono de tu compra." />
            <FeatureCard icon={Search}       title="Comparador Global"  description="Acceso a precios de más de 45 cadenas de supermercados actualizados cada 30 minutos." />
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section id="demo" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading centered title="Demo interactiva" subtitle="Siente el control en tus manos">
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Así funciona MySmartBasket: analiza tu lista y encuentra automáticamente
              dónde comprar cada producto más barato.
            </p>
          </SectionHeading>

          <div className="mt-12 bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 flex flex-col lg:flex-row gap-12 items-center">
            {/* Left panel */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="text-sm font-bold text-brand-green uppercase tracking-wider">Paso 1 · Tu lista</div>
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Escribe 'Aceite', 'Leche', 'Aguacates'…"
                    className="w-full pl-16 pr-8 py-6 rounded-2xl bg-white border border-slate-200 text-lg focus:ring-4 focus:ring-green-100 focus:border-brand-green outline-none transition-all shadow-sm"
                    aria-label="Buscar producto"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-bold text-brand-green uppercase tracking-wider">Paso 2 · Productos optimizados</div>
                <div className="grid gap-3">
                  {[
                    { name: 'Aceite de Oliva V.E. 1L', basePrice: '9,50€', savings: '1,20€', brand: 'Selección' },
                    { name: 'Leche Desnatada 6 pack',  basePrice: '5,40€', savings: '0,60€', brand: 'Marca propia' },
                    { name: 'Aguacate Hass (2 u.)',     basePrice: '3,20€', savings: '0,45€', brand: 'Bio' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:border-green-100 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-brand-green font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-brand-black">{item.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.brand}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{item.basePrice}</div>
                        <div className="text-[10px] font-bold text-brand-green">Ahorras {item.savings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-brand-black rounded-3xl text-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-400">AHORRO EN ESTA COMPRA</span>
                  <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold">OPTIMIZADO</div>
                </div>
                <div className="text-4xl font-bold">2,25€ <span className="text-sm text-slate-400 font-normal">menos</span></div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 size={12} className="text-brand-green" /> Basado en precios actuales de 4 supermercados
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 relative overflow-hidden h-full min-h-[500px] flex flex-col">
                <div className="absolute top-0 right-0 p-8">
                  <div className="p-2 px-4 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-400">COMPARATIVA EN TIEMPO REAL</div>
                </div>

                <h4 className="text-2xl font-bold mb-8 pr-12">
                  Mejor opción detectada: <span className="text-brand-green">FreshMart</span>
                </h4>

                <div className="flex-1 space-y-6">
                  {STORES.map((m, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{m.label}</span>
                        <span className={m.active ? 'text-brand-green' : 'text-slate-400'}>{m.price}</span>
                      </div>
                      <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: m.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                          className={`h-full ${m.color}`}
                        />
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{m.status}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto p-6 rounded-3xl border border-dashed border-slate-200 flex items-start gap-4">
                  <Zap size={22} className="text-brand-green mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Nuestro sistema ha detectado que comprando el aceite en <strong>FreshMart</strong> y
                    los aguacates en <strong>EcoSuper</strong>, podrías ahorrar <strong>0,80€ adicionales</strong> esta semana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading centered title="El Método" subtitle="Compra inteligente en 3 pasos" />
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px border-t border-dashed border-slate-200 -z-10"></div>
            {[
              { step: '01', title: 'Conecta tus hábitos',    text: 'Dinos qué te gusta, qué tiendas tienes cerca y tu presupuesto.' },
              { step: '02', title: 'Recibe tu Cesta Óptima', text: 'Nuestra IA genera la compra ideal maximizando ahorro y salud.' },
              { step: '03', title: 'Confirma y Sonríe',      text: 'Pide el envío a casa o ve a la tienda con la ruta más eficiente.' },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center mx-auto mb-8 text-xl font-bold text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all cursor-default">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-slate-500 px-4">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="social-proof" className="py-24 px-6 bg-brand-black text-white rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-green font-bold text-xs uppercase mb-3 block">Métricas que importan</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">No es solo una app, es un cambio de vida.</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-bold text-brand-green mb-2">20%</div>
                  <p className="text-slate-400 text-sm">Ahorro mensual medio por hogar</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-brand-green mb-2">90m</div>
                  <p className="text-slate-400 text-sm">Menos tiempo de gestión semanal</p>
                </div>
                <div className="pt-8 col-span-2 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(idx => (
                        <div key={idx} className="w-11 h-11 rounded-full border-4 border-brand-black overflow-hidden bg-slate-700 flex items-center justify-center text-white font-bold text-xs">
                          {['AR', 'CM', 'PG', 'RL'][idx - 1]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-lg font-bold">Más de 5.000 personas</div>
                      <p className="text-xs text-slate-500">Esperando el lanzamiento oficial</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Marta G.', role: 'Madre de 3 hijos', quote: 'Antes gastaba 800€ al mes sin control. El primer mes que lo usé bajé a 630€ comprando exactamente lo mismo.' },
                { name: 'Jorge R.', role: 'Consultor independiente', quote: 'Odio hacer la compra. Ahora solo reviso la app 2 minutos el domingo y ya sé que tengo la mejor oferta.' },
              ].map((t, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors">
                  <p className="text-xl text-slate-300 italic mb-6">"{t.quote}"</p>
                  <div>
                    <div className="font-bold text-lg">{t.name}</div>
                    <div className="text-sm text-brand-green font-medium">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading centered title="Únete a la Revolución" subtitle="Sé de los primeros en comprar mejor." />
          <p className="text-slate-500 text-xl mb-12">
            Apúntate a la lista de espera y recibe acceso anticipado cuando abramos.
            Sin spam — solo una invitación cuando estemos listos.
          </p>

          {formState.succeeded ? (
            <div className="max-w-lg mx-auto p-6 rounded-3xl bg-green-50 border border-green-100 text-brand-green font-semibold text-lg">
              ¡Listo! Estás en la lista. Te avisaremos cuando abramos acceso. 🎉
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto" noValidate>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-slate-200 text-lg focus:ring-4 focus:ring-green-100 focus:border-brand-green outline-none transition-all pr-48"
                aria-label="Tu correo electrónico"
              />
              <ValidationError field="email" errors={formState.errors} className="mt-2 text-sm text-red-500 text-left absolute -bottom-6 left-2" />
              <button
                type="submit"
                disabled={formState.submitting}
                className="absolute right-2 top-2 bottom-2 px-6 bg-brand-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 text-sm"
              >
                {formState.submitting ? 'Enviando…' : 'Reservar plaza'} <ChevronRight size={16} />
              </button>
            </form>
          )}
          <p className="mt-8 text-sm text-slate-400">
            Al enviar aceptas nuestra{' '}
            <a href="/privacidad.html" className="underline hover:text-slate-600 transition-colors">política de privacidad</a>.
            Puedes darte de baja cuando quieras.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/android-chrome-192x192.png" alt="MySmartBasket logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold">MySmartBasket</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              Empoderando a los consumidores a través de transparencia de datos y tecnología inteligente.
            </p>
            <div className="flex gap-3">
              <div title="App Store — próximamente" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-green cursor-not-allowed transition-colors border border-slate-100"><Apple size={18} /></div>
              <div title="Google Play — próximamente" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-green cursor-not-allowed transition-colors border border-slate-100"><Smartphone size={18} /></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Producto</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#features"     className="hover:text-brand-green transition-colors">Funcionalidades</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-green transition-colors">Cómo funciona</a></li>
              <li><a href="#demo"         className="hover:text-brand-green transition-colors">Demo interactiva</a></li>
              <li><a href="#waitlist"     className="hover:text-brand-green transition-colors">Acceso anticipado</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#solution"                          className="hover:text-brand-green transition-colors">Sobre nosotros</a></li>
              <li><a href="mailto:contacto@mysmartbasket.app"      className="hover:text-brand-green transition-colors">Contacto</a></li>
              <li><a href="/privacidad.html"                   className="hover:text-brand-green transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© {year} MySmartBasket. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="/privacidad.html"              className="hover:text-slate-600 transition-colors">Privacidad</a>
            <a href="mailto:contacto@mysmartbasket.app" className="hover:text-slate-600 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
