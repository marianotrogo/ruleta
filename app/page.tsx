"use client";
import Link from 'next/link';
import { Contact, UserRound, GraduationCap, FerrisWheel } from 'lucide-react';

const categorias = [
  { 
    id: 'personal administrativo', 
    nombre: 'Personal Administrativo', 
    icono: <Contact />, 
    color: 'bg-indigo-500' 
  },
  { 
    id: 'personal maestranza', 
    nombre: 'Personal de Maestranza', 
    icono: <UserRound />, 
    color: 'bg-emerald-500' 
  },
  { 
    id: 'personal docente', 
    nombre: 'Personal Docente', 
    icono: <GraduationCap />, 
    color: 'bg-gray-500' 
  },
];

export default function Menu() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 select-none">
      <div className="text-center mb-12">
        <div className="bg-indigo-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <img 
            src="/logo.png" 
            alt="Logo T.O." 
            className="w-full h-full object-contain drop-shadow-md" 
          />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
          Juga y <span className="text-indigo-600">Gana Salud</span>
        </h1>
        <p className="text-slate-400 font-bold text-sm tracking-widest mt-2 uppercase">Selecciona tu área</p>
      </div>

      <div className="grid gap-4 w-full max-w-sm">
        {categorias.map((cat) => (
          <Link key={cat.id} href={`/ruleta/${cat.id}`}>
            <div className="group bg-slate-50 p-1 rounded-[2rem] border-2 border-transparent hover:border-indigo-100 active:scale-95 transition-all">
              <div className="bg-white p-4 rounded-[1.8rem] shadow-sm flex items-center gap-5">
                <div className={`${cat.color} p-4 rounded-2xl text-white shadow-lg`}>
                  {cat.icono}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-indigo-600/50 uppercase tracking-widest">Entrar a</span>
                  <span className="text-lg font-black text-slate-800 leading-tight">
                    {cat.nombre}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-slate-300 text-[10px] font-bold tracking-[0.3em] uppercase">
        Proyecto Universitario • Terapia Ocupacional
      </footer>
    </div>
  );
}