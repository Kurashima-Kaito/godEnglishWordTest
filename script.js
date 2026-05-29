// 画像に対応する正解の単語
const words = [
  "kitten", "foal", "bull", "dairy cattle", "calf",
  "fawn", "moose", "lamb", "kid", "swine",
  "boar", "sow", "squirrel", "guinea pig", "porcupine",
  "vixen", "weasel", "badger", "otter", "wild boar",
  "gibbon", "baboon", "hamadryas baboon", "panther", "dromedary",
  "bactrian camel", "mule", "sea otter", "raccoon", "tapir",
  "sea lion", "walrus", "steller sea lion", "seal", "fur seal",
  "serpent", "toad", "salamander", "tomcat", "tabby",
  "billy", "nanny", "gander", "gosling", "ram",
  "ewe"
];
// 日本語訳
const wordsJP = [
  "子猫", "子馬", "雄牛", "乳用牛", "仔牛",
  "子鹿", "アメリカヘラジカ", "子羊", "子ヤギ", "豚",
  "雄豚", "雌豚", "リス", "モルモット", "ハリネズミ",
  "雌狐", "イタチ", "アナグマ", "カワウソ", "イノシシ",
  "テナガザル", "ヒヒ", "マントヒヒ", "ヒョウ", "ひとこぶラクダ",
  "ふたこぶラクダ", "ラバ", "ラッコ", "アライグマ", "バク",
  "アシカ", "セイウチ", "トド", "アザラシ", "オットセイ",
  "ヘビ", "ヒキガエル", "サンショウウオ", "オス猫", "メス猫",
  "オスヤギ", "メスヤギ", "オスガチョウ", "子ガチョウ", "オス羊",
  "メス羊"
];

const imgCount = 46;
let currentIdx = 0;

// 試したい拡張子のリスト（上から順番に探します）
const extensions = ['png', 'jpg', 'jpeg', 'webp', 'avif'];

// HTML要素の取得
const gameImage = document.getElementById('game-image');
const messageText = document.getElementById('message');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');

// ランダムに問題を選ぶ
function pickRandomQuestion() {
  currentIdx = Math.floor(Math.random() * imgCount);
  
  messageText.textContent = "この画像を表す単語は何？";
  messageText.style.color = "#333";
  
  // UIの初期化
  userInput.value = '';
  userInput.classList.remove('hidden');
  submitBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  userInput.focus();

  // 拡張子が分からなくても自動で探して画像をセットする関数を呼び出す
  // 例: img1 の画像を extensions のリスト順に探す
  tryLoadImage(currentIdx + 1, 0);
}

// 拡張子を順番に試して画像を読み込む関数（再帰処理）
function tryLoadImage(imgNumber, extIndex) {
  // すべての拡張子を試しても見つからなかった場合
  if (extIndex >= extensions.length) {
    console.error(`画像 img${imgNumber} が見つかりませんでした。`);
    gameImage.src = ""; // 画像を空にする
    messageText.textContent = `⚠️ img${imgNumber} の画像ファイルが見つかりません`;
    return;
  }

  const ext = extensions[extIndex];
  const testSrc = `Images/img${imgNumber}.${ext}`;

  // ダミーの画像オブジェクトを作って、実際に読み込めるかテストする
  const imgTester = new Image();
  
  // 読み込めたら、本物の画面（gameImage）にそのパスをセット
  imgTester.onload = function() {
    gameImage.src = testSrc;
  };

  // エラーになったら（拡張子が違ったら）、次の拡張子で再挑戦
  imgTester.onerror = function() {
    tryLoadImage(imgNumber, extIndex + 1);
  };

  // テスト開始
  imgTester.src = testSrc;
}

// 答え合わせ
function checkAnswer() {
  const answer = userInput.value.trim().toLowerCase();
  const correctAnswer = words[currentIdx].toLowerCase();
  
  if (answer === "") return;

  userInput.classList.add('hidden');
  submitBtn.classList.add('hidden');

  if (answer === correctAnswer) {
    messageText.textContent = `🎉 正解！ ${wordsJP[currentIdx]}でした`;
    messageText.style.color = "green";
    setTimeout(pickRandomQuestion, 1000);
  } else {
    messageText.textContent = `❌ 残念！ 正解は "${words[currentIdx]}"「${wordsJP[currentIdx]}」でした。`;
    messageText.style.color = "red";
    nextBtn.classList.remove('hidden');
  }
}

// イベントリスナーの登録
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', pickRandomQuestion);

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

// ゲーム開始
window.onload = pickRandomQuestion;