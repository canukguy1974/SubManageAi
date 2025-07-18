import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Mail,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  LayoutDashboard
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDemo, setShowDemo] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "AI-Powered Email Scanning",
      description: "Automatically detect subscriptions from your Gmail with 95% accuracy"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Smart Alerts",
      description: "Never miss a payment with intelligent notifications and reminders"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Spending Analytics",
      description: "Track your subscription spending with detailed insights and trends"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "One-Click Cancellation",
      description: "Cancel unwanted subscriptions instantly with our AI assistant"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "Saved me $200/month by finding subscriptions I forgot about!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      content: "The Gmail scanning feature is incredibly accurate and fast.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Freelancer",
      content: "Finally have control over my subscription chaos. Love it!",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Subscriptions Tracked", value: "2M+" },
    { label: "Money Saved", value: "$10M+" },
    { label: "Average Savings", value: "$180/mo" }
  ];

  return (
    <div className="min-h-screen blue-silver-gradient">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 shiny-effect" variant="outline">
              🚀 Now with AI-Powered Cancellation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Never Miss a Subscription Payment Again
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take control of your recurring payments with AI-powered email scanning,
              smart alerts, and one-click cancellation. Save money and time effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="glow-effect shiny-effect text-lg px-8 py-6"
                onClick={handleGetStarted}
              >
                {user ? (
                  <>
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </>
                ) : (
                  <>
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glow-effect shiny-effect text-lg px-8 py-6"
                onClick={() => setShowDemo(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            {user && (
              <p className="text-sm text-muted-foreground mt-4">
                Welcome back! Click above to access your dashboard.
              </p>
            )}
          </div>
        </div>

        {/* Floating Subscription Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-bounce delay-100">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          </div>
          <div className="absolute top-40 right-20 animate-bounce delay-300">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          </div>
          <div className="absolute bottom-40 left-20 animate-bounce delay-500">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">D</div>
          </div>
          <div className="absolute bottom-20 right-10 animate-bounce delay-700">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your subscriptions like a pro
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect glow-effect shiny-effect hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">See It In Action</h2>
            <Card className="glass-effect glow-effect">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <Button
                    size="lg"
                    className="glow-effect shiny-effect"
                    onClick={() => setShowDemo(true)}
                  >
                    <Play className="mr-2 h-6 w-6" />
                    Watch Gmail Scanning Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-effect glow-effect shiny-effect">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover how much you can save
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="glow-effect shiny-effect text-lg px-8 py-6"
              onClick={handleGetStarted}
            >
              {user ? (
                <>
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </>
              ) : (
                <>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glow-effect shiny-effect text-lg px-8 py-6"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}