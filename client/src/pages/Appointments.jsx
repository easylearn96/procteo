import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Table, Tag, Row, Col, Card, Badge } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "PATIENT DETAILS",
      dataIndex: "name",
      render: (text, record) => (
        <div className="d-flex align-items-center gap-3">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.doctorName}`} alt="p" className="patient-avatar-mini" />
          <div>
            <h6 className="mb-0 fw-bold text-white">{record.doctorName}</h6>
            <small className="text-dim">ID: #AE-88219 • Age: 34</small>
          </div>
        </div>
      ),
    },
    {
      title: "SCHEDULED",
      dataIndex: "date",
      render: (text, record) => (
        <div>
          <div className="text-white fw-bold">{record.time}</div>
          <small className="text-dim">{record.date}</small>
        </div>
      ),
    },
    {
      title: "TYPE",
      render: () => (
        <Tag className="type-tag">Tele-Neurology</Tag>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (text) => (
        <Tag className={`status-pill-ai ${text === 'approved' ? 'confirmed' : 'pending'}`}>
          <span className="dot"></span> {text === 'approved' ? 'CONFIRMED' : 'PENDING'}
        </Tag>
      ),
    },
    {
      title: "ACTIONS",
      render: () => (
        <div className="d-flex gap-2">
           <div className="action-icon-box"><i className="fa-solid fa-eye"></i></div>
           <div className="action-icon-box video"><i className="fa-solid fa-video"></i></div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center gap-4">
           <h1 className="page-title mb-0">Appointments</h1>
           <Tag className="system-active-badge"><span className="dot-blink"></span> SYSTEM ACTIVE</Tag>
        </div>
        <div className="d-flex align-items-center gap-4">
           <div className="header-search-box">
              <i className="fa-solid fa-magnifying-glass text-dim"></i>
              <input type="text" placeholder="Search records..." />
           </div>
           <Badge count={3} dot color="#22d3ee">
              <i className="fa-solid fa-bell text-dim fs-5 cursor-pointer"></i>
           </Badge>
           <i className="fa-solid fa-gear text-dim fs-5 cursor-pointer"></i>
        </div>
      </div>

      <Row gutter={[40, 40]}>
        <Col xs={24} lg={17}>
          <div className="d-flex gap-3 mb-5">
             <button className="btn btn-pill active">Today</button>
             <button className="btn btn-pill">Weekly</button>
             <button className="btn btn-pill">History</button>
             <button className="btn btn-cyan-glow ms-auto px-5 py-3 rounded-pill fw-bold">
                <i className="fa-solid fa-plus me-2"></i> New Consultation
             </button>
          </div>

          <Card className="glass-card border-0 overflow-hidden">
            <div className="p-0">
               <Table 
                 columns={columns} 
                 dataSource={appointments} 
                 pagination={false}
                 className="appointment-table-ai"
               />
               {appointments.length === 0 && (
                 <div className="text-center py-5 my-5">
                    <div className="empty-state-icon mb-4">
                       <i className="fa-solid fa-folder-open opacity-20" style={{fontSize: '5rem'}}></i>
                    </div>
                    <h5 className="text-white fw-bold mb-2">No Appointments Found</h5>
                    <p className="text-dim">Your schedule for this period is currently clear.</p>
                 </div>
               )}
            </div>
          </Card>

          <div className="text-center mt-5">
             <button className="btn btn-outline-pill-cyan">LOAD MORE SPECIALISTS <i className="fa-solid fa-chevron-down ms-2"></i></button>
          </div>
        </Col>

        <Col xs={24} lg={7}>
           <Card className="glass-card status-overview-card p-5 mb-4 border-0">
              <div className="d-flex justify-content-between align-items-center mb-5">
                 <h5 className="fw-bold mb-0 text-white">Status Overview</h5>
                 <i className="fa-solid fa-chart-simple text-cyan"></i>
              </div>
              
              <div className="status-metric-item mb-4">
                 <div className="icon-box"><i className="fa-solid fa-calendar-day"></i></div>
                 <div className="flex-grow-1">
                    <small className="text-dim fw-bold">TODAY'S LOAD</small>
                    <h3 className="fw-bold mb-0 text-white">12</h3>
                 </div>
              </div>
              <div className="status-metric-item mb-4">
                 <div className="icon-box purple"><i className="fa-solid fa-video"></i></div>
                 <div className="flex-grow-1">
                    <small className="text-dim fw-bold">VIRTUAL</small>
                    <h3 className="fw-bold mb-0 text-white">08</h3>
                 </div>
              </div>
              <div className="status-metric-item">
                 <div className="icon-box green"><i className="fa-solid fa-circle-check"></i></div>
                 <div className="flex-grow-1">
                    <small className="text-dim fw-bold">COMPLETED</small>
                    <h3 className="fw-bold mb-0 text-white">04</h3>
                 </div>
              </div>
           </Card>

           <Card className="glass-card ai-prediction-card p-5 mb-4 border-0">
              <div className="d-flex align-items-center gap-3 mb-4">
                 <i className="fa-solid fa-brain-circuit text-purple fs-4"></i>
                 <small className="fw-bold text-white letter-spacing-1">AI PREDICTION</small>
              </div>
              <p className="text-dim mb-5 line-height-1.8">Expected peak patient volume at <span className="text-white fw-bold">2:30 PM</span>. AI suggests prioritizing pre-charting for the afternoon block.</p>
              <a href="#" className="text-purple fw-bold text-decoration-none d-flex align-items-center gap-2">
                 VIEW WORKLOAD ANALYTICS <i className="fa-solid fa-arrow-right"></i>
              </a>
           </Card>

           <Card className="glass-card health-flow-card p-5 border-0">
              <h5 className="fw-bold mb-5 text-white">Patient Health Flow</h5>
              <div className="d-flex justify-content-between mb-2">
                 <small className="text-dim">System Latency</small>
                 <small className="text-cyan fw-bold">12ms</small>
              </div>
              <div className="latency-bar mb-5"><div className="fill" style={{width: '60%'}}></div></div>
              
              <div className="d-flex justify-content-between mb-3">
                 <small className="text-dim">Data Sync</small>
                 <small className="text-white fw-bold">Active</small>
              </div>
              <div className="flow-mock-chart mt-2">
                 {[40, 70, 50, 90, 60, 80, 40].map((h, i) => <div key={i} className="bar" style={{height: `${h}%`}}></div>)}
              </div>
           </Card>
        </Col>
      </Row>

      <div className="fab-plus-fixed"><i className="fa-solid fa-plus"></i></div>

      <style jsx>{`
        .system-active-badge {
           background: rgba(34, 211, 238, 0.1);
           color: var(--accent-neon);
           border: 1px solid rgba(34, 211, 238, 0.2);
           padding: 8px 16px;
           border-radius: 50px;
           font-weight: 800;
           font-size: 0.75rem;
           letter-spacing: 1px;
        }
        .dot-blink { width: 8px; height: 8px; background: var(--accent-neon); border-radius: 50%; display: inline-block; margin-right: 10px; animation: blink 1.5s infinite; }
        @keyframes blink { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }
        
        .header-search-box {
           background: rgba(255, 255, 255, 0.05);
           border-radius: 50px;
           padding: 10px 20px;
           display: flex;
           align-items: center;
           width: 280px;
           border: 1px solid var(--border-light);
        }
        .header-search-box input { background: transparent; border: none; color: white; margin-left: 12px; font-size: 0.9rem; outline: none; flex: 1; }
        
        .btn-pill {
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid var(--border-light);
           color: var(--text-dim);
           border-radius: 50px;
           padding: 12px 30px;
           font-weight: 700;
           transition: var(--transition-smooth);
        }
        .btn-pill.active { background: var(--accent-neon); color: var(--bg-deep); border-color: transparent; }
        
        .btn-cyan-glow {
           background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
           color: white;
           border: none;
           box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
        }

        .patient-avatar-mini { width: 45px; height: 45px; border-radius: 12px; border: 1px solid var(--border-light); }
        .type-tag {
           background: rgba(139, 92, 246, 0.1);
           color: var(--accent-secondary);
           border: 1px solid rgba(139, 92, 246, 0.2);
           border-radius: 8px;
           font-size: 0.75rem;
           font-weight: 700;
           padding: 4px 10px;
        }
        .status-pill-ai {
           background: transparent;
           border: 1px solid;
           border-radius: 50px;
           padding: 6px 18px;
           font-weight: 800;
           font-size: 0.7rem;
           display: flex;
           align-items: center;
           gap: 10px;
        }
        .status-pill-ai.confirmed { color: #22c55e; border-color: rgba(34, 197, 94, 0.3); background: rgba(34, 197, 94, 0.05); }
        .status-pill-ai.pending { color: #eab308; border-color: rgba(234, 179, 8, 0.3); background: rgba(234, 179, 8, 0.05); }
        .status-pill-ai .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; box-shadow: 0 0 10px currentColor; }
        
        .action-icon-box {
           width: 40px; height: 40px; border-radius: 12px;
           background: rgba(255, 255, 255, 0.04);
           display: flex; align-items: center; justify-content: center; cursor: pointer;
           border: 1px solid var(--border-light);
           transition: var(--transition-smooth);
        }
        .action-icon-box:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-2px); }
        .action-icon-box.video { background: var(--accent-neon); color: var(--bg-deep); border: none; }
        
        .status-metric-item {
           background: rgba(255, 255, 255, 0.03);
           padding: 20px; border-radius: 20px;
           display: flex; align-items: center; gap: 20px;
           border: 1px solid rgba(255, 255, 255, 0.02);
        }
        .icon-box {
           width: 50px; height: 50px; border-radius: 14px;
           background: rgba(14, 165, 233, 0.1); color: var(--accent-primary);
           display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
        }
        .icon-box.purple { background: rgba(139, 92, 246, 0.1); color: var(--accent-secondary); }
        .icon-box.green { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        
        .latency-bar { height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 20px; overflow: hidden; }
        .latency-bar .fill { height: 100%; background: var(--accent-neon); box-shadow: 0 0 15px var(--accent-neon); }
        
        .flow-mock-chart { height: 50px; display: flex; align-items: flex-end; gap: 8px; }
        .flow-mock-chart .bar { flex: 1; background: var(--accent-secondary); border-radius: 4px; opacity: 0.7; transition: var(--transition-smooth); }
        .flow-mock-chart .bar:hover { opacity: 1; transform: scaleY(1.1); }
        
        .btn-outline-pill-cyan {
           background: transparent;
           border: 1px solid var(--accent-neon);
           color: var(--accent-neon);
           padding: 12px 35px;
           border-radius: 50px;
           font-weight: 800;
           letter-spacing: 1px;
           transition: var(--transition-smooth);
        }
        .btn-outline-pill-cyan:hover { background: rgba(34, 211, 238, 0.1); transform: translateY(-2px); }

        .fab-plus-fixed {
           position: fixed; bottom: 40px; right: 40px;
           width: 70px; height: 70px; border-radius: 50%;
           background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
           display: flex; align-items: center; justify-content: center;
           color: white; font-size: 2rem; box-shadow: 0 20px 40px rgba(14, 165, 233, 0.4);
           cursor: pointer; z-index: 1000;
           transition: var(--transition-smooth);
        }
        .fab-plus-fixed:hover { transform: scale(1.1) rotate(90deg); }
      `}</style>
    </Layout>
  );
};

export default Appointments;