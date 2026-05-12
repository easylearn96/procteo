import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col, Input, Tag, Card, Progress } from "antd";
import DoctorList from "../components/DoctorList";

const { Search } = Input;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [viewMode, setViewMode] = useState("grid");

  const specialties = ["All Specialties", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology"];

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div className="page-header mb-0">
          <h1 className="page-title">Available Specialists</h1>
          <p className="page-subtitle">
            Connect with the top medical minds in real-time diagnostic excellence.
          </p>
        </div>
        <div className="view-toggle d-flex bg-dark-glass p-1 rounded-pill">
           <button 
             className={`btn btn-sm rounded-pill px-3 ${viewMode === 'grid' ? 'btn-cyan shadow-sm' : 'text-dim'}`}
             onClick={() => setViewMode('grid')}
           >Grid</button>
           <button 
             className={`btn btn-sm rounded-pill px-3 ${viewMode === 'list' ? 'btn-cyan shadow-sm' : 'text-dim'}`}
             onClick={() => setViewMode('list')}
           >List</button>
        </div>
      </div>

      <div className="filter-container d-flex flex-wrap align-items-center mb-5 gap-3">
        <div className="specialty-filters d-flex flex-wrap">
          {specialties.map((s) => (
            <Tag 
              key={s} 
              className={`filter-tag ${selectedSpecialty === s ? 'active' : ''}`}
              onClick={() => setSelectedSpecialty(s)}
            >
              {s}
            </Tag>
          ))}
        </div>
      </div>

      <Row gutter={[30, 30]} className="mb-5">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Col key={doctor._id} xs={24} sm={12} lg={8}>
              <DoctorList doctor={doctor} />
            </Col>
          ))
        ) : (
          <div className="text-center w-100 mt-5 py-5 bg-dark-glass rounded-4">
            <h5 className="text-muted">No specialists available at the moment.</h5>
          </div>
        )}
      </Row>

      {/* AI Recommendations & Profile Match Section */}
      <Row gutter={[30, 30]} className="mt-5">
         <Col xs={24} lg={16}>
            <Card className="glass-card ai-recommendations-card p-4">
               <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="ai-icon"><i className="fa-solid fa-brain-circuit"></i></div>
                  <div>
                     <h4 className="fw-bold mb-0">AI Smart Recommendations</h4>
                     <small className="text-dim">Based on your recent vitals and symptom logs.</small>
                  </div>
               </div>
               
               <Row gutter={[20, 20]}>
                  <Col xs={24} md={12}>
                     <div className="recommendation-subcard p-4 rounded-4 h-100">
                        <span className="badge bg-cyan-soft text-cyan mb-3 px-3 py-2 rounded-2 fw-bold">BEST MATCH</span>
                        <h6 className="fw-bold mb-3 text-white">Connect with Dr. Julian Vane</h6>
                        <p className="text-dim">Your elevated heart rate logs (Avg 92 BPM) over the last 48 hours suggest a routine cardiovascular check-up might be beneficial.</p>
                     </div>
                  </Col>
                  <Col xs={24} md={12}>
                     <div className="recommendation-subcard p-4 rounded-4 h-100">
                        <span className="badge bg-purple-soft text-purple mb-3 px-3 py-2 rounded-2 fw-bold">PROACTIVE CARE</span>
                        <h6 className="fw-bold mb-3 text-white">Neurology Consultation</h6>
                        <p className="text-dim">AI detected fatigue patterns in your interaction data. Scheduling a brief 15min consultation with a neurologist could identify early stressors.</p>
                     </div>
                  </Col>
               </Row>
               
               <button className="btn btn-purple-glow mt-4 px-5 py-3 rounded-4 fw-bold">Explore All Insights</button>
            </Card>
         </Col>
         
         <Col xs={24} lg={8}>
            <Card className="glass-card profile-match-card p-4 h-100 text-center d-flex flex-column justify-content-center align-items-center">
               <div className="position-relative mb-4">
                  <Progress 
                    type="circle" 
                    percent={75} 
                    strokeColor={{ '0%': '#0ea5e9', '100%': '#8b5cf6' }} 
                    strokeWidth={8}
                    width={120}
                    format={(percent) => <span className="fw-bold fs-4 text-white">{percent}%</span>}
                  />
               </div>
               <h4 className="fw-bold mb-2">Profile Match</h4>
               <p className="small text-dim mb-4">Your health profile is 75% complete for more accurate diagnostics.</p>
               <a href="#" className="text-cyan fw-bold text-decoration-none">Complete Profile</a>
            </Card>
         </Col>
      </Row>

      <div className="text-center mt-5 mb-5">
        <button className="btn btn-outline-pill">Load More Specialists <i className="fa-solid fa-chevron-down ms-2"></i></button>
      </div>

      {/* Floating Action Button */}
      <div className="fab">
        <i className="fa-solid fa-plus"></i>
      </div>

      <style jsx>{`
        .bg-dark-glass {
           background: rgba(15, 23, 42, 0.4);
           backdrop-filter: blur(10px);
           border: 1px solid var(--border-light);
        }
        .btn-cyan {
           background: var(--accent-neon);
           color: var(--bg-deep);
           font-weight: 700;
        }
        .filter-tag {
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid var(--border-light);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-dim);
          transition: var(--transition-smooth);
          margin-bottom: 15px;
          display: inline-block;
        }
        .filter-tag:hover {
          border-color: var(--accent-neon);
          color: var(--text-main);
          background: rgba(34, 211, 238, 0.05);
        }
        .filter-tag.active {
          background: var(--accent-neon);
          color: var(--bg-deep);
          border-color: transparent;
          box-shadow: 0 10px 20px rgba(34, 211, 238, 0.3);
        }
        .ai-icon {
           width: 50px;
           height: 50px;
           background: rgba(139, 92, 246, 0.1);
           color: var(--accent-secondary);
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 1.5rem;
        }
        .recommendation-subcard {
           background: rgba(255, 255, 255, 0.02);
           border: 1px solid var(--border-light);
        }
        .bg-cyan-soft { background: rgba(14, 165, 233, 0.1); }
        .text-cyan { color: var(--accent-neon); }
        .bg-purple-soft { background: rgba(139, 92, 246, 0.1); }
        .text-purple { color: var(--accent-secondary); }
        .btn-purple-glow {
           background: var(--accent-secondary);
           color: white;
           border: none;
           box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
        }
        .btn-outline-pill {
           border-radius: 50px;
           border: 1px solid var(--border-light);
           color: var(--text-dim);
           padding: 12px 35px;
           background: transparent;
           font-weight: 700;
        }
        .btn-outline-pill:hover {
           border-color: var(--accent-neon);
           color: var(--accent-neon);
           background: rgba(34, 211, 238, 0.05);
        }
        .fab {
          position: fixed;
          bottom: 50px;
          right: 50px;
          width: 75px;
          height: 75px;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          box-shadow: 0 15px 40px rgba(14, 165, 233, 0.4);
          cursor: pointer;
          transition: var(--transition-smooth);
          z-index: 1000;
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;