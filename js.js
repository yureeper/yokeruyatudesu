const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const gameover = document.getElementById("gameover");

let dinoY = 20;
let velocity = 0;
let gravity = 0.6;
let isJumping = false;

let cactusX = 500;
let score = 0;
let isGameOver = false;

// 初期位置
dino.style.bottom = dinoY + "px";

function jump() {
  if (isJumping || isGameOver) return;
  velocity = 11;
  isJumping = true;
}

function reset() {
  dinoY = 20;
  velocity = 0;
  cactusX = 500;
  score = 0;
  isGameOver = false;
  scoreText.textContent = score;
  gameover.style.display = "none";
}

// 操作
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    isGameOver ? reset() : jump();
  }
});

document.addEventListener("touchstart", () => {
  isGameOver ? reset() : jump();
});

function gameLoop() {
  if (!isGameOver) {
    // ジャンプ処理
    if (isJumping) {
      dinoY += velocity;
      velocity -= gravity;

      if (dinoY <= 20) {
        dinoY = 20;
        isJumping = false;
      }
      dino.style.bottom = dinoY + "px";
    }

    // サボテン移動
    cactusX -= 5;
    if (cactusX < -30) {
      cactusX = 500;
      score++;
      scoreText.textContent = score;
    }
    cactus.style.left = cactusX + "px";

    // 当たり判定
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
      dinoRect.left < cactusRect.right &&
      dinoRect.right > cactusRect.left &&
      dinoRect.bottom > cactusRect.top
    ) {
      isGameOver = true;
      gameover.style.display = "flex";
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
