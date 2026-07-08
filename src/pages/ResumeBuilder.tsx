import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import { Download, ShieldAlert, Plus, Trash } from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const { userProfile, setShowVerifyModal } = useApp();
  const isVerified = userProfile?.isStudentVerified;

  // Form states
  const [personal, setPersonal] = useState({
    name: userProfile?.username || 'Alex Rivera',
    email: userProfile?.email || 'alex.rivera@university.edu',
    phone: '+1 (555) 019-2834',
    website: 'linkedin.com/in/alexrivera',
    location: 'Austin, TX'
  });

  const [education, setEducation] = useState([
    { school: userProfile?.universityName || 'State Tech University', degree: 'Bachelor of Science', major: 'Computer Science', gradYear: 'May 2027' }
  ]);

  const [experience, setExperience] = useState([
    { company: 'Stripe', role: 'Software Developer Intern', date: 'June 2026 - Present', points: 'Built developer sandboxes using Next.js; Optimized API telemetry speeds by 12%; Managed user dashboard revisions.' }
  ]);

  const [projects, setProjects] = useState([
    { name: 'JobShield App', tech: 'React, TypeScript, CSS', desc: 'Designed custom pattern detection algorithms identifying recruitment scams; Secured 99% accuracy across test transcripts.' }
  ]);

  const [skills, setSkills] = useState('React, TypeScript, Node.js, Python, CSS, Git, Figma');

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', major: '', gradYear: '' }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperience([...experience, { company: '', role: '', date: '', points: '' }]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: '', tech: '', desc: '' }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-left py-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl dark:text-white light:text-slate-900 font-display">ATS Resume Builder</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Design a sleek, standard single-column resume structured specifically to pass Automated Tracking Systems (ATS).</p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="py-2.5 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4" /> Export/Print PDF
        </button>
      </div>

      {/* Lock Notice if not verified */}
      {!isVerified && (
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-semibold flex items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Student Verification is required to unlock full layout templates and PDF download rights.</span>
          </div>
          <button
            onClick={() => setShowVerifyModal(true)}
            className="py-1.5 px-4 rounded-lg bg-amber-500 text-slate-950 font-bold shrink-0"
          >
            Verify Now
          </button>
        </div>
      )}

      {/* Layout Builder grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Editor */}
        <div className="lg:col-span-6 space-y-6 no-print">
          <GlassCard hoverable={false} className="space-y-4">
            
            {/* Section: Personal Info */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm border-b dark:border-white/5 pb-2 dark:text-slate-200 light:text-slate-800">1. Personal Contact</h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                <div className="space-y-1">
                  <label className="text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={personal.name}
                    onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Phone</label>
                  <input
                    type="text"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Location</label>
                  <input
                    type="text"
                    value={personal.location}
                    onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs text-white"
                  />
                </div>
              </div>
              <div className="space-y-1 text-xs font-semibold">
                <label className="text-slate-400">LinkedIn URL / Website</label>
                <input
                  type="text"
                  value={personal.website}
                  onChange={(e) => setPersonal({ ...personal, website: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs text-white"
                />
              </div>
            </div>

            {/* Section: Education */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b dark:border-white/5 pb-2">
                <h3 className="font-bold text-sm dark:text-slate-200 light:text-slate-800">2. Education</h3>
                <button onClick={addEducation} className="text-[10px] text-brand-blue flex items-center gap-0.5 hover:underline font-bold"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>

              {education.map((edu, index) => (
                <div key={index} className="p-3 rounded-lg border dark:border-white/5 dark:bg-slate-900/20 space-y-2 relative">
                  {education.length > 1 && (
                    <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-500/10 p-1 rounded"><Trash className="w-3.5 h-3.5" /></button>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div>
                      <label className="text-slate-400">School / University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].school = e.target.value;
                          setEducation(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].degree = e.target.value;
                          setEducation(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400">Major</label>
                      <input
                        type="text"
                        value={edu.major}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].major = e.target.value;
                          setEducation(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400">Graduation Date</label>
                      <input
                        type="text"
                        value={edu.gradYear}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].gradYear = e.target.value;
                          setEducation(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section: Work Experience */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b dark:border-white/5 pb-2">
                <h3 className="font-bold text-sm dark:text-slate-200 light:text-slate-800">3. Work Experience</h3>
                <button onClick={addExperience} className="text-[10px] text-brand-blue flex items-center gap-0.5 hover:underline font-bold"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>

              {experience.map((exp, index) => (
                <div key={index} className="p-3 rounded-lg border dark:border-white/5 dark:bg-slate-900/20 space-y-2 relative">
                  {experience.length > 1 && (
                    <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-500/10 p-1 rounded"><Trash className="w-3.5 h-3.5" /></button>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div>
                      <label className="text-slate-400">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[index].company = e.target.value;
                          setExperience(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[index].role = e.target.value;
                          setExperience(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-semibold">
                    <label className="text-slate-400">Dates of Employment</label>
                    <input
                      type="text"
                      value={exp.date}
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[index].date = e.target.value;
                        setExperience(updated);
                      }}
                      placeholder="e.g. June 2026 - Present"
                      className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                    />
                  </div>
                  <div className="text-xs font-semibold">
                    <label className="text-slate-400">Key achievements (semicolon separated)</label>
                    <textarea
                      rows={2}
                      value={exp.points}
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[index].points = e.target.value;
                        setExperience(updated);
                      }}
                      className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Section: Projects */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b dark:border-white/5 pb-2">
                <h3 className="font-bold text-sm dark:text-slate-200 light:text-slate-800">4. Key Projects</h3>
                <button onClick={addProject} className="text-[10px] text-brand-blue flex items-center gap-0.5 hover:underline font-bold"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>

              {projects.map((proj, index) => (
                <div key={index} className="p-3 rounded-lg border dark:border-white/5 dark:bg-slate-900/20 space-y-2 relative">
                  {projects.length > 1 && (
                    <button onClick={() => removeProject(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-500/10 p-1 rounded"><Trash className="w-3.5 h-3.5" /></button>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div>
                      <label className="text-slate-400">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index].name = e.target.value;
                          setProjects(updated);
                        }}
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index].tech = e.target.value;
                          setProjects(updated);
                        }}
                        placeholder="e.g. React, Python"
                        className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-semibold">
                    <label className="text-slate-400">Short Description</label>
                    <textarea
                      rows={2}
                      value={proj.desc}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[index].desc = e.target.value;
                        setProjects(updated);
                      }}
                      className="w-full p-2 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Section: Skills */}
            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-sm border-b dark:border-white/5 pb-2 dark:text-slate-200 light:text-slate-800">5. Skills</h3>
              <div className="space-y-1 text-xs font-semibold">
                <label className="text-slate-400">Languages & Utilities (comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full p-2.5 rounded-lg border dark:border-white/5 dark:bg-slate-950 text-xs text-white"
                />
              </div>
            </div>

          </GlassCard>
        </div>

        {/* Right Preview Paper sheet */}
        <div className="lg:col-span-6 print-area bg-white text-slate-900 border border-slate-300 shadow-2xl p-8 rounded-xl font-serif min-h-[750px] space-y-5">
          
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="font-bold text-2xl tracking-normal text-slate-900 font-serif m-0">{personal.name || 'Alex Rivera'}</h1>
            <p className="text-xs text-slate-600 font-sans tracking-wide">
              {personal.location} &bull; {personal.phone} &bull; {personal.email} &bull; {personal.website}
            </p>
          </div>

          {/* Education Block */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase border-b border-slate-800 tracking-wider text-slate-800 text-left m-0 pb-0.5">Education</h2>
            
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start text-xs font-serif leading-relaxed">
                <div className="text-left">
                  <p className="font-bold">{edu.school || 'University Name'}</p>
                  <p className="italic text-slate-700">{edu.degree || 'Degree'} in {edu.major || 'Major'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold">{edu.gradYear || 'Grad Year'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase border-b border-slate-800 tracking-wider text-slate-800 text-left m-0 pb-0.5">Experience</h2>
            
            {experience.map((exp, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-start text-xs font-serif leading-relaxed">
                  <div className="text-left">
                    <span className="font-bold">{exp.company || 'Company Name'}</span> &ndash; <span className="italic text-slate-700">{exp.role || 'Role'}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold">{exp.date || 'Dates'}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 text-[11px] leading-relaxed text-left space-y-0.5">
                  {(exp.points || '').split(';').filter(p => p.trim()).map((pt, pIdx) => (
                    <li key={pIdx} className="text-slate-800">{pt.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase border-b border-slate-800 tracking-wider text-slate-800 text-left m-0 pb-0.5">Projects</h2>
            
            {projects.map((proj, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-start text-xs font-serif leading-relaxed">
                  <div className="text-left">
                    <span className="font-bold">{proj.name || 'Project Name'}</span> &bull; <span className="text-[10px] font-sans font-semibold bg-slate-100 text-slate-700 py-0.5 px-1.5 rounded">{proj.tech || 'Tech Stack'}</span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-left text-slate-800">
                  {proj.desc || 'Project Description'}
                </p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase border-b border-slate-800 tracking-wider text-slate-800 text-left m-0 pb-0.5">Skills & Utilities</h2>
            <p className="text-[11px] leading-relaxed text-left text-slate-800">
              <span className="font-bold font-sans">Technologies:</span> {skills || 'JavaScript, Python'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
