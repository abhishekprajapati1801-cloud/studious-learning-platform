import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line
} from 'recharts';
import {
  User, BookOpen, Award, TrendingUp,
  ChevronRight, Brain, Target, Compass, PlayCircle
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Record<string, number>>({});
  const [studentName, setStudentName] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch('/api/auth/me', { credentials: 'same-origin' }).then(async (response) => {
        if (!response.ok) throw new Error('Sign in required');
        return response.json();
      }),
      Promise.resolve().then(() => JSON.parse(localStorage.getItem('studious_scores') || '{}')),
    ]).then(([session, savedScores]) => {
      if (!active) return;
      setStudentName(session.user.name);
      setScores(savedScores);
      setCheckingSession(false);
    }).catch(() => {
      if (active) navigate('/login', { replace: true });
    });
    return () => { active = false; };
  }, [navigate]);

  const studentData = {
    name: studentName,
    standard: "12th Science",
    stream: "PCM + Biology",
    subjects: [
      { name: 'Maths', score: scores['Maths'] || 0 },
      { name: 'Physics', score: scores['Physics'] || 0 },
      { name: 'Chemistry', score: scores['Chemistry'] || 0 },
      { name: 'Biology', score: scores['Biology'] || 0 },
      { name: 'English', score: scores['English'] || 0 },
    ]
  };

  const averageScore = studentData.subjects.reduce((acc, s) => acc + s.score, 0) / studentData.subjects.length;

  if (checkingSession) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading your dashboard…</div>;

  const signOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    navigate('/login', { replace: true });
  };

  const radarData = [
    { subject: 'Logic', A: 80 + (scores['Maths'] || 0) / 10, fullMark: 150 },
    { subject: 'Memory', A: 70 + (scores['Biology'] || 0) / 10, fullMark: 150 },
    { subject: 'Analysis', A: 75 + (scores['Physics'] || 0) / 10, fullMark: 150 },
    { subject: 'Speed', A: 90, fullMark: 150 },
    { subject: 'Accuracy', A: 60 + averageScore / 2, fullMark: 150 },
  ];

  const historyData = [
    { name: 'Week 1', score: 45 },
    { name: 'Week 2', score: 52 },
    { name: 'Week 3', score: 48 },
    { name: 'Week 4', score: 60 },
    { name: 'Week 5', score: 65 },
    { name: 'Current', score: averageScore },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Student Dashboard</h1>
            <p className="text-slate-500">Welcome back, {studentData.name}! Here's your learning overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={signOut} className="text-sm font-bold text-slate-500 hover:text-brand transition-colors">Sign Out</button>
            <Link
              to="/quiz"
              className="bg-brand text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Take a Quiz
            </Link>
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-brand/10">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                <User className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{studentData.name}</p>
                <p className="text-xs text-slate-500">{studentData.standard} • {studentData.stream}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Overall Score", value: `${Math.round(averageScore)}%`, icon: Award, color: "text-brand", bg: "bg-brand/10" },
            { label: "Quizzes Taken", value: Object.keys(scores).length, icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "Learning Hours", value: "12h", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Global Rank", value: averageScore > 0 ? "#124" : "N/A", icon: Target, color: "text-indigo-500", bg: "bg-indigo-50" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subject Scores */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-brand" />
                Subject Performance
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentData.subjects}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="score" fill="#F58CB6" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand" />
                Learning Progress
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#F58CB6" strokeWidth={4} dot={{ r: 6, fill: '#F58CB6', strokeWidth: 2, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Cognitive Profile */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-brand" />
                Cognitive Profile
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar
                      name="Student"
                      dataKey="A"
                      stroke="#F58CB6"
                      fill="#F58CB6"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Career Suggestions */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand" />
                Career Suggestions
              </h3>
              <div className="space-y-4">
                {[
                  { title: "B.Tech Computer Science", match: scores['Maths'] > 80 ? "95%" : "70%", reason: "Based on Logic & Maths" },
                  { title: "B.Sc Chemistry", match: scores['Chemistry'] > 80 ? "92%" : "65%", reason: "Based on Chemistry scores" },
                  { title: "MBBS", match: scores['Biology'] > 80 ? "88%" : "60%", reason: "Based on Biology progress" }
                ].map((career, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand/20 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800 group-hover:text-brand transition-colors">{career.title}</h4>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{career.match} Match</span>
                    </div>
                    <p className="text-xs text-slate-500">{career.reason}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 text-brand font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand/5 rounded-xl transition-all">
                View Full Career Report
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
