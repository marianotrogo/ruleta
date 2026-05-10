"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { RULETAS_DATA } from '../../constants/data';
import dynamic from 'next/dynamic';

// Importación dinámica de la ruleta para evitar errores de SSR
const Wheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  { ssr: false, loading: () => <div className="w-80 h-80 rounded-full bg-slate-100 animate-pulse" /> }
);

export default function RuletaDinamica() {
  const params = useParams();
  const router = useRouter();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [cleanSlug, setCleanSlug] = useState("");

  useEffect(() => {
    // Decodificamos el slug para que "personal%20administrativo" sea "personal administrativo"
    const slugRaw = params?.slug as string;
    if (slugRaw) {
      const decodedSlug = decodeURIComponent(slugRaw);
      setCleanSlug(decodedSlug);
      
      if (RULETAS_DATA[decodedSlug]) {
        setData(RULETAS_DATA[decodedSlug]);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [params]);

  const handleSpinClick = () => {
    if (!mustSpin && data.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 uppercase">Categoría no encontrada</h2>
        <p className="text-slate-500 mb-6 italic">"{cleanSlug}"</p>
        <button onClick={() => router.push('/')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">
          VOLVER AL MENÚ
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-bold text-slate-400 animate-pulse">
        CARGANDO RULETA...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-4 overflow-hidden select-none">
      
      <button 
        onClick={() => router.push('/')} 
        className="self-start flex items-center gap-2 text-slate-400 font-bold text-xs mb-4 p-2 active:bg-slate-100 rounded-lg"
      >
        <ChevronLeft size={16} /> VOLVER
      </button>

      <h1 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-tighter text-center leading-tight max-w-[250px]">
        RUEDA DE BIENESTAR: <br/>
        <span className="text-indigo-600">{cleanSlug}</span>
      </h1>

      <div className="relative scale-[0.95] sm:scale-100 shadow-2xl rounded-full border-[6px] border-slate-50 bg-white">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setShowModal(true);
          }}
          outerBorderColor="#f1f5f9"
          outerBorderWidth={3}
          innerRadius={15}
          radiusLineColor="#ffffff"
          radiusLineWidth={2}
          fontSize={12}
          textDistance={60}
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={handleSpinClick}
            disabled={mustSpin}
            className="w-20 h-20 rounded-full border-4 border-white shadow-xl bg-white flex items-center justify-center active:scale-75 transition-transform overflow-hidden"
          >
            <img src="/logo.png" alt="Girar" className="w-40 h-40 object-contain" />
          </button>
        </div>
      </div>

      <p className="mt-8 text-blue-800 font-black text-[9px] tracking-[0.2em] uppercase">
        Toca el centro para girar
      </p>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white w-full max-w-md rounded-t-[40px] sm:rounded-3xl p-8 pt-12 shadow-2xl text-center border-t-[12px]"
              style={{ borderTopColor: data[prizeNumber].style.backgroundColor }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />
              <div className="text-7xl mb-4">{data[prizeNumber].icon}</div>
              <h2 className="text-2xl font-black mb-4 text-slate-800 uppercase tracking-tighter">
                {data[prizeNumber].title}
              </h2>
              <div className="max-h-[40vh] overflow-y-auto mb-8">
                <p className="text-slate-600 text-lg leading-relaxed font-semibold italic px-2">
                  "{data[prizeNumber].content}"
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg tracking-widest active:scale-95 transition-transform shadow-lg"
              >
                ¡ENTENDIDO!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}