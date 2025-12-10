"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  userID: string
  fullname: string
  avatar?: string
  image: string
  caption?: string
  likes: number
  commentCount: number
  isLiked: boolean
  created_at: string
}

const mockPosts: Post[] = [
  {
    id: "1",
    userID: "user1",
    fullname: "Nguyễn Văn A",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/serene-mountain-lake-0qmbkvBvKBuwbBe1kQNxil7qSUoevp.png",
    caption: "Khám phá vẻ đẹp của thiên nhiên",
    likes: 2547,
    commentCount: 345,
    isLiked: false,
    created_at: "2 giờ trước",
  },
  {
    id: "2",
    userID: "user2",
    fullname: "Trần Thị B",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/travel-city-n2IOcAqrLkXV3ERA9DB1haiRgixWHF.jpg",
    caption: "Du lịch tại những thành phố nổi tiếng",
    likes: 1823,
    commentCount: 256,
    isLiked: false,
    created_at: "4 giờ trước",
  },
  {
    id: "3",
    userID: "user3",
    fullname: "Phạm Minh C",
    image: "/futuristic-tech-gadget.png",
    caption: "Công nghệ mới nhất năm 2024",
    likes: 3156,
    commentCount: 512,
    isLiked: false,
    created_at: "6 giờ trước",
  },
]

export default function TrendingPosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-3xl font-bold text-foreground">Bài Viết Hot Nhất</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className=" flex flex-col justify-start items-start">
                    <h3 className="font-semibold text-foreground">{post.fullname}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{post.created_at}</p>
                    <p className="text-sm text-foreground mt-2">{post.caption}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col justify-center gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleDeletePost(post.id)}
                    title="Xóa bài viết"
                    className="!bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 "   />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
