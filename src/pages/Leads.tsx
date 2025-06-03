
import { Lock, Users, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Leads = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gerenciamento de Leads</h1>
            <p className="text-slate-600">Visualize e gerencie todos os leads capturados pelo seu agente</p>
            <Badge variant="secondary" className="mt-4 bg-amber-100 text-amber-700">
              Em Breve - Funcionalidade Bloqueada
            </Badge>
          </div>

          {/* Preview das Funcionalidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Lista de Leads
                </CardTitle>
                <CardDescription>
                  Visualize todos os leads capturados com informações detalhadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">João Silva</p>
                      <p className="text-sm text-slate-600">+55 11 99999-9999</p>
                    </div>
                    <Badge variant="default" className="bg-emerald-500">Novo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Maria Santos</p>
                      <p className="text-sm text-slate-600">+55 11 88888-8888</p>
                    </div>
                    <Badge variant="secondary">Qualificado</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Lead Manual
                </CardTitle>
                <CardDescription>
                  Adicione leads manualmente ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-2 border-dashed border-slate-300 rounded-lg text-center">
                    <Plus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Clique para adicionar novo lead</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Funcionalidades Futuras */}
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades Planejadas</CardTitle>
              <CardDescription>
                O que estará disponível quando esta seção for liberada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Captura Automática</h4>
                    <p className="text-sm text-slate-600">Leads capturados automaticamente via WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Qualificação de Leads</h4>
                    <p className="text-sm text-slate-600">Sistema de pontuação e classificação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Filtros Avançados</h4>
                    <p className="text-sm text-slate-600">Busca e filtros por data, status, origem</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-slate-900">Exportação de Dados</h4>
                    <p className="text-sm text-slate-600">Export para CSV, Excel e integração com CRM</p>
                  </div>
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

export default Leads;
