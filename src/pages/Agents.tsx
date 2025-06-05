
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bot, Plus, Settings, QrCode, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQueryAgentsList } from '@/services/agents/find-all-agents';
import { agentTemplates } from './CreateAgent';

interface Agent {
  id: string;
  name: string;
  template: string;
  status: 'connected' | 'disconnected';
  createdAt: string;
  description: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: '',
    template: 'Agente de Vendas',
    status: 'connected',
    createdAt: '2024-01-15',
    description: ''
  },
  {
    id: '2',
    name: 'Suporte Clínica Saúde+',
    template: 'Agente para Clínicas',
    status: 'connected',
    createdAt: '2024-01-10',
    description: 'Agendamento de consultas e atendimento médico'
  },
  {
    id: '3',
    name: 'SDR Prospecção',
    template: 'Agente SDR',
    status: 'disconnected',
    createdAt: '2024-01-08',
    description: 'Prospecção ativa e qualificação de leads'
  }
];
  const getAgentName = (template: string) => {
    const a = agentTemplates.map((item) => {
      if(template === item.id) {
        return item.title;
      }
    })
    return a;
  }

  const getAgentDescription = (template: string) => {
    console.log(template);
    const a = agentTemplates.map((item) => {
      if(template === item.id) {
        return item.description;
      }
    })
    return a;
  }
const Agents = () => {
  const navigate = useNavigate();

  const handleCreateAgent = () => {
    navigate('/create-agent');
  };

  const { data } = useQueryAgentsList();

  console.log(data, "data");

  const getStatusColor = (status: string) => {
    return status === 'connected' 
      ? 'bg-emerald-100 text-emerald-700' 
      : 'bg-red-100 text-red-700';
  };

  const getStatusText = (status: string) => {
    return status === 'connected' ? 'Conectado' : 'Desconectado';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Meus Agentes</h1>
                <p className="text-sm text-slate-600">Gerencie seus agentes de IA para WhatsApp</p>
              </div>
            </div>
            <Button
              onClick={handleCreateAgent}
              className="bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark hover:from-whatsapp-dark hover:to-whatsapp-primary text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Incluir Novo Agente
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Total de Agentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{data?.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Agentes Conectados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {Array.isArray(data) ? data.filter(agent => agent?.status === 'connected').length : 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Agentes Desconectados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {Array.isArray(data) ? data.filter(agent => agent?.status === 'disconnected').length : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Agentes</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os seus agentes de IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Agente</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((agent) => (
                  <TableRow key={agent?.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{getAgentName(agent?.template as string)}</div>
                        <div className="text-sm text-slate-500">{getAgentDescription(agent?.template as string)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{agent.template}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(agent.status)}>
                        {getStatusText(agent.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {new Date(agent.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate("/qrcode?instanceName=Mock")}>
                          <QrCode className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agents;
