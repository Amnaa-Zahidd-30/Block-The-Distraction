import React, { useState, useEffect } from 'react';
import { Clock, Target, Lock, Unlock, CheckCircle, AlertCircle, Trophy, Plus, X } from 'lucide-react';

export default function FocusGuardian() {
  const [screen, setScreen] = useState('welcome'); // welcome, setup, focus, blocked, complete
  const [tasks, setTasks] = useState([]);
  const [distractions, setDistractions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);

  const distractionApps = [
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', domains: ['instagram.com'] },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black', domains: ['tiktok.com'] },
    { id: 'snapchat', name: 'Snapchat', color: 'bg-yellow-400', domains: ['snapchat.com'] },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600', domains: ['facebook.com', 'fb.com'] },
    { id: 'twitter', name: 'X (Twitter)', color: 'bg-black', domains: ['twitter.com', 'x.com'] },
    { id: 'whatsapp', name: 'WhatsApp', color: 'bg-green-500', domains: ['web.whatsapp.com'] },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-600', domains: ['youtube.com'] },
    { id: 'reddit', name: 'Reddit', color: 'bg-orange-500', domains: ['reddit.com'] }
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if we're in a task time block
  useEffect(() => {
    const checkActiveTask = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const active = tasks.find(task => {
        if (task.completed) return false;
        const [startH, startM] = task.startTime.split(':').map(Number);
        const [endH, endM] = task.endTime.split(':').map(Number);
        const taskStart = startH * 60 + startM;
        const taskEnd = endH * 60 + endM;
        return currentMinutes >= taskStart && currentMinutes < taskEnd;
      });

      setActiveTask(active);
    };

    checkActiveTask();
    const interval = setInterval(checkActiveTask, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [tasks]);

  // Check if all tasks are complete
  useEffect(() => {
    if (tasks.length > 0 && tasks.every(t => t.completed) && screen === 'focus') {
      setScreen('complete');
    }
  }, [tasks, screen]);

  const addTask = (taskData) => {
    setTasks([...tasks, { ...taskData, id: Date.now(), completed: false }]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleDistraction = (appId) => {
    if (distractions.includes(appId)) {
      setDistractions(distractions.filter(id => id !== appId));
    } else {
      setDistractions([...distractions, appId]);
    }
  };

  const startFocusMode = () => {
    if (tasks.length === 0) {
      alert('Please add at least one task!');
      return;
    }
    if (distractions.length === 0) {
      alert('Please select at least one distraction app!');
      return;
    }
    setScreen('focus');
  };

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-2xl">
          <div className="mb-8 animate-bounce">
            <Target className="w-24 h-24 mx-auto mb-4" />
          </div>
          <h1 className="text-6xl font-bold mb-6">Focus Guardian</h1>
          <p className="text-2xl mb-4 opacity-90">Your Personal Productivity Bodyguard</p>
          <p className="text-xl mb-8 opacity-80">Lock distractions. Complete tasks. Own your day.</p>
          <button
            onClick={() => setScreen('setup')}
            className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transform transition shadow-2xl"
          >
            Start Building Your Day
          </button>
        </div>
      </div>
    );
  }

  // Setup Screen
  if (screen === 'setup') {
    return <SetupScreen 
      tasks={tasks}
      distractions={distractions}
      distractionApps={distractionApps}
      onAddTask={addTask}
      onToggleDistraction={toggleDistraction}
      onStart={startFocusMode}
      onRemoveTask={(id) => setTasks(tasks.filter(t => t.id !== id))}
    />;
  }

  // Complete Screen
  if (screen === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-2xl">
          <Trophy className="w-32 h-32 mx-auto mb-6 animate-bounce" />
          <h1 className="text-6xl font-bold mb-4">🎉 CHAMPION! 🎉</h1>
          <p className="text-3xl mb-6">You crushed every single task!</p>
          <div className="bg-white/20 backdrop-blur rounded-3xl p-8 mb-8">
            <p className="text-2xl mb-4">Today you proved that:</p>
            <ul className="text-xl space-y-2">
              <li>✨ You are STRONGER than distractions</li>
              <li>💪 You CONTROL your time</li>
              <li>🚀 You are UNSTOPPABLE</li>
            </ul>
          </div>
          <p className="text-xl mb-8 opacity-90">
            Tasks Completed: <span className="font-bold text-3xl">{tasks.length}/{tasks.length}</span>
          </p>
          <button
            onClick={() => {
              setTasks([]);
              setDistractions([]);
              setScreen('welcome');
            }}
            className="bg-white text-green-600 px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transform transition shadow-2xl"
          >
            Start New Day
          </button>
        </div>
      </div>
    );
  }

  // Focus Mode Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Focus Mode Active</h2>
            <div className="text-right">
              <div className="text-4xl font-mono font-bold">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm opacity-75">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Active Task Banner */}
          {activeTask && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8" />
                <div>
                  <p className="font-bold text-lg">ACTIVE NOW: {activeTask.task}</p>
                  <p className="text-sm opacity-90">
                    {activeTask.startTime} - {activeTask.endTime} | Stay focused!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Today's Mission
          </h3>
          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-xl ${
                  task.completed 
                    ? 'bg-green-500/30 border-2 border-green-400' 
                    : 'bg-white/5 border-2 border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      task.completed 
                        ? 'bg-green-500 border-green-400' 
                        : 'border-white/40 hover:border-white'
                    }`}
                  >
                    {task.completed && <CheckCircle className="w-5 h-5" />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-lg font-semibold ${task.completed ? 'line-through opacity-60' : ''}`}>
                      {task.task}
                    </p>
                    <p className="text-sm opacity-75">
                      {task.startTime} - {task.endTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Apps */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Locked Distractions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {distractionApps
              .filter(app => distractions.includes(app.id))
              .map(app => (
                <div
                  key={app.id}
                  className={`${app.color} rounded-xl p-4 text-center text-white font-bold shadow-lg opacity-50`}
                >
                  <Lock className="w-6 h-6 mx-auto mb-2" />
                  {app.name}
                </div>
              ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur rounded-full px-6 py-3">
            <p className="text-xl">
              Progress: <span className="font-bold text-2xl">
                {tasks.filter(t => t.completed).length}/{tasks.length}
              </span> Tasks Complete
            </p>
          </div>
        </div>
      </div>

      {/* Distraction Warning */}
      <DistractionWarning
        activeTask={activeTask}
        distractionApps={distractionApps}
        distractions={distractions}
      />
    </div>
  );
}

// Setup Screen Component
function SetupScreen({ tasks, distractions, distractionApps, onAddTask, onToggleDistraction, onStart, onRemoveTask }) {
  const [taskInput, setTaskInput] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput && startTime && endTime) {
      onAddTask({ task: taskInput, startTime, endTime });
      setTaskInput('');
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Plan Your Productive Day</h1>

        {/* Task Input */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add Your Tasks
          </h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="What do you need to accomplish?"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-purple-400 outline-none text-white placeholder-white/50"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 opacity-75">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-purple-400 outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 opacity-75">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-purple-400 outline-none text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-bold hover:scale-105 transform transition"
            >
              Done
            </button>
          </form>

          {/* Task List */}
          {tasks.length > 0 && (
            <div className="mt-6 space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="bg-white/5 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{task.task}</p>
                    <p className="text-sm opacity-75">{task.startTime} - {task.endTime}</p>
                  </div>
                  <button
                    onClick={() => onRemoveTask(task.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Distraction Selection */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Select Your Distractions</h2>
          <p className="mb-4 opacity-75">Choose apps that waste your time</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {distractionApps.map(app => (
              <button
                key={app.id}
                onClick={() => onToggleDistraction(app.id)}
                className={`${app.color} rounded-xl p-4 text-center text-white font-bold transition transform hover:scale-105 ${
                  distractions.includes(app.id) 
                    ? 'ring-4 ring-yellow-400 shadow-2xl' 
                    : 'opacity-50'
                }`}
              >
                {distractions.includes(app.id) ? <Lock className="w-6 h-6 mx-auto mb-2" /> : <Unlock className="w-6 h-6 mx-auto mb-2" />}
                {app.name}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          disabled={tasks.length === 0 || distractions.length === 0}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-4 rounded-xl text-xl font-bold hover:scale-105 transform transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          🚀 Start Focus Mode
        </button>
      </div>
    </div>
  );
}

// Distraction Warning Component
function DistractionWarning({ activeTask, distractionApps, distractions }) {
  const [showWarning, setShowWarning] = useState(false);
  const [blockedApp, setBlockedApp] = useState(null);

  useEffect(() => {
    if (!activeTask) {
      setShowWarning(false);
      return;
    }

    // Check current URL
    const checkUrl = () => {
      const currentUrl = window.location.href.toLowerCase();
      const blockedDomains = distractionApps
        .filter(app => distractions.includes(app.id))
        .flatMap(app => app.domains);

      const blocked = distractionApps.find(app => 
        distractions.includes(app.id) && 
        app.domains.some(domain => currentUrl.includes(domain))
      );

      if (blocked) {
        setBlockedApp(blocked);
        setShowWarning(true);
      }
    };

    checkUrl();
  }, [activeTask, distractionApps, distractions]);

  if (!showWarning || !activeTask) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="text-center max-w-2xl">
        <AlertCircle className="w-32 h-32 mx-auto mb-6 text-red-500 animate-pulse" />
        <h1 className="text-6xl font-bold mb-6 text-red-500">STOP!</h1>
        <h2 className="text-4xl font-bold mb-4 text-white">You Have Unfinished Work</h2>
        
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-6">
          <p className="text-2xl mb-4 text-white">Your active task:</p>
          <p className="text-3xl font-bold text-yellow-400 mb-4">{activeTask.task}</p>
          <p className="text-xl text-white/80">
            Time: {activeTask.startTime} - {activeTask.endTime}
          </p>
        </div>

        <div className="bg-red-500/20 border-4 border-red-500 rounded-3xl p-6 mb-6">
          <p className="text-2xl text-white mb-2">You're trying to open:</p>
          <p className="text-4xl font-bold text-white">{blockedApp?.name}</p>
        </div>

        <div className="text-xl text-white/90 space-y-3 mb-8">
          <p>😔 Every moment wasted is a dream delayed</p>
          <p>💔 Your future self is counting on you</p>
          <p>⏰ Time doesn't stop for anyone</p>
        </div>

        <button
          onClick={() => setShowWarning(false)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transform transition shadow-2xl"
        >
          ✅ Return to My Task
        </button>
      </div>
    </div>
  );
}
