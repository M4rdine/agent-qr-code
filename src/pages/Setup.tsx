
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, MessageSquare, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAgentsCreate } from '@/services/agents/create-agent';

interface QAItem {
  id: string;
  question: string;
  answer: string;
}

const generateInstanceName = (template: string) => {
  const slug = template.toLowerCase().replace(/\s+/g, '-');
  const random = Math.random().toString(36).substring(2, 8);
  return `${slug}-${random}`;
}

const Setup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedTemplates = location.state?.selectedTemplates || [];
  const [formData, setFormData] = useState({
    context: '',
    trainingMaterials: '',
    behavior: '',
    responseStyle: ''
  });

  const [qaItems, setQaItems] = useState<QAItem[]>([
    { id: '1', question: '', answer: '' }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addQAItem = () => {
    const newItem: QAItem = {
      id: Date.now().toString(),
      question: '',
      answer: ''
    };
    setQaItems([...qaItems, newItem]);
  };

  const removeQAItem = (id: string) => {
    if (qaItems.length > 1) {
      setQaItems(qaItems.filter(item => item.id !== id));
    }
  };

  const updateQAItem = (id: string, field: 'question' | 'answer', value: string) => {
    setQaItems(qaItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const { mutate } = useAgentsCreate();

  const handleSubmit = () => {
    // Validação básica
    if (!formData.context.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o contexto do agente.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.behavior.trim()) {
      toast({
        title: "Campo obrigatório", 
        description: "Por favor, descreva como espera que o robô se comporte.",
        variant: "destructive"
      });
      return;
    }

    const instanceName = generateInstanceName(selectedTemplates[0])
    mutate({
      additionalContext: formData?.context,
      additionalMatherial: formData?.trainingMaterials,
      agentAnswers: formData?.responseStyle,
      agentFeeling: formData?.behavior,
      instanceName: instanceName,
      status: "connected",
      template: selectedTemplates[0] || "vendas",
    }, {
      onSuccess: () => {
        navigate(`/qrcode?instanceName=${instanceName}`, { 
          state: { 
            selectedTemplates, 
            config: formData, 
            qaItems: qaItems.filter(item => item.question.trim() && item.answer.trim())
          } 
        });
      },
      onError: () => {
      toast({
        title: "Erro ao criar agente!", 
        description: "Ocorreu um erro interno ao tentar criar este agente.",
        variant: "destructive"
      });
      }
    })
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
                onClick={() => navigate(-1)}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Configuração do Agente</h1>
                  <p className="text-sm text-slate-600">Configure seu agente de IA personalizado</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {selectedTemplates.map((template: string) => (
                <Badge key={template} variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {template}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Configurações Principais */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Configurações Principais</CardTitle>
              <CardDescription>
                Defina as características fundamentais do seu agente de IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="context" className="text-base font-medium">
                  1. Contexto do Agente (userSystem) *
                </Label>
                <Textarea
                  id="context"
                  placeholder="Descreva o contexto em que seu agente atuará. Ex: Você é um assistente de vendas de uma loja de roupas online..."
                  value={formData.context}
                  onChange={(e) => handleInputChange('context', e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="training" className="text-base font-medium">
                  2. Materiais para Treinamento
                </Label>
                <Textarea
                  id="training"
                  placeholder="Inclua links, documentos, informações sobre produtos/serviços que o agente deve conhecer..."
                  value={formData.trainingMaterials}
                  onChange={(e) => handleInputChange('trainingMaterials', e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="behavior" className="text-base font-medium">
                  3. Como você espera que o robô se comporte? *
                </Label>
                <Textarea
                  id="behavior"
                  placeholder="Ex: Seja sempre prestativo, faça perguntas qualificadoras, seja proativo em oferecer soluções..."
                  value={formData.behavior}
                  onChange={(e) => handleInputChange('behavior', e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style" className="text-base font-medium">
                  4. Como você espera que seu robô responda?
                </Label>
                <Textarea
                  id="style"
                  placeholder="Ex: Respostas concisas e diretas, tom informal e amigável, sempre com emojis..."
                  value={formData.responseStyle}
                  onChange={(e) => handleInputChange('responseStyle', e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Perguntas e Respostas Mapeadas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Perguntas e Respostas Mapeadas</CardTitle>
              <CardDescription>
                Configure respostas específicas para perguntas frequentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {qaItems.map((item, index) => (
                <div key={item.id} className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900">Pergunta/Resposta #{index + 1}</h4>
                    {qaItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQAItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Pergunta</Label>
                      <Input
                        placeholder="Ex: Existe produto X no catálogo?"
                        value={item.question}
                        onChange={(e) => updateQAItem(item.id, 'question', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Resposta</Label>
                      <Textarea
                        placeholder="Ex: Para visualizar os produtos existentes acesse o catálogo x.com"
                        value={item.answer}
                        onChange={(e) => updateQAItem(item.id, 'answer', e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addQAItem}
                variant="outline"
                className="w-full border-dashed border-2 border-slate-300 hover:border-whatsapp-primary hover:bg-whatsapp-primary/5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Nova Pergunta/Resposta
              </Button>
            </CardContent>
          </Card>

          {/* Botão de Salvar */}
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark hover:from-whatsapp-dark hover:to-whatsapp-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar e Gerar QR Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
