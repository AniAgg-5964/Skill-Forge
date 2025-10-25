import { useState, useEffect } from 'react';
import {
  FaUserCircle,
  FaCheckCircle,
  FaClock,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaTachometerAlt,
  FaUser,
  FaTools,
  FaCalendarAlt,
  FaFolderOpen
} from 'react-icons/fa';
import './ProviderDashboardPage.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

// Custom hook to simulate data fetching
const useAnalytics = (userId) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockData = {
          isVerified: true,
          totalHours: 128,
          completedSessions: 42,
          cancellationRate: 2.5,
          profileViews: 156,
          averageRating: 4.8,
          upcomingBookings: 3
        };
        
        setState({
          data: mockData,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: 'Failed to fetch analytics data'
        });
      }
    };

    fetchData();
  }, [userId]);

  return state;
};

// Performance Analytics Component
const PerformanceAnalytics = ({ data, loading, error }) => {
  if (loading) return <div className="loading-state">Loading analytics...</div>;
  if (error) return <div className="error-state">Failed to load analytics: {error}</div>;
  if (!data) return <div className="empty-state">No analytics data available</div>;

  return (
    <div className="analytics-container">
      <div className="trust-verification-section card">
        <div className="section-header">
          <h2>Trust & Verification</h2>
        </div>
        <div className="verification-status">
          {data.isVerified ? (
            <div className="verified-badge">
              <FaCheckCircle /> <span>Verified Identity</span>
            </div>
          ) : (
            <div className="pending-verification">
              <FaExclamationTriangle /> <span>Verification Pending</span>
            </div>
          )}
          <button className="public-profile-btn">View Public Profile</button>
        </div>
      </div>

      <div className="section-header">
        <h2>Performance Metrics</h2>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-icon"><FaClock /></div>
          <div className="kpi-value">{data.totalHours}</div>
          <div className="kpi-label">Total Hours Taught</div>
        </div>
        
        <div className="kpi-card card">
          <div className="kpi-icon"><FaCalendarCheck /></div>
          <div className="kpi-value">{data.completedSessions}</div>
          <div className="kpi-label">Completed Sessions</div>
        </div>
        
        <div className="kpi-card card">
          <div className="kpi-icon"><FaExclamationTriangle /></div>
          <div className="kpi-value">{data.cancellationRate}%</div>
          <div className="kpi-label">Cancellation Rate</div>
        </div>
      </div>

      <div className="section-header">
        <h2>Recent Activity</h2>
      </div>
      <div className="recent-activity">
        <div className="activity-item card">
          <div className="activity-icon">
            <FaUserCircle />
          </div>
          <div className="activity-details">
            <div className="activity-title">Profile Views</div>
            <div className="activity-value">{data.profileViews} views this month</div>
          </div>
        </div>
        
        <div className="activity-item card">
          <div className="activity-icon">
            <FaCalendarAlt />
          </div>
          <div className="activity-details">
            <div className="activity-title">Upcoming Bookings</div>
            <div className="activity-value">{data.upcomingBookings} sessions scheduled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Editor View
const ProfileEditor = () => {
  return (
    <div className="profile-editor">
      <div className="section-header">
        <h2>Edit Profile</h2>
      </div>
      
      <div className="profile-form card">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Profile Picture</label>
            <div className="profile-picture-upload">
              <div className="current-picture avatar-large">
                <FaUserCircle size={80} />
              </div>
              <button className="upload-btn">Upload New Picture</button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Bio</label>
            <textarea 
              className="form-control"
              placeholder="Tell students about yourself and your expertise..." 
              rows={5}
              defaultValue="Experienced software developer specializing in React and modern JavaScript frameworks."
            />
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input className="form-control" type="text" defaultValue="San Francisco, CA" />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Payment Details</h3>
          <div className="payment-methods">
            <div className="payment-method">
              <input type="radio" name="payment" id="stripe" defaultChecked />
              <label htmlFor="stripe">Stripe</label>
            </div>
            <div className="payment-method">
              <input type="radio" name="payment" id="paypal" />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
          <button className="update-payment-btn">Update Payment Information</button>
        </div>
        
        <div className="form-actions">
          <button className="save-btn">Save Changes</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

// Skills Management View
const SkillsManagement = () => {
  const skills = [
    { id: 1, name: "React Development", duration: 60, price: 75, active: true },
    { id: 2, name: "JavaScript Fundamentals", duration: 45, price: 60, active: true },
    { id: 3, name: "UI/UX Design", duration: 90, price: 85, active: false }
  ];
  
  return (
    <div className="skills-management">
      <div className="section-header">
        <h2>Manage Skills</h2>
        <button className="add-skill-btn">+ Add New Skill</button>
      </div>
      
      <div className="skills-list">
        {skills.map(skill => (
          <div key={skill.id} className={`skill-item card ${!skill.active ? 'inactive' : ''}`}>
            <div className="skill-info">
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-details">
                <span>{skill.duration} min</span>
                <span> • </span>
                <span>${skill.price}/hr</span>
                <span> • </span>
                <span className={`skill-status ${skill.active ? 'active' : 'inactive'}`}>
                  {skill.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="skill-actions">
              <button className="edit-btn skill-btn">Edit</button>
              <button className="toggle-btn skill-btn">
                {skill.active ? 'Deactivate' : 'Activate'}
              </button>
              <button className="remove-btn skill-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bookings Management View
const BookingsManagement = () => {
  const bookings = [
    { id: 1, student: "Alex Johnson", skill: "React Development", date: "2023-06-15", time: "14:00", status: "confirmed" },
    { id: 2, student: "Sarah Williams", skill: "JavaScript Fundamentals", date: "2023-06-17", time: "10:30", status: "pending" },
    { id: 3, student: "Michael Chen", skill: "UI/UX Design", date: "2023-06-20", time: "16:00", status: "completed" }
  ];
  
  return (
    <div className="bookings-management">
      <div className="section-header">
        <h2>Manage Bookings</h2>
      </div>
      
      <div className="booking-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Upcoming</button>
        <button className="filter-btn">Pending</button>
        <button className="filter-btn">Completed</button>
      </div>
      
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking.id} className={`booking-item card ${booking.status}`}>
            <div className="booking-header">
              <h3 className="booking-title">{booking.student}</h3>
              <span className={`booking-status booking-${booking.status}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div className="booking-details">
              <div className="booking-info">
                <div><strong>Skill:</strong> {booking.skill}</div>
                <div><strong>Date:</strong> {booking.date}</div>
                <div><strong>Time:</strong> {booking.time}</div>
              </div>
              <div className="booking-actions">
                {booking.status === 'pending' && (
                  <>
                    <button className="confirm-btn action-btn">Confirm</button>
                    <button className="reject-btn action-btn">Reject</button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <button className="reschedule-btn action-btn">Reschedule</button>
                )}
                {booking.status === 'completed' && (
                  <button className="view-feedback-btn action-btn">View Feedback</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Projects Management View
const ProjectsManagement = () => {
  const projects = [
    { id: 1, title: "E-commerce Website Redesign", client: "Fashion Boutique", completedDate: "2023-05-10", skills: ["UI/UX Design", "React"] },
    { id: 2, title: "Custom CRM Development", client: "Tech Solutions Inc.", completedDate: "2023-04-22", skills: ["JavaScript", "Node.js"] },
    { id: 3, title: "Mobile App Prototype", client: "Health Startup", completedDate: "2023-03-15", skills: ["UI/UX Design", "Figma"] }
  ];
  
  return (
    <div className="projects-management">
      <div className="section-header">
        <h2>Past Projects</h2>
      </div>
      
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-item card">
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              <span className="project-date">{project.completedDate}</span>
            </div>
            <div className="project-details">
              <div><strong>Client:</strong> {project.client}</div>
              <div className="project-skills">
                {project.skills.map((skill, index) => (
                  <span key={index} className="project-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="project-actions">
              <button className="view-details-btn action-btn">View Details</button>
              <button className="add-to-portfolio-btn action-btn">Add to Portfolio</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Provider Dashboard Component
const ProviderDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const currentUserId = "provider123"; // Placeholder user ID
  const { data, loading, error } = useAnalytics(currentUserId);

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <PerformanceAnalytics data={data} loading={loading} error={error} />;
      case 'profile':
        return <ProfileEditor />;
      case 'skills':
        return <SkillsManagement />;
      case 'bookings':
        return <BookingsManagement />;
      case 'projects':
        return <ProjectsManagement />;
      default:
        return <PerformanceAnalytics data={data} loading={loading} error={error} />;
    }
  };

  return (
    <div className="dashboard-container provider-dashboard">
      {/* Vertical Navigation Sidebar */}
      <aside className="dashboard-nav">
        <div className="nav-header">
          <div className="provider-avatar avatar-medium">
            <FaUserCircle />
          </div>
          <h3 className="provider-name">John Doe</h3>
          <p className="provider-status">Skill Provider</p>
          <div style={{ marginTop: '1rem' }}>
            <ThemeToggle />
          </div>
        </div>
        
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FaTachometerAlt className="nav-item-icon" /> <span>Dashboard</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="nav-item-icon" /> <span>Profile</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'skills' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <FaTools className="nav-item-icon" /> <span>Skills</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'bookings' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt className="nav-item-icon" /> <span>Bookings</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FaFolderOpen className="nav-item-icon" /> <span>Projects</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <div className="content-header">
          <h1 className="content-title">
            {activeTab === 'analytics' && 'Dashboard Overview'}
            {activeTab === 'profile' && 'Edit Profile'}
            {activeTab === 'skills' && 'Manage Skills'}
            {activeTab === 'bookings' && 'Manage Bookings'}
            {activeTab === 'projects' && 'Past Projects'}
          </h1>
        </div>
        
        <div className="content-body">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboardPage;
