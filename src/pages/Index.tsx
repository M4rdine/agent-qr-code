
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Phone, Stethoscope, Users, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgentTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  popular?: boolean;
}

const agentTemplates: AgentTemplate[] = [
  {
    id: 'vendas',
    title: 'Agente de Vendas',
    description: 'Especializado em conversão e fechamento de negócios',
    icon: Zap,
    color: 'from-emerald-500 to-teal-600',
    features: ['Qualificação de leads', 'Follow-up automático', 'Técnicas de persuasão'],
    popular: true
  },
  {
    id: 'suporte',
    title: 'Agente de Suporte',
    description: 'Atendimento eficiente e resolução de problemas',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-600',
    features: ['FAQ inteligente', 'Escalação automática', 'Relatórios de satisfação']
  },
  {
    id: 'sdr',
    title: 'Agente SDR',
    description: 'Prospecção e desenvolvimento de vendas',
    icon: Phone,
    color: 'from-purple-500 to-violet-600',
    features: ['Prospecção ativa', 'Qualificação BANT', 'Agendamento automático']
  },
  {
    id: 'clinicas',
    title: 'Agente para Clínicas',
    description: 'Especializado em atendimento médico e agendamentos',
    icon: Stethoscope,
    color: 'from-rose-500 to-pink-600',
    features: ['Agendamento de consultas', 'Lembretes automáticos', 'Triagem inicial']
  },
  {
    id: 'generico',
    title: 'Agente Genérico',
    description: 'Personalizável para qualquer necessidade',
    icon: Bot,
    color: 'from-gray-500 to-slate-600',
    features: ['Totalmente customizável', 'Múltiplos casos de uso', 'Flexibilidade máxima']
  }
];

const Index = () => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
    } else if (selectedTemplates.length < 5) {
      setSelectedTemplates([...selectedTemplates, templateId]);
    }
  };

  const handleContinue = () => {
    if (selectedTemplates.length > 0) {
      navigate('/setup', { state: { selectedTemplates } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">WhatsApp AI Platform</h1>
                <p className="text-sm text-slate-600">Crie agentes inteligentes para seu negócio</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Beta v1.0
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Escolha Seus Templates de Agente
          </h2>
          <p className="text-xl text-slate-600 mb-2">
            Selecione até 5 templates para criar agentes de IA personalizados
          </p>
          <p className="text-sm text-slate-500">
            {selectedTemplates.length}/5 templates selecionados
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agentTemplates.map((template, index) => {
            const IconComponent = template.icon;
            const isSelected = selectedTemplates.includes(template.id);
            const canSelect = selectedTemplates.length < 5 || isSelected;

            return (
              <Card
                key={template.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl animate-fade-in-up ${
                  isSelected
                    ? 'ring-2 ring-whatsapp-primary shadow-lg scale-105'
                    : canSelect
                    ? 'hover:scale-105 shadow-md'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => canSelect && handleTemplateSelect(template.id)}
              >
                {template.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{template.title}</CardTitle>
                  <CardDescription className="text-slate-600">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {template.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center text-emerald-700">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Selecionado</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={selectedTemplates.length === 0}
            size="lg"
            className="bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark hover:from-whatsapp-dark hover:to-whatsapp-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continuar para Configuração
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
