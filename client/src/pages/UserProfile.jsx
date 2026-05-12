import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Card, Tag } from "antd";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="profile-hub-header mb-5 text-center">
         <div className="profile-hero-wrapper mb-4">
            <div className="avatar-outer-glow">
               <div className="avatar-inner-glow">
                  <img 
                    src={user?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                    alt="profile" 
                    className="profile-hub-avatar"
                  />
               </div>
            </div>
         </div>
         <h1 className="profile-name text-white mb-1">{user?.name}</h1>
         <p className="patient-id-cyan mb-4">Patient ID: #AE-8892-TH</p>
         <div className="d-flex justify-content-center gap-3">
            <Tag className="glass-pill-dark">Blood Type: A+</Tag>
            <Tag className="glass-pill-dark">Age: 42</Tag>
         </div>
      </div>

      <Row gutter={[30, 30]}>
        <Col xs={24} lg={16}>
          <div className="section-label d-flex justify-content-between align-items-center mb-4">
             <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-chart-line text-cyan"></i>
                <h5 className="mb-0 fw-bold text-white">Medical History Overview</h5>
             </div>
             <a href="#" className="text-cyan small fw-bold text-decoration-none">Export Data</a>
          </div>
          
          <Row gutter={[20, 20]} className="mb-4">
             <Col xs={24} md={12}>
                <Card className="glass-card stat-card-dark p-4 border-0">
                   <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                         <small className="text-dim d-block mb-1">BLOOD PRESSURE</small>
                         <h3 className="fw-bold text-white mb-0">120/80 <span className="fs-6 text-dim fw-normal">mmHg</span></h3>
                      </div>
                      <i className="fa-solid fa-waveform-path text-cyan opacity-50 fs-4"></i>
                   </div>
                   <div className="stat-chart-mock">
                      <div className="bar" style={{height: '40%'}}></div>
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar active" style={{height: '100%'}}></div>
                      <div className="bar" style={{height: '70%'}}></div>
                   </div>
                </Card>
             </Col>
             <Col xs={24} md={12}>
                <Card className="glass-card stat-card-dark p-4 border-0">
                   <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                         <small className="text-dim d-block mb-1">HEART RATE</small>
                         <h3 className="fw-bold text-white mb-0">72 <span className="fs-6 text-dim fw-normal">bpm</span></h3>
                      </div>
                      <i className="fa-solid fa-heart-pulse text-purple opacity-50 fs-4"></i>
                   </div>
                   <div className="line-chart-mock">
                      <div className="line-glow"></div>
                   </div>
                </Card>
             </Col>
          </Row>

          <Card className="glass-card medication-card p-4 mb-5 border-0">
             <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                   <div className="med-icon-box">
                      <i className="fa-solid fa-pills text-cyan"></i>
                   </div>
                   <div>
                      <h6 className="fw-bold text-white mb-1">Lisinopril (10mg)</h6>
                      <small className="text-dim">Ongoing Prescription • Once Daily</small>
                   </div>
                </div>
                <Tag className="status-tag-active">ACTIVE</Tag>
             </div>
          </Card>

          <div className="section-label mb-4 mt-5">
             <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-comment-medical text-cyan"></i>
                <h5 className="mb-0 fw-bold text-white">Recent Consultations</h5>
             </div>
          </div>

          <Row gutter={[20, 20]}>
             {[
               { dr: "Dr. Aris Thorne", spec: "Neurology", date: "Oct 12, 2023", note: "Discussed recent migraine patterns and updated migraine...", status: "REPORT READY", statusColor: "#22d3ee" },
               { dr: "Dr. Elena Vance", spec: "Cardiology", date: "Sep 28, 2023", note: "Annual cardiac stress test results review and blood pressure...", status: "FOLLOW-UP", statusColor: "#8b5cf6" },
               { dr: "Lab Diagnostics", spec: "Blood Work", date: "Sep 15, 2023", note: "Full metabolic panel, lipid profile, and vitamin deficiency screenin...", status: "ARCHIVED", statusColor: "#94a3b8" }
             ].map((item, idx) => (
                <Col xs={24} md={8} key={idx}>
                   <Card className="glass-card consultation-mini-card p-4 h-100 border-0">
                      <div className="d-flex align-items-center gap-3 mb-3">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.dr}`} alt="dr" className="dr-avatar-mini" />
                         <div>
                            <h6 className="fw-bold text-white mb-0 small">{item.dr}</h6>
                            <small className="text-dim" style={{fontSize: '0.7rem'}}>{item.spec} • {item.date}</small>
                         </div>
                      </div>
                      <p className="consultation-note mb-4 text-dim">{item.note}</p>
                      <Tag className="badge-status-glow" style={{ color: item.statusColor, borderColor: item.statusColor }}>{item.status}</Tag>
                   </Card>
                </Col>
             ))}
          </Row>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="glass-card ai-insights-card p-4 mb-4 border-0">
             <div className="d-flex align-items-center gap-3 mb-4">
                <i className="fa-solid fa-brain-circuit text-cyan fs-4"></i>
                <h5 className="fw-bold text-white mb-0">AI Health Insights</h5>
             </div>
             
             <div className="insight-item mb-4 p-3 rounded-4 bg-glass-dark border-light-edge">
                <small className="text-cyan fw-bold d-block mb-2">LIFESTYLE ALERT</small>
                <p className="text-dim small mb-0">Your heart rate variability has improved by <span className="text-cyan fw-bold">12%</span> this week. Keep up the current cardio routine.</p>
             </div>

             <div className="insight-item mb-4 p-3 rounded-4 bg-glass-dark border-light-edge">
                <small className="text-purple fw-bold d-block mb-2">SUGGESTION</small>
                <p className="text-dim small mb-0">Schedule a routine check-up with <span className="text-white fw-bold">Dr. Thorne</span> as it has been 6 months since your last scan.</p>
             </div>

             <button className="btn btn-cyan-glow w-100 py-3 rounded-4 fw-bold shadow-cyan">View Deep Analysis</button>
          </Card>

          <div className="section-label mb-4 mt-5">
             <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-shield-halved text-cyan"></i>
                <h5 className="mb-0 fw-bold text-white">Account & Security</h5>
             </div>
          </div>

          <div className="security-grid">
             {[
               { icon: "fa-lock", title: "Privacy Controls", desc: "Manage data sharing with specialists." },
               { icon: "fa-bell", title: "Alert Settings", desc: "Configure medication and vitals reminders." },
               { icon: "fa-link", title: "Device Linking", desc: "Sync with wearables and health trackers." },
               { icon: "fa-file-contract", title: "Legal Documents", desc: "HIPAA consent and platform terms." }
             ].map((item, idx) => (
                <div key={idx} className="security-item p-3 mb-3 rounded-4 bg-glass-dark border-light-edge cursor-pointer">
                   <div className="d-flex align-items-start gap-3">
                      <div className="sec-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                      <div>
                         <h6 className="fw-bold text-white mb-1 small">{item.title}</h6>
                         <p className="text-dim mb-0" style={{fontSize: '0.75rem'}}>{item.desc}</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .profile-hero-wrapper { display: inline-block; }
        .avatar-outer-glow {
           padding: 8px; border-radius: 50%;
           background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
        }
        .avatar-inner-glow { padding: 6px; background: var(--bg-deep); border-radius: 50%; }
        .profile-hub-avatar { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; }
        
        .profile-name { font-size: 2.8rem; font-weight: 800; letter-spacing: -1px; }
        .patient-id-cyan { color: var(--accent-neon); font-weight: 700; letter-spacing: 1px; }
        
        .glass-pill-dark {
           background: rgba(255, 255, 255, 0.05); color: var(--text-dim);
           padding: 6px 18px; border-radius: 50px; border: 1px solid var(--border-light);
           font-weight: 700;
        }
        
        .stat-card-dark { background: rgba(255, 255, 255, 0.02) !important; }
        .stat-chart-mock { height: 60px; display: flex; align-items: flex-end; gap: 8px; margin-top: 15px; }
        .bar { flex: 1; background: rgba(14, 165, 233, 0.2); border-radius: 4px; }
        .bar.active { background: var(--accent-neon); box-shadow: 0 0 15px var(--accent-neon); }
        
        .line-chart-mock { height: 60px; background: linear-gradient(transparent 95%, var(--accent-secondary) 100%); position: relative; margin-top: 15px; }
        .line-glow { position: absolute; bottom: 0; width: 100%; height: 2px; background: var(--accent-secondary); box-shadow: 0 0 10px var(--accent-secondary); }
        
        .med-icon-box {
           width: 50px; height: 50px; background: rgba(14, 165, 233, 0.1);
           border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;
        }
        .status-tag-active { background: rgba(34, 211, 238, 0.1); color: var(--accent-neon); font-weight: 800; padding: 4px 15px; border-radius: 6px; }
        
        .dr-avatar-mini { width: 40px; height: 40px; border-radius: 10px; }
        .consultation-note { font-size: 0.8rem; line-height: 1.6; }
        .badge-status-glow { background: transparent; font-weight: 800; font-size: 0.65rem; padding: 4px 10px; border-radius: 6px; }
        
        .bg-glass-dark { background: rgba(255, 255, 255, 0.02) !important; }
        .border-light-edge { border: 1px solid var(--border-light) !important; }
        .sec-icon { color: var(--accent-neon); font-size: 1.1rem; opacity: 0.8; }
        .shadow-cyan { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3) !important; }
      `}</style>
    </Layout>
  );
};

export default UserProfile;
