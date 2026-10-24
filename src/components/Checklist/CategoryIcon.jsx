import React from 'react';
import {
  Skull,
  Users,
  Wand2,
  Flame,
  Ghost,
  Swords,
  Sword,
  ShieldAlert,
  Gem,
  Shield,
  Package,
  Sparkles,
} from 'lucide-react';

export function CategoryIcon({ category, className = 'w-4 h-4' }) {
  switch (category) {
    case 'jefazos':
      return <Skull className={className} />;
    case 'personajes':
      return <Users className={className} />;
    case 'hechizos':
      return <Wand2 className={className} />;
    case 'encantamientos':
      return <Flame className={className} />;
    case 'cenizas-espiritus':
      return <Ghost className={className} />;
    case 'cenizas-guerra':
      return <Swords className={className} />;
    case 'armas':
      return <Sword className={className} />;
    case 'armaduras':
      return <ShieldAlert className={className} />;
    case 'talismanes':
      return <Gem className={className} />;
    case 'escudos':
      return <Shield className={className} />;
    case 'objetos':
      return <Package className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
