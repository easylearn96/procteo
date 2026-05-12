import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message, Select, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
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
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Join Our Medical Network</h1>
        <p className="page-subtitle">
          Submit your credentials to become a verified practitioner on the Procteo platform and reach thousands of patients in need.
        </p>
      </div>

      <div className="apply-doctor-container">
        <Row gutter={[0, 0]} className="shadow-lg rounded-4 overflow-hidden bg-white">
          <Col xs={24} lg={8} className="p-0">
            <div className="practice-sidebar h-100 p-5 text-white">
              <span className="text-uppercase small fw-bold opacity-75 mb-2 d-block">Verify Your Practice</span>
              <h2 className="fw-bold mb-4">Clinical Excellence</h2>
              <p className="opacity-75 mb-5">
                We maintain high standards of medical care. Please ensure all documentation provided is accurate and current.
              </p>
              
              <ul className="list-unstyled feature-list">
                <li className="mb-4 d-flex align-items-center">
                  <div className="check-icon me-3"><i className="fa-solid fa-check"></i></div>
                  <span>Global Medical Reach</span>
                </li>
                <li className="mb-4 d-flex align-items-center">
                  <div className="check-icon me-3"><i className="fa-solid fa-check"></i></div>
                  <span>Advanced Scheduling Tools</span>
                </li>
                <li className="mb-4 d-flex align-items-center">
                  <div className="check-icon me-3"><i className="fa-solid fa-check"></i></div>
                  <span>Secure Patient Records</span>
                </li>
              </ul>

              <div className="mt-auto pt-5 text-center">
                <div className="avatar-group mb-3">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="doc" />
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anya" alt="doc" />
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" alt="doc" />
                   <div className="avatar-more">+12k</div>
                </div>
                <p className="small opacity-75">Join a community of 12,000+ verified professionals.</p>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={16} className="p-5">
            <Form layout="vertical" onFinish={handleFinish}>
              <Row gutter={20}>
                <Col xs={24} md={12}>
                  <Form.Item label="Full Name" name="firstName" rules={[{ required: true }]}>
                    <Input placeholder="Dr. Jane Smith" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Medical License Number" name="lastName" rules={[{ required: true }]}>
                    <Input placeholder="MD-XXXX-XXXX" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Specialty" name="specialization" rules={[{ required: true }]}>
                    <Select placeholder="Select your area of expertise">
                      <Option value="Cardiology">Cardiology</Option>
                      <Option value="Neurology">Neurology</Option>
                      <Option value="Pediatrics">Pediatrics</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Years of Experience" name="experience" rules={[{ required: true }]}>
                    <Input placeholder="e.g. 10" suffix="Years" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Brief Bio" name="website">
                    <TextArea rows={4} placeholder="Tell us about your medical background, education, and patient care philosophy..." />
                  </Form.Item>
                </Col>
                
                <Col xs={24}>
                  <div className="upload-section border-dashed p-5 text-center rounded-4 mb-4">
                     <i className="fa-solid fa-cloud-arrow-up text-primary fs-1 mb-3"></i>
                     <h6>Professional Profile Picture</h6>
                     <p className="text-muted small">Drag and drop or <span className="text-primary fw-bold cursor-pointer">click to upload</span></p>
                     <small className="text-muted opacity-50">PNG, JPG up to 10MB</small>
                  </div>
                </Col>

                <Col xs={24} className="d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex align-items-center text-muted small">
                     <i className="fa-solid fa-circle-info me-2"></i>
                     Review process takes 48-72 hours
                  </div>
                  <div className="d-flex gap-3">
                    <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={() => navigate("/")}>Cancel</button>
                    <button type="submit" className="btn btn-navy px-4 rounded-pill">Submit Application</button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <Row gutter={[20, 20]} className="mt-5">
           <Col xs={24} md={8}>
              <Card className="feature-card text-center p-3 rounded-4 border-0 shadow-sm">
                 <div className="feature-icon-wrapper mx-auto mb-3" style={{ background: '#e6f7ff', color: '#1890ff' }}>
                    <i className="fa-solid fa-shield-halved"></i>
                 </div>
                 <h6 className="fw-bold">Verified Status</h6>
                 <p className="text-muted small mb-0">Receive a "Verified Physician" badge once your application is validated.</p>
              </Card>
           </Col>
           <Col xs={24} md={8}>
              <Card className="feature-card text-center p-3 rounded-4 border-0 shadow-sm">
                 <div className="feature-icon-wrapper mx-auto mb-3" style={{ background: '#f6ffed', color: '#52c41a' }}>
                    <i className="fa-solid fa-money-bill-transfer"></i>
                 </div>
                 <h6 className="fw-bold">Instant Payouts</h6>
                 <p className="text-muted small mb-0">Automated billing system ensures you receive consultation fees directly.</p>
              </Card>
           </Col>
           <Col xs={24} md={8}>
              <Card className="feature-card text-center p-3 rounded-4 border-0 shadow-sm">
                 <div className="feature-icon-wrapper mx-auto mb-3" style={{ background: '#fff1f0', color: '#ff4d4f' }}>
                    <i className="fa-solid fa-headset"></i>
                 </div>
                 <h6 className="fw-bold">24/7 Support</h6>
                 <p className="text-muted small mb-0">Dedicated practitioner support team available around the clock.</p>
              </Card>
           </Col>
        </Row>
      </div>

      <style jsx>{`
        .practice-sidebar {
          background: linear-gradient(180deg, #001b3d 0%, #004c99 100%);
          display: flex;
          flex-direction: column;
        }
        .check-icon {
          width: 24px;
          height: 24px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }
        .avatar-group {
          display: flex;
          justify-content: center;
        }
        .avatar-group img, .avatar-more {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #001b3d;
          margin-left: -10px;
        }
        .avatar-more {
          background: #3498db;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .border-dashed {
          border: 2px dashed #ddd;
        }
        .feature-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default ApplyDoctor;