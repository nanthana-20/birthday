<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Which Sky Realm Are You?</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #1a1a2e;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .quiz-container {
            max-width: 600px;
            margin: auto;
            background: #16213e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }
        .question {
            margin-bottom: 15px;
            font-size: 18px;
        }
        .options label {
            display: block;
            background: #0f3460;
            padding: 10px;
            margin: 5px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
        }
        .options label:hover {
            background: #e94560;
        }
        button {
            background: #e94560;
            color: white;
            border: none;
            padding: 10px 15px;
            margin-top: 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
        }
        button:hover {
            background: #ff3860;
        }
        #result {
            margin-top: 20px;
            font-size: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="quiz-container">
        <h1>Which Sky Realm Are You?</h1>
        <div id="quiz"></div>
        <button onclick="submitQuiz()">Find Out!</button>
        <div id="result"></div>
    </div>

    <script>
        const quizData = [
            {
                question: "What element do you feel most connected to?",
                options: {
                    "Golden Wasteland": "Fire",
                    "Isle of Dawn": "Light",
                    "Valley of Triumph": "Wind",
                    "Forest of Prophecy": "Nature"
                }
            },
            {
                question: "Pick a favorite activity:",
                options: {
                    "Isle of Dawn": "Watching sunrises",
                    "Valley of Triumph": "Racing & sports",
                    "Golden Wasteland": "Exploring ruins",
                    "Forest of Prophecy": "Climbing trees"
                }
            },
            {
                question: "What describes your personality best?",
                options: {
                    "Forest of Prophecy": "Calm and wise",
                    "Golden Wasteland": "Adventurous and fearless",
                    "Valley of Triumph": "Energetic and competitive",
                    "Isle of Dawn": "Dreamy and peaceful"
                }
            }
        ];

        function loadQuiz() {
            const quizContainer = document.getElementById("quiz");
            quizData.forEach((q, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question");
                questionDiv.innerHTML = `<p>${q.question}</p>`;
                
                const optionsDiv = document.createElement("div");
                optionsDiv.classList.add("options");
                
                for (const realm in q.options) {
                    const label = document.createElement("label");
                    label.innerHTML = `<input type="radio" name="q${index}" value="${realm}"> ${q.options[realm]}`;
                    optionsDiv.appendChild(label);
                }

                questionDiv.appendChild(optionsDiv);
                quizContainer.appendChild(questionDiv);
            });
        }

        function submitQuiz() {
            let realmCounts = {};
            quizData.forEach((q, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                if (selected) {
                    const realm = selected.value;
                    realmCounts[realm] = (realmCounts[realm] || 0) + 1;
                }
            });

            const resultDiv = document.getElementById("result");
            if (Object.keys(realmCounts).length === 0) {
                resultDiv.innerHTML = "Please answer all questions!";
                return;
            }

            let maxRealm = Object.keys(realmCounts).reduce((a, b) => (realmCounts[a] > realmCounts[b] ? a : b));
            resultDiv.innerHTML = `You belong to <span style="color: #ffcc00;">${maxRealm}</span>!`;
        }

        loadQuiz();
    </script>

</body>
</html>