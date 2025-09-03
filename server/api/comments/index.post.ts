export default defineEventHandler(async (event: any) => {
  try {
    const body = await readBody(event)
    
    // 验证必填字段
    if (!body.user?.name || !body.user?.role || !body.user?.location) {
      throw createError({
        statusCode: 400,
        statusMessage: '用户信息不完整'
      })
    }

    if (!body.content || body.content.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '评论内容不能为空'
      })
    }

    if (!body.rating || body.rating < 1 || body.rating > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: '评分必须在1-5之间'
      })
    }

    // 创建新评论
    const newComment = {
      id: Date.now(), // 在实际应用中应该使用数据库生成的ID
      user: {
        name: body.user.name.trim(),
        role: body.user.role.trim(),
        location: body.user.location.trim()
      },
      rating: parseInt(body.rating),
      content: body.content.trim(),
      tags: Array.isArray(body.tags) ? body.tags.filter((tag: any) => tag && tag.trim()) : [],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: false // 新评论需要审核
    }

    // 在实际应用中，这里应该将评论保存到数据库
    console.log('新评论:', newComment)

    return {
      success: true,
      data: newComment,
      message: '评论提交成功，等待审核'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '提交评论失败'
    })
  }
})
