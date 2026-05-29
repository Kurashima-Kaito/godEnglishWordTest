// ★ 画像（img1〜10）に対応する正解の単語
const words = [
  "apple", "banana", "cat", "dog", "elephant",
  "fish", "grape", "house", "ice", "juice"
];

const imgCount = 10;
let currentIdx = 0;

// HTML要素の取得
const gameImage = document.getElementById('game-image');
const messageText = document.getElementById('message');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');

// ランダムに問題を選ぶ
function pickRandomQuestion() {
  currentIdx = Math.floor(Math.random() * imgCount);
  
  // 画像のパスを設定 (Images/img1.png 形式)
  gameImage.src = `Images/img${currentIdx + 1}.png`;
  
  messageText.textContent = "この画像を表す単語は何？";
  messageText.style.color = "#333";
  
  // UIの初期化
  userInput.value = '';
  userInput.classList.remove('hidden');
  submitBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  userInput.focus();
}

// 答え合わせ
function checkAnswer() {
  const answer = userInput.value.trim().toLowerCase();
  const correctAnswer = words[currentIdx].toLowerCase();
  
  if (answer === "") return; // 空欄なら何もしない

  // 入力欄と回答ボタンを隠す
  userInput.classList.add('hidden');
  submitBtn.classList.add('hidden');

  if (answer === correctAnswer) {
    messageText.textContent = "🎉 正解！ 次の問題にいきます...";
    messageText.style.color = "green";
    // 1.5秒後に自動で次の問題へ
    setTimeout(pickRandomQuestion, 1500);
  } else {
    messageText.textContent = `❌ 残念！ 正解は「 ${words[currentIdx]} 」でした。`;
    messageText.style.color = "red";
    // 「次へ」ボタンを表示
    nextBtn.classList.remove('hidden');
  }
}

// イベントリスナーの登録
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', pickRandomQuestion);

// エンターキーでも回答できるようにする
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

// ゲーム開始
window.onload = pickRandomQuestion;