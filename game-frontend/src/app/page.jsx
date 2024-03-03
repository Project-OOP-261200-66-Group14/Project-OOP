import "animate.css";

export default function Home() {
  return (
    <>
      <main class="bg-Home">
        <div class="flex flex-col justify-center items-center max-h-screen">
          <h1 class="animate__heartBeat">UPBEAT</h1>
          <div class="flex flex-col">
            <a href="/game" class="hover:scale-110">
              <img
                src="/picture/home/1.png"
                alt="Start Game"
                id="start-image"
                class="animate__animated animate__flipInX w-44 mt-14"
              />
            </a>
            <a href="/howtoplay" class="hover:scale-110">
              <img
                src="/picture/home/2.png"
                alt="How to Play"
                id="howto-image"
                class="animate__animated animate__flipInX w-44 mt-8 animate__pulse hover:scale-110"
              />
            </a>
            <a href="/howtoplay" class="hover:scale-110">
              <img
                src="/picture/home/setting.png"
                alt="How to Play"
                id="howto-image"
                class="animate__animated animate__flipInX w-44 mt-8 animate__pulse hover:scale-110"
              />
            </a>
            <a href="/exit" class="hover:scale-110">
              <img
                src="../picture/home/3.png"
                alt="Exit Game"
                id="exit-image"
                class="animate__animated animate__flipInX w-44 mt-8 animate__pulse hover:scale-110"
              />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
