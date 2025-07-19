import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, FileText, User, Bell, Plus, Edit, Eye } from 'lucide-react';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { sendMail } from '@/lib/sendMail';
import { doc as firestoreDoc, getDoc } from 'firebase/firestore';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack?: string;
  deadline?: string;
  status: string;
  phase: string;
  due: string;
}

interface DashboardPageProps {
  user: any;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Mirror',
    description: 'A smart mirror with widgets and voice assistant.',
    status: 'In Progress',
    phase: '📊 Timeline Planning',
    due: 'July 25',
    techStack: 'Raspberry Pi, React',
  },
  {
    id: '2',
    title: 'AI Chatbot',
    description: 'A chatbot powered by GPT.',
    status: 'Completed',
    phase: '✅ Final Submission',
    due: 'July 10',
    techStack: 'Python, FastAPI',
  },
];

const SIDEBAR_SECTIONS = [
  { key: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { key: 'projects', label: 'My Projects', icon: <FileText className="w-5 h-5 mr-2" /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5 mr-2" /> },
  { key: 'profile', label: 'Profile', icon: <User className="w-5 h-5 mr-2" /> },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDetails, setShowDetails] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    deadline: '',
  });
  const [activeSection, setActiveSection] = useState('dashboard');
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    async function fetchProjects() {
      if (user?.uid) {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/projects`));
        const loadedProjects = querySnapshot.docs.map(doc => doc.data() as Project);
        setProjects(loadedProjects);
      }
    }
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      techStack: form.techStack,
      deadline: form.deadline,
      status: 'In Progress',
      phase: '🟡 Idea Review',
      due: form.deadline || '-',
    };
    setProjects([newProject, ...projects]);
    setShowProjectModal(false);
    setForm({ title: '', description: '', techStack: '', deadline: '' });
    // Save to Firestore
    if (user?.uid) {
      await setDoc(doc(db, `users/${user.uid}/projects/${newProject.id}`), newProject);
      // Fetch user email from Firestore
      const userDoc = await getDoc(firestoreDoc(db, 'users', user.uid));
      const userEmail = userDoc.exists() ? userDoc.data().email : null;
      if (userEmail) {
        await sendMail({
          to: [userEmail, 'projeevo@outlook.com'],
          subject: 'Project Registration Confirmation',
          text: `Your project "${newProject.title}" has been registered successfully!`,
          html: `<b>Your project "${newProject.title}" has been registered successfully!</b>`
        });
      }
    }
  }

  // Sidebar navigation handler
  function handleSidebarClick(section: string) {
    setActiveSection(section);
    if (section === 'projects') {
      setTimeout(() => {
        projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Main content for each section
  function renderMainContent() {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            {/* Welcome Section */}
            <div className="glass-blur-card rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-2xl mb-1 text-foreground">👋 Welcome, {user?.name || 'User'}!</div>
                <div className="text-muted-foreground text-sm">{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</div>
                <div className="text-blue-700 mt-2 italic text-sm">“Success is not the key to happiness. Happiness is the key to success.”</div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">My Projects</h2>
              <Button onClick={() => setShowProjectModal(true)} className="flex items-center"><Plus className="w-4 h-4 mr-2" /> Register New Project</Button>
            </div>
            {renderProjectsTable()}
            {renderNotificationsPanel()}
          </>
        );
      case 'projects':
        return (
          <div ref={projectsSectionRef}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">My Projects</h2>
              <Button onClick={() => setShowProjectModal(true)} className="flex items-center"><Plus className="w-4 h-4 mr-2" /> Register New Project</Button>
            </div>
            {renderProjectsTable()}
          </div>
        );
      case 'notifications':
        return renderNotificationsPanel();
      case 'profile':
        return (
          <div className="glass-blur-card rounded-xl p-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4 text-foreground">Profile</h2>
            <div className="mb-2 text-foreground"><span className="font-semibold">Name:</span> {user?.name || 'User Name'}</div>
            <div className="mb-2 text-foreground"><span className="font-semibold">Email:</span> {user?.email || 'user@email.com'}</div>
            {/* Add more profile info or edit form here */}
          </div>
        );
      default:
        return null;
    }
  }

  function renderProjectsTable() {
    return (
      <div className="glass-blur-card rounded-xl p-4 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="glass-blur-light rounded">
              <th className="px-4 py-2 text-left text-foreground">Project Title</th>
              <th className="px-4 py-2 text-left text-foreground">Status</th>
              <th className="px-4 py-2 text-left text-foreground">Current Phase</th>
              <th className="px-4 py-2 text-left text-foreground">Due Date</th>
              <th className="px-4 py-2 text-left text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr
                key={proj.id}
                className="border-b border-border cursor-pointer hover:bg-muted/30 transition"
                onClick={() => setShowDetails(proj)}
              >
                <td className="px-4 py-2 font-medium text-primary underline hover:text-primary/80" onClick={e => { e.stopPropagation(); setShowDetails(proj); }}>{proj.title}</td>
                <td className="px-4 py-2 text-foreground">{proj.status}</td>
                <td className="px-4 py-2 text-foreground">{proj.phase}</td>
                <td className="px-4 py-2 text-foreground">{proj.due}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button size="sm" variant="outline" className="inline-flex items-center" onClick={e => { e.stopPropagation(); setShowDetails(proj); }}><Eye className="w-4 h-4 mr-1" />View</Button>
                  <Button size="sm" variant="outline" className="inline-flex items-center"><Edit className="w-4 h-4 mr-1" />Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderNotificationsPanel() {
    return (
      <div className="glass-blur-card rounded-xl p-4 mb-8">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-foreground"><Bell className="w-5 h-5 mr-2 text-primary" />Notifications</h3>
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          <li>PPT uploaded for 'Smart Mirror'</li>
          <li>Final Report due by July 28</li>
          <li>Mentor left feedback</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      {/* Sidebar */}
      <aside className="w-64 glass-blur text-white flex flex-col py-6 px-4 min-h-screen relative z-10">
        <div className="flex items-center mb-8">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold tracking-wide">Project Portal</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {SIDEBAR_SECTIONS.map(section => (
              <li key={section.key}>
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); handleSidebarClick(section.key); }}
                  className={`flex items-center px-3 py-2 rounded transition ${activeSection === section.key ? 'bg-primary/30 font-semibold' : 'hover:bg-primary/20'}`}
                >
                  {section.icon}{section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="glass-blur-header flex items-center justify-between px-8 py-4 relative z-10">
          <h1 className="text-2xl font-bold capitalize text-foreground">{SIDEBAR_SECTIONS.find(s => s.key === activeSection)?.label || 'Dashboard'}</h1>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-muted-foreground">{user?.email || 'user@email.com'}</span>
            <div className="glass-blur-light rounded-full h-9 w-9 flex items-center justify-center">
              <User className="text-primary w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto relative z-10">
          {renderMainContent()}

          {/* Project Registration Modal */}
          {showProjectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="glass-blur-card rounded-2xl p-8 w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-2xl" onClick={() => setShowProjectModal(false)}>&times;</button>
                <h2 className="text-xl font-bold mb-4 text-foreground">Register New Project</h2>
                <form className="space-y-4" onSubmit={handleProjectSubmit}>
                  <div>
                    <label className="block text-muted-foreground mb-1">Title</label>
                    <input name="title" value={form.title} onChange={handleFormChange} className="glass-blur-light rounded w-full py-3 px-4 text-foreground placeholder:text-muted-foreground" placeholder="Project Title" required />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Idea Description</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange} className="glass-blur-light rounded w-full py-3 px-4 text-foreground placeholder:text-muted-foreground" placeholder="Describe your idea" required />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Tech Stack (optional)</label>
                    <input name="techStack" value={form.techStack} onChange={handleFormChange} className="glass-blur-light rounded w-full py-3 px-4 text-foreground placeholder:text-muted-foreground" placeholder="e.g. React, Node.js" />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Target Deadline (optional)</label>
                    <input name="deadline" type="date" value={form.deadline} onChange={handleFormChange} className="glass-blur-light rounded w-full py-3 px-4 text-foreground" />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Submit Project</Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Project Details Modal */}
          {showDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="glass-blur-card rounded-2xl p-8 w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-2xl" onClick={() => setShowDetails(null)}>&times;</button>
                <h2 className="text-xl font-bold mb-4 text-foreground">{showDetails.title}</h2>
                <div className="mb-2 text-foreground"><span className="font-semibold">Description:</span> {showDetails.description}</div>
                <div className="mb-2 text-foreground"><span className="font-semibold">Tech Stack:</span> {showDetails.techStack || '-'}</div>
                <div className="mb-2 text-foreground"><span className="font-semibold">Deadline:</span> {showDetails.due}</div>
                <div className="mb-2 text-foreground"><span className="font-semibold">Status:</span> {showDetails.status}</div>
                <div className="mb-2 text-foreground"><span className="font-semibold">Phase:</span> {showDetails.phase}</div>
                {/* Add more details as needed */}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage; 