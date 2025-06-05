import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, RefreshCw, MessageSquare, ArrowLeft, CheckCircle, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryFindQRCode } from '@/services/agents/generate-qrcode';
import AgentDashboard from '@/components/agent-dashboard';

const QRCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const instanceName = queryParams.get('instanceName');  const agentData = location.state;
  console.log(instanceName);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: generateQRCode } = useQueryFindQRCode();

  const fetchQRCode = () => {
    setIsLoading(true);
    setIsConnected(false);

    generateQRCode(instanceName, {
      onSuccess: (data) => {
        const imageUrl = `${data.base64}`;
        setQrCodeUrl(imageUrl);
        setIsLoading(false);
        console.log(data);
        if(data?.instance?.state === "open") {
          setIsConnected(true);
        }
      },
      onError: () => {
        toast({
          title: "Erro ao gerar QR Code",
          description: "Não foi possível se conectar com o servidor.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const handleCopyQR = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      toast({
        title: "Link copiado!",
        description: "O link do QR Code foi copiado para sua área de transferência."
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'whatsapp-agent-qr.png';
    link.click();

    toast({
      title: "Download iniciado",
      description: "O QR Code está sendo baixado."
    });
  };

  const simulateConnection = () => {
    setIsConnected(true);
    toast({
      title: "Conexão estabelecida!",
      description: "Seu agente foi conectado com sucesso ao WhatsApp.",
    });
  };

  const goToDashboard = () => {
    navigate('/agent-dashboard', { state: agentData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="hover:bg-slate-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-whatsapp-primary to-whatsapp-dark rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Integração WhatsApp</h1>
                  <p className="text-sm text-slate-600">Conecte seu agente ao WhatsApp</p>
                </div>
              </div>
            </div>
            <Badge 
              variant={isConnected ? "default" : "secondary"} 
              className={isConnected ? "bg-emerald-500 hover:bg-emerald-500" : "bg-yellow-100 text-yellow-700"}
            >
              {isConnected ? "Conectado" : "Aguardando conexão"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mx-auto">
          {!isConnected && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Card */}
            <Card className="h-fit">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-slate-900">QR Code do Agente</CardTitle>
                <CardDescription>
                  Escaneie o código para conectar seu agente ao WhatsApp
                </CardDescription>e
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center">
                  {isLoading ? (
                    <div className="w-64 h-64 bg-slate-100 rounded-2xl flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <RefreshCw className="w-8 h-8 text-slate-400 animate-spin mx-auto" />
                        <p className="text-slate-600">Gerando QR Code...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code WhatsApp" 
                        className="w-64 h-64 border-4 border-white rounded-2xl shadow-lg"
                      />
                      {isConnected && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!isLoading && (
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-3">
                      <Button onClick={handleCopyQR} variant="outline" className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Link
                      </Button>
                      <Button onClick={handleDownloadQR} variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </div>

                    <Button onClick={fetchQRCode} variant="ghost" size="sm" className="text-slate-600">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Gerar Novo QR Code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instruções e resumo */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Como Conectar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((step, i) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-whatsapp-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {["Abra o WhatsApp", "Escaneie o QR Code", "Confirme a Conexão"][i]}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {[
                            "No seu celular, abra o aplicativo WhatsApp",
                            "Use a câmera do WhatsApp para escanear o código acima",
                            "Autorize a integração e seu agente estará ativo"
                          ][i]}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Resumo da Configuração</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Templates Selecionados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {agentData?.selectedTemplates?.map((template: string) => (
                        <Badge key={template} variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {template}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {agentData?.config?.context && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Contexto:</h4>
                      <p className="text-sm text-slate-600 line-clamp-3">{agentData.config.context}</p>
                    </div>
                  )}

                  {agentData?.qaItems?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Q&A Mapeadas:</h4>
                      <p className="text-sm text-slate-600">
                        {agentData.qaItems.length} pergunta(s) e resposta(s) configuradas
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>}

          {isConnected && (
            <AgentDashboard />
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCode;
