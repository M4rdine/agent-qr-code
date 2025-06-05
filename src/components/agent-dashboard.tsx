import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  MessageSquare, 
  Users, 
  Target,
  Clock
} from 'lucide-react';
import MetricsCard from './custom/dashboard/MetricsCard';
import WeeklyActivityChart from './custom/dashboard/WeeklyActivityChart';
import ConversionFunnelChart from './custom/dashboard/ConversionFunnelChart';
import ResponseTimeChart from './custom/dashboard/ResponseTimeChart';
import InsightsSection from './custom/dashboard/InsightsSection';

const AgentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');

  const agentData = location.state;

  // Mock data para as métricas
  const conversationData = [
    { day: 'Seg', conversations: 45, leads: 12, sales: 3 },
    { day: 'Ter', conversations: 52, leads: 18, sales: 5 },
    { day: 'Qua', conversations: 38, leads: 9, sales: 2 },
    { day: 'Qui', conversations: 61, leads: 22, sales: 7 },
    { day: 'Sex', conversations: 55, leads: 16, sales: 4 },
    { day: 'Sáb', conversations: 33, leads: 8, sales: 2 },
    { day: 'Dom', conversations: 28, leads: 6, sales: 1 }
  ];

  const responseTimeData = [
    { hour: '00h', avgTime: 45 },
    { hour: '06h', avgTime: 32 },
    { hour: '12h', avgTime: 18 },
    { hour: '18h', avgTime: 25 },
    { hour: '24h', avgTime: 38 }
  ];

  const conversionData = [
    { name: 'Convertidos', value: 24, color: '#10b981' },
    { name: 'Em negociação', value: 38, color: '#f59e0b' },
    { name: 'Perdidos', value: 18, color: '#ef4444' },
    { name: 'Sem interesse', value: 20, color: '#6b7280' }
  ];

  const chartConfig = {
    conversations: {
      label: "Conversas",
      color: "#3b82f6",
    },
    leads: {
      label: "Leads",
      color: "#10b981",
    },
    sales: {
      label: "Vendas",
      color: "#f59e0b",
    },
  };

  return (
      <div className='w-full'>
        {/* Status Card */}
        <Card className="mb-8 border-emerald-200 bg-emerald-50">
          <CardContent className="py-6">
            <div className="flex items-center justify-center space-x-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <div className="text-center">
                <h2 className="text-xl font-bold text-emerald-900">🎉 Parabéns! Seu agente está ativo</h2>
                <p className="text-emerald-700">
                  Conectado ao WhatsApp e pronto para converter leads em vendas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total de Conversas"
            value={312}
            change="+12%"
            changeType="positive"
            icon={MessageSquare}
          />
          <MetricsCard
            title="Leads Gerados"
            value={91}
            change="+8%"
            changeType="positive"
            icon={Users}
          />
          <MetricsCard
            title="Taxa de Conversão"
            value="26.4%"
            change="+3.2%"
            changeType="positive"
            icon={Target}
          />
          <MetricsCard
            title="Tempo Médio de Resposta"
            value="2.3s"
            change="+0.3s"
            changeType="negative"
            icon={Clock}
          />
        </div>

        {/* Gráficos - Layout responsivo melhorado */}
        <div className="space-y-8 mb-8">
          {/* Primeira linha - gráficos de atividade e funil */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="min-h-[400px]">
              <WeeklyActivityChart data={conversationData} chartConfig={chartConfig} />
            </div>
            <div className="min-h-[400px]">
              <ConversionFunnelChart data={conversionData} />
            </div>
          </div>
          
          {/* Segunda linha - gráfico de tempo de resposta */}
          <div className="w-full">
            <ResponseTimeChart data={responseTimeData} />
          </div>
        </div>

        <InsightsSection />
      </div>
  );
};

export default AgentDashboard;
