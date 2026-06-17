import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/app/components/admin/AdminSidebar'

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-ink text-paper">
      <AdminSidebar email={user.email} />
      <main className="flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  )
}
