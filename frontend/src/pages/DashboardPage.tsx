import './DashboardPage.css'; // Import the new CSS
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { canInstall, promptInstall } = usePWAInstall();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const domains = [
    { title: "Goal", path: "/goals" },
    { title: "Health", path: "/health" },
    { title: "Suggestions", path: "/suggestions" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="light-rays"></div>
        <div className="particles"></div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">MANA_PANI</h1>
          <div className="flex items-center gap-2">
            {canInstall && (
              <Button onClick={promptInstall}>Install App</Button>
            )}
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
          </div>
        </div>

        <motion.div
          className="domain-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {domains.map((domain) => (
            <motion.button
              key={domain.title}
              onClick={() => navigate(domain.path)}
              className="futuristic-btn"
              variants={itemVariants}
            >
              {domain.title}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;