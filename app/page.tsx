	import { supabase } from '../lib/supabase'
import { addReview } from './actions'

export default async function Home() {
  // データベースから口コミを取得
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* ヘッダー（右上） */}
      <div className="flex justify-end p-4 gap-4 text-sm">
        <a href="#" className="hover:underline">Gmail?</a>
        <a href="#" className="hover:underline">画像?</a>
        <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 px-4">
        
        {/* Foogle ロゴ (Googleカラー) */}
        <h1 className="text-[5rem] font-bold mb-8 tracking-tighter select-none">
          <span className="text-[#4285F4]">F</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </h1>

        {/* 検索窓風の投稿フォーム */}
        <div className="w-full max-w-lg">
          <form action={addReview} className="w-full">
            <div className="relative group">
              {/* 検索アイコン（虫眼鏡） */}
              <div className="absolute top-4 left-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* テキスト入力エリア */}
              <input
                type="text"
                name="content"
                placeholder="口コミを検索、または投稿"
                className="w-full p-3 pl-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:shadow-md hover:shadow-md transition-shadow text-lg"
                required
                autoComplete="off"
              />

              {/* 音声入力アイコン風（右側） */}
              <div className="absolute top-3 right-4 flex gap-2">
                 {/* 星評価セレクト（マイクアイコンの代わりに配置） */}
                 <select name="rating" className="bg-transparent text-sm text-gray-600 focus:outline-none cursor-pointer">
                  <option value="5">★5</option>
                  <option value="4">★4</option>
                  <option value="3">★3</option>
                  <option value="2">★2</option>
                  <option value="1">★1</option>
                </select>
              </div>
            </div>

            {/* ボタンエリア */}
            <div className="flex justify-center gap-4 mt-6">
              <button type="submit" className="bg-[#f8f9fa] border border-transparent hover:border-gray-200 hover:shadow text-sm text-gray-800 py-2 px-4 rounded transition-all">
                Foogle 検索（投稿）
              </button>
              <button type="button" className="bg-[#f8f9fa] border border-transparent hover:border-gray-200 hover:shadow text-sm text-gray-800 py-2 px-4 rounded transition-all">
                I'm Feeling Lucky
              </button>
            </div>
          </form>
        </div>

        {/* 検索結果（口コミ一覧） */}
        <div className="w-full max-w-2xl mt-12 mb-20">
          <p className="text-gray-500 text-sm mb-4">約 {reviews?.length || 0} 件の結果</p>
          
          <div className="space-y-6">
            {reviews?.map((review) => (
              <div key={review.id} className="group">
                <div className="text-sm text-gray-800 mb-1 flex items-center gap-1">
                  <span className="bg-gray-200 text-xs px-1 rounded">広告</span>
                  <span className="font-bold">kuchikomi.com › review › {review.id}</span>
                  <span className="text-gray-400">▼</span>
                </div>
                <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium truncate">
                  {review.content.substring(0, 30)}... の評判・口コミ
                </h3>
                <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                  <span className="text-yellow-600 font-bold text-xs mr-2">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                  <span className="text-gray-500 text-xs mr-2">
                    {new Date(review.created_at).toLocaleDateString()} — 
                  </span>
                  {review.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* フッター */}
      <footer className="bg-[#f2f2f2] border-t border-gray-200 mt-auto">
        <div className="px-6 py-3 text-gray-500 text-sm border-b border-gray-200">
          日本
        </div>
        <div className="px-6 py-3 flex flex-wrap justify-center sm:justify-between gap-4 text-sm text-gray-500">
          <div className="flex gap-6">
            <a href="#" className="hover:underline">広告</a>
            <a href="#" className="hover:underline">ビジネス</a>
            <a href="#" className="hover:underline">Foogleについて</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">プライバシー</a>
            <a href="#" className="hover:underline">規約</a>
            <a href="#" className="hover:underline">設定</a>
          </div>
        </div>
      </footer>

    </main>
  )
}

