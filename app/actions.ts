'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 新規投稿機能
export async function addReview(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const aircraft = formData.get('aircraft') as string
  const content = formData.get('content') as string
  const rating = formData.get('rating') as string

  const { error } = await supabase
    .from('reviews')
    .insert({
      name,
      aircraft,
      content,
      rating: parseInt(rating),
    })

  if (error) {
    console.error('保存エラー:', error)
    return
  }

  revalidatePath('/')
  redirect('/') // 投稿後トップページへ
}

// ★これが足りていなかった部分です（更新機能）
export async function updateReview(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const aircraft = formData.get('aircraft') as string
  const content = formData.get('content') as string
  const rating = formData.get('rating') as string

  const { error } = await supabase
    .from('reviews')
    .update({
      name,
      aircraft,
      content,
      rating: parseInt(rating),
    })
    .eq('id', id)

  if (error) {
    console.error('更新エラー:', error)
    return
  }

  revalidatePath('/')
  redirect('/')
}

