import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Target, Clock } from 'lucide-react';

const InsightsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Insights Recentes</span>
        </CardTitle>
        <CardDescription>
          Análises automáticas das conversas do seu agente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900">Pico de Atividade</h4>
            <p className="text-sm text-blue-700">
              Quinta-feira apresentou 40% mais conversas que a média semanal. 
              Considere ajustar a disponibilidade do agente.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
          <Target className="w-5 h-5 text-emerald-600 mt-1" />
          <div>
            <h4 className="font-medium text-emerald-900">Alta Taxa de Conversão</h4>
            <p className="text-sm text-emerald-700">
              Leads que mencionam "desconto" têm 67% mais chances de conversão.
              O agente está identificando essas oportunidades corretamente.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg">
          <Clock className="w-5 h-5 text-amber-600 mt-1" />
          <div>
            <h4 className="font-medium text-amber-900">Oportunidade de Melhoria</h4>
            <p className="text-sm text-amber-700">
              15% das conversas são abandonadas após a primeira resposta. 
              Considere ajustar a abordagem inicial do agente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
