"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Calendar,
  Download,
  RefreshCw,
  LogOut
} from "lucide-react"
import Link from "next/link"

// Mock data
const balanceData = [
  { month: "Jan", balance: 45000, income: 12000, expenses: 8000 },
  { month: "Feb", balance: 52000, income: 15000, expenses: 8000 },
  { month: "Mar", balance: 48000, income: 11000, expenses: 15000 },
  { month: "Apr", balance: 61000, income: 18000, expenses: 5000 },
  { month: "May", balance: 55000, income: 14000, expenses: 20000 },
  { month: "Jun", balance: 67000, income: 22000, expenses: 10000 },
]

const expenseCategories = [
  { name: "Alimentação", value: 2800, color: "#6366F1" },
  { name: "Transporte", value: 1200, color: "#8B5CF6" },
  { name: "Moradia", value: 3500, color: "#06B6D4" },
  { name: "Entretenimento", value: 800, color: "#10B981" },
  { name: "Saúde", value: 600, color: "#F59E0B" },
  { name: "Outros", value: 1100, color: "#EF4444" },
]

const transactions = [
  { id: 1, description: "Salário", amount: 8500, type: "income", date: "2024-01-15", category: "Trabalho" },
  { id: 2, description: "Supermercado", amount: -320, type: "expense", date: "2024-01-14", category: "Alimentação" },
  { id: 3, description: "Netflix", amount: -29.90, type: "expense", date: "2024-01-13", category: "Entretenimento" },
  { id: 4, description: "Freelance", amount: 1200, type: "income", date: "2024-01-12", category: "Trabalho" },
  { id: 5, description: "Uber", amount: -45, type: "expense", date: "2024-01-11", category: "Transporte" },
  { id: 6, description: "Dividendos", amount: 250, type: "income", date: "2024-01-10", category: "Investimentos" },
  { id: 7, description: "Farmácia", amount: -85, type: "expense", date: "2024-01-09", category: "Saúde" },
  { id: 8, description: "Restaurante", amount: -120, type: "expense", date: "2024-01-08", category: "Alimentação" },
]

const monthlyComparison = [
  { month: "Jan", thisYear: 8500, lastYear: 7200 },
  { month: "Feb", thisYear: 9200, lastYear: 8100 },
  { month: "Mar", thisYear: 7800, lastYear: 8900 },
  { month: "Apr", thisYear: 11200, lastYear: 9500 },
  { month: "May", thisYear: 9800, lastYear: 8800 },
  { month: "Jun", thisYear: 12500, lastYear: 10200 },
]

export default function FinancialDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("6m")
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  const totalBalance = 67420.50
  const monthlyIncome = 12500
  const monthlyExpenses = 8750
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100).toFixed(1)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-[#262626] bg-[#1A1A1A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">FinanceHub</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="text-gray-400 hover:text-white hover:bg-[#262626]"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#262626]">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#262626]">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#262626]">
                <User className="w-4 h-4" />
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#262626]">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] border-0 hover-lift neon-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Saldo Total</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white/70 hover:text-white hover:bg-white/10 p-1 h-auto"
                >
                  {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Wallet className="w-4 h-4 text-white/70" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {balanceVisible ? `R$ ${totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "••••••"}
              </div>
              <div className="flex items-center text-white/70 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% este mês
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Receitas</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                R$ {monthlyIncome.toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.2% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Despesas</CardTitle>
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                R$ {monthlyExpenses.toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -3.1% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Taxa de Poupança</CardTitle>
              <PiggyBank className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {savingsRate}%
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                Meta: 30%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="bg-[#1A1A1A] border border-[#262626]">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
                Análises
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
                Transações
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32 bg-[#1A1A1A] border-[#262626] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#262626]">
                  <SelectItem value="1m">1 mês</SelectItem>
                  <SelectItem value="3m">3 meses</SelectItem>
                  <SelectItem value="6m">6 meses</SelectItem>
                  <SelectItem value="1y">1 ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="border-[#262626] bg-[#1A1A1A] hover:bg-[#262626]">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Balance Chart */}
              <Card className="lg:col-span-2 bg-[#1A1A1A] border-[#262626] hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Evolução do Saldo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={balanceData}>
                      <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                      <XAxis dataKey="month" stroke="#A3A3A3" />
                      <YAxis stroke="#A3A3A3" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1A1A', 
                          border: '1px solid #262626',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#6366F1" 
                        strokeWidth={2}
                        fill="url(#balanceGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Gastos por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1A1A', 
                          border: '1px solid #262626',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {expenseCategories.slice(0, 3).map((category, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-gray-300">{category.name}</span>
                        </div>
                        <span className="text-white font-medium">
                          R$ {category.value.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Income vs Expenses */}
            <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
              <CardHeader>
                <CardTitle className="text-white">Receitas vs Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="month" stroke="#A3A3A3" />
                    <YAxis stroke="#A3A3A3" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #262626',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#10B981" name="Receitas" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#EF4444" name="Despesas" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Comparison */}
              <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Comparação Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                      <XAxis dataKey="month" stroke="#A3A3A3" />
                      <YAxis stroke="#A3A3A3" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A1A1A', 
                          border: '1px solid #262626',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="thisYear" 
                        stroke="#6366F1" 
                        strokeWidth={3}
                        name="2024"
                        dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lastYear" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="2023"
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Financial Goals */}
              <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Metas Financeiras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Fundo de Emergência</span>
                      <span className="text-sm text-white font-medium">75%</span>
                    </div>
                    <div className="w-full bg-[#262626] rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>R$ 37.500</span>
                      <span>R$ 50.000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Viagem</span>
                      <span className="text-sm text-white font-medium">45%</span>
                    </div>
                    <div className="w-full bg-[#262626] rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>R$ 4.500</span>
                      <span>R$ 10.000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Investimentos</span>
                      <span className="text-sm text-white font-medium">92%</span>
                    </div>
                    <div className="w-full bg-[#262626] rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>R$ 18.400</span>
                      <span>R$ 20.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-[#1A1A1A] border-[#262626] hover-lift">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-white">Transações Recentes</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-[#262626] bg-[#1A1A1A] hover:bg-[#262626]">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#262626] bg-[#1A1A1A] hover:bg-[#262626]">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-4 rounded-lg bg-[#262626]/50 hover:bg-[#262626] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {transaction.type === 'income' ? (
                            <Plus className="w-5 h-5" />
                          ) : (
                            <Minus className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>{transaction.date}</span>
                            <Badge variant="secondary" className="bg-[#1A1A1A] text-gray-300">
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}