import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, FileText, User, Bell, Plus, Edit, Eye } from 'lucide-react';

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

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleProjectSubmit(e: React.FormEvent) {
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
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col py-6 px-4 min-h-screen">
        <div className="flex items-center mb-8">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold tracking-wide">Project Portal</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><a href="#" className="flex items-center px-3 py-2 rounded hover:bg-blue-800 transition bg-blue-800 font-semibold"><Home className="w-5 h-5 mr-2" />Dashboard</a></li>
            <li><a href="#" className="flex items-center px-3 py-2 rounded hover:bg-blue-800 transition"><FileText className="w-5 h-5 mr-2" />My Projects</a></li>
            <li><a href="#" className="flex items-center px-3 py-2 rounded hover:bg-blue-800 transition"><Bell className="w-5 h-5 mr-2" />Notifications</a></li>
            <li><a href="#" className="flex items-center px-3 py-2 rounded hover:bg-blue-800 transition"><User className="w-5 h-5 mr-2" />Profile</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow flex items-center justify-between px-8 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700">{user?.email || 'user@email.com'}</span>
            <div className="bg-gray-200 rounded-full h-9 w-9 flex items-center justify-center">
              <User className="text-gray-500 w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Register New Project Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Projects</h2>
            <Button onClick={() => setShowProjectModal(true)} className="flex items-center"><Plus className="w-4 h-4 mr-2" /> Register New Project</Button>
          </div>

          {/* My Projects Table */}
          <div className="bg-white rounded shadow p-4 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Project Title</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Current Phase</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id} className="border-b">
                    <td className="px-4 py-2 font-medium">{proj.title}</td>
                    <td className="px-4 py-2">{proj.status}</td>
                    <td className="px-4 py-2">{proj.phase}</td>
                    <td className="px-4 py-2">{proj.due}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button size="sm" variant="outline" className="inline-flex items-center" onClick={() => setShowDetails(proj)}><Eye className="w-4 h-4 mr-1" />View</Button>
                      <Button size="sm" variant="outline" className="inline-flex items-center"><Edit className="w-4 h-4 mr-1" />Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notifications Panel */}
          <div className="bg-white rounded shadow p-4 mb-8">
            <h3 className="text-lg font-semibold mb-2 flex items-center"><Bell className="w-5 h-5 mr-2 text-blue-700" />Notifications</h3>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              <li>PPT uploaded for 'Smart Mirror'</li>
              <li>Final Report due by July 28</li>
              <li>Mentor left feedback</li>
            </ul>
          </div>

          {/* Project Registration Modal */}
          {showProjectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowProjectModal(false)}>&times;</button>
                <h2 className="text-xl font-bold mb-4">Register New Project</h2>
                <form className="space-y-4" onSubmit={handleProjectSubmit}>
                  <div>
                    <label className="block text-gray-700 mb-1">Title</label>
                    <input name="title" value={form.title} onChange={handleFormChange} className="border rounded w-full py-2 px-3" placeholder="Project Title" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Idea Description</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange} className="border rounded w-full py-2 px-3" placeholder="Describe your idea" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Tech Stack (optional)</label>
                    <input name="techStack" value={form.techStack} onChange={handleFormChange} className="border rounded w-full py-2 px-3" placeholder="e.g. React, Node.js" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Target Deadline (optional)</label>
                    <input name="deadline" type="date" value={form.deadline} onChange={handleFormChange} className="border rounded w-full py-2 px-3" />
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
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowDetails(null)}>&times;</button>
                <h2 className="text-xl font-bold mb-4">{showDetails.title}</h2>
                <div className="mb-2"><span className="font-semibold">Description:</span> {showDetails.description}</div>
                <div className="mb-2"><span className="font-semibold">Tech Stack:</span> {showDetails.techStack || '-'}</div>
                <div className="mb-2"><span className="font-semibold">Deadline:</span> {showDetails.due}</div>
                <div className="mb-2"><span className="font-semibold">Status:</span> {showDetails.status}</div>
                <div className="mb-2"><span className="font-semibold">Phase:</span> {showDetails.phase}</div>
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