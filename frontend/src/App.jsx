import { useState, useEffect } from 'react'
import './App.css'
import questionBank from './QuestionBank.js'
import AIChat from "./AIChat.jsx";
function App() {
  const [role, setRole] = useState('Student')
  const [loggedIn, setLoggedIn] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
const [answers, setAnswers] = useState({})
const [timeLeft, setTimeLeft] = useState(120)
const [examSubmitted, setExamSubmitted] = useState(false)
const [currentQuestion, setCurrentQuestion] = useState(0)
const [showQuestionBank, setShowQuestionBank] = useState(false)
const [currentDifficulty, setCurrentDifficulty] = useState("Easy");
const [apiQuestions, setApiQuestions] = useState([]);
const [showCreateExam, setShowCreateExam] =  useState(false);
 useEffect(() => {
if (!examStarted || examSubmitted) return;

if (timeLeft <= 0) {
const finalScore = questions.reduce((total, question, index) => {
  return total + (answers[index] === question.answer ? 1 : 0);
}, 0);

const finalPercentage = Math.round(
  (finalScore / questions.length) * 100
);

const previousResults = JSON.parse(
  localStorage.getItem("examResults") || "[]"
);

previousResults.push({
  score: finalScore,
  total: questions.length,
  percentage: finalPercentage
});

localStorage.setItem("examResults", JSON.stringify(previousResults));

setExamSubmitted(true);
setExamStarted(false);
alert("Time is up! Your exam has been submitted.");
return;
}
const timer = setTimeout(() => {
setTimeLeft((previousTime) => previousTime - 1);
}, 1000);
return () => clearTimeout(timer);
const finalScore = questions.reduce((total, question, index) => {
  return total + (answers[index] === question.answer ? 1 : 0);
}, 0);
previousResults.push({
  score: finalScore,
  total: questions.length,
  percentage: finalPercentage
});

localStorage.setItem(
  "examResults",
  JSON.stringify(previousResults)
);

setExamSubmitted(true);
setExamStarted(false);
return;
return () => clearTimeout(timer);
}, [examStarted, examSubmitted, timeLeft]);
useEffect(() => {
  fetch("http://localhost:5000/api/questions")
    .then((response) => response.json())
    .then((data) => setApiQuestions(data))
    .catch((error) => console.error("Error fetching questions:", error));
}, []);
const questionSource =
  apiQuestions.filter((item) => item.subject === "JavaScript").length >= 5
    ? apiQuestions
    : questionBank;

const questions = questionSource
  .filter((item) => item.subject === "JavaScript")
  .slice(0, 5)
  .map((item) => ({
    question: item.question,
    options: item.options,
    answer: item.options.indexOf(item.answer),
    difficulty: item.difficulty,
  }));

const score = questions.reduce((total, question, index) => {
  return total + (answers[index] === question.answer ? 1 : 0);
}, 0);
const percentage = Math.round((score / questions.length) * 100)
const incorrectAnswers = questions.length - score
if (examSubmitted) {
  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1>Exam Results</h1>
      <h2>JavaScript Exam Completed!</h2>
      <h3>Score: {score} / {questions.length}</h3>
      <h3>Percentage: {percentage}%</h3>
      <p>Correct Answers: {score}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      <button onClick={() => {
        setExamSubmitted(false);
        setCurrentQuestion(0);
        setAnswers({});
      }}>
        Back to Dashboard
      </button>
    </div>
  );
}
if (examStarted) {
  return (
   <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>ExamEase — JavaScript Exam</h1>
      <p>Question {currentQuestion + 1} of {questions.length}</p>
      <p  style={{ color: timeLeft <= 30 ? 'red' : 'inherit', fontWeight: 'bold' }}>
  Time remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>

      <h2>{questions[currentQuestion].question}</h2>
<p> Difficulty: {questions[currentQuestion].difficulty }</p>
      {questions[currentQuestion].options.map((option, index) => (
        <div key={option} style={{ margin: '15px 0' }}>
          <label>
            <input
            type="radio"
  name={'answer-${currentQuestion}'}
  value={index}
  checked={answers[currentQuestion] === index}
  onChange={() =>
    setAnswers({
      ...answers,
      [currentQuestion]: index,
    })
  }
            />{' '}
            {option}
          </label>
        </div>
      ))}

      <button onClick= {() => {
    console.log("Current question:", currentQuestion);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
     const finalScore = questions.reduce((total, question, index) => {
        return total + (answers[index] === question.answer ? 1 : 0);
    }, 0);

    const finalPercentage = Math.round(
        (finalScore / questions.length) * 100
    );

    const previousResults = JSON.parse(
        localStorage.getItem("examResults") || "[]"
    );

    previousResults.push({
        score: finalScore,
        total: questions.length,
        percentage: finalPercentage
    });

    localStorage.setItem(
        "examResults",
        JSON.stringify(previousResults)
    );

    setExamSubmitted(true);
    setExamStarted(false); 
    }
  }}
>
  {currentQuestion === questions.length - 1
    ? "Submit Exam"
    : "Next Question"}
      </button>

      <br /><br />

      <button onClick={() => setExamStarted(false)}>
        Exit Exam
      </button>
    </div>
  )
}
if (loggedIn) {
 if (role === 'Examiner') {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Exam<span>Ease</span></h2>
        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </nav>

      <main style={{ padding: '40px 8%' }}>
        <h1>Examiner Dashboard</h1>
        <p>Create and manage examinations.</p>
<button onClick={() => setShowCreateExam(true)}> Create Exam </button>
        <h2>Question Bank</h2>
        {questionBank.map((item) => (
          <div key={item.id} style={{
            background: 'white',
            padding: '15px',
            margin: '12px 0',
            borderRadius: '10px'
          }}>
            <h3>{item.subject} — {item.topic}</h3>
            <p>{item.question}</p>
            <p>Difficulty: {item.difficulty}</p>
          </div>
        ))}
      {showCreateExam && (
  <div style={{ background: "white", padding: "20px", margin: "20px 0" }}>
    <h2>Create New Exam</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      alert("Exam created successfully!");
      setShowCreateExam(false);
    }}>
      <input
        type="text"
        placeholder="Enter exam title"
        required
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button type="submit">Create Exam</button>
      <button type="button" onClick={() => setShowCreateExam(false)}>
        Cancel
      </button>
    </form>
  </div>
)}
      </main>
    </div>
  );
}
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Exam<span>Ease</span></h2>
        <button onClick={() => setLoggedIn(false)}>
          Logout
        </button>
      </nav>

      <main style={{ padding: '40px 8%' }}>
        <p>STUDENT DASHBOARD</p>
        <h1>Welcome to ExamEase! 👋</h1>
        <p>Manage your exams and track your progress.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px' }}>
            <h3>Available Exams</h3>
            <h1>3</h1>
            <p>Exams ready to attempt</p>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '15px' }}>
            <h3>Completed Exams</h3>
            <h1>{JSON.parse(localStorage.getItem("examResults") || "[]").length}</h1>
            <p>Your completed tests</p>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '15px' }}>
            <h3>Average Score</h3>
            <h1> {(() => {
    const results = JSON.parse(
      localStorage.getItem("examResults") || "[]"
    );
    if (results.length === 0) return "--";
    const average = results.reduce(
      (total, result) => total + result.percentage, 0
    ) / results.length;
    return Math.round(average) + "%";
  })()}</h1>
            <p>Your performance</p>
          </div>
        </div>
<div style={{
  marginTop: '30px',
  background: 'white',
  padding: '25px',
  borderRadius: '15px'
}}>
  <h2>Question Bank</h2>
  <p>Browse questions by subject, topic and difficulty.</p>

  {questionBank.map((item) => (
    <div
      key={item.id}
      style={{
        padding: '15px',
        marginTop: '12px',
        border: '1px solid #ddd',
        borderRadius: '10px'
      }}
    >
      <h3>{item.subject} — {item.topic}</h3>
      <p><strong>Difficulty:</strong> {item.difficulty}</p>
      <p>{item.question}</p>
      <ul>
        {item.options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </div>
  ))}
</div>
        <h2 style={{ marginTop: '40px' }}>Available Examinations</h2>
<AIChat/>
        <div style={{ background: 'white', padding: '25px', borderRadius: '15px', marginTop: '20px' }}>
          <h3>JavaScript Fundamentals</h3>
          <p>5 questions · 2 minutes</p>
          <button className="login-button" onClick={() => setExamStarted(true)}>
            Start Exam
          </button>
        </div>
      <h2 style={{ marginTop: '40px' }}>Exam History</h2>

<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  }}
>
  {JSON.parse(localStorage.getItem('examResults') || '[]').length === 0 ? (
    <p>No exams completed yet.</p>
  ) : (
    JSON.parse(localStorage.getItem('examResults') || '[]').map((result, index) => (
      <div
        key={index}
        style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <h3>{result.examName || 'JavaScript Exam'}</h3>
        <p>Score: {result.score} / {result.totalQuestions || 5}</p>
        <p>Percentage: {result.percentage}%</p>
        <p>Correct Answers: {result.score}</p>
        <p>Incorrect Answers: {(result.totalQuestions || 5) - result.score}</p>
      </div>
    ))
  )}
</div>
      </main>
    </div>
  )
}
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Exam<span>Ease</span></h2>
        <span className="nav-label">Online Examination Portal</span>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR EXAMS, SIMPLIFIED</p>
          <h1>Learn more.<br />
            <span>Achieve more.</span>
          </h1>
          <p className="description">
            A smarter way to conduct exams, track performance,
            and achieve your academic goals.
          </p>

          <div className="features">
            <div>✓ Secure online examinations</div>
            <div>✓ Timed tests and instant results</div>
            <div>✓ Simple performance tracking</div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-icon">✦</div>
          <h2>Welcome back!</h2>
          <p className="login-subtitle">
            Sign in to continue to your dashboard.
          </p>

          <label>Select your role</label>
          <div className="role-options">
            <button
              className={role === 'Student' ? 'active' : ''}
              onClick={() => setRole('Student')}
            >
              🎓 Student
            </button>
            <button
              className={role === 'Examiner' ? 'active' : ''}
              onClick={() => setRole('Examiner')}
            >
              📝 Examiner
            </button>
          </div>

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
          />

          <button
            className="login-button"
            onClick={() => setLoggedIn(true)}
          >
            Sign In as {role}
          </button>

          <p className="register">
            New to ExamEase? <a href="#register">Contact your examiner</a>
          </p>
        </div>
      </main>

      <footer>
        © 2026 ExamEase · Online Examination Portal
      </footer>
    </div>
  )
}

export default App