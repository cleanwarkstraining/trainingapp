import {
  Bath, Bed, ChefHat, Sofa, Droplets, RotateCw,
  ShieldCheck, Sparkles, Wind, FlaskConical, Clock,
  Hand, Eye, AlertTriangle, type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Bath, Bed, ChefHat, Sofa, Droplets, RotateCw,
  ShieldCheck, Sparkles, Wind, FlaskConical, Clock,
  Hand, Eye, AlertTriangle,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Sparkles;
}
