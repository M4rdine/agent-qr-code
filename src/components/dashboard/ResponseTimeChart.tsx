
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ResponseTimeData {
  hour: string;
  avgTime: number;
}

interface ResponseTimeChartProps {
  data: ResponseTimeData[];
}

const ResponseTimeChart = ({ data }: ResponseTimeChartProps) => {
  const chartConfig = { avgTime: { label: "Tempo (segundos)", color: "#8b5cf6" } };

  return (
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
        <ChartContainer config={chartConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
  );
};

export default ResponseTimeChart;
