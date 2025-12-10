"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Trash2, ImageIcon, Video, FileText, Ban, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  userID: string
  fullname: string
  avatar?: string
  image?: string
  caption?: string
  likes: number
  commentCount: number
  created_at: string
  contentType: "status" | "photo" | "video"
  videoUrl?: string
  isViolated?: boolean
  violationType?: string
  userBanned?: boolean
  commentsDisabled?: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    userID: "user1",
    fullname: "Nguyễn Văn A",
    avatar: "/diverse-avatars.png",
    contentType: "photo",
    image: "/serene-mountain-lake.png",
    caption: "Khám phá vẻ đẹp của thiên nhiên",
    likes: 2547,
    commentCount: 345,
    created_at: "2 giờ trước",
  },
  {
    id: "2",
    userID: "user2",
    fullname: "Trần Thị B",
    avatar: "/diverse-avatars.png",
    contentType: "status",
    caption:
      "Hôm nay là một ngày tuyệt vời! Tôi rất vui được chia sẻ với tất cả mọi người những khoảnh khắc đẹp của cuộc sống.",
    likes: 1823,
    commentCount: 256,
    created_at: "4 giờ trước",
    isViolated: true,
    violationType: "toxic",
  },
  {
    id: "3",
    userID: "user3",
    fullname: "Phạm Minh C",
    avatar: "/diverse-avatars.png",
    contentType: "video",
    image: "/futuristic-tech-gadget.png",
    caption: "Công nghệ mới nhất năm 2024",
    videoUrl: "#",
    likes: 3156,
    commentCount: 512,
    created_at: "6 giờ trước",
  },
  {
    id: "4",
    userID: "user4",
    fullname: "Lê Quốc D",
    avatar: "/diverse-avatars.png",
    contentType: "photo",
    image: "/travel-city.jpg",
    caption: "Du lịch tại những thành phố nổi tiếng",
    likes: 1234,
    commentCount: 189,
    created_at: "8 giờ trước",
  },
  {
    id: "5",
    userID: "user5",
    fullname: "Hoàng Thu E",
    avatar: "/diverse-avatars.png",
    contentType: "status",
    caption: "Buổi sáng nay tôi thức dậy sớm và cảm thấy năng lượng tích cực. Hãy cùng nhau tạo ra một ngày tuyệt vời!",
    likes: 892,
    commentCount: 124,
    created_at: "10 giờ trước",
  },
  {
    id: "6",
    userID: "user6",
    fullname: "Đặng Hữu F",
    avatar: "/diverse-avatars.png",
    contentType: "video",
    image: "/futuristic-tech-gadget.png",
    caption: "Hướng dẫn làm bánh tart chuối chocolate ngon tuyệt vời",
    videoUrl: "#",
    likes: 5432,
    commentCount: 789,
    created_at: "12 giờ trước",
  },
]

const contentTypeConfig = {
  status: {
    label: "Trạng Thái",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    icon: FileText,
  },
  photo: {
    label: "Hình Ảnh",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    icon: ImageIcon,
  },
  video: {
    label: "Video",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    icon: Video,
  },
}

const violationTypeConfig = {
  toxic: { label: "Ngôn Từ Độc Hại", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
  spam: { label: "Spam", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
  violent: { label: "Bạo Lực", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" },
  inappropriate: {
    label: "Không Phù Hợp",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  },
}

export default function PostsByType() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [filterType, setFilterType] = useState<"all" | "status" | "photo" | "video">("all")
  const [sortBy, setSortBy] = useState<"likes" | "comments" | "recent">("recent")
  const [showOnlyViolations, setShowOnlyViolations] = useState(false)

  const filteredPosts = posts
    .filter((post) => {
      const typeMatch = filterType === "all" || post.contentType === filterType
      const violationMatch = !showOnlyViolations || post.isViolated
      return typeMatch && violationMatch
    })
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes
      if (sortBy === "comments") return b.commentCount - a.commentCount
      return 0
    })

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const handleBanUser = (id: string) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, userBanned: true } : post)))
  }

  const handleDisableComments = (id: string) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, commentsDisabled: true } : post)))
  }

  const handleMarkAsResolved = (id: string) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, isViolated: false } : post)))
  }

  const getTypeConfig = (type: "status" | "photo" | "video") => {
    return contentTypeConfig[type]
  }

  const truncateText = (text: string, maxLength = 150) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  const statusCount = posts.filter((p) => p.contentType === "status").length
  const photoCount = posts.filter((p) => p.contentType === "photo").length
  const videoCount = posts.filter((p) => p.contentType === "video").length
  const violationCount = posts.filter((p) => p.isViolated).length

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-3xl font-bold text-foreground">Bài Viết Theo Loại Nội Dung</h1>
        <p className="text-muted-foreground mt-1">Quản lý và theo dõi bài viết được phân loại theo loại nội dung</p>

        {/* Stats */}
        <div className="flex gap-4 mt-4 text-sm flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-muted-foreground">
              Trạng Thái: <span className="font-semibold text-foreground">{statusCount}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-950">
            <ImageIcon className="w-4 h-4 text-purple-600" />
            <span className="text-muted-foreground">
              Hình Ảnh: <span className="font-semibold text-foreground">{photoCount}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950">
            <Video className="w-4 h-4 text-red-600" />
            <span className="text-muted-foreground">
              Video: <span className="font-semibold text-foreground">{videoCount}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 dark:bg-orange-950">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-muted-foreground">
              Vi Phạm: <span className="font-semibold text-foreground">{violationCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm font-medium text-muted-foreground mr-2">Lọc theo loại:</label>
            <div className="flex gap-2 inline-flex flex-wrap">
              {["all", "status", "photo", "video"].map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={filterType === type ? "default" : "outline"}
                  onClick={() => setFilterType(type as typeof filterType)}
                  className="capitalize"
                >
                  {type === "all" ? "Tất Cả" : contentTypeConfig[type as keyof typeof contentTypeConfig].label}
                </Button>
              ))}
            </div>
          </div>

          <div className="ml-auto flex gap-2 items-center">
            <Button
              size="sm"
              variant={showOnlyViolations ? "default" : "outline"}
              onClick={() => setShowOnlyViolations(!showOnlyViolations)}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              {showOnlyViolations ? "Vi Phạm" : "Tất Cả"}
            </Button>

            <label className="text-sm font-medium text-muted-foreground">Sắp xếp:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1 border border-border rounded-md text-sm bg-background text-foreground"
            >
              <option value="recent">Gần Đây Nhất</option>
              <option value="likes">Nhiều Yêu Thích</option>
              <option value="comments">Nhiều Bình Luận</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const typeConfig = getTypeConfig(post.contentType)
              const TypeIcon = typeConfig.icon

              return (
                <Card
                  key={post.id}
                  className={`overflow-hidden hover:shadow-md transition-shadow ${
                    post.isViolated ? "border-orange-300 dark:border-orange-700" : ""
                  }`}
                >
                  {post.isViolated && (
                    <div className="bg-orange-50 dark:bg-orange-950 border-b border-orange-200 dark:border-orange-800 px-4 py-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-medium text-orange-800 dark:text-orange-100">
                        Bài viết đang có vi phạm:{" "}
                        {violationTypeConfig[post.violationType as keyof typeof violationTypeConfig]?.label ||
                          "Không xác định"}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-4 p-4">
                    {/* Left Side: Avatar + User Info + Content */}
                    <div className="flex gap-3 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="w-12 h-12 flex-shrink-0 bg-muted rounded-full overflow-hidden border-2 border-border">
                        <img
                          src={post.avatar || "/placeholder.svg?height=48&width=48&query=avatar"}
                          alt={post.fullname}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        {/* User & Type Badge */}
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-foreground text-sm">{post.fullname}</h3>
                          {post.userBanned && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                              <Ban className="w-3 h-3" />
                              Tài khoản bị khóa
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${typeConfig.color}`}
                          >
                            <TypeIcon className="w-3 h-3" />
                            {typeConfig.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{post.created_at}</p>

                        {/* Caption */}
                        <p className="text-sm text-foreground leading-relaxed line-clamp-2 mb-2">
                          {truncateText(post.caption || "", 150)}
                        </p>

                        {/* Engagement Stats */}
                        <div className="flex gap-6 text-xs text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                            <span className="font-medium">{post.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span className="font-medium">
                              {post.commentsDisabled ? "Bị tắt" : post.commentCount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            <span className="font-medium">Chia sẻ</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Content Preview & Action Buttons */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      {/* Content Preview */}
                      {post.contentType !== "status" && (
                        <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden border border-border shadow-sm">
                          {post.contentType === "video" ? (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/20 to-red-600/20">
                              <Video className="w-6 h-6 text-red-600" />
                            </div>
                          ) : (
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.caption}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap justify-end">
                        {post.isViolated && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsResolved(post.id)}
                              className="text-xs"
                              title="Đánh dấu vi phạm là đã giải quyết"
                            >
                              ✓ Giải Quyết
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleBanUser(post.id)}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs"
                              disabled={post.userBanned}
                              title="Khóa tài khoản người dùng"
                            >
                              <Ban className="w-3 h-3 mr-1" />
                              Khóa
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDisableComments(post.id)}
                              className="text-xs"
                              disabled={post.commentsDisabled}
                              title="Tắt bình luận trên bài viết này"
                            >
                              Tắt BL
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePost(post.id)}
                          title="Xóa bài viết"
                          className="text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground">Không có bài viết nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
