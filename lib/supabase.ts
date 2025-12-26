import { createClient } from '@supabase/supabase-js'

// .env.localに書いた鍵を使って、Supabaseと通信する準備をする
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

