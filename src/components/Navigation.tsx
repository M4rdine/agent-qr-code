
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Home, 
  Users, 
  Zap, 
  QrCode, 
  Settings, 
  Menu, 
  X,
  Lock 
} from 'lucide-react';

const navigationItems = [
  {
    id: 'home',
    label: 'Início',
    href: '/',
    icon: Home,
    description: 'Templates de agentes'
  },
  {
    id: 'setup',
    label: 'Configuração',
    href: '/setup',
    icon: Settings,
    description: 'Setup do agente'
  },
  {
    id: 'qrcode',
    label: 'QR Code',
    href: '/qrcode',
    icon: QrCode,
    description: 'Integração WhatsApp'
  },
  {
    id: 'leads',
    label: 'Leads',
    href: '/leads',
    icon: Users,
    description: 'Gerenciar leads',
    locked: true
  },
  {
    id: 'integrations',
    label: 'Integrações',
    href: '/integrations',
    icon: Zap,
    description: 'APIs e webhooks',
    locked: true
  }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (href: string, locked?: boolean) => {
    if (!locked) {
      navigate(href);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-sm border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">AI Platform</h2>
                <p className="text-xs text-slate-600">WhatsApp Agents</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href, item.locked)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-whatsapp-primary/10 text-whatsapp-primary border border-whatsapp-primary/20'
                      : item.locked
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  disabled={item.locked}
                >
                  <div className="relative">
                    <IconComponent className="w-5 h-5" />
                    {item.locked && (
                      <Lock className="w-3 h-3 absolute -top-1 -right-1 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      {item.locked && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                          Em breve
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <div className="text-center">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                v1.0.0 Beta
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
