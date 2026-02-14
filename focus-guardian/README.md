# Focus Guardian - Your Productivity Bodyguard

A web app that helps you stay focused by locking distractions and tracking your daily tasks.

## 🚀 What This App Does

1. **Plan Your Day** - Add tasks with specific start and end times
2. **Lock Distractions** - Select apps (Instagram, TikTok, etc.) that waste your time
3. **Stay Focused** - Get BIG SAD reminders when you try to access blocked apps during work time
4. **Track Progress** - Check off completed tasks as you finish them
5. **Celebrate Wins** - Get motivational messages when you complete everything!

## ✨ Features

- ⏰ Time-based task scheduling
- 🔒 Visual app locking during work hours
- 📊 Real-time progress tracking
- 🎯 Active task notifications
- 🎉 Completion celebrations
- 😢 Emotional accountability (BIG sad reminders!)

## 📦 What You Need

- A GitHub account (free)
- A Vercel account (free)
- 10 minutes of your time

## 🛠️ Deployment Steps

### Step 1: Create a GitHub Account
1. Go to https://github.com
2. Sign up for free if you don't have an account

### Step 2: Create a New Repository
1. Click the "+" icon in top right → "New repository"
2. Name it: `focus-guardian`
3. Make it Public
4. Click "Create repository"

### Step 3: Upload Your Files
1. On your repository page, click "uploading an existing file"
2. Drag and drop these files:
   - `focus-guardian.jsx`
   - `package.json`
   - `index.html`
3. Click "Commit changes"

### Step 4: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Click "Add New" → "Project"
4. Import your `focus-guardian` repository
5. Configure:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

### Step 5: Wait 2 Minutes
Vercel will build and deploy your app. You'll get a live URL like:
```
https://focus-guardian-yourname.vercel.app
```

## 📱 How to Use

### Daily Routine:
1. Open the app every morning
2. Add your tasks for the day with time slots
3. Select which apps distract you
4. Click "Start Focus Mode"
5. Work on your tasks!
6. When you try to open blocked apps → BIG SAD REMINDER appears
7. Check off tasks as you complete them
8. Celebrate when everything is done! 🎉

### Tips:
- Be honest about which apps waste your time
- Set realistic time blocks for tasks
- The sad reminder only works if you keep the app open in a tab
- Check off tasks immediately when done for satisfaction boost

## 🔧 Technical Details

**Built With:**
- React (for the interface)
- Lucide Icons (for beautiful icons)
- Tailwind CSS (for styling)
- Vite (for building)

**How It Works:**
- Runs entirely in your browser
- No data sent to servers (your tasks stay private)
- Uses browser time to check if you're in a task block
- Shows warning screen when you should be working

**Limitations:**
- Can't actually LOCK apps (web apps can't do that)
- Relies on self-discipline when you see the warning
- Works best if you keep it open in a browser tab
- Won't block mobile apps (only works on web browser)

## 🎯 Next Phase: Browser Extension

To get REAL blocking power, we can build a Chrome/Firefox extension that:
- Actually blocks social media websites
- Forces you to see the sad reminder
- Automatically opens when you try to visit blocked sites

This requires a separate project but is totally doable!

## 💡 Making It Better

Future ideas:
- Save your routine for recurring daily tasks
- Weekly progress reports
- Streak counter (7 days focused = achievement!)
- Pomodoro timer integration
- Share progress with accountability partner
- Dark mode / light mode toggle
- Sound alerts when tasks are about to start

## 🐛 Troubleshooting

**App won't deploy?**
- Make sure all files are uploaded to GitHub
- Check that `package.json` has the right dependencies
- Verify Vercel is connected to the correct repository

**Warning screen doesn't show?**
- The app needs to be open in your browser
- Only works for web versions of social media (not apps)
- Make sure you're in an active task time block

**Tasks not saving?**
- This app doesn't save between sessions (refresh = reset)
- Future version can add browser storage

## 📄 License

Free to use, modify, and share! Built for productivity warriors everywhere.

---

**Remember**: This app is your accountability partner, not a jail warden. It works best when YOU want to succeed. The sad reminders are there to help you, not punish you. You've got this! 💪
