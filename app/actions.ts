'use server'

import { supabase } from '../lib/supabase' // 相対パスのまま
import { revalidatePath } from 'next/cache'

export async function addReview(formData: FormData) {
  const content = formData.get('content') as string
  const rating = formData.get('rating') as string

  console.log('投稿しようとしています:', content, rating) // ★追加

  const { error } = await supabase
    .from('reviews')
    .insert({ content, rating: parseInt(rating) })

  if (error) {
    console.error('エラーが発生しました:', error) // ★追加
    return
  }

  console.log('投稿成功！') // ★追加
  revalidatePath('/')
}

