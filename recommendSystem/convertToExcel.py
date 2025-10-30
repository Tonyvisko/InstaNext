"""
MongoDB Database Schema Design
Facebook Recommendation System - Training Data Collection
"""

from pymongo import MongoClient, ASCENDING, DESCENDING
from datetime import datetime

# ============= DATABASE SCHEMA DESIGN =============

"""
DATABASE: facebook_recommendation_system

COLLECTIONS:
1. users - Thông tin người dùng
2. connections - Mối quan hệ bạn bè
3. posts - Bài viết
4. interactions - Tương tác của user với posts (CORE cho training)
5. user_behaviors - Hành vi tổng hợp theo thời gian
6. feed_impressions - Lịch sử hiển thị feed (CORE cho training)
7. training_samples - Data đã được xử lý sẵn cho training
8. model_metadata - Metadata của models đã train
"""

# ============= 1. USERS COLLECTION =============
users_schema = {
    "_id": "ObjectId",  # MongoDB auto-generated
    "user_id": "int",   # Application user ID
    "username": "string",
    "email": "string",
    "created_at": "datetime",
    
    # Profile info
    "profile": {
        "full_name": "string",
        "bio": "string",
        "avatar_url": "string",
        "location": "string",
        "age": "int",
        "gender": "string"
    },
    
    
    # Statistics
    "stats": {
        "total_posts": "int",
        "total_friends": "int",
        "avg_daily_active_time": "float",  # minutes
        "last_active": "datetime"
    },
    
    "updated_at": "datetime"
}

# Example document
users_example = {
    "user_id": 12345,
    "username": "john_doe",
    "email": "john@example.com",
    "created_at": datetime(2023, 1, 15),
    "profile": {
        "full_name": "John Doe",
        "bio": "Tech enthusiast | Travel lover",
        "avatar_url": "https://cdn.example.com/avatars/12345.jpg",
        "location": "Ho Chi Minh City, Vietnam",
        "age": 28,
        "gender": "male"
    },
    "preferences": {
        "interests": ["technology", "travel", "photography"],
        "language": "vi",
        "content_types_preference": {
            "photo": 0.8,
            "video": 0.9,
            "status": 0.5,
            "link": 0.6
        }
    },
    "stats": {
        "total_posts": 256,
        "total_friends": 432,
        "avg_daily_active_time": 45.5,
        "last_active": datetime.now()
    },
    "updated_at": datetime.now()
}

# Indexes cho users collection
users_indexes = [
    {"keys": [("user_id", ASCENDING)], "unique": True},
    {"keys": [("email", ASCENDING)], "unique": True},
    {"keys": [("username", ASCENDING)]},
    {"keys": [("stats.last_active", DESCENDING)]},
]


# ============= 2. CONNECTIONS COLLECTION =============
connections_schema = {
    "_id": "ObjectId",
    "user_id": "int",
    "connected_user_id": "int",
    "is_friend": "bool",  # True = bạn bè, False = không phải bạn bè
    "created_at": "datetime",
    
    # Interaction strength giữa 2 users
    "interaction_strength": "float",  # 0-1, tính từ lịch sử interactions
    "last_interaction": "datetime",
    "interaction_count_30d": "int",  # Số lần tương tác trong 30 ngày
    
    # Metadata
    "mutual_friends_count": "int"
}

connections_example = {
    "user_id": 12345,
    "connected_user_id": 67890,
    "is_friend": True,
    "created_at": datetime(2023, 3, 20),
    "interaction_strength": 0.75,
    "last_interaction": datetime.now(),
    "interaction_count_30d": 25,
    "mutual_friends_count": 23
}

connections_indexes = [
    {"keys": [("user_id", ASCENDING), ("connected_user_id", ASCENDING)], "unique": True},
    {"keys": [("user_id", ASCENDING), ("is_friend", ASCENDING)]},
    {"keys": [("connected_user_id", ASCENDING)]},
    {"keys": [("interaction_strength", DESCENDING)]},
]


# ============= 3. POSTS COLLECTION =============
posts_schema = {
    "_id": "ObjectId",
    "post_id": "int",
    "author_id": "int",
    "post_type": "string",  # "photo", "video", "status", "link", "live_video"
    
    # Content
    "content": {
        "text": "string",
        "media_urls": ["string"],
        "link_url": "string",
        "link_metadata": {
            "title": "string",
            "description": "string",
            "image_url": "string"
        }
    },
    
    "created_at": "datetime",
    "visibility": "string",  # "public", "friends", "private"
    
    # Location info
    "location": {
        "name": "string",
        "coordinates": {"lat": "float", "lng": "float"}
    },
    
    # Tags
    "tags": ["string"],  # hashtags
    "mentions": ["int"],  # user_ids được tag
    
    # Engagement metrics - CẬP NHẬT REAL-TIME
    "engagement": {
        "likes_count": "int",
        "comments_count": "int",
        "shares_count": "int",
        "clicks_count": "int",
        "views_count": "int",
        "hides_count": "int",  # negative feedback
        "reports_count": "int"
    },
    
    # Quality scores - TÍNH TOÁN ĐỊNH KỲ
    "quality_scores": {
        "authenticity_score": "float",  # 0-1
        "clickbait_score": "float",     # 0-1
        "spam_score": "float",          # 0-1
        "engagement_rate": "float",     # engagement/views
        "virality_score": "float"       # tốc độ lan truyền
    },
    
    # Features cho ML - TÍNH SẴN
    "features": {
        "text_length": "int",
        "has_media": "bool",
        "media_count": "int",
        "has_link": "bool",
        "hashtag_count": "int",
        "mention_count": "int",
        "sentiment_score": "float",  # -1 to 1
        "readability_score": "float"
    },
    
    "updated_at": "datetime"
}

posts_example = {
    "post_id": 98765,
    "author_id": 12345,
    "post_type": "photo",
    "content": {
        "text": "Amazing sunset at Dalat! 🌅 #travel #vietnam",
        "media_urls": [
            "https://cdn.example.com/posts/98765_1.jpg",
            "https://cdn.example.com/posts/98765_2.jpg"
        ],
        "link_url": None,
        "link_metadata": None
    },
    "created_at": datetime.now(),
    "visibility": "public",
    "location": {
        "name": "Dalat, Vietnam",
        "coordinates": {"lat": 11.9404, "lng": 108.4583}
    },
    "tags": ["travel", "vietnam", "sunset"],
    "mentions": [67890, 11111],
    "engagement": {
        "likes_count": 152,
        "comments_count": 23,
        "shares_count": 8,
        "clicks_count": 45,
        "views_count": 1250,
        "hides_count": 2,
        "reports_count": 0
    },
    "quality_scores": {
        "authenticity_score": 0.92,
        "clickbait_score": 0.05,
        "spam_score": 0.01,
        "engagement_rate": 0.184,
        "virality_score": 0.65
    },
    "features": {
        "text_length": 45,
        "has_media": True,
        "media_count": 2,
        "has_link": False,
        "hashtag_count": 3,
        "mention_count": 2,
        "sentiment_score": 0.8,
        "readability_score": 0.7
    },
    "updated_at": datetime.now()
}

posts_indexes = [
    {"keys": [("post_id", ASCENDING)], "unique": True},
    {"keys": [("author_id", ASCENDING), ("created_at", DESCENDING)]},
    {"keys": [("created_at", DESCENDING)]},
    {"keys": [("post_type", ASCENDING)]},
    {"keys": [("engagement.engagement_rate", DESCENDING)]},
    {"keys": [("quality_scores.virality_score", DESCENDING)]},
    {"keys": [("tags", ASCENDING)]},
]


# ============= 4. INTERACTIONS COLLECTION =============
# ★★★ COLLECTION QUAN TRỌNG NHẤT CHO TRAINING ★★★
interactions_schema = {
    "_id": "ObjectId",
    "interaction_id": "int",
    "user_id": "int",           # User thực hiện hành động
    "post_id": "int",           # Post được tương tác
    "author_id": "int",         # Author của post (denormalized cho query nhanh)
    
    # Loại tương tác
    "interaction_type": "string",  # "like", "comment", "share", "click", "view", "hide", "report"
    "interaction_value": "float",  # Giá trị (comment length, dwell time, etc.)
    
    "timestamp": "datetime",
    
    # Context khi tương tác - QUAN TRỌNG cho feature engineering
    "context": {
        "device_type": "string",      # "mobile", "desktop", "tablet"
        "session_id": "string",
        "feed_position": "int",       # Vị trí trong feed khi user thấy post
        "time_to_interaction": "float",  # Seconds từ khi hiển thị đến khi tương tác
        "previous_action": "string",
        "is_organic": "bool"          # True nếu từ feed, False nếu từ profile/search
    },
    
    # Dwell time - QUAN TRỌNG cho training
    "dwell_time": "float",  # Seconds user spent viewing this post
    
    # Details cho từng loại interaction
    "details": {
        "comment_text": "string",
        "comment_length": "int",
        "comment_sentiment": "float",
        "share_type": "string",       # "share_to_feed", "share_to_message"
        "hide_reason": "string"       # "not_interested", "spam", "offensive"
    },
    
    # Status
    "is_deleted": "bool",
    "deleted_at": "datetime"
}

interactions_example = {
    "interaction_id": 555444,
    "user_id": 67890,
    "post_id": 98765,
    "author_id": 12345,
    "interaction_type": "like",
    "interaction_value": 1.0,
    "timestamp": datetime.now(),
    "context": {
        "device_type": "mobile",
        "session_id": "sess_xyz789",
        "feed_position": 3,
        "time_to_interaction": 2.5,
        "previous_action": "scroll",
        "is_organic": True
    },
    "dwell_time": 5.2,
    "details": {
        "comment_text": None,
        "comment_length": None,
        "comment_sentiment": None,
        "share_type": None,
        "hide_reason": None
    },
    "is_deleted": False,
    "deleted_at": None
}

interactions_indexes = [
    {"keys": [("interaction_id", ASCENDING)], "unique": True},
    # Query patterns cho feature extraction
    {"keys": [("user_id", ASCENDING), ("timestamp", DESCENDING)]},
    {"keys": [("post_id", ASCENDING), ("timestamp", DESCENDING)]},
    {"keys": [("user_id", ASCENDING), ("post_id", ASCENDING)]},
    {"keys": [("user_id", ASCENDING), ("author_id", ASCENDING)]},
    {"keys": [("interaction_type", ASCENDING), ("timestamp", DESCENDING)]},
    {"keys": [("timestamp", DESCENDING)]},
    # Compound index cho training queries
    {"keys": [("user_id", ASCENDING), ("interaction_type", ASCENDING), ("timestamp", DESCENDING)]},
]


# ============= 5. USER_BEHAVIORS COLLECTION =============
# Aggregate behaviors theo time window để tính features
user_behaviors_schema = {
    "_id": "ObjectId",
    "user_id": "int",
    "date": "datetime",         # Date của behavior window
    "time_window": "string",    # "daily", "weekly", "monthly"
    
    # Engagement statistics
    "engagement_stats": {
        "total_likes": "int",
        "total_comments": "int",
        "total_shares": "int",
        "total_posts_viewed": "int",
        "total_posts_clicked": "int",
        "total_sessions": "int",
        "avg_session_duration": "float",
        "avg_dwell_time": "float"
    },
    
    # Content preferences
    "content_preferences": {
        "photo_engagement_rate": "float",
        "video_engagement_rate": "float",
        "status_engagement_rate": "float",
        "link_engagement_rate": "float",
        "most_engaged_topics": ["string"],
        "most_engaged_authors": ["int"]  # Top authors user tương tác
    },
    
    # Temporal patterns
    "temporal_patterns": {
        "most_active_hours": ["int"],      # [18, 19, 20, 21]
        "most_active_days": ["string"],    # ["monday", "friday"]
        "avg_posts_per_day": "float"
    },
    
    # Social patterns
    "social_patterns": {
        "avg_affinity_engaged": "float",   # Affinity trung bình của posts tương tác
        "new_connections_count": "int",
        "interaction_diversity": "float"    # % bạn bè được tương tác
    },
    
    "created_at": "datetime"
}

user_behaviors_example = {
    "user_id": 67890,
    "date": datetime(2024, 10, 27),
    "time_window": "daily",
    "engagement_stats": {
        "total_likes": 45,
        "total_comments": 8,
        "total_shares": 3,
        "total_posts_viewed": 120,
        "total_posts_clicked": 35,
        "total_sessions": 6,
        "avg_session_duration": 12.5,
        "avg_dwell_time": 4.8
    },
    "content_preferences": {
        "photo_engagement_rate": 0.42,
        "video_engagement_rate": 0.58,
        "status_engagement_rate": 0.25,
        "link_engagement_rate": 0.18,
        "most_engaged_topics": ["travel", "food", "technology"],
        "most_engaged_authors": [12345, 11111, 22222]
    },
    "temporal_patterns": {
        "most_active_hours": [18, 19, 20, 21, 22],
        "most_active_days": ["friday", "saturday", "sunday"],
        "avg_posts_per_day": 2.3
    },
    "social_patterns": {
        "avg_affinity_engaged": 0.65,
        "new_connections_count": 2,
        "interaction_diversity": 0.35
    },
    "created_at": datetime.now()
}

user_behaviors_indexes = [
    {"keys": [("user_id", ASCENDING), ("date", DESCENDING)]},
    {"keys": [("user_id", ASCENDING), ("time_window", ASCENDING)]},
    {"keys": [("date", DESCENDING)]},
]


# ============= 6. FEED_IMPRESSIONS COLLECTION =============
# ★★★ COLLECTION QUAN TRỌNG CHO TRAINING - Track what was shown vs what happened ★★★
feed_impressions_schema = {
    "_id": "ObjectId",
    "impression_id": "int",
    "user_id": "int",
    "post_id": "int",
    "author_id": "int",
    
    "timestamp": "datetime",
    "session_id": "string",
    
    # Feed context
    "feed_position": "int",      # Vị trí trong feed
    "feed_type": "string",       # "main_feed", "suggested"
    
    # Prediction scores khi ranking (để so sánh với kết quả thực tế)
    "ranking_scores": {
        "final_score": "float",
        "p_like": "float",
        "p_comment": "float",
        "p_share": "float",
        "p_click": "float",
        "p_hide": "float",
        "affinity_score": "float",
        "time_decay": "float",
        "content_weight": "float"
    },
    
    # Features used for ranking (snapshot tại thời điểm ranking)
    "features": {
        "post_type": "string",
        "post_age_hours": "float",
        "total_likes": "int",
        "total_comments": "int",
        "total_shares": "int",
        "friends_liked": "int",
        "friends_commented": "int",
        "friends_shared": "int",
        "quality_score": "float",
        "clickbait_score": "float",
        "user_likes_this_type": "float",
        "user_engagement_rate": "float"
        # ... có thể thêm nhiều features khác
    },
    
    # Outcome - GROUND TRUTH cho training
    "outcome": {
        "was_viewed": "bool",
        "was_clicked": "bool",
        "was_liked": "bool",
        "was_commented": "bool",
        "was_shared": "bool",
        "was_hidden": "bool",
        "dwell_time": "float"
    }
}

feed_impressions_example = {
    "impression_id": 777888,
    "user_id": 67890,
    "post_id": 98765,
    "author_id": 12345,
    "timestamp": datetime.now(),
    "session_id": "sess_xyz789",
    "feed_position": 3,
    "feed_type": "main_feed",
    "ranking_scores": {
        "final_score": 8.75,
        "p_like": 0.72,
        "p_comment": 0.35,
        "p_share": 0.18,
        "p_click": 0.65,
        "p_hide": 0.02,
        "affinity_score": 0.68,
        "time_decay": 0.85,
        "content_weight": 1.3
    },
    "features": {
        "post_type": "photo",
        "post_age_hours": 3.5,
        "total_likes": 152,
        "total_comments": 23,
        "total_shares": 8,
        "friends_liked": 5,
        "friends_commented": 2,
        "friends_shared": 1,
        "quality_score": 0.92,
        "clickbait_score": 0.05,
        "user_likes_this_type": 0.72,
        "user_engagement_rate": 0.48
    },
    "outcome": {
        "was_viewed": True,
        "was_clicked": True,
        "was_liked": True,
        "was_commented": False,
        "was_shared": False,
        "was_hidden": False,
        "dwell_time": 5.2
    }
}

feed_impressions_indexes = [
    {"keys": [("impression_id", ASCENDING)], "unique": True},
    {"keys": [("user_id", ASCENDING), ("timestamp", DESCENDING)]},
    {"keys": [("post_id", ASCENDING), ("timestamp", DESCENDING)]},
    {"keys": [("session_id", ASCENDING)]},
    {"keys": [("timestamp", DESCENDING)]},
    # Compound indexes cho training queries
    {"keys": [("user_id", ASCENDING), ("outcome.was_liked", ASCENDING)]},
    {"keys": [("user_id", ASCENDING), ("outcome.was_clicked", ASCENDING)]},
    {"keys": [("timestamp", DESCENDING), ("outcome.was_liked", ASCENDING)]},
]


# ============= 7. TRAINING_SAMPLES COLLECTION =============
# Pre-processed samples cho ML training (đã extract features sẵn)
training_samples_schema = {
    "_id": "ObjectId",
    "sample_id": "int",
    "user_id": "int",
    "post_id": "int",
    
    # Feature vector - ĐÃ XỬ LÝ SẴNN
    "features": {
        # Affinity features
        "affinity_score": "float",
        "is_friend": "bool",
        "interaction_count_7d": "int",
        "interaction_count_30d": "int",
        
        # Content features
        "post_type": "string",
        "content_weight": "float",
        "has_media": "bool",
        "text_length": "int",
        "hashtag_count": "int",
        "mention_count": "int",
        
        # Temporal features
        "post_age_hours": "float",
        "time_decay": "float",
        "hour_posted": "int",
        "is_prime_time": "bool",
        
        # Engagement features
        "total_likes": "int",
        "total_comments": "int",
        "total_shares": "int",
        "engagement_rate": "float",
        "velocity": "float",
        
        # User pattern features
        "user_likes_this_type": "float",
        "user_engagement_rate": "float",
        "user_avg_dwell_time": "float",
        
        # Social proof
        "friends_liked": "int",
        "friends_commented": "int",
        "friends_shared": "int",
        
        # Quality
        "quality_score": "float",
        "clickbait_score": "float",
        "authenticity_score": "float"
    },
    
    # Labels - GROUND TRUTH
    "labels": {
        "did_like": "bool",
        "did_comment": "bool",
        "did_share": "bool",
        "did_click": "bool",
        "did_hide": "bool",
        "dwell_time": "float"
    },
    
    # Metadata
    "created_at": "datetime",
    "sample_date": "datetime",     # Ngày data được thu thập
    "data_split": "string",        # "train", "validation", "test"
    "version": "string"            # Data version cho tracking
}

training_samples_example = {
    "sample_id": 999888,
    "user_id": 67890,
    "post_id": 98765,
    "features": {
        "affinity_score": 0.68,
        "is_friend": True,
        "interaction_count_7d": 15,
        "interaction_count_30d": 52,
        "post_type": "photo",
        "content_weight": 1.3,
        "has_media": True,
        "text_length": 45,
        "hashtag_count": 3,
        "mention_count": 2,
        "post_age_hours": 3.5,
        "time_decay": 0.85,
        "hour_posted": 18,
        "is_prime_time": True,
        "total_likes": 152,
        "total_comments": 23,
        "total_shares": 8,
        "engagement_rate": 0.184,
        "velocity": 52.5,
        "user_likes_this_type": 0.72,
        "user_engagement_rate": 0.48,
        "user_avg_dwell_time": 5.2,
        "friends_liked": 5,
        "friends_commented": 2,
        "friends_shared": 1,
        "quality_score": 0.92,
        "clickbait_score": 0.05,
        "authenticity_score": 0.92
    },
    "labels": {
        "did_like": True,
        "did_comment": False,
        "did_share": False,
        "did_click": True,
        "did_hide": False,
        "dwell_time": 5.2
    },
    "created_at": datetime.now(),
    "sample_date": datetime(2024, 10, 27),
    "data_split": "train",
    "version": "v1.0"
}

training_samples_indexes = [
    {"keys": [("sample_id", ASCENDING)], "unique": True},
    {"keys": [("user_id", ASCENDING)]},
    {"keys": [("data_split", ASCENDING), ("sample_date", DESCENDING)]},
    {"keys": [("version", ASCENDING)]},
    {"keys": [("labels.did_like", ASCENDING)]},
    {"keys": [("labels.did_comment", ASCENDING)]},
    {"keys": [("labels.did_share", ASCENDING)]},
]


# ============= 8. MODEL_METADATA COLLECTION =============
model_metadata_schema = {
    "_id": "ObjectId",
    "model_id": "string",
    "model_name": "string",
    "model_type": "string",  # "like_prediction", "comment_prediction", "share_prediction", etc.
    "version": "string",
    
    # Training information
    "training_info": {
        "training_samples_count": "int",
        "training_date": "datetime",
        "training_duration_minutes": "float",
        "data_version": "string",
        "feature_version": "string"
    },
    
    # Performance metrics
    "performance_metrics": {
        "accuracy": "float",
        "precision": "float",
        "recall": "float",
        "f1_score": "float",
        "auc_roc": "float",
        "log_loss": "float"
    },
    
    # Hyperparameters
    "hyperparameters": {
        "n_estimators": "int",
        "learning_rate": "float",
        "max_depth": "int"
        # ... other hyperparameters
    },
    
    # Feature importance
    "feature_importance": [
        {
            "feature_name": "string",
            "importance": "float"
        }
    ],
    
    # Deployment info
    "deployment_info": {
        "is_active": "bool",
        "deployed_at": "datetime",
        "model_path": "string"
    },
    
    "created_at": "datetime"
}

model_metadata_example = {
    "model_id": "model_like_v1.0_20241027",
    "model_name": "Like Prediction Model",
    "model_type": "like_prediction",
    "version": "v1.0",
    "training_info": {
        "training_samples_count": 1000000,
        "training_date": datetime.now(),
        "training_duration_minutes": 45.5,
        "data_version": "v1.0",
        "feature_version": "v1.0"
    },
    "performance_metrics": {
        "accuracy": 0.82,
        "precision": 0.79,
        "recall": 0.76,
        "f1_score": 0.77,
        "auc_roc": 0.88,
        "log_loss": 0.35
    },
    "hyperparameters": {
        "n_estimators": 100,
        "learning_rate": 0.1,
        "max_depth": 5
    },
    "feature_importance": [
        {"feature_name": "affinity_score", "importance": 0.25},
        {"feature_name": "friends_liked", "importance": 0.18},
        {"feature_name": "user_likes_this_type", "importance": 0.15}
    ],
    "deployment_info": {
        "is_active": True,
        "deployed_at": datetime.now(),
        "model_path": "/models/like_prediction_v1.0.pkl"
    },
    "created_at": datetime.now()
}

model_metadata_indexes = [
    {"keys": [("model_id", ASCENDING)], "unique": True},
    {"keys": [("model_type", ASCENDING), ("version", DESCENDING)]},
    {"keys": [("deployment_info.is_active", ASCENDING)]},
]


# ============= SUMMARY =============
print("""
╔══════════════════════════════════════════════════════════════╗
║     MONGODB SCHEMA DESIGN - FACEBOOK RECOMMENDATION         ║
╚══════════════════════════════════════════════════════════════╝

📦 8 COLLECTIONS:

1. users (Thông tin người dùng)
   - Profile, preferences, statistics
   - Indexes: user_id, email, last_active

2. connections (Mối quan hệ bạn bè)
   - is_friend (True/False)
   - interaction_strength, last_interaction
   - Indexes: user_id + connected_user_id

3. posts (Bài viết)
   - Content, engagement metrics, quality scores
   - Pre-computed features
   - Indexes: post_id, author_id, created_at, virality

4. ★ interactions (Tương tác - CORE cho training)
   - Like, comment, share, click, view, hide
   - Context: device, session, feed_position, dwell_time
   - Indexes: user_id, post_id,
    
    
      
        """)
