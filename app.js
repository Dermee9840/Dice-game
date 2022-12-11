//Тоглоомын бүх газарт ашиглагдах глобаль хувьсагдыг энд зарлаж байна.
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

// Аль тоглогчын ээлж вэ гэдгийг хадгална...
var activePlayer;

// Хоёр тоглогчын цуглуулсан оноонууд
var scores;

// Идэвхтэй тоглогчын цуглуулж байгаа ээлжийн оноо...
var roundScore;
// Шоо аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
var diceNumber = Math.floor(Math.random() * 6) + 1;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод diceDom-д хадгалж байна.
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ.
initGame();

// Тоглоом шинээр эхлэхэд бэлтгэх функц
function initGame() {
  // Тоглоом эхэллээ гэдэг төлөвт оруулна.
  isNewGame = true;

  activePlayer = 0;

  scores = [0, 0];

  roundScore = 0;

  // Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame) {
    // Шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";

    // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1-ээс ялгаатай бол идэвхтэй тоглогчын ээлжийн оноог өөрчилнөө
    if (diceNumber !== 1) {
      // 1-ээс өөр тоо буулаа
      roundScore += diceNumber;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      // 1 буусан тул тоглогчын ээлжийг энэ хэсэгт сольж өгнө.
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү!!!");
  }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    // Уг тоглогчын цуглуулсан ээлжний оноог глобаль оноо дээр нэмж өгнө.
    scores[activePlayer] += roundScore;

    // Дэлгэц дээр оноог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг (оноо : 100-с их эсэх) шалгах
    if (scores[activePlayer] >= 10) {
      // Тоглоомыг дууссан төлөвт оруулна
      isNewGame = false;
      // WINNER гэсэн текстийг нэрнийх нь оронд гаргана
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // Тоглогчын ээлжийг солино.
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү!!!");
  }
});

function switchToNextPlayer() {
  // Энэ тоглогчын ээлжиндээ цуглуулсан оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  //Тоглогчын ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Идэвхтэй тоглогчын хажууд байх Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгоно.
  diceDom.style.display = "none";
}

// New Game буюу Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
