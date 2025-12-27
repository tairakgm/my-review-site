import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* ロゴ */}
      <h1 className="text-[3rem] font-bold mb-8 tracking-tighter select-none">
        <span className="text-[#4285F4]">F</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </h1>

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-medium text-center mb-2">ログイン</h2>
        <p className="text-center text-gray-500 mb-8">Foogle Crew Portalへようこそ</p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-1">メールアドレス</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="crew@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-1">パスワード</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="6文字以上で入力"
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {/* formactionを使うと、1つのフォームで複数のボタンを使い分けられます */}
            <button 
              formAction={login} 
              className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors"
            >
              ログイン
            </button>
            <button 
              formAction={signup} 
              className="w-full bg-white text-blue-600 font-bold py-2 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

