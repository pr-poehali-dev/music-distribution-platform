import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navigation = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'distribution', label: 'Дистрибьюция', icon: 'Upload' },
    { id: 'catalog', label: 'Каталог', icon: 'Music' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'pricing', label: 'Тарифы', icon: 'CreditCard' },
    { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
    { id: 'dashboard', label: 'Личный кабинет', icon: 'User' },
  ];

  const stats = [
    { label: 'Загружено треков', value: '247', change: '+12%', icon: 'Music' },
    { label: 'Прослушивания', value: '1.2M', change: '+23%', icon: 'Play' },
    { label: 'Заработано', value: '₽342,500', change: '+18%', icon: 'DollarSign' },
    { label: 'Платформы', value: '45+', change: '+5', icon: 'Globe' },
  ];

  const platforms = [
    'Spotify', 'Apple Music', 'Яндекс.Музыка', 'VK Музыка', 'YouTube Music',
    'Amazon Music', 'Deezer', 'Tidal', 'SoundCloud', 'Boom'
  ];

  const pricingPlans = [
    {
      name: 'Старт',
      price: '₽990',
      period: 'месяц',
      features: ['До 10 треков', 'Базовая аналитика', 'Email поддержка', '5 платформ']
    },
    {
      name: 'Профи',
      price: '₽2,490',
      period: 'месяц',
      features: ['До 100 треков', 'Расширенная аналитика', 'Приоритетная поддержка', 'Все платформы', 'Продвижение']
    },
    {
      name: 'Лейбл',
      price: '₽9,990',
      period: 'месяц',
      features: ['Безлимит треков', 'Полная аналитика + API', '24/7 поддержка', 'Все платформы', 'Продвижение PRO', 'Персональный менеджер']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Disc3" className="text-primary" size={32} />
              <span className="text-2xl font-bold">MusicFlow</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id)}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Button>
              ))}
            </div>

            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="text-center py-20 space-y-6">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Распространяй свою музыку по всему миру
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Профессиональная платформа дистрибьюции для артистов и лейблов. 
                Выводи треки на 45+ платформ за считанные минуты.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" className="gap-2" onClick={() => setActiveSection('distribution')}>
                  <Icon name="Upload" size={20} />
                  Загрузить трек
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveSection('dashboard')}>
                  Личный кабинет
                </Button>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="hover:scale-105 transition-transform">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon name={stat.icon as any} className="text-primary" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-500 mt-1">{stat.change} за месяц</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Платформы дистрибьюции</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {platforms.map((platform) => (
                  <Card key={platform} className="p-4 text-center hover:border-primary transition-colors cursor-pointer">
                    <p className="font-medium">{platform}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'distribution' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Загрузка релиза</h2>
              <p className="text-muted-foreground">Заполните информацию о вашем треке или альбоме</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Информация о релизе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Название трека</Label>
                    <Input id="title" placeholder="Введите название" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist">Исполнитель</Label>
                    <Input id="artist" placeholder="Имя артиста" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audio">Аудио файл (WAV, FLAC)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Перетащите файл или нажмите для выбора</p>
                    <p className="text-xs text-muted-foreground mt-2">Максимум 500 МБ</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">Обложка (3000x3000px, JPG/PNG)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Image" size={40} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Загрузить обложку</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Выберите платформы</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platforms.slice(0, 6).map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <input type="checkbox" id={platform} defaultChecked className="rounded" />
                        <label htmlFor={platform} className="text-sm">{platform}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg">
                  <Icon name="Send" size={20} />
                  Отправить на модерацию
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold">Каталог релизов</h2>
              <Button onClick={() => setActiveSection('distribution')} className="gap-2">
                <Icon name="Plus" size={20} />
                Новый релиз
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <Icon name="Music" size={64} className="text-primary/50" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Название трека {i}</CardTitle>
                    <CardDescription>Артист • 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Статус</span>
                      <span className="text-green-500">Опубликован</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Платформы</span>
                      <span>12</span>
                    </div>
                    <Progress value={85} className="mt-2" />
                    <p className="text-xs text-muted-foreground">85% обработано</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold">Аналитика</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Прослушивания за неделю</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">84,329</p>
                  <p className="text-sm text-green-500 mt-1">+15.3% к прошлой неделе</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Новые слушатели</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">12,847</p>
                  <p className="text-sm text-green-500 mt-1">+8.7%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Доход за месяц</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">₽28,450</p>
                  <p className="text-sm text-green-500 mt-1">+23.1%</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Топ платформ по прослушиваниям</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Spotify', streams: '42,389', percent: 85 },
                  { name: 'Apple Music', streams: '28,194', percent: 65 },
                  { name: 'Яндекс.Музыка', streams: '18,742', percent: 45 },
                  { name: 'VK Музыка', streams: '12,394', percent: 30 },
                  { name: 'YouTube Music', streams: '8,291', percent: 20 },
                ].map((platform) => (
                  <div key={platform.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{platform.name}</span>
                      <span className="text-muted-foreground">{platform.streams}</span>
                    </div>
                    <Progress value={platform.percent} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>География слушателей</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { country: 'Россия', percent: 62 },
                    { country: 'Украина', percent: 18 },
                    { country: 'Казахстан', percent: 12 },
                    { country: 'Беларусь', percent: 8 },
                  ].map((geo) => (
                    <div key={geo.country} className="flex items-center justify-between">
                      <span>{geo.country}</span>
                      <span className="text-muted-foreground">{geo.percent}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Демография</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>18-24</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>25-34</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>35-44</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>45+</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'pricing' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Тарифные планы</h2>
              <p className="text-muted-foreground text-lg">Выберите подходящий план для вашего проекта</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, idx) => (
                <Card key={plan.name} className={`relative ${idx === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {idx === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Популярный
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Icon name="Check" size={18} className="text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={idx === 1 ? 'default' : 'outline'}>
                      Выбрать план
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'support' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold">Поддержка</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center p-6 hover:border-primary transition-colors cursor-pointer">
                <Icon name="Book" size={40} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">База знаний</h3>
                <p className="text-sm text-muted-foreground">Ответы на частые вопросы</p>
              </Card>

              <Card className="text-center p-6 hover:border-primary transition-colors cursor-pointer">
                <Icon name="MessageCircle" size={40} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Онлайн-чат</h3>
                <p className="text-sm text-muted-foreground">Быстрая помощь 24/7</p>
              </Card>

              <Card className="text-center p-6 hover:border-primary transition-colors cursor-pointer">
                <Icon name="Mail" size={40} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">support@musicflow.ru</p>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>Мы ответим в течение 2 часов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Тема</Label>
                  <Input id="subject" placeholder="Кратко опишите проблему" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background"
                    placeholder="Подробно опишите ваш вопрос..."
                  />
                </div>
                <Button className="w-full gap-2">
                  <Icon name="Send" size={18} />
                  Отправить
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold">Личный кабинет</h2>
              <Button variant="outline" className="gap-2">
                <Icon name="Settings" size={18} />
                Настройки
              </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="earnings">Заработок</TabsTrigger>
                <TabsTrigger value="payout">Вывод</TabsTrigger>
                <TabsTrigger value="profile">Профиль</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.label}
                          </CardTitle>
                          <Icon name={stat.icon as any} className="text-primary" size={18} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-green-500">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Недавняя активность</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { action: 'Новый релиз опубликован', track: 'Summer Vibes', time: '2 часа назад' },
                      { action: 'Выплата обработана', track: '₽12,500', time: '1 день назад' },
                      { action: 'Трек прошёл модерацию', track: 'Night Drive', time: '2 дня назад' },
                      { action: 'Достигнут порог в 100K', track: 'First Track', time: '3 дня назад' },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.track}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Всего заработано</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">₽342,500</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">За этот месяц</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">₽28,450</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Ожидает выплаты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">₽15,200</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>История доходов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: 'Ноябрь 2024', amount: '₽28,450', streams: '84,329' },
                        { month: 'Октябрь 2024', amount: '₽24,100', streams: '72,184' },
                        { month: 'Сентябрь 2024', amount: '₽31,200', streams: '95,421' },
                        { month: 'Август 2024', amount: '₽27,850', streams: '81,293' },
                      ].map((record) => (
                        <div key={record.month} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div>
                            <p className="font-medium">{record.month}</p>
                            <p className="text-sm text-muted-foreground">{record.streams} прослушиваний</p>
                          </div>
                          <p className="text-lg font-bold">{record.amount}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payout" className="space-y-6">
                <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Wallet" size={24} />
                      Доступно для вывода
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold">₽15,200</p>
                    <p className="text-muted-foreground mt-2">Минимальная сумма вывода: ₽1,000</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Запросить выплату</CardTitle>
                    <CardDescription>Выплаты обрабатываются в течение 3-5 рабочих дней</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Сумма вывода</Label>
                      <Input id="amount" type="number" placeholder="0" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="method">Способ вывода</Label>
                      <select id="method" className="w-full px-3 py-2 rounded-md border border-input bg-background">
                        <option>Банковская карта</option>
                        <option>ЮMoney</option>
                        <option>QIWI</option>
                        <option>PayPal</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details">Реквизиты</Label>
                      <Input id="details" placeholder="Номер карты или кошелька" />
                    </div>

                    <Button className="w-full gap-2" size="lg">
                      <Icon name="ArrowDownToLine" size={20} />
                      Запросить выплату
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>История выплат</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { date: '15 ноября 2024', amount: '₽12,500', status: 'Выполнена', method: 'Банковская карта' },
                        { date: '1 ноября 2024', amount: '₽18,200', status: 'Выполнена', method: 'ЮMoney' },
                        { date: '15 октября 2024', amount: '₽15,800', status: 'Выполнена', method: 'Банковская карта' },
                      ].map((payout, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div>
                            <p className="font-medium">{payout.date}</p>
                            <p className="text-sm text-muted-foreground">{payout.method}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{payout.amount}</p>
                            <span className="text-xs text-green-500">{payout.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" placeholder="Ваше имя" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="artistName">Имя артиста</Label>
                        <Input id="artistName" placeholder="Сценическое имя" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profileEmail">Email</Label>
                      <Input id="profileEmail" type="email" placeholder="your@email.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                    </div>

                    <Button className="gap-2">
                      <Icon name="Save" size={18} />
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Безопасность</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full gap-2">
                      <Icon name="Key" size={18} />
                      Изменить пароль
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Icon name="Shield" size={18} />
                      Настроить двухфакторную аутентификацию
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Disc3" className="text-primary" size={28} />
                <span className="text-xl font-bold">MusicFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональная платформа дистрибьюции музыки
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Платформа</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">О нас</li>
                <li className="hover:text-foreground cursor-pointer">Партнёры</li>
                <li className="hover:text-foreground cursor-pointer">Блог</li>
                <li className="hover:text-foreground cursor-pointer">Карьера</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">FAQ</li>
                <li className="hover:text-foreground cursor-pointer">Контакты</li>
                <li className="hover:text-foreground cursor-pointer">Документация</li>
                <li className="hover:text-foreground cursor-pointer">API</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Правовая информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Пользовательское соглашение</li>
                <li className="hover:text-foreground cursor-pointer">Политика конфиденциальности</li>
                <li className="hover:text-foreground cursor-pointer">Условия использования</li>
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 MusicFlow. Все права защищены.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Icon name="Instagram" size={20} className="cursor-pointer hover:text-foreground" />
              <Icon name="Twitter" size={20} className="cursor-pointer hover:text-foreground" />
              <Icon name="Facebook" size={20} className="cursor-pointer hover:text-foreground" />
              <Icon name="Youtube" size={20} className="cursor-pointer hover:text-foreground" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
