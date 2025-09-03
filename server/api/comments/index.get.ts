export default defineEventHandler(async (event: any) => {
  try {
    // 模拟从数据库获取评论数据
    const comments = [
      {
        id: 1,
        user: {
          name: "张小明",
          role: "内容创作者",
          location: "北京"
        },
        rating: 5,
        content: "VibeVoice的语音质量真的超出我的预期！多语言支持让我可以轻松制作国际化的内容，AI生成的语音听起来非常自然，几乎分辨不出是机器生成的。",
        tags: ["语音质量", "多语言", "自然度"],
        createdAt: "2024-01-15",
        isVerified: true
      },
      {
        id: 2,
        user: {
          name: "李雅婷",
          role: "播客主播",
          location: "上海"
        },
        rating: 5,
        content: "作为播客主播，我需要高质量的语音合成工具。VibeVoice不仅音质出色，还能处理长文本，大大提高了我的制作效率。强烈推荐！",
        tags: ["播客", "长文本", "效率"],
        createdAt: "2024-01-12",
        isVerified: true
      },
      {
        id: 3,
        user: {
          name: "王建国",
          role: "教育工作者",
          location: "深圳"
        },
        rating: 4,
        content: "我用VibeVoice制作在线课程，学生反馈很好。语音清晰，语速适中，特别适合教学场景。希望能增加更多教育相关的语音风格。",
        tags: ["教育", "在线课程", "教学"],
        createdAt: "2024-01-10",
        isVerified: true
      },
      {
        id: 4,
        user: {
          name: "陈美玲",
          role: "广告制作人",
          location: "广州"
        },
        rating: 5,
        content: "在广告制作中，时间就是金钱。VibeVoice帮我快速生成各种风格的广告配音，质量专业，客户非常满意。这工具简直是神器！",
        tags: ["广告", "配音", "专业"],
        createdAt: "2024-01-08",
        isVerified: true
      },
      {
        id: 5,
        user: {
          name: "刘志强",
          role: "游戏开发者",
          location: "杭州"
        },
        rating: 5,
        content: "游戏需要大量的NPC语音，VibeVoice让我的开发成本大大降低。不同角色的语音风格都很到位，玩家体验提升了很多。",
        tags: ["游戏", "NPC", "角色"],
        createdAt: "2024-01-05",
        isVerified: true
      },
      {
        id: 6,
        user: {
          name: "赵雨欣",
          role: "自媒体博主",
          location: "成都"
        },
        rating: 4,
        content: "作为自媒体博主，我经常需要制作视频内容。VibeVoice的语音合成功能让我的视频制作更加高效，音质也很棒，粉丝们都很喜欢。",
        tags: ["自媒体", "视频", "高效"],
        createdAt: "2024-01-03",
        isVerified: true
      },
      {
        id: 7,
        user: {
          name: "孙文博",
          role: "产品经理",
          location: "武汉"
        },
        rating: 5,
        content: "我们团队用VibeVoice为产品演示制作语音，效果非常专业。API接口也很稳定，集成到我们的系统中完全没有问题。",
        tags: ["产品演示", "API", "集成"],
        createdAt: "2024-01-01",
        isVerified: true
      },
      {
        id: 8,
        user: {
          name: "周梦瑶",
          role: "有声书制作人",
          location: "西安"
        },
        rating: 5,
        content: "制作有声书需要大量的语音内容，VibeVoice帮我节省了大量时间和成本。语音的情感表达很丰富，听众反馈很好。",
        tags: ["有声书", "情感表达", "成本"],
        createdAt: "2023-12-28",
        isVerified: true
      }
    ]

    // 获取查询参数
    const query = getQuery(event)
    const limit = query.limit ? parseInt(query.limit as string) : undefined
    const rating = query.rating ? parseInt(query.rating as string) : undefined

    // 筛选和限制结果
    let filteredComments = comments

    if (rating) {
      filteredComments = filteredComments.filter(comment => comment.rating === rating)
    }

    if (limit) {
      filteredComments = filteredComments.slice(0, limit)
    }

    return {
      success: true,
      data: filteredComments,
      total: comments.length,
      filtered: filteredComments.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '获取评论失败'
    })
  }
})
