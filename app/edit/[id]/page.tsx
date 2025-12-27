import { createClient } from '@/utils/supabase/server'
import { updateReview } from '@/app/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import StarRating from '@/components/StarRating'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  // ログインチェック
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 編集するデータを取得
  const { data: review } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single()

  if (!review) return <div>データが見つかりません</div>

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8 flex items-center">
        <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1">← キャンセル</Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-700">レポートの編集</h1>

      {/* updateReviewを呼ぶ */}
      <form action={updateReview} className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        
        {/* IDをこっそり渡す（重要） */}
        <input type="hidden" name="id" value={review.id} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                  <label className="text-sm text-gray-600 font-bold mb-1 block">名前</label>
                  <input type="text" name="name" defaultValue={review.name} className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50" required />
              </div>
              <div className="flex-1">
                  <label className="text-sm text-gray-600 font-bold mb-1 block">乗務機種</label>
                  <select name="aircraft" defaultValue={review.aircraft} className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50">
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
              <textarea name="content" defaultValue={review.content} className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 min-h-[150px]" required />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-600 mb-1">評価:</span>
                  <StarRating defaultRating={review.rating} />
              </div>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow">更新する</button>
          </div>
        </div>
      </form>
    </div>
  )
}

