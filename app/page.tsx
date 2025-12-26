import { supabase } from '../lib/supabase'
import { addReview } from './actions'

export default async function Home() {
  // データベースから口コミ一覧を取得する
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">みんなの口コミサイト</h1>

      {/* 投稿フォームエリア */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="font-bold mb-4">口コミを投稿する</h2>
        <form action={addReview} className="flex flex-col gap-4">
          <textarea
            name="content"
            placeholder="ここに感想を書いてください"
            className="p-3 border rounded text-black"
            required
            rows={3}
          />
          <div className="flex items-center gap-2">
            <span>評価：</span>
            <select name="rating" className="p-2 border rounded text-black">
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
          >
            投稿する
          </button>
        </form>
      </div>

      {/* 口コミ一覧表示エリア */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl">新着の口コミ</h2>
        {reviews?.map((review) => (
          <div key={review.id} className="border p-4 rounded shadow-sm bg-white text-black">
            <div className="flex justify-between mb-2">
              <span className="text-yellow-500 font-bold">
                {'★'.repeat(review.rating)}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <p>{review.content}</p>
          </div>
        ))}
        
        {(!reviews || reviews.length === 0) && (
          <p className="text-gray-500 text-center">まだ口コミはありません。</p>
        )}
      </div>
    </main>
  )
}
