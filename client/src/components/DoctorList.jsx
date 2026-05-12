import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  
  // Simulated data for reference parity
  const rating = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);
  const statusOptions = ["ACTIVE NOW", "IN CONSULTATION", "AVAILABLE NOW"];
  const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const statusColor = randomStatus === "ACTIVE NOW" ? "#22c55e" : randomStatus === "IN CONSULTATION" ? "#eab308" : "#0ea5e9";

  const doctorImages = [
    "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
  ];
  const randomImage = doctorImages[Math.floor(Math.random() * doctorImages.length)];

  return (
    <div className="doctor-card-premium p-4">
      <div className="card-header-ai d-flex justify-content-between align-items-start mb-4">
        <div className="doctor-image-container">
           <img src={randomImage} alt="doctor" className="doctor-img-rounded" />
           <div className="status-indicator" style={{ background: statusColor }}></div>
        </div>
        <div className="text-end">
           <span className="badge status-pill mb-2" style={{ color: statusColor, borderColor: statusColor }}>{randomStatus}</span>
           <div className="rating-stars">
              {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star small text-warning opacity-75"></i>)}
           </div>
        </div>
      </div>
      
      <div className="card-body-ai">
        <h4 className="doctor-name mb-1">Dr. {doctor.firstName} {doctor.lastName}</h4>
        <p className="specialty-label mb-4 text-dim small">Senior {doctor.specialization}</p>
        
        <div className="tag-container d-flex flex-wrap gap-2 mb-5">
           <span className="card-tag">Specialized Care</span>
           <span className="card-tag">Clinical Excellence</span>
        </div>
        
        <div className="d-flex gap-3 mt-auto">
           <button 
             className="btn btn-outline-dark-glass w-50"
             onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
           >
             View Profile
           </button>
           <button 
             className={`btn w-50 fw-bold ${randomStatus === 'IN CONSULTATION' ? 'btn-purple' : 'btn-cyan'}`}
             onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
           >
             {randomStatus === 'IN CONSULTATION' ? 'Waitlist' : 'Book Call'}
           </button>
        </div>
      </div>

      <style jsx>{`
        .doctor-card-premium {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(15px);
          border-radius: 28px;
          border: 1px solid var(--border-light);
          transition: var(--transition-smooth);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .doctor-card-premium:hover {
          transform: translateY(-10px);
          border-color: var(--accent-neon);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }
        .doctor-image-container {
           position: relative;
        }
        .doctor-img-rounded {
           width: 80px;
           height: 80px;
           border-radius: 20px;
           object-fit: cover;
           border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .status-indicator {
           position: absolute;
           bottom: -5px;
           right: -5px;
           width: 20px;
           height: 20px;
           border-radius: 50%;
           border: 3px solid #0f172a;
        }
        .status-pill {
           background: transparent;
           border: 1px solid;
           font-size: 0.65rem;
           padding: 4px 10px;
           border-radius: 6px;
           font-weight: 800;
        }
        .doctor-name {
           font-weight: 800;
           color: white;
           font-size: 1.5rem;
        }
        .card-tag {
           background: rgba(255, 255, 255, 0.05);
           color: var(--text-dim);
           padding: 6px 12px;
           border-radius: 8px;
           font-size: 0.75rem;
           font-weight: 600;
        }
        .btn-outline-dark-glass {
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid var(--border-light);
           color: white;
           border-radius: 12px;
           font-weight: 600;
        }
        .btn-cyan {
           background: var(--accent-neon);
           color: var(--bg-deep);
           border-radius: 12px;
        }
        .btn-purple {
           background: var(--accent-secondary);
           color: white;
           border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default DoctorList;
