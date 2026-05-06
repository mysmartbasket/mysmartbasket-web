import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue } from 'motion/react';
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
  ChevronDown,
  ShieldCheck,
  Zap,
  Leaf,
  Moon,
  Sun,
} from 'lucide-react';

const ScrollProgress = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-brand-green origin-left z-[60] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />;
});

const FadeUp = ({ children, delay = 0, className = '', index }: { children: React.ReactNode; delay?: number; className?: string; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay: delay + (index ?? 0) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        className="text-5xl font-bold text-brand-green mb-2"
      >
        {value}
      </motion.div>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
};

/* ── Custom cursor ── */
const CustomCursor = () => {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const [hov, setHov] = useState(false);

  // Dot: near-instant (high stiffness, low mass)
  const dotX = useSpring(mx, { stiffness: 5000, damping: 60, mass: 0.05 });
  const dotY = useSpring(my, { stiffness: 5000, damping: 60, mass: 0.05 });
  // Ring: subtle lag
  const ringX = useSpring(mx, { stiffness: 600, damping: 40, mass: 0.1 });
  const ringY = useSpring(my, { stiffness: 600, damping: 40, mass: 0.1 });

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');
    const mv = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const ov = (e: MouseEvent) => setHov(!!(e.target as HTMLElement).closest('a,button'));
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', ov);
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseover', ov);
    };
  }, [mx, my]);

  return (
    <div className="hidden lg:block">
      {/* Dot — instant */}
      <motion.div
        className="fixed rounded-full bg-brand-green pointer-events-none z-[999]"
        style={{ width: 8, height: 8, x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hov ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring — slight trail */}
      <motion.div
        className="fixed rounded-full border-2 border-brand-green pointer-events-none z-[998]"
        style={{ width: 32, height: 32, x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hov ? 1.5 : 1, opacity: hov ? 0.8 : 0.35 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

/* ── Page transition (fade-in on load) ── */
const PageTransition = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 bg-white dark:bg-slate-950 z-[300] pointer-events-none flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-brand-green"
          >
            <ShoppingBasket size={40} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Store ticker ── */
const TICKER_STORES = [
  '🛒 Mercadona', '🏪 Lidl', '🛍️ Carrefour', '🏬 Alcampo',
  '🏷️ Día', '🛒 El Corte Inglés', '🏪 Aldi', '🛍️ Eroski',
  '🏬 Hipercor', '🏷️ Simply', '🛒 BM Supermercados', '🏪 Condis',
];
const TICKER_ITEMS = [...TICKER_STORES, ...TICKER_STORES];
const StoreTicker = memo(() => {
  return (
    <div className="overflow-hidden bg-slate-900 dark:bg-slate-800 py-3 border-y border-slate-800">
      <div className="flex gap-10 animate-marquee whitespace-nowrap">
        {TICKER_ITEMS.map((s, i) => (
          <span key={i} className="text-slate-400 font-medium text-sm flex-shrink-0">{s}</span>
        ))}
      </div>
    </div>
  );
});

/* ── Sticky CTA (mobile) ── */
const StickyCTA = memo(() => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let rafId = 0;
    let heroH = 0;
    const measure = () => { heroH = (document.querySelector('#top section') as HTMLElement)?.offsetHeight ?? 600; };
    measure();
    window.addEventListener('resize', measure, { passive: true });

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const waitlistTop = document.getElementById('waitlist')?.getBoundingClientRect().top ?? Infinity;
        setVisible(window.scrollY > heroH && waitlistTop > window.innerHeight);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[50] p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 shadow-2xl md:hidden"
        >
          <a
            href="#waitlist"
            className="flex items-center justify-center gap-2 w-full bg-brand-green text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-green-200/50"
          >
            Reservar mi plaza gratis <ArrowRight size={18} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* ── FAQ ── */
const FAQ_ITEMS = [
  { q: '¿Es gratuito?',                              a: 'Sí, completamente gratuito durante la fase beta. Cuando lancemos planes de pago, los usuarios de la lista de espera mantendrán condiciones especiales de forma permanente.' },
  { q: '¿Cómo obtiene la app los precios?',          a: 'Contamos con un sistema propio que monitoriza precios en más de 45 cadenas cada 30 minutos. No dependemos de fuentes externas, lo que garantiza mayor fiabilidad y actualización en tiempo real.' },
  { q: '¿Cuándo está disponible?',                   a: 'Actualmente estamos en beta cerrada con los primeros usuarios. Ampliamos el acceso de forma gradual para asegurar una buena experiencia desde el primer día. Apúntate y te notificamos cuando tu plaza esté lista.' },
  { q: '¿Está disponible en mi supermercado?',       a: 'Cubrimos las principales cadenas en España: Mercadona, Lidl, Carrefour, Alcampo, El Corte Inglés, Día, Aldi, Eroski y más. Si tu cadena habitual no aparece, puedes solicitarla — la incorporamos por orden de demanda.' },
  { q: '¿Puedo compartirlo con mi familia?',         a: 'Sí. Puedes crear un hogar compartido con hasta 5 miembros. Todos acceden a la misma lista en tiempo real, sin duplicados ni necesidad de coordinación adicional.' },
  { q: '¿Cómo se tratan mis datos personales?',      a: 'Solo almacenamos tu correo electrónico y tus preferencias de compra. No vendemos ni compartimos datos con terceros. Puedes solicitar la eliminación completa de tu cuenta en cualquier momento escribiéndonos a contacto@mysmartbasket.app.' },
];
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 dark:border-slate-800">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-slate-900 dark:text-white group-hover:text-brand-green transition-colors">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const STORES = [
  { label: 'FreshMart',   price: '41,20€', status: 'Mejor precio', width: '70%',  color: 'bg-brand-green', active: true  },
  { label: 'MaxiMarket',  price: '43,80€', status: '+2.60€',        width: '85%',  color: 'bg-slate-200 dark:bg-slate-600',   active: false },
  { label: 'EcoSuper',    price: '44,30€', status: '+3.10€',        width: '100%', color: 'bg-slate-200 dark:bg-slate-600',   active: false },
];

const DEMO_CATALOG = [
  { name: 'Aceite de Oliva Virgen Extra 1L',   basePrice: '9,50€',  savings: '1,20€', brand: 'Hacendado'       },
  { name: 'Leche Entera 1L',                   basePrice: '0,95€',  savings: '0,10€', brand: 'Puleva'          },
  { name: 'Leche Desnatada 6 pack',            basePrice: '5,40€',  savings: '0,60€', brand: 'Marca propia'    },
  { name: 'Pan de Molde Integral 500g',        basePrice: '1,85€',  savings: '0,30€', brand: 'Bimbo'           },
  { name: 'Yogur Natural x4 125g',             basePrice: '1,20€',  savings: '0,20€', brand: 'Danone'          },
  { name: 'Huevos Camperos M (12 u.)',         basePrice: '3,40€',  savings: '0,45€', brand: 'Camping'         },
  { name: 'Pechuga de Pollo 500g',             basePrice: '4,90€',  savings: '0,60€', brand: 'Aves Nobles'     },
  { name: 'Salmón Noruego Fresco 300g',        basePrice: '6,20€',  savings: '0,80€', brand: 'Lidl'            },
  { name: 'Tomate Triturado 800g',             basePrice: '0,85€',  savings: '0,15€', brand: 'Solís'           },
  { name: 'Arroz Redondo 1kg',                 basePrice: '1,45€',  savings: '0,25€', brand: 'Nomen'           },
  { name: 'Pasta Espagueti 500g',              basePrice: '0,75€',  savings: '0,10€', brand: 'Gallo'           },
  { name: 'Aguacate Hass (2 u.)',              basePrice: '3,20€',  savings: '0,45€', brand: 'Bio'             },
  { name: 'Plátano de Canarias 1kg',           basePrice: '2,30€',  savings: '0,40€', brand: 'IGP Canarias'    },
  { name: 'Manzana Fuji 1kg',                  basePrice: '2,10€',  savings: '0,30€', brand: 'Local'           },
  { name: 'Queso Manchego Curado 200g',        basePrice: '3,80€',  savings: '0,50€', brand: 'García Baquero'  },
  { name: 'Jamón Serrano Loncheado 100g',      basePrice: '2,50€',  savings: '0,35€', brand: 'ElPozo'          },
  { name: 'Cerveza Rubia 6 x 33cl',           basePrice: '4,20€',  savings: '0,55€', brand: 'Amstel'          },
  { name: 'Detergente Lavadora 30 dosis',      basePrice: '5,90€',  savings: '0,90€', brand: 'Ariel'           },
  { name: 'Café Molido Natural 250g',          basePrice: '3,60€',  savings: '0,50€', brand: 'Marcilla'        },
  { name: 'Zumo de Naranja 1L',               basePrice: '1,80€',  savings: '0,25€', brand: 'Don Simón'       },
  { name: 'Atún Claro en Aceite 3 x 80g',     basePrice: '2,10€',  savings: '0,30€', brand: 'Calvo'           },
  { name: 'Mantequilla con Sal 250g',          basePrice: '2,40€',  savings: '0,30€', brand: 'Kerrygold'       },
  { name: 'Lentejas Cocidas 400g',             basePrice: '0,95€',  savings: '0,10€', brand: 'Cidacos'         },
  { name: 'Caldo de Pollo 1L',                basePrice: '1,50€',  savings: '0,20€', brand: 'Knorr'           },
  { name: 'Papel Higiénico 12 rollos',         basePrice: '3,50€',  savings: '0,40€', brand: 'Scottex'         },
];

const INITIAL_DEMO_ITEMS = [
  { name: 'Aceite de Oliva Virgen Extra 1L', basePrice: '9,50€',  savings: '1,20€', brand: 'Hacendado'    },
  { name: 'Leche Desnatada 6 pack',          basePrice: '5,40€',  savings: '0,60€', brand: 'Marca propia' },
  { name: 'Aguacate Hass (2 u.)',            basePrice: '3,20€',  savings: '0,45€', brand: 'Bio'          },
];
type DemoItem = typeof DEMO_CATALOG[0];

const DemoSection = memo(() => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<DemoItem[]>(INITIAL_DEMO_ITEMS);
  const [showSugg, setShowSugg] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim().length >= 2
    ? DEMO_CATALOG.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        !items.some(i => i.name === p.name)
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShowSugg(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const addItem = useCallback((p: DemoItem) => {
    setItems(prev => {
      if (prev.some(i => i.name === p.name)) return prev;
      const next = [...prev, p];
      return next.length > 5 ? next.slice(next.length - 5) : next;
    });
    setQuery('');
    setShowSugg(false);
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems(prev => prev.filter(i => i.name !== name));
  }, []);

  const totalSavings = items
    .reduce((sum, i) => sum + parseFloat(i.savings.replace(',', '.').replace('€', '')), 0);
  const totalSavingsStr = totalSavings.toFixed(2).replace('.', ',') + '€';

  return (
    <section id="demo" className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading centered title="Demo interactiva" subtitle="Siente el control en tus manos">
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Así funciona MySmartBasket: analiza tu lista y encuentra automáticamente
            dónde comprar cada producto más barato.
          </p>
        </SectionHeading>

        <div className="mt-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row gap-12 items-start">
          {/* Left panel */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="text-sm font-bold text-brand-green uppercase tracking-wider">Paso 1 · Busca un producto</div>
              <div ref={wrapRef} className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-500 group-focus-within:text-brand-green transition-colors z-10" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setShowSugg(true); }}
                  onFocus={() => setShowSugg(true)}
                  placeholder="Escribe 'Leche', 'Aceite', 'Pollo'…"
                  className="w-full pl-16 pr-8 py-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-lg dark:text-white dark:placeholder-slate-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/40 focus:border-brand-green outline-none transition-all shadow-sm"
                  aria-label="Buscar producto"
                  aria-autocomplete="list"
                  aria-expanded={showSugg && suggestions.length > 0}
                />
                <AnimatePresence>
                  {showSugg && suggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-20"
                      role="listbox"
                    >
                      {suggestions.map((p, i) => (
                        <li key={i} role="option" aria-selected={false}>
                          <button
                            onMouseDown={e => { e.preventDefault(); addItem(p); }}
                            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left gap-4"
                          >
                            <div>
                              <div className="text-sm font-semibold text-slate-800 dark:text-white">{p.name}</div>
                              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">{p.brand}</div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.basePrice}</div>
                              <div className="text-[11px] font-bold text-brand-green">Ahorras {p.savings}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-bold text-brand-green uppercase tracking-wider">Paso 2 · Productos optimizados</div>
              <div className="grid gap-3">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    layout
                    className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center shadow-sm hover:border-green-100 dark:hover:border-brand-green/40 transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-brand-green font-bold text-xs flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-brand-black dark:text-white text-sm truncate max-w-[180px]">{item.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.brand}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold dark:text-white">{item.basePrice}</div>
                        <div className="text-[10px] font-bold text-brand-green">Ahorras {item.savings}</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-400 p-1 rounded-lg"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-brand-black rounded-3xl text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-slate-400">AHORRO EN ESTA COMPRA</span>
                <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold">OPTIMIZADO</div>
              </div>
              <motion.div
                key={totalSavingsStr}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold"
              >
                {totalSavingsStr} <span className="text-sm text-slate-400 font-normal">menos</span>
              </motion.div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={12} className="text-brand-green" /> Basado en precios actuales de 4 supermercados
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-2xl p-8 relative overflow-hidden h-full min-h-[500px] flex flex-col">
              <h4 className="text-2xl font-bold dark:text-white mb-8">
                Mejor opción detectada: <span className="text-brand-green">FreshMart</span>
              </h4>

              <div className="flex-1 space-y-6">
                {STORES.map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="dark:text-white">{m.label}</span>
                      <span className={m.active ? 'text-brand-green' : 'text-slate-400'}>{m.price}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-50 dark:bg-slate-700 rounded-full overflow-hidden">
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

              <div className="mt-auto p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-600 flex items-start gap-4">
                <Zap size={22} className="text-brand-green mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Nuestro sistema ha detectado que comprando el aceite en <strong className="text-slate-700 dark:text-slate-200">FreshMart</strong> y
                  los aguacates en <strong className="text-slate-700 dark:text-slate-200">EcoSuper</strong>, podrías ahorrar <strong className="text-slate-700 dark:text-slate-200">0,80€ adicionales</strong> esta semana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && document.documentElement.classList.contains('dark'));

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setIsScrolled(window.scrollY > 20));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const close = () => setMobileMenuOpen(false);

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#top" className="flex items-center gap-2.5 group">
          <img
            src="/android-chrome-192x192.png"
            alt="MySmartBasket logo"
            className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-brand-black dark:text-white">MySmartBasket</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#problem"      className="hover:text-brand-green transition-colors">Problema</a>
          <a href="#solution"     className="hover:text-brand-green transition-colors">Solución</a>
          <a href="#features"     className="hover:text-brand-green transition-colors">Funcionalidades</a>
          <a href="#how-it-works" className="hover:text-brand-green transition-colors">Cómo funciona</a>
          <a href="#faq"         className="hover:text-brand-green transition-colors">FAQ</a>
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Cambiar tema"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="#waitlist"
            className="bg-brand-black dark:bg-brand-green text-white px-5 py-2.5 rounded-full hover:bg-slate-800 dark:hover:opacity-90 transition-all active:scale-95 shadow-sm"
          >
            Acceso anticipado
          </a>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleDark} className="p-2 text-slate-500 dark:text-slate-300" aria-label="Cambiar tema">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-slate-900 dark:text-white p-2"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#problem"      onClick={close} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green transition-colors">Problema</a>
            <a href="#solution"     onClick={close} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green transition-colors">Solución</a>
            <a href="#features"     onClick={close} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green transition-colors">Funcionalidades</a>
            <a href="#how-it-works" onClick={close} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green transition-colors">Cómo funciona</a>
            <a href="#faq"          onClick={close} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-green transition-colors">FAQ</a>
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
    <h2 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white tracking-tight mb-6">{subtitle}</h2>
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-green-100 dark:hover:border-brand-green/40 hover:-translate-y-1 transition-all duration-200">
    <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-brand-green mb-6">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-brand-black dark:text-white mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const SCREENS = [
  {
    tab: 'Listas',
    tabIcon: <ShoppingBasket size={14} />,
    content: (
      <div className="flex-1 px-4 pt-3 pb-2 space-y-2.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-slate-900">Mis listas 🛒</p>
            <p className="text-[10px] text-slate-400">2 listas activas</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-white">
            <ShoppingBasket size={13} />
          </div>
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
      <div className="flex-1 px-4 pt-3 pb-2 space-y-2.5 overflow-hidden">
        <p className="text-[12px] font-bold text-slate-900">Comparador de precios</p>
        <div className="p-2.5 bg-green-50 border border-brand-green/30 rounded-xl">
          <p className="text-[9px] text-slate-400 font-bold uppercase">Lista activa</p>
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
        <div className="p-3 bg-slate-900 rounded-xl text-center">
          <p className="text-[9px] text-slate-400">Ahorro estimado</p>
          <p className="text-sm font-bold text-brand-green">8,00€</p>
        </div>
      </div>
    ),
  },
  {
    tab: 'Recetas',
    tabIcon: <Search size={14} />,
    content: (
      <div className="flex-1 px-4 pt-3 pb-2 space-y-2.5 overflow-hidden">
        <p className="text-[12px] font-bold text-slate-900">Recetas de la semana</p>
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
            <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{r.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold truncate">{r.name}</p>
              <p className="text-[9px] text-slate-400">⏱ {r.time} · {r.items} ing.</p>
            </div>
            <ChevronRight size={11} className="text-slate-300 flex-shrink-0" />
          </div>
        ))}
      </div>
    ),
  },
  {
    tab: 'Asistente',
    tabIcon: <Zap size={14} />,
    content: (
      <div className="flex-1 flex flex-col px-4 pt-3 pb-2 overflow-hidden">
        <p className="text-[12px] font-bold text-slate-900 mb-3">Asistente IA</p>
        <div className="flex-1 space-y-3 overflow-hidden">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap size={10} className="text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-2.5 max-w-[85%]">
              <p className="text-[10px] text-slate-700">¡Hola! Puedo ayudarte a optimizar tu compra. ¿Qué necesitas?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-brand-green rounded-2xl rounded-tr-none p-2.5 max-w-[75%]">
              <p className="text-[10px] text-white">¿Cuánto ahorro esta semana?</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap size={10} className="text-white" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-none p-2.5 max-w-[85%]">
              <p className="text-[10px] text-slate-700">Esta semana ahorras <span className="font-bold text-brand-green">11,40€</span> en FreshMart. 🎉</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
          <span className="text-[10px] text-slate-400 flex-1">Escribe un mensaje…</span>
          <ArrowRight size={11} className="text-brand-green" />
        </div>
      </div>
    ),
  },
  {
    tab: 'Perfil',
    tabIcon: <Users size={14} />,
    content: (
      <div className="flex-1 px-4 pt-3 pb-2 space-y-2.5 overflow-hidden">
        <div className="flex flex-col items-center py-2">
          <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-white mb-2">
            <ShoppingBasket size={22} />
          </div>
          <p className="text-[12px] font-bold text-slate-900">MySmartBasket</p>
          <p className="text-[10px] text-slate-400">usuario@email.com</p>
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
        <div className="p-3 bg-green-50 border border-brand-green/20 rounded-xl text-center">
          <p className="text-[10px] text-brand-green font-bold">Plan Premium · Activo</p>
          <p className="text-[9px] text-slate-400 mt-0.5">Comparte con hasta 5 personas</p>
        </div>
      </div>
    ),
  },
];

const MockupApp = memo(() => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SCREENS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-[300px] h-[620px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.25)] border-[8px] border-slate-800 overflow-hidden mx-auto lg:mx-0">
      {/* Notch */}
      <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full z-30" />

      <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col font-sans relative">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-7 pb-1 flex-shrink-0">
          <span className="text-[10px] font-bold text-slate-900">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 items-end">
              {[2, 3, 4, 4].map((h, i) => (
                <div key={i} className="w-1 bg-slate-900 rounded-sm" style={{ height: `${h * 2.5}px` }} />
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
              <div className="px-5 py-2.5 flex justify-between items-center border-b border-slate-50 flex-shrink-0">
                <span className="text-xs font-bold text-brand-green">MySmartBasket</span>
                <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-brand-green">
                  <ShoppingBasket size={14} />
                </div>
              </div>
              {screen.content}
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="border-t border-slate-100 flex justify-around pb-3 pt-2 flex-shrink-0">
          {SCREENS.map((screen, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 px-1 transition-colors ${i === active ? 'text-brand-green' : 'text-slate-300'}`}
            >
              {screen.tabIcon}
              <span className="text-[8px] font-medium">{screen.tab}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
});

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
  const [isCanvaOpen, setIsCanvaOpen] = useState(false);
  const [formStep, setFormStep] = useState<'email' | 'spending' | 'done'>('email');
  const [emailValue, setEmailValue] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('msb_wl_count') : null;
    return saved ? parseInt(saved, 10) : 5247;
  });

  const incrementCount = () => {
    setWaitlistCount(n => {
      const next = n + 1;
      localStorage.setItem('msb_wl_count', String(next));
      return next;
    });
  };
  const year = new Date().getFullYear();

  // Init dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

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
      if (e.key === 'Escape') { setIsCanvaOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div id="top" className="min-h-screen selection:bg-green-100 selection:text-brand-green bg-white dark:bg-slate-950">
      <PageTransition />
      <CustomCursor />
      <StickyCTA />
      <ScrollProgress />
      <Navbar />

      {/* VIDEO MODAL */}
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
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white dark:bg-slate-950" style={{ contain: 'paint' }}>
        {/* Background blobs — opacity-only animation avoids expensive blur+scale repaint */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-green-50 dark:from-green-950/20 to-transparent" />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-green/5 dark:bg-brand-green/10 blur-3xl animate-hero-glow" style={{ animationDelay: '3s' }} />
          <div className="absolute top-40 left-0 w-64 h-64 rounded-full bg-green-100/40 dark:bg-green-900/10 blur-3xl animate-hero-glow" style={{ animationDelay: '1.5s' }} />
        </div>
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

            <h1 className="text-5xl lg:text-7xl font-bold text-brand-black dark:text-white leading-[1.1] tracking-tight mb-8">
              Ahorra en la compra semanal{' '}
              <span className="text-brand-green">sin cambiar lo que compras.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
              Cada semana pagas más de lo que deberías sin saber exactamente por qué. MySmartBasket analiza los precios de los supermercados de tu zona, genera tu lista y te indica dónde comprar cada producto para gastar lo menos posible.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <a
                href="#waitlist"
                className="bg-brand-green text-white px-7 py-4 rounded-2xl font-bold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-green-100"
              >
                Reservar mi plaza <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsCanvaOpen(true)}
                className="bg-brand-black text-white px-7 py-4 rounded-2xl font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                Conócenos mejor
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-brand-green" /> Sin spam</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-brand-green" /> Acceso anticipado, sin coste</span>
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

      {/* STORE TICKER */}
      <StoreTicker />

      {/* PROBLEM */}
      <section id="problem" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <FadeUp><SectionHeading centered title="El Problema" subtitle="Tres problemas que tienen solución" /></FadeUp>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Clock,        title: 'Comprar sin planificar',       text: 'Sin una lista clara es fácil gastar más de lo previsto, olvidar productos y volver al supermercado a mitad de semana.' },
              { icon: TrendingDown, title: 'Pagar de más sin saberlo',     text: 'El mismo producto puede variar hasta un 40% de precio según la cadena. Comparar manualmente cada semana no es viable.' },
              { icon: Leaf,         title: 'Desperdiciar comida y dinero', text: 'Comprar sin planificar los menús lleva a tirar alimentos y a que falten productos justo cuando más se necesitan.' },
            ].map((p, i) => (
              <div key={i}><FadeUp delay={i * 0.15}>
                <div className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-6 text-slate-400 dark:text-slate-300"
                  >
                    <p.icon size={32} />
                  </motion.div>
                  <h3 className="text-xl font-bold dark:text-white mb-4">{p.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{p.text}</p>
                </div>
              </FadeUp></div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
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
                <div className="text-3xl font-bold mb-1">–€85</div>
                <div className="text-sm text-slate-400">Ahorro medio en el primer mes de uso.</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading title="La Solución" subtitle="Tecnología al servicio de tu compra diaria.">
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  MySmartBasket analiza tus hábitos de compra, compara precios entre tus supermercados habituales y genera la lista óptima para cada semana — sin que tengas que hacer nada manualmente.
                </p>
                <div className="space-y-4">
                  {[
                    'Comparativa automática de precios entre supermercados',
                    'Listas inteligentes basadas en tus hábitos de consumo',
                    'Planificación de menús adaptada a lo que vas a comprar',
                    'Integración con servicios de entrega a domicilio',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-green-100 text-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="font-medium text-slate-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </SectionHeading>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-slate-50 dark:bg-slate-900 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto">
          <FadeUp><SectionHeading centered title="Funcionalidades" subtitle="Qué hace MySmartBasket por ti" /></FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap,          title: 'Reposición automática',                  description: 'Aprende tus ciclos de consumo y anticipa lo que vas a necesitar antes de que se agote, sin intervención manual.' },
              { icon: TrendingDown, title: 'Optimización por supermercado',          description: 'Identifica en qué cadena cada producto está más barato en ese momento y propone la combinación más rentable.' },
              { icon: Users,        title: 'Listas compartidas en tiempo real',      description: 'Varios miembros del hogar pueden editar la misma lista simultáneamente, sin duplicados ni coordinación extra.' },
              { icon: ShieldCheck,  title: 'Alternativas más saludables',            description: 'Cuando hay opciones con mejor perfil nutricional y sabor equivalente, las sugiere como alternativa sin imponer nada.' },
              { icon: Leaf,         title: 'Reducción de desperdicio alimentario',   description: 'Registra las fechas de caducidad y avisa de qué consumir primero para minimizar lo que se tira cada semana.' },
              { icon: Search,       title: 'Cobertura de más de 45 cadenas',        description: 'Mercadona, Lidl, Carrefour, Alcampo, Día y 40 cadenas más. Precios actualizados cada 30 minutos de forma automática.' },
            ].map((f, i) => (
              <div key={i}><FadeUp delay={i * 0.08}>
                <FeatureCard icon={f.icon} title={f.title} description={f.description} />
              </FadeUp></div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <DemoSection />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp><SectionHeading centered title="Cómo funciona" subtitle="Tres pasos para empezar a ahorrar" /></FadeUp>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[25%] right-[25%] h-px -z-10 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
                className="h-px border-t-2 border-dashed border-slate-200 origin-left w-full"
              />
            </div>
            {[
              { step: '01', title: 'Configura tu perfil de compra',    text: 'Indícanos cuántas personas sois, qué supermercados tienes cerca y cuál es tu presupuesto habitual.' },
              { step: '02', title: 'Recibe tu lista semanal',          text: 'Generada en base a tus hábitos de consumo, lo que ya tienes en casa y los precios actuales de tu zona.' },
              { step: '03', title: 'Compra en tienda o desde casa',    text: 'Usa la lista en el móvil durante la compra, o realiza el pedido online directamente desde la app.' },
            ].map((s, i) => (
              <div key={i}><FadeUp delay={i * 0.2}>
                <div className="text-center group">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-16 h-16 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-full flex items-center justify-center mx-auto mb-8 text-xl font-bold text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors cursor-default"
                  >
                    {s.step}
                  </motion.div>
                  <h3 className="text-xl font-bold dark:text-white mb-4">{s.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 px-4">{s.text}</p>
                </div>
              </FadeUp></div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="social-proof" className="py-24 px-6 bg-brand-black text-white rounded-[4rem] mx-4 overflow-hidden relative" style={{ contain: 'paint' }}>
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-brand-green/5 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="text-brand-green font-bold text-xs uppercase mb-3 block">Resultados reales</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Datos de personas que ya lo están usando.</h2>
              <div className="grid grid-cols-2 gap-8">
                <AnimatedStat value="20%" label="De ahorro medio en la primera compra" />
                <AnimatedStat value="90m" label="Menos de gestión de la compra al mes" />
                <motion.div
                  className="pt-8 col-span-2 border-t border-slate-800"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(idx => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="w-11 h-11 rounded-full border-4 border-brand-black overflow-hidden bg-slate-700 flex items-center justify-center text-white font-bold text-xs"
                        >
                          {['AR', 'CM', 'PG', 'RL'][idx - 1]}
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <div className="text-lg font-bold">Más de 5.000 personas</div>
                      <p className="text-xs text-slate-500">Ya apuntadas a la lista de espera</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>

            <div className="space-y-6">
              {[
                { name: 'Marta G.', role: 'Madre de 3 hijos, Madrid', quote: 'El primer mes ahorré 150€ comprando exactamente lo mismo. Solo dejé de ir al supermercado más caro por inercia.' },
                { name: 'Jorge R.', role: 'Profesional independiente, Barcelona', quote: 'Antes tiraba comida cada semana. Ahora compro lo que necesito y la nevera no acaba medio vacía a mitad de semana.' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="p-8 bg-white/5 border border-white/10 rounded-[2rem] transition-colors cursor-default"
                >
                  <p className="text-xl text-slate-300 italic mb-6">"{t.quote}"</p>
                  <div>
                    <div className="font-bold text-lg">{t.name}</div>
                    <div className="text-sm text-brand-green font-medium">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 dark:bg-slate-950">
        <div className="max-w-2xl mx-auto">
          <FadeUp><SectionHeading centered title="Preguntas frecuentes" subtitle="Resolvemos las dudas más habituales" /></FadeUp>
          <FadeUp delay={0.1}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 px-8 py-2 shadow-sm">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i}><FAQItem question={item.q} answer={item.a} /></div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-32 px-6 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            {/* Live counter */}
            <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 px-5 py-2.5 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
              </span>
              <motion.span
                key={waitlistCount}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm font-bold text-brand-green tabular-nums"
              >
                {waitlistCount.toLocaleString('es-ES')}
              </motion.span>
              <span className="text-sm font-medium text-brand-green">personas ya apuntadas</span>
            </div>
            <SectionHeading centered title="Solicita tu acceso anticipado" subtitle="Las plazas son limitadas." />
          </FadeUp>
          <p className="text-slate-500 dark:text-slate-400 text-xl mb-12">
            Estamos ampliando el acceso gradualmente. Deja tu correo y te notificamos en cuanto tu plaza esté disponible. Sin comunicaciones comerciales, solo el aviso de acceso.
          </p>

          <AnimatePresence mode="wait">
            {formState.succeeded || formStep === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto p-8 rounded-3xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800"
              >
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-brand-green font-bold text-xl mb-1">Solicitud recibida</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Te notificaremos cuando tu plaza esté disponible. Revisa también la carpeta de correo no deseado.</p>
              </motion.div>
            ) : formStep === 'spending' ? (
              <motion.div
                key="spending"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="max-w-lg mx-auto"
              >
                <p className="font-bold text-slate-900 dark:text-white text-lg mb-6">¿Cuánto sueles gastar al mes en la compra?</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['Menos de 200€', '200 – 400€', '400 – 600€', 'Más de 600€'].map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={async () => {
                        const fd = new FormData();
                        fd.append('email', emailValue);
                        fd.append('gasto_mensual', opt);
                        await fetch('https://formspree.io/f/mwvybvog', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
                        setFormStep('done');
                      }}
                      className="py-4 px-5 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:border-brand-green hover:text-brand-green transition-all"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setFormStep('done')} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                  Omitir →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailValue) { incrementCount(); setFormStep('spending'); }
                }}
                className="relative max-w-lg mx-auto"
                noValidate
              >
                <input
                  type="email"
                  name="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-8 py-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-lg focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900 focus:border-brand-green outline-none transition-all pr-48 dark:text-white dark:placeholder-slate-500"
                  aria-label="Tu correo electrónico"
                />
                <ValidationError field="email" errors={formState.errors} className="mt-2 text-sm text-red-500 text-left absolute -bottom-6 left-2" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-brand-black dark:bg-brand-green text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:opacity-90 transition-all text-sm"
                >
                  Continuar <ArrowRight size={15} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-8 text-sm text-slate-400">
            Al enviar aceptas nuestra{' '}
            <a href="/privacidad.html" className="underline hover:text-slate-600 transition-colors">política de privacidad</a>.
            Puedes darte de baja cuando quieras.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-slate-100 dark:border-slate-800 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/android-chrome-192x192.png" alt="MySmartBasket logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold dark:text-white">MySmartBasket</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              Hacemos que la compra semanal sea más barata y fácil para las familias españolas.
            </p>
            <div className="flex gap-3">
              <div title="App Store — próximamente" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-green cursor-not-allowed transition-colors border border-slate-100 dark:border-slate-700"><Apple size={18} /></div>
              <div title="Google Play — próximamente" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-green cursor-not-allowed transition-colors border border-slate-100 dark:border-slate-700"><Smartphone size={18} /></div>
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
