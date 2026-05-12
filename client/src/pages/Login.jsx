import React from "react";
import { Form, Input, message, Checkbox, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="login-page-ai">
      <Row className="h-100 g-0">
        {/* Left Side - Hero Content */}
        <Col xs={0} lg={12} className="login-ai-hero position-relative overflow-hidden">
           <div className="ai-dots-indicator d-flex gap-2">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
           </div>
           
           <div className="hero-content-wrapper text-center px-5">
              <div className="dna-visual-container mb-5">
                 <img src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200" alt="DNA AI" className="dna-img" />
              </div>
              <h1 className="hero-title text-white mb-3">Next-Gen Diagnostics</h1>
              <p className="hero-desc text-dim mx-auto">
                 Harnessing AI-driven precision to redefine clinical outcomes and patient care at Procteo Health.
              </p>
           </div>
        </Col>

        {/* Right Side - Login Form */}
        <Col xs={24} lg={12} className="login-ai-form-side d-flex flex-column align-items-center justify-content-center px-4">
           <div className="auth-branding mb-5 text-center">
              <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                 <i className="fa-solid fa-microchip-ai text-cyan fs-3"></i>
                 <h2 className="branding-title mb-0">Procteo Health</h2>
              </div>
              <small className="text-dim letter-spacing-2">MEDICAL INTELLIGENCE PORTAL</small>
           </div>

           <div className="login-card-ai p-5">
              <h3 className="text-white fw-bold mb-1">Login to Portal</h3>
              <p className="text-dim small mb-5">Authorized medical personnel only.</p>

              <Form layout="vertical" onFinish={onfinishHandler} className="ai-auth-form">
                 <Form.Item 
                   label={<span className="label-ai">Medical ID / Email</span>} 
                   name="email" 
                   rules={[{ required: true }]}
                 >
                    <Input 
                      prefix={<i className="fa-solid fa-at text-dim me-2"></i>} 
                      placeholder="dr.thorne@procteo.health" 
                    />
                 </Form.Item>

                 <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="label-ai">Security Key</span>
                    <Link to="/forgot" className="forgot-link">Forgot Access?</Link>
                 </div>
                 <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password 
                      prefix={<i className="fa-solid fa-key text-dim me-2"></i>} 
                      placeholder="••••••••••••" 
                    />
                 </Form.Item>

                 <div className="mb-5">
                    <Checkbox className="text-dim small-checkbox">
                       <span className="text-dim">Trust this terminal for 8 hours</span>
                    </Checkbox>
                 </div>

                 <button className="btn btn-initialize w-100 py-3 mb-4 d-flex align-items-center justify-content-center gap-2" type="submit">
                    Initialize Portal <i className="fa-solid fa-bolt"></i>
                 </button>

                 <div className="text-center mb-4">
                    <span className="text-dim small">New to the network?</span>
                 </div>

                 <button 
                   className="btn btn-request-access w-100 py-3" 
                   type="button"
                   onClick={() => navigate("/register")}
                 >
                    Request Provider Access
                 </button>
              </Form>
           </div>

           <div className="auth-footer mt-5 d-flex justify-content-between w-100 max-w-auth px-5">
              <div className="d-flex gap-4">
                 <span className="text-dim x-small">System Status</span>
                 <span className="text-dim x-small">Privacy</span>
              </div>
              <span className="text-dim x-small">v2.4.0-Stable</span>
           </div>
        </Col>
      </Row>

      <style jsx>{`
        .login-page-ai {
           height: 100vh;
           background: #020617;
           overflow: hidden;
        }
        .login-ai-hero {
           background: radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .ai-dots-indicator { position: absolute; top: 40px; left: 40px; }
        .dot { width: 6px; height: 6px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; }
        .dot.active { background: #22d3ee; box-shadow: 0 0 10px #22d3ee; }

        .hero-content-wrapper { max-width: 600px; z-index: 2; }
        .dna-visual-container { position: relative; }
        .dna-img { 
           width: 100%; max-width: 450px; border-radius: 32px; 
           filter: saturate(0.5) brightness(0.8);
           box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .hero-title { font-size: 3.2rem; font-weight: 800; letter-spacing: -1.5px; }
        .hero-desc { font-size: 1.1rem; line-height: 1.7; max-width: 480px; }

        .branding-title { 
           font-weight: 800; font-size: 1.8rem; 
           background: linear-gradient(to right, #0ea5e9, #8b5cf6);
           -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .letter-spacing-2 { letter-spacing: 3px; font-weight: 700; font-size: 0.65rem; }

        .login-card-ai {
           background: rgba(15, 23, 42, 0.4);
           backdrop-filter: blur(20px);
           border-radius: 32px;
           border: 1px solid rgba(255, 255, 255, 0.08);
           width: 100%;
           max-width: 500px;
           box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }
        .label-ai { color: #94a3b8; font-weight: 600; font-size: 0.85rem; margin-bottom: 8px; display: block; }
        .forgot-link { color: #22d3ee; font-size: 0.8rem; font-weight: 600; text-decoration: none; }
        
        .ai-auth-form :global(.ant-input), .ai-auth-form :global(.ant-input-password) {
           background: rgba(255, 255, 255, 0.03) !important;
           border: 1px solid rgba(255, 255, 255, 0.1) !important;
           height: 55px; border-radius: 14px; color: white !important;
        }
        .ai-auth-form :global(.ant-input-affix-wrapper) {
           background: rgba(255, 255, 255, 0.03) !important;
           border: 1px solid rgba(255, 255, 255, 0.1) !important;
           border-radius: 14px;
        }
        .ai-auth-form :global(.ant-input::placeholder) { color: rgba(255, 255, 255, 0.2); }

        .btn-initialize {
           background: #22d3ee; color: #020617;
           border: none; border-radius: 14px;
           font-weight: 800; font-size: 1.1rem;
           transition: all 0.3s ease;
           box-shadow: 0 10px 25px rgba(34, 211, 238, 0.3);
        }
        .btn-initialize:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(34, 211, 238, 0.5); }

        .btn-request-access {
           background: transparent; border: 1px solid rgba(255, 255, 255, 0.2);
           color: white; border-radius: 14px; font-weight: 700;
           transition: all 0.3s ease;
        }
        .btn-request-access:hover { background: rgba(255, 255, 255, 0.05); border-color: white; }

        .max-w-auth { max-width: 500px; }
        .x-small { font-size: 0.7rem; font-weight: 600; }
        .text-dim { color: #94a3b8; }
        .text-cyan { color: #22d3ee; }
      `}</style>
    </div>
  );
};

export default Login;