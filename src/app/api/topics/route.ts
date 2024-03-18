export async function POST(request: Request) {
  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  return Response.json({ title, description })
}