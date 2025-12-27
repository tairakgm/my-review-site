import { createClient } from '@/utils/supabase/server'
import { signout } from './login/actions'
import Link from 'next/link'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const params = await searchParams
  const query = params.q || ''

  // 検索ワード(query)がある時だけデータベースから検索する
  let reviews = null
  
  if (query) {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .or(`aircraft.ilike.%${query}%,content.ilike.%${query}%,name.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    reviews = data
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* ヘッダー */}
      <div className="flex justify-end p-4 gap-4 text-sm items-center">
        <a href="#" className="hover:underline text-gray-600">Gmail</a>
        <a href="#" className="hover:underline text-gray-600">画像</a>
        {user ? (
          <>
            <form action={signout}>
              <button className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded">ログアウト</button>
            </form>
            <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold shadow-sm cursor-default" title={user.email}>
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md font-bold hover:bg-blue-700">
            ログイン
          </Link>
        )}
      </div>

      <div className="flex flex-col items-center mt-16 px-4">
        
        {/* Foogle ロゴ */}
        <h1 className="text-[5.5rem] font-bold mb-8 tracking-tighter select-none cursor-default">
          <span className="text-[#4285F4]">F</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </h1>

        {/* 検索バー */}
        <form action="/" method="get" className="w-full max-w-xl relative group mb-8">
          <div className="absolute top-3.5 left-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Foogle で検索、または URL を入力"
            className="w-full p-3 pl-12 pr-12 rounded-full border border-gray-200 shadow-sm hover:shadow-md focus:outline-none focus:shadow-md transition-shadow text-base"
            autoComplete="off"
          />
        </form>

        {/* ショートカットリンク集 */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-lg mb-12">
          
          {/* 1. 新規レポート */}
          <Link href="/post" className="flex flex-col items-center gap-3 group p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-[#f1f3f4] rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm text-gray-800">新規レポート</span>
          </Link>
          
          {/* 2. Foogle Map */}
          <div className="flex flex-col items-center gap-3 group p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
             <div className="w-12 h-12 bg-[#f1f3f4] rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </div>
             <span className="text-sm text-gray-800">Foogle Map</span>
          </div>

          {/* 3. Logbook */}
          <div className="flex flex-col items-center gap-3 group p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
             <div className="w-12 h-12 bg-[#f1f3f4] rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
             </div>
             <span className="text-sm text-gray-800">Logbook</span>
          </div>

          {/* 4. 設定 */}
          <div className="flex flex-col items-center gap-3 group p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
             <div className="w-12 h-12 bg-[#f1f3f4] rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
             </div>
             <span className="text-sm text-gray-800">設定</span>
          </div>

        </div>

        {/* 検索結果 (検索された時だけ表示) */}
        {reviews && (
          <div className="w-full max-w-2xl mt-4 mb-20 space-y-6 animate-in fade-in duration-500">
            <p className="text-sm text-gray-500 mb-4 px-2">「{query}」の検索結果: {reviews.length} 件</p>
            
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                
                {/* 編集ボタン（右上に配置） */}
                {user && (
                   <Link href={`/edit/${review.id}`} className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors z-10">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                     </svg>
                   </Link>
                )}

                <div className="flex justify-between items-start mb-3 pr-10">
                  <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md">
                          ✈ {review.aircraft || '未設定'}
                      </span>
                      <span className="font-bold text-gray-800">{review.name || '匿名'}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="font-bold text-gray-700">{review.rating}</span>
                  </div>
                </div>
                <div className="text-gray-700 leading-relaxed text-sm">
                  {review.content}
                </div>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                一致するレポートは見つかりませんでした。
              </div>
            )}
          </div>
        )}
        
      </div>
    </main>
  )
}

