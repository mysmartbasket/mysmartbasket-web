import React, { useState, useEffect } from 'react';
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
  Leaf
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200 group-hover:scale-105 transition-transform">
            <ShoppingBasket size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-black">MySmartBasket</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#problem" className="hover:text-brand-green transition-colors">Problema</a>
          <a href="#solution" className="hover:text-brand-green transition-colors">Solución</a>
          <a href="#features" className="hover:text-brand-green transition-colors">Funcionalidades</a>
          <a href="#how-it-works" className="hover:text-brand-green transition-colors">Cómo funciona</a>
          <button className="bg-brand-black text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
            Acceso anticipado
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#problem" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Problema</a>
            <a href="#solution" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Solución</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Funcionalidades</a>
            <button className="w-full bg-brand-green text-white py-4 rounded-xl font-bold mt-2 shadow-lg shadow-green-100">
              Probar Demo
            </button>
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
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all"
  >
    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-brand-green mb-6">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-brand-black mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const MockupApp = () => (
  <div className="relative w-full max-w-[320px] aspect-[9/18.5] bg-slate-900 rounded-[3rem] p-3 shadow-[0_0_50px_rgba(0,0,0,0.1)] border-[8px] border-slate-800 overflow-hidden mx-auto lg:mx-0">
    {/* Screen Content */}
    <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden flex flex-col font-sans">
      <div className="p-5 flex justify-between items-center bg-white border-b border-slate-50">
        <span className="text-xs font-bold text-brand-green">MySmartBasket</span>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px]">JD</div>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400">TUS CESTAS</span>
          <span className="text-[10px] text-brand-green font-medium">Ver todas</span>
        </div>
        
        {/* Mock Item */}
        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <ShoppingBasket size={16} className="text-brand-green text-opacity-50" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold">Compra Semanal</div>
            <div className="text-[10px] text-slate-400">24 productos • Mercadona</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-brand-green">42,50€</div>
            <div className="text-[9px] text-slate-400">Ahorro: 8€</div>
          </div>
        </div>

        {/* Mock Comparison */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-400">MEJOR PRECIO HOY</div>
          <div className="space-y-2">
            {[
              { label: 'Lidl', price: '41,20€', delta: '-$3.10', active: true },
              { label: 'Carrefour', price: '45,80€', delta: '+$1.50' },
              { label: 'Mercadona', price: '44,30€', delta: '+$0.00' }
            ].map((mall, i) => (
              <div key={i} className={`p-3 rounded-xl border flex justify-between items-center ${mall.active ? 'border-brand-green bg-green-50/50' : 'border-slate-100'}`}>
                <span className="text-[11px] font-medium">{mall.label}</span>
                <span className={`text-[11px] font-bold ${mall.active ? 'text-brand-green' : 'text-brand-black'}`}>{mall.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-slate-50 flex justify-around">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-brand-green"><Smartphone size={16}/></div>
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300"><TrendingDown size={16}/></div>
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300"><Users size={16}/></div>
      </div>
    </div>
    
    {/* Floating Elements (Badges) */}
    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden lg:block z-20"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-brand-green">
          <TrendingDown size={16} />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AHORRO TOTAL</div>
          <div className="text-lg font-bold text-brand-black">1.240€ <span className="text-xs text-brand-green">/ año</span></div>
        </div>
      </div>
    </motion.div>
  </div>
);

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCanvaOpen, setIsCanvaOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail('');
      }
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-brand-green">
      <Navbar />

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" 
              onClick={() => setIsVideoOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.2)] z-10 border border-white/10"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-xl transition-all active:scale-90"
                aria-label="Cerrar vídeo"
              >
                <X size={20} />
              </button>
              
              {/* Contenedor del Iframe con carga optimizada */}
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <iframe 
                  src="https://ai.studio/apps/514a1199-3642-43b6-b69d-0e1b2043b314" 
                  title="MySmartBasket Demo Video"
                  className="w-full h-full border-none rounded-[1.5rem]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CANVA MODAL --- */}
      <AnimatePresence>
        {isCanvaOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" 
              onClick={() => setIsCanvaOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl h-[85vh] bg-white rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] z-10 border border-white/10"
            >
              <button 
                onClick={() => setIsCanvaOpen(false)}
                className="absolute top-4 right-4 z-20 bg-brand-black/10 hover:bg-brand-black/20 text-brand-black p-3 rounded-full backdrop-blur-xl transition-all active:scale-90"
                aria-label="Cerrar presentación"
              >
                <X size={20} />
              </button>
              
              <div className="w-full h-full bg-slate-50">
                <iframe 
                  src="https://www.canva.com/design/DAG_-1iv9dM/YLG74bW3M2fHwS-ZTzSfGA/view?embed" 
                  title="MySmartBasket Presentation"
                  className="w-full h-full border-none"
                  allowFullScreen
                  allow="fullscreen"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a 
              href="https://mysmartbasket.github.io/MySmartBasket-MVP/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn2uTY1CbJdkMm9zfq7B5PIArIki5epKBGwMpNLf_VFIw3kCiexPTnFtlw6Mw_aem_aUFges3q7c2KTlDQP2RQpw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full text-brand-green text-sm font-bold mb-8 hover:bg-green-100 transition-colors group cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Click para la Demo
            </a>
            <h1 className="text-5xl lg:text-7xl font-bold text-brand-black leading-[1.1] tracking-tight mb-8">
              La compra que te conoce, <span className="text-brand-green">el ahorro que mereces.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Deja de perder tiempo y dinero en el súper. MySmartBasket automatiza tu lista de la compra, compara precios real-time y te ayuda a comer mejor sin esfuerzo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button 
                onClick={() => setIsCanvaOpen(true)}
                className="w-full sm:w-auto bg-brand-black text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl"
              >
                Conócenos mejor <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto bg-white text-brand-black border border-slate-200 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Vídeo Demo <Play size={18} />
              </button>
            </div>
            
            {/* Store Banners */}
            <div className="mt-10 flex flex-wrap gap-4 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl border border-white/10 cursor-not-allowed">
                <Apple size={20} fill="white" />
                <div className="leading-none">
                  <div className="text-[9px] uppercase opacity-60">Próximamente en</div>
                  <div className="text-sm font-bold font-sans">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl border border-white/10 cursor-not-allowed">
                <Play size={18} fill="white" />
                <div className="leading-none">
                  <div className="text-[9px] uppercase opacity-60">Próximamente en</div>
                  <div className="text-sm font-bold font-sans">Google Play</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="perspective-1000"
          >
            <MockupApp />
          </motion.div>
        </div>
      </section>

      {/* --- PROBLEM SECTION --- */}
      <section id="problem" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            centered 
            title="El Problema" 
            subtitle="¿Por qué comprar comida sigue siendo un dolor de cabeza?" 
          />
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Clock, title: "Pérdida de tiempo", text: "Pasamos más de 200 horas al año planificando y comprando sin una estrategia clara." },
              { icon: TrendingDown, title: "Inflación invisible", text: "Los precios varían hasta un 30% entre supermercados para los mismos productos." },
              { icon: Leaf, title: "Mala alimentación", text: "La falta de tiempo nos lleva a elegir ultraprocesados en lugar de cestas equilibradas." }
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

      {/* --- SOLUTION --- */}
      <section id="solution" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=600" 
                  alt="Healthy groceries" 
                  className="rounded-[2.5rem] shadow-2xl border-4 border-white"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-green-200/20 rounded-full blur-3xl"></div>
              
              <div className="absolute bottom-10 -right-10 bg-brand-black text-white p-6 rounded-3xl shadow-2xl z-20 max-w-[200px]">
                <div className="text-3xl font-bold mb-1">Ahorro</div>
                <div className="text-sm text-slate-400">Nuestro algoritmo detecta bajadas de precios en tiempo real.</div>
              </div>
            </div>
            
            <div>
              <SectionHeading 
                title="La Solución" 
                subtitle="La primera app que hace la compra por ti."
              >
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  MySmartBasket no es solo una lista. Es un copiloto financiero y nutricional. Escaneamos miles de productos en tus supermercados favoritos para entregarte la cesta óptima cada semana.
                </p>
                <div className="space-y-4">
                  {[
                    "Comparativas de precios automáticas",
                    "Listas inteligentes basadas en tus hábitos",
                    "Planificación de menús saludables",
                    "Integración con pedidos a domicilio"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 text-brand-green rounded-full flex items-center justify-center">
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

      {/* --- FEATURES --- */}
      <section id="features" className="py-24 px-6 bg-slate-50 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            centered 
            title="Funcionalidades" 
            subtitle="Ingeniería de datos para tu nevera" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap} 
              title="Listas Proactivas" 
              description="Sabemos cuándo se te va a acabar la leche. Generamos tu lista básica antes de que te des cuenta." 
            />
            <FeatureCard 
              icon={TrendingDown} 
              title="Split Shopping" 
              description="¿Falta algo en Mercadona pero es más barato en Lidl? Te indicamos el mix perfecto para ahorrar el máximo." 
            />
            <FeatureCard 
              icon={Users} 
              title="Cestas Familiares" 
              description="Sincroniza la lista con tu pareja o compañeros de piso en tiempo real. Se acabó el comprar dos veces lo mismo." 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Nutri-Scan" 
              description="Sustituimos automáticamente productos procesados por alternativas más saludables con el mismo sabor." 
            />
            <FeatureCard 
              icon={Leaf} 
              title="Impacto Zero" 
              description="Priorizamos productos locales y de temporada para reducir la huella de carbono de tu compra." 
            />
            <FeatureCard 
              icon={Search} 
              title="Comparador Global" 
              description="Acceso a precios de más de 45 cadenas de supermercados actualizados cada 30 minutos." 
            />
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE DEMO --- */}
      <section id="demo" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            centered 
            title="Interactive Experience" 
            subtitle="Siente el control en tus manos"
          >
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Simula cómo MySmartBasket optimiza tu compra en segundos. Añade productos y observa cómo nuestro algoritmo compara precios en tiempo real.
            </p>
          </SectionHeading>

          <div className="mt-12 bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="text-sm font-bold text-brand-green uppercase tracking-wider">PASO 1: AÑADE PRODUCTOS</div>
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Escribe 'Aceite', 'Leche', 'Aguacates'..." 
                    className="w-full pl-16 pr-8 py-6 rounded-2xl bg-white border border-slate-200 text-lg focus:ring-4 focus:ring-green-100 focus:border-brand-green outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-bold text-brand-green uppercase tracking-wider">TUS PRODUCTOS INTELIGENTES</div>
                <div className="grid gap-3">
                  {[
                    { name: 'Aceite de Oliva VE 1L', basePrice: '9.50€', savings: '1.20€', brand: 'Hojiblanca' },
                    { name: 'Leche Desnatada 6pk', basePrice: '5.40€', savings: '0.60€', brand: 'Hacendado' },
                    { name: 'Aguacate Hass (2u)', basePrice: '3.20€', savings: '0.45€', brand: 'Bio' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="p-5 bg-white rounded-2xl border border-slate-100 flex justify-between items-center group cursor-default shadow-sm"
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
                    </motion.div>
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

            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 relative overflow-hidden h-full min-h-[500px] flex flex-col">
                <div className="absolute top-0 right-0 p-8">
                  <div className="p-2 px-4 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-400">VISTA: COMPARATIVA REAL</div>
                </div>
                
                <h4 className="text-2xl font-bold mb-8 pr-12">Mejor opción detectada: <span className="text-brand-green">Lidl</span></h4>
                
                <div className="flex-1 space-y-6">
                  {[
                    { mall: 'Lidl', price: '18.10€', status: 'Mejor precio', width: '70%', color: 'bg-brand-green', active: true },
                    { mall: 'Mercadona', price: '19.45€', status: '+1.35€', width: '85%', color: 'bg-slate-200' },
                    { mall: 'Carrefour', price: '20.35€', status: '+2.25€', width: '100%', color: 'bg-slate-200' }
                  ].map((m, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{m.mall}</span>
                        <span className={m.active ? 'text-brand-green' : 'text-slate-400'}>{m.price}</span>
                      </div>
                      <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: m.width }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                          className={`h-full ${m.color}`}
                        ></motion.div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{m.status}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto p-6 rounded-3xl border border-dashed border-slate-200 flex items-center gap-4">
                  <Zap size={24} className="text-brand-green" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Nuestro sistema ha detectado que comprando el Aceite en **Lidl** y los Aguacates en **Mercadona**, podrías ahorrar **0,80€ adicionales** esta semana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            centered 
            title="El Método" 
            subtitle="Compra inteligente en 3 pasos" 
          />
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px border-t border-dashed border-slate-200 -z-10"></div>
            
            {[
              { step: "01", title: "Conecta tus hábitos", text: "Dinos qué te gusta, qué supermercados tienes cerca y tu presupuesto." },
              { step: "02", title: "Recibe tu Cesta Óptima", text: "Nuestra IA genera la compra ideal maximizando ahorro y salud." },
              { step: "03", title: "Confirma y Sonríe", text: "Pide el envío a casa o ve a la tienda con la ruta más eficiente." }
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center mx-auto mb-8 text-xl font-bold text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all cursor-default relative">
                  {s.step}
                  <div className="absolute inset-0 bg-brand-green blur-xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-slate-500 px-4">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-24 px-6 bg-brand-black text-white rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-green font-bold text-xs uppercase mb-3 block">MÉTRICAS QUE IMPORTAN</span>
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
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map(idx => (
                        <div key={idx} className="w-12 h-12 rounded-full border-4 border-brand-black overflow-hidden bg-slate-800">
                          <img src={`https://i.pravatar.cc/150?u=${idx}`} alt="User" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-lg font-bold">Más de 5,000 usuarios</div>
                      <p className="text-xs text-slate-500">Esperando el lanzamiento oficial</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { name: "Marta García", role: "Madre de 3", quote: "Antes gastaba 800€ al mes sin control. Con MySmartBasket el primer mes bajé a 630€ comprando exactamente lo mismo." },
                { name: "Jorge Ruiz", role: "Consultor", quote: "Odio hacer la compra. Ahora solo reviso la app 2 minutos el domingo y ya sé que tengo la mejor oferta." }
              ].map((t, i) => (
                <div key={i} className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors">
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

      {/* --- CTA FINAL --- */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading 
            centered 
            title="Únete a la Revolución" 
            subtitle="Sé de los primeros en comprar mejor." 
          />
          <p className="text-slate-500 text-xl mb-12">
            Prueba el modo demo ahora de forma gratuita y recibe las actualizaciones de nuestro equipo directamente en tu bandeja de entrada.
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com" 
              className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-slate-200 text-lg focus:ring-4 focus:ring-green-100 focus:border-brand-green outline-none transition-all pr-44"
            />
            <button 
              type="submit"
              disabled={isSubmitted}
              className="absolute right-2 top-2 bottom-2 px-8 bg-brand-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {isSubmitted ? 'Registrando...' : 'Reservar sitio'} <ChevronRight size={18} />
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-400">Sin spam. Solo una invitación cuando estemos listos.</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-white">
                <ShoppingBasket size={18} />
              </div>
              <span className="text-xl font-bold">MySmartBasket</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              Empoderando a los consumidores a través de transparencia de datos y tecnología inteligente.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-green cursor-pointer transition-colors border border-slate-100"><Apple size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-green cursor-pointer transition-colors border border-slate-100"><Smartphone size={18} /></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Producto</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#features" className="hover:text-brand-green transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-green transition-colors">Cómo funciona</a></li>
              <li><a href="#solution" className="hover:text-brand-green transition-colors">Solución</a></li>
              <li><a href="#problem" className="hover:text-brand-green transition-colors">El problema</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#solution" className="hover:text-brand-green transition-colors">Sobre nosotros</a></li>
              <li><a href="mailto:hola@mysmartbasket.app" className="hover:text-brand-green transition-colors">Contacto</a></li>
              <li><a href="/privacidad.html" className="hover:text-brand-green transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© 2026 MySmartBasket. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="/privacidad.html" className="hover:text-slate-600 transition-colors">Privacidad</a>
            <a href="mailto:hola@mysmartbasket.app" className="hover:text-slate-600 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
