import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SkillFeedDashboard.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const SkillFeedDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [providers, setProviders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  // Dummy data for skills, providers, and projects
  useEffect(() => {
    // Simulating API fetch
    const dummySkills = [
      { id: 1, name: "React", likes: 245, icon: "💻" },
      { id: 2, name: "Python", likes: 189, icon: "🐍" },
      { id: 3, name: "UI/UX Design", likes: 156, icon: "🎨" },
      { id: 4, name: "Machine Learning", likes: 132, icon: "🤖" },
      { id: 5, name: "Data Science", likes: 120, icon: "📊" },
      { id: 6, name: "JavaScript", likes: 110, icon: "📱" },
      { id: 7, name: "Cloud Computing", likes: 98, icon: "☁️" },
      { id: 8, name: "Blockchain", likes: 87, icon: "🔗" },
    ];

    const dummyProviders = [
      { id: 1, name: "Alex Johnson", expertise: "React Development", rating: 4.9, image: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "Sarah Williams", expertise: "UI/UX Design", rating: 4.8, image: "https://i.pravatar.cc/150?img=5" },
      { id: 3, name: "Michael Chen", expertise: "Python & Data Science", rating: 4.7, image: "https://i.pravatar.cc/150?img=3" },
      { id: 4, name: "Jessica Lee", expertise: "Machine Learning", rating: 4.9, image: "https://i.pravatar.cc/150?img=4" },
    ];

    const dummyProjects = [
      { id: 1, title: "AI-Powered Portfolio Builder", description: "Create stunning portfolios with AI assistance", tags: ["React", "AI", "Design"] },
      { id: 2, title: "Data Visualization Dashboard", description: "Interactive dashboard for complex data analysis", tags: ["D3.js", "React", "Data Science"] },
      { id: 3, title: "Blockchain Voting System", description: "Secure and transparent voting using blockchain", tags: ["Blockchain", "Security", "Web3"] },
      { id: 4, title: "AR Learning Platform", description: "Augmented reality for interactive learning experiences", tags: ["AR", "Education", "Mobile"] },
      { id: 5, title: "Smart Home Automation", description: "IoT solution for home automation and energy efficiency", tags: ["IoT", "Python", "Hardware"] },
    ];

    setSkills(dummySkills);
    setProviders(dummyProviders);
    setProjects(dummyProjects);
    setFilteredSkills(dummySkills);
    setFilteredProviders(dummyProviders);
    setFilteredProjects(dummyProjects);
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSkills(skills);
      setFilteredProviders(providers);
      setFilteredProjects(projects);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    const skillResults = skills.filter(skill => 
      skill.name.toLowerCase().includes(query)
    );
    
    const providerResults = providers.filter(provider => 
      provider.name.toLowerCase().includes(query) || 
      provider.expertise.toLowerCase().includes(query)
    );
    
    const projectResults = projects.filter(project => 
      project.title.toLowerCase().includes(query) || 
      project.description.toLowerCase().includes(query) || 
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );

    setFilteredSkills(skillResults);
    setFilteredProviders(providerResults);
    setFilteredProjects(projectResults);
  }, [searchQuery, skills, providers, projects]);

  // Handle like functionality
  const handleLike = (id) => {
    const updatedSkills = skills.map(skill => {
      if (skill.id === id) {
        return { ...skill, likes: skill.likes + 1 };
      }
      return skill;
    });
    
    setSkills(updatedSkills);
    setFilteredSkills(
      filteredSkills.map(skill => {
        if (skill.id === id) {
          return { ...skill, likes: skill.likes + 1 };
        }
        return skill;
      })
    );
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star">⭐</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star">✨</span>);
    }
    
    return stars;
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">Skill Forge</Link>
        </div>
        <div className="navbar-center">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for skills, providers, or projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
    
        <div className="navbar-right">
          <Link to="/dashboard" className="nav-link active">Home</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button
            className="nav-link logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
          >
            Logout
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Section 1 - Skill Feed Header */}
        <section className="skill-feed-header">
          <h1>Discover Trending Skills</h1>
          <p>Find top-rated providers and trending projects based on your interests.</p>
        </section>

        {/* Section 2 - Dynamic Content Grid */}
        <section className="content-grid">
          {/* Trending Skills */}
          <div className="section-container">
            <h2>Trending Skills</h2>
            <div className="skills-grid">
              {filteredSkills.map((skill) => (
                <div className="skill-card" key={skill.id}>
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.name}</h3>
                  <div className="skill-likes">
                    <span>{skill.likes}</span>
                    <button 
                      className="like-button"
                      onClick={() => handleLike(skill.id)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top-Rated Providers */}
          <div className="section-container">
            <h2>Top-Rated Providers</h2>
            <div className="providers-grid">
              {filteredProviders.map((provider) => (
                <div className="provider-card" key={provider.id} onClick={() => navigate(`/provider/${provider.id}`)}>
                  <div className="provider-image">
                    <img src={provider.image} alt={provider.name} />
                  </div>
                  <h3>{provider.name}</h3>
                  <p className="provider-expertise">{provider.expertise}</p>
                  <div className="provider-rating">
                    {renderStars(provider.rating)}
                    <span className="rating-value">{provider.rating}</span>
                  </div>
                  <button className="book-now-btn">Book Now</button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Projects */}
          <div className="section-container">
            <h2>Trending Projects</h2>
            <div className="projects-scroll">
              {filteredProjects.map((project) => (
                <div className="project-card" key={project.id} onClick={() => navigate(`/project/${project.id}`)}>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SkillFeedDashboard;