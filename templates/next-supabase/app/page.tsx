export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">My App</h1>
        <p className="mb-8 text-lg text-gray-600">
          나만의 웹 서비스를 시작하세요.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            시작하기
          </a>
        </div>
      </div>
    </main>
  );
}
