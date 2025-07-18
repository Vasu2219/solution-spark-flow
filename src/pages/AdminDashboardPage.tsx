import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User, FileText } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack?: string;
  deadline?: string;
  status: string;
  phase: string;
  due: string;
  owner?: string;
}

interface UserInfo {
  uid: string;
  name?: string;
  email: string;
}

const AdminDashboardPage: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersList: UserInfo[] = [];
      const allProjects: Project[] = [];
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        usersList.push({
          uid: userDoc.id,
          name: userData.name,
          email: userData.email,
        });
        // Fetch projects for each user
        const projectsSnapshot = await getDocs(collection(db, `users/${userDoc.id}/projects`));
        projectsSnapshot.forEach((projDoc) => {
          allProjects.push({ ...(projDoc.data() as Project), owner: userData.email || userDoc.id });
        });
      }
      setUsers(usersList);
      setProjects(allProjects);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-900 text-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="h-8 w-8" />
          <span className="text-2xl font-bold">Admin Portal</span>
        </div>
        <span className="font-semibold">Admin</span>
      </header>
      <main className="flex-1 p-8 space-y-8">
        {/* Users Table */}
        <section className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-blue-700" />Registered Users</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">UID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.uid} className="border-b">
                  <td className="px-4 py-2">{user.uid}</td>
                  <td className="px-4 py-2">{user.name || '-'}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Projects Table */}
        <section className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-blue-700" />All Registered Projects</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Project Title</th>
                <th className="px-4 py-2 text-left">Owner</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Current Phase</th>
                <th className="px-4 py-2 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 font-medium">{proj.title}</td>
                  <td className="px-4 py-2">{proj.owner}</td>
                  <td className="px-4 py-2">{proj.status}</td>
                  <td className="px-4 py-2">{proj.phase}</td>
                  <td className="px-4 py-2">{proj.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage; 