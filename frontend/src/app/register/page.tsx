'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ButtonCta } from '@/components/ui/button-shiny';

// --- SUB-COMPONENTS ---
const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
    {children}
  </div>
);

const TestimonialCard = ({ name, handle, text, avatarSrc, delay }: { name: string, handle: string, text: string, avatarSrc: string, delay: string }) => (
  <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 p-5 w-64`}>
    <img src={avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium text-foreground">{name}</p>
      <p className="text-muted-foreground">{handle}</p>
      <p className="mt-1 text-foreground/80">{text}</p>
    </div>
  </div>
);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw] overflow-hidden">
      {/* Left column: sign-up form */}
      <section className="flex-1 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
                <span className="font-light text-foreground tracking-tighter">Join</span> Brainstorm
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">Start summarizing your thoughts with the power of modern AI</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <GlassInputWrapper>
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input 
                        name="password" 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Create a strong password" 
                        className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                      {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By clicking Register, you agree to our <a href="#" className="text-violet-400 hover:underline">Terms of Service</a> and <a href="#" className="text-violet-400 hover:underline">Privacy Policy</a>.
                </p>
              </div>

              <ButtonCta 
                type="submit" 
                disabled={loading}
                className="animate-element animate-delay-600 w-full rounded-full"
                label={loading ? 'Creating Account...' : 'Register Now'}
              />
            </form>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-violet-400 font-bold hover:underline transition-colors">Login</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      <section className="hidden md:block flex-1 relative p-4">
        <div 
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center overflow-hidden" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2548&auto=format&fit=crop')` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
            <TestimonialCard 
                name="Alex Rivera" 
                handle="@arivera_ux" 
                text="The speed of this app is incredible. Finally, a clean place for my messy thoughts."
                avatarSrc="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop"
                delay="animate-delay-1000"
            />
            <div className="hidden xl:flex">
                <TestimonialCard 
                    name="Elena Fisher" 
                    handle="@elenaf_writes" 
                    text="As a writer, I need a simple way to store plot points. Brainstorm is exactly that."
                    avatarSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
                    delay="animate-delay-1200"
                />
            </div>
        </div>
      </section>
    </div>
  );
}
