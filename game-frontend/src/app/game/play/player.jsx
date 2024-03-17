export default function Player({ name }) {
  return (
    <>
      <div class="mr-10">
        <h1 class="text-2xl">Player:{name.toUpperCase()}</h1>
        <div class="flex items-center">
          <img src="/picture/start/10.png" class="w-[80px]" />
          <div class="bg-white p-3 rounded-full w-[200px]">
            <h2 class="text-center">0</h2>
          </div>
        </div>
      </div>
    </>
  );
}