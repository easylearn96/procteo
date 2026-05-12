import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import LogoutModal from "./LogoutModal";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // Doctor Menu
  const doctorMenu = [
    { name: "Dashboard", path: "/", icon: "fa-solid fa-grid-2" },
    { name: "Appointments", path: "/doctor-appointments", icon: "fa-solid fa-calendar-check" },
    { name: "Profile", path: `/doctor/profile/${user?._id}`, icon: "fa-solid fa-user-doctor" },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="sidebar-top">
             <div className="branding mb-5 px-5">
                <h3 className="mb-0 text-cyan fw-bold letter-spacing-tight">Procteo</h3>
             </div>

             <div className="sidebar-user-profile px-4 mb-5">
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-glass-dark">
                   <img 
                     src={user?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                     alt="user" 
                     className="sidebar-avatar-ai"
                   />
                   <div className="user-meta overflow-hidden">
                      <h6 className="mb-0 fw-bold text-white small text-truncate">{user?.name}</h6>
                      <small className="text-dim x-small text-uppercase">{user?.isDoctor ? 'Medical Specialist' : 'Patient Account'}</small>
                   </div>
                </div>
             </div>

             <div className="menu px-3">
               {SidebarMenu.map((menu) => {
                 const isActive = location.pathname === menu.path;
                 return (
                   <div key={menu.name} className={`menu-item-ai ${isActive && "active"}`}>
                     <Link to={menu.path}>
                       <i className={menu.icon}></i>
                       <span>{menu.name}</span>
                     </Link>
                   </div>
                 );
               })}
             </div>
          </div>

          <div className="sidebar-bottom px-4 pb-5">
             <button className="btn btn-new-consult w-100 py-3 mb-4 rounded-4 fw-bold">
                <i className="fa-solid fa-plus me-2"></i> New Consultation
             </button>

             <div className="bottom-menu">
                <div className="menu-item-ai">
                   <a href="#"><i className="fa-solid fa-circle-question"></i> <span>Support</span></a>
                </div>
                <div className="menu-item-ai" onClick={() => setIsLogoutModalVisible(true)}>
                   <a href="#"><i className="fa-solid fa-right-from-bracket"></i> <span>Logout</span></a>
                </div>
             </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="header-nav-links me-auto d-none d-lg-flex gap-5 ms-5">
               <Link to="/" className="nav-link active">Portal Home</Link>
               <Link to="/" className="nav-link">Available Doctors</Link>
               <Link to="/appointments" className="nav-link">Schedules</Link>
               <Link to="/profile" className="nav-link">Health History</Link>
            </div>

            <div className="header-content">
              <div className="search-bar-ai me-4">
                 <i className="fa-solid fa-magnifying-glass text-dim"></i>
                 <input type="text" placeholder="Search specialists or symptoms..." />
              </div>
              
              <Badge count={user?.notification?.length || 0} onClick={() => navigate("/notification")} className="cursor-pointer">
                <div className="icon-badge-box">
                   <i className="fa-solid fa-bell text-dim"></i>
                </div>
              </Badge>
              
              <div className="icon-badge-box me-3">
                 <i className="fa-solid fa-gear text-dim cursor-pointer"></i>
              </div>

              <div className="profile-chip d-flex align-items-center gap-2" onClick={() => navigate("/profile")}>
                <span className="text-white small fw-bold">{user?.name}</span>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="user" className="header-avatar-ai" />
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>

      <LogoutModal 
        isVisible={isLogoutModalVisible} 
        onCancel={() => setIsLogoutModalVisible(false)} 
      />

      <style jsx>{`
        .sidebar { justify-content: space-between; }
        .text-cyan { color: var(--accent-neon); }
        .letter-spacing-tight { letter-spacing: -1.5px; font-size: 2rem; }
        
        .sidebar-avatar-ai {
           width: 42px; height: 42px; border-radius: 10px; border: 1px solid var(--border-light);
        }
        
        .menu-item-ai { margin-bottom: 8px; transition: all 0.3s ease; }
        .menu-item-ai a {
           display: flex; align-items: center; padding: 14px 20px; border-radius: 12px;
           color: var(--text-dim); text-decoration: none; font-weight: 600; gap: 15px;
        }
        .menu-item-ai i { font-size: 1.1rem; opacity: 0.7; width: 20px; text-align: center; }
        .menu-item-ai.active { background: rgba(14, 165, 233, 0.1); border-left: 3px solid var(--accent-neon); }
        .menu-item-ai.active a { color: var(--accent-neon); }
        .menu-item-ai.active i { opacity: 1; color: var(--accent-neon); }
        .menu-item-ai:hover:not(.active) { background: rgba(255, 255, 255, 0.02); }
        
        .btn-new-consult {
           background: var(--accent-neon); color: var(--bg-deep); border: none;
           box-shadow: 0 10px 20px rgba(34, 211, 238, 0.3);
        }
        
        .nav-link { color: var(--text-dim); text-decoration: none; font-weight: 700; font-size: 0.95rem; transition: all 0.3s ease; }
        .nav-link.active { color: var(--accent-neon); border-bottom: 2px solid var(--accent-neon); padding-bottom: 5px; }
        
        .search-bar-ai {
           background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-light);
           padding: 8px 18px; border-radius: 30px; display: flex; align-items: center; width: 260px;
        }
        .search-bar-ai input { background: transparent; border: none; color: white; margin-left: 10px; outline: none; font-size: 0.85rem; width: 100%; }
        
        .icon-badge-box {
           width: 38px; height: 38px; border-radius: 10px; background: rgba(255, 255, 255, 0.03);
           display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
        }
        .header-avatar-ai { width: 35px; height: 35px; border-radius: 50%; border: 1px solid var(--border-light); }
        .profile-chip { background: rgba(255, 255, 255, 0.05); padding: 4px 6px 4px 15px; border-radius: 30px; cursor: pointer; border: 1px solid var(--border-light); }
        .x-small { font-size: 0.65rem; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default Layout;
