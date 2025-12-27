'use client'

import { useState } from 'react'

export default function StarRating({ defaultRating = 0 }: { defaultRating?: number }) {
  const [rating, setRating] = useState(defaultRating)
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {/* 裏側でフォームに値を渡すための隠しinput */}
      <input type="hidden" name="rating" value={rating || 0} />
      
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label key={index} className="cursor-pointer">
            <input 
              type="radio" 
              name="rating_dummy" 
              className="hidden" 
              value={ratingValue} 
              onClick={() => setRating(ratingValue)}
            />
            <svg 
              className="w-8 h-8 transition-colors duration-200" 
              fill={ratingValue <= (hover || rating) ? "#FBBC05" : "#e4e5e9"} 
              viewBox="0 0 24 24"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </label>
        )
      })}
      <span className="ml-2 text-sm text-gray-500 font-bold">{rating > 0 ? `${rating}点` : '未評価'}</span>
    </div>
  )
}

