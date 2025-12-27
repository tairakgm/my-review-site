import { createClient } from '@/utils/supabase/server'
import { addReview } from '@/app/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import StarRating from '@/components/StarRating' // ★追加

export default async function PostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8 flex items-center">
        <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 px-4 py-2 hover:bg-blue-50 rounded cursor-pointer z-50">
          ← トップへ戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-700">新規レポート作成</h1>

      <form action={addReview} className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                  <label className="text-sm text-gray-600 font-bold mb-1 block">名前</label>
                  <input type="text" name="name" placeholder="氏名を入力" className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50" required />
              </div>
              <div className="flex-1">
                  <label className="text-sm text-gray-600 font-bold mb-1 block">乗務機種</label>
                  <select name="aircraft" className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50">
                      <option value="B737">B737</option>
                      <option value="B767">B767</option>
                      <option value="B787">B787</option>
                      <option value="B777">B777</option>
                      <option value="A350">A350</option>
                  </select>
              </div>
          </div>
          <div>
              <label className="text-sm text-gray-600 font-bold mb-1 block">一般（コメント）</label>
              <textarea name="content" placeholder="業務の感想など" className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 min-h-[150px]" required />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-600 mb-1">評価:</span>
                  {/* ★ここが変更点: 星コンポーネント */}
                  <StarRating /> 
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow">投稿する</button>
          </div>
        </div>
      </form>
    </div>
  )
}

