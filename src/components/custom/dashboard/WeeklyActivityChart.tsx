
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface WeeklyActivityChartProps {
  data: Array<{
    day: string;
    conversations: number;
    leads: number;
    sales: number;
  }>;
  chartConfig: any;
}

const WeeklyActivityChart = ({ data, chartConfig }: WeeklyActivityChartProps) => {
  return (
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
            <BarChart data={data}>
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
  );
};

export default WeeklyActivityChart;
