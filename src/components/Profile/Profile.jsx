import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const res = await fetch('https://skill-forge-km0u.onrender.com/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch profile data');

        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="profile-container loading">Loading...</div>;
  if (error) return (
    <div className="profile-container error">
      <h2>Error</h2>
      <p>{error}</p>
      <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
    </div>
  );

  return (
    <div className="profile-container">
    <div className="profile-card">
      <h1 className="profile-name">{profile.fullName}</h1>

      {/* Skills Section */}
      {profile.skills && profile.skills.length > 0 && (
        <div className="profile-skills">
          <h2>Skills:</h2>
          <ul>
            {profile.skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.primary}</strong>: {skill.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Extra Info */}
      <div className="profile-extra">
        <p><strong>Email:</strong> {profile.email}</p>

        {profile.location && (
          <p>
            <strong>Location ({profile.location.method || "Unknown"}):</strong>{" "}
            {profile.location.address
              ? profile.location.address
              : profile.location.coordinates
                ? `${profile.location.coordinates.latitude}, ${profile.location.coordinates.longitude}`
                : "Not provided"}
          </p>
        )}

        <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Back Button */}
      <div className="profile-actions">
        <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
      </div>
    </div>
  </div>
  );
};

export default Profile;
