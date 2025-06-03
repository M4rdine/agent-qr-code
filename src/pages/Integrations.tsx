
import { Lock, Zap, Database, MessageCircle, Building, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const integrationOptions = [
  {
    name: 'CRM Integrations',
    description: 'Conecte com Salesforce, HubSpot, Pipedrive e outros',
    icon: Database,
    color: 'from-blue-500 to-blue-600',
    features: ['Sync automático de leads', 'Atualização de status', 'Histórico de conversas']
  },
  {
    name: 'WhatsApp Business API',
    description: 'Integração oficial com WhatsApp Business',
    icon: MessageCircle,
    color: 'from-whatsapp-primary to-whatsapp-dark',
    features: ['Envio de mensagens em massa', 'Templates aprovados', 'Métricas avançadas']
  },
  {
    name: 'Instagram Direct',
    description: 'Conecte seu agente ao Instagram Direct',
    icon: MessageCircle,
    color: 'from-pink-500 to-purple-600',
    features: ['Mensagens diretas', 'Stories interativos', 'Comentários automáticos']
  },
  {
    name: 'ERP Systems',
    description: 'Integre com sistemas de gestão empresarial',
    icon: Building,
    color: 'from-gray-500 to-gray-600',
    features: ['Consulta de estoque', 'Pedidos automáticos', 'Dados de clientes']
  }
];

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Integrações</h1>
            <p className="text-slate-600">Conecte seu agente com as principais plataformas do mercado</p>
            <Badge variant="secondary" className="mt-4 bg-amber-100 text-amber-700">
              Em Breve - Funcionalidade Bloqueada
            </Badge>
          </div>

          {/* Grid de Integrações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {integrationOptions.map((integration, index) => {
              const IconComponent = integration.icon;
              
              return (
                <Card key={integration.name} className="opacity-60 hover:opacity-70 transition-opacity">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {integration.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button disabled className="w-full bg-slate-400 cursor-not-allowed">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar Integração
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Seção de Webhooks */}
          <Card className="mb-8 opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Webhooks Personalizados
              </CardTitle>
              <CardDescription>
                Configure webhooks para integração personalizada com seus sistemas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Eventos Disponíveis</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      Nova mensagem recebida
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      Lead qualificado
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      Conversação finalizada
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Configuração</h4>
                  <div className="p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                    <p className="text-sm text-slate-600 text-center">
                      Área de configuração de webhooks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integrações Futuras */}
          <Card>
            <CardHeader>
              <CardTitle>Roadmap de Integrações</CardTitle>
              <CardDescription>
                Próximas integrações que serão disponibilizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg mx-auto mb-2"></div>
                  <h4 className="font-medium text-slate-900 mb-1">Zapier</h4>
                  <p className="text-xs text-slate-600">Conecte com 3000+ apps</p>
                </div>
                <div className="text-center p-4 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg mx-auto mb-2"></div>
                  <h4 className="font-medium text-slate-900 mb-1">Google Sheets</h4>
                  <p className="text-xs text-slate-600">Export automático de dados</p>
                </div>
                <div className="text-center p-4 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg mx-auto mb-2"></div>
                  <h4 className="font-medium text-slate-900 mb-1">Slack</h4>
                  <p className="text-xs text-slate-600">Notificações em tempo real</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Button disabled className="bg-slate-400 cursor-not-allowed">
              <Lock className="w-4 h-4 mr-2" />
              Funcionalidade em Desenvolvimento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
