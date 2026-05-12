import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message, Checkbox, Row, Col } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card shadow-lg overflow-hidden">
        <Row className="g-0 h-100">
          {/* Left Side - Navy Panel */}
          <Col xs={0} md={10} className="register-left p-5 text-white">
            <div className="login-logo mb-5">
               <div className="logo-icon-white me-2"><i className="fa-solid fa-square-plus"></i></div>
               <span className="logo-text">Procteo</span>
            </div>
            
            <h1 className="display-5 fw-bold mb-4">Advanced Healthcare at Your Fingertips.</h1>
            <p className="opacity-75 mb-5 fs-5">
              Join our clinical network to manage appointments, connect with specialists, and track your wellness journey with precision.
            </p>
            
            <div className="app-preview-container">
               <img 
                 src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                 alt="app preview" 
                 className="rounded-4 img-fluid shadow"
               />
            </div>
          </Col>

          {/* Right Side - Form */}
          <Col xs={24} md={14} className="register-right p-5 bg-white">
            <div className="register-form-wrapper mx-auto">
              <span className="text-primary small fw-bold text-uppercase mb-2 d-block">Patient Portal</span>
              <h2 className="fw-bold mb-1" style={{ color: '#001b3d' }}>Create Account</h2>
              <p className="text-muted mb-5">Enter your clinical details to begin your healthcare journey.</p>

              <Form
                layout="vertical"
                onFinish={onfinishHandler}
                className="register-form-custom"
              >
                <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                  <Input 
                    prefix={<i className="fa-solid fa-user text-muted me-2"></i>} 
                    placeholder="Dr. John Doe" 
                  />
                </Form.Item>
                
                <Form.Item label="Email Address" name="email" rules={[{ required: true }]}>
                  <Input 
                    prefix={<i className="fa-solid fa-envelope text-muted me-2"></i>} 
                    placeholder="name@healthcare.com" 
                  />
                </Form.Item>
                
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                      <Input.Password 
                        prefix={<i className="fa-solid fa-lock text-muted me-2"></i>} 
                        placeholder="........." 
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Confirm Password" name="confirmPassword" dependencies={['password']} rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}>
                      <Input.Password 
                        prefix={<i className="fa-solid fa-shield-check text-muted me-2"></i>} 
                        placeholder="........." 
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="agreement" valuePropName="checked" rules={[{ validator:(_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')) }]}>
                  <Checkbox>
                    I agree to the <span className="text-primary fw-bold">Terms of Service</span> and <span className="text-primary fw-bold">Privacy Policy</span>.
                  </Checkbox>
                </Form.Item>

                <button className="btn btn-navy-premium w-100 d-flex align-items-center justify-content-center gap-2 mb-4" type="submit">
                  Create Account <i className="fa-solid fa-arrow-right"></i>
                </button>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" style={{ color: '#3498db', fontWeight: 700 }}>Login</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .register-page {
          height: 100vh;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .register-card {
          width: 100%;
          max-width: 1100px;
          height: 850px;
          background: white;
          border-radius: 25px;
        }
        .register-left {
          background: #001b3d;
          display: flex;
          flex-direction: column;
        }
        .logo-icon-white {
          background: white;
          color: #001b3d;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 1.2rem;
        }
        .register-form-wrapper {
          width: 100%;
          max-width: 500px;
        }
        .register-form-custom .ant-form-item-label label {
          font-weight: 700;
          color: #444;
          font-size: 0.9rem;
        }
        .register-form-custom input {
          height: 50px;
          background: #f4f7f9;
          border: 1px solid #e1e8ed;
          border-radius: 10px;
        }
        .btn-navy-premium {
          background: #001b3d;
          color: white;
          height: 55px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          transition: all 0.3s ease;
        }
        .btn-navy-premium:hover {
          background: #002d66;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 27, 61, 0.2);
        }
        .app-preview-container {
          margin-top: auto;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
        }
        .app-preview-container img {
          transform: translateY(20px);
        }
      `}</style>
    </div>
  );
};

export default Register;