const questionBank = [
  {
    id: 1,
    subject: "JavaScript",
    topic: "Variables",
    difficulty: "Easy",
    question: "Which keyword declares a variable that can be reassigned?",
    options: ["const", "let", "static", "final"],
    answer: "let",
    marks: 1
  },
  {
    id: 2,
    subject: "JavaScript",
    topic: "Data Types",
    difficulty: "Easy",
    question: "Which of these is a primitive data type?",
    options: ["Array", "Object", "Boolean", "Function"],
    answer: "Boolean",
    marks: 1
  },
  {
    id: 3,
    subject: "JavaScript",
    topic: "Functions",
    difficulty: "Medium",
    question: "What does a function return if it has no return statement?",
    options: ["null", "0", "undefined", "false"],
    answer: "undefined",
    marks: 1
  },
  {
    id: 4,
    subject: "JavaScript",
    topic: "Arrays",
    difficulty: "Medium",
    question: "Which method creates a new array by transforming each element?",
    options: ["map()", "push()", "pop()", "findIndex()"],
    answer: "map()",
    marks: 1
  },
  {
    id: 5,
    subject: "JavaScript",
    topic: "Closures",
    difficulty: "Hard",
    question: "What allows a function to access variables from its outer scope?",
    options: ["Hoisting", "Closure", "Type coercion", "JSON parsing"],
    answer: "Closure",
    marks: 1
  },
  {
    id: 6,
    subject: "JavaScript",
    topic: "Promises",
    difficulty: "Hard",
    question: "Which Promise method runs whether it fulfills or rejects?",
    options: ["then()", "catch()", "finally()", "resolve()"],
    answer: "finally()",
    marks: 1
  }
];

export default questionBank;