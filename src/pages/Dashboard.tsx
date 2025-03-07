
import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Menu } from "lucide-react";

// Static data for the dashboard
const statisticsData = [
  { title: "Sign ups in last 7 days", value: "2,130" },
  { title: "Revenue in last 7 days", value: "$4,250" },
  { title: "Visitors in last 7 days", value: "4,210" },
];

const revenueSourceData = [
  { name: "Google", value: 45, color: "#4285F4" },
  { name: "Email Marketing", value: 25, color: "#EA4335" },
  { name: "Facebook", value: 15, color: "#34A853" },
  { name: "LinkedIn", value: 15, color: "#FBBC05" },
];

const monthlySignUpsData = [
  { month: "Jan", monthlySignUps: 800, totalSignUps: 800 },
  { month: "Feb", monthlySignUps: 1200, totalSignUps: 2000 },
  { month: "Mar", monthlySignUps: 1400, totalSignUps: 3400 },
  { month: "Apr", monthlySignUps: 1300, totalSignUps: 4700 },
  { month: "May", monthlySignUps: 1500, totalSignUps: 5200 },
  { month: "Jun", monthlySignUps: 1600, totalSignUps: 6800 },
  { month: "Jul", monthlySignUps: 1700, totalSignUps: 8100 },
  { month: "Aug", monthlySignUps: 1800, totalSignUps: 9400 },
  { month: "Sep", monthlySignUps: 1900, totalSignUps: 11300 },
  { month: "Oct", monthlySignUps: 2000, totalSignUps: 13300 },
  { month: "Nov", monthlySignUps: 2400, totalSignUps: 15700 },
  { month: "Dec", monthlySignUps: 2800, totalSignUps: 18500 },
];

const monthlyVisitorsData = [
  { month: "Jul", google: 2000, facebook: 900, linkedin: 600, email: 500 },
  { month: "Aug", google: 2100, facebook: 950, linkedin: 650, email: 550 },
  { month: "Sep", google: 2200, facebook: 850, linkedin: 700, email: 650 },
  { month: "Oct", google: 1900, facebook: 800, linkedin: 750, email: 600 },
  { month: "Nov", google: 1800, facebook: 900, linkedin: 800, email: 700 },
  { month: "Dec", google: 2000, facebook: 850, linkedin: 650, email: 550 },
];

const supportAgentsData = [
  { agent: "Alex", totalCalls: 90, callsAnswered: 90, resolved: 80 },
  { agent: "Bob", totalCalls: 104, callsAnswered: 100, resolved: 79 },
  { agent: "Cindy", totalCalls: 112, callsAnswered: 110, resolved: 100 },
  { agent: "Dana", totalCalls: 91, callsAnswered: 90, resolved: 89 },
  { agent: "Eric", totalCalls: 100, callsAnswered: 90, resolved: 80 },
  { agent: "Janet", totalCalls: 109, callsAnswered: 90, resolved: 89 },
];

// Card header component with a title and menu icon
const CardHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-medium">{title}</h3>
    <Menu className="h-5 w-5 text-gray-500" />
  </div>
);

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Sample Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statisticsData.map((stat, index) => (
          <Card key={index} className="p-6">
            <CardHeader title={stat.title} />
            <p className="text-4xl md:text-5xl font-semibold text-center">{stat.value}</p>
          </Card>
        ))}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Source - Pie Chart */}
        <Card className="p-6">
          <CardHeader title="Revenue By Source" />
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  label
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Monthly Sign Ups - Bar Chart */}
        <Card className="p-6">
          <CardHeader title="Monthly Sign Ups" />
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySignUpsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="monthlySignUps" name="Monthly Sign ups" fill="#3b82f6" />
                <Bar dataKey="totalSignUps" name="Total Sign ups" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Monthly Visitors by Source - Stacked Bar Chart */}
        <Card className="p-6">
          <CardHeader title="Monthly Visitors by Source" />
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVisitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="google" stackId="a" name="Google" fill="#4285F4" />
                <Bar dataKey="facebook" stackId="a" name="Facebook" fill="#34A853" />
                <Bar dataKey="linkedin" stackId="a" name="LinkedIn" fill="#FBBC05" />
                <Bar dataKey="email" stackId="a" name="Email Marketing" fill="#EA4335" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Top Performing Support Agents - Table */}
        <Card className="p-6">
          <CardHeader title="Top Performing Support Agents" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Total Calls</TableHead>
                <TableHead>Calls Answered</TableHead>
                <TableHead>Resolved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supportAgentsData.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell>{agent.agent}</TableCell>
                  <TableCell>{agent.totalCalls}</TableCell>
                  <TableCell>{agent.callsAnswered}</TableCell>
                  <TableCell>{agent.resolved}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
