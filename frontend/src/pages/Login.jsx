import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { api } from '../utils/api';

export default function Login() {
  const [authMode, setAuthMode] = useState('register');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const data = await api.post('/auth/register', { fullName, phone, email, password });
      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };
  
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await api.post('/auth/login-otp', { phone, otp });
      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="hero" style={{ width: '100%', padding: 'var(--space-2xl) var(--space-lg)' }}>
      <div className="navbar" style={{ position: 'absolute', top: 0, borderBottom: 'none', background: 'transparent' }}>
        <div className="navbar-brand">
          <div className="brand-logo"><Bot size={20} color="white" /></div>
          <span className="brand-name">Planora</span>
        </div>
      </div>

      <div className="hero-content" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2xl)', maxWidth: '1100px', width: '100%', marginTop: 'var(--space-xl)', textAlign: 'left' }}>
        
        <div style={{ flex: 1, paddingRight: 'var(--space-xl)' }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.2', marginBottom: 'var(--space-md)' }}>
            <span className="gradient-text">Planora</span> <br /> An AI chatbot for project ideas
          </h1>
          <p className="hero-subtitle" style={{ margin: '0', maxWidth: '500px', fontSize: '1.15rem' }}>
            Turn your ideas into reality. Planora is an intelligent assistant designed to help students discover the best tech stacks, structure roadmaps, and build amazing projects from scratch. Let's get started!
          </p>
        </div>

        <div style={{ flex: '0 0 450px' }}>
          <div className="card" style={{ width: '100%' }}>
            {errorMsg && <div style={{ marginBottom: 'var(--space-md)', padding: '10px', background: 'rgba(255, 68, 68, 0.1)', borderLeft: '3px solid #ff4444', color: '#ff4444', fontSize: '0.85rem', borderRadius: '4px' }}>{errorMsg}</div>}
            
            {authMode === 'register' && (
              <form onSubmit={handleRegister}>
                <h2 style={{ marginBottom: 'var(--space-md)', textAlign: 'center', fontSize: '1.5rem' }}>Create an Account</h2>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+1 234 567 8900" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="student@university.edu" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: '40px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-sm)' }}>
                  Register for Planora
                </button>
                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Already have an account? <button type="button" onClick={() => { setAuthMode('login-email'); setErrorMsg(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Login here</button>
                </div>
              </form>
            )}

            {authMode === 'login-email' && (
              <form onSubmit={handleEmailLogin}>
                <h2 style={{ marginBottom: 'var(--space-md)', textAlign: 'center', fontSize: '1.5rem' }}>Welcome Back</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: 'var(--space-lg)' }}>
                  <button type="button" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}><Mail size={16} /> Email</button>
                  <button type="button" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px' }} onClick={() => { setAuthMode('login-otp'); setErrorMsg(''); }}><Phone size={16} /> Phone OTP</button>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="abc@mail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Password</label>
                    {errorMsg && <a href="#" style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textDecoration: 'none', fontWeight: 600 }}>Forgot Password?</a>}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type={showPassword ? "text" : "password"} className="form-input" placeholder="passwordabc" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: '40px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-sm)' }}>Sign In</button>
                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Don't have an account? <button type="button" onClick={() => { setAuthMode('register'); setErrorMsg(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Register here</button>
                </div>
              </form>
            )}

            {authMode === 'login-otp' && (
              <form onSubmit={handleOtpLogin}>
                <h2 style={{ marginBottom: 'var(--space-md)', textAlign: 'center', fontSize: '1.5rem' }}>Welcome Back</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: 'var(--space-lg)' }}>
                  <button type="button" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px' }} onClick={() => { setAuthMode('login-email'); setErrorMsg(''); }}><Mail size={16} /> Email</button>
                  <button type="button" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '8px' }}><Phone size={16} /> Phone OTP</button>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+1 234 567 8900" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">One-Time Password (OTP)</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="form-input" placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
                    <button type="button" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }} onClick={() => setOtp('123456')}>Send OTP</button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-sm)' }}>Verify & Sign In</button>
                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Don't have an account? <button type="button" onClick={() => { setAuthMode('register'); setErrorMsg(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Register here</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
