
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(Promise.resolve(cookieStore))

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo:any) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
