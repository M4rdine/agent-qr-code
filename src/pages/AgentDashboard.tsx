import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer } from '@/components/ui/chart';
import { 
  ArrowLeft, 
  CheckCircle, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Phone,
  Clock,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Tooltip } from 'recharts';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Agentes
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Agente Conectado</h1>
                  <p className="text-sm text-slate-600">Dashboard de Performance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-slate-200 rounded-md px-3 py-1 text-sm"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
              <Badge className="bg-emerald-500 hover:bg-emerald-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Conversas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+12%</span> desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+8%</span> desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26.4%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+3.2%</span> desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+0.3s</span> desde a semana passada
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Conversas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Atividade Semanal</span>
              </CardTitle>
              <CardDescription>
                Conversas, leads e vendas dos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversations" fill="var(--color-conversations)" />
                    <Bar dataKey="leads" fill="var(--color-leads)" />
                    <Bar dataKey="sales" fill="var(--color-sales)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Funil de Conversão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Funil de Conversão</span>
              </CardTitle>
              <CardDescription>
                Status dos leads gerados pelo agente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {conversionData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-600">{item.name}</span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tempo de Resposta */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Tempo de Resposta por Período</span>
            </CardTitle>
            <CardDescription>
              Tempo médio de resposta do agente ao longo do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ avgTime: { label: "Tempo (segundos)", color: "#8b5cf6" } }} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Insights Recentes */}
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
      </div>
    </div>
  );
};

export default AgentDashboard;
