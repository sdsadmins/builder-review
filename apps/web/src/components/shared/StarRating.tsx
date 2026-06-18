'use client'

interface StarRatingProps {
  rating?: number
  value?: number
  max?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export default function StarRating({ rating, value, max = 5, interactive = false, onChange, size = 'md', showValue }: StarRatingProps) {
  const sizeMap = { sm: 14, md: 18, lg: 24 }
  const px = sizeMap[size]
  const score = rating ?? value ?? 0

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(score)
        const half = !filled && i < score
        return (
          <svg
            key={i}
            width={px}
            height={px}
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : half ? 'url(#half)' : 'none'}
            stroke="currentColor"
            strokeWidth={1.5}
            className={`${filled || half ? 'text-amber-600' : 'text-stone-300'} ${interactive ? 'cursor-pointer hover:text-amber-500 transition-colors' : ''}`}
            onClick={() => interactive && onChange?.(i + 1)}
          >
            <defs>
              <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor"/>
                <stop offset="50%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        )
      })}
      {showValue && score > 0 && (
        <span className="ml-1 text-xs font-semibold text-stone-600">{score.toFixed(1)}</span>
      )}
    </div>
  )
}
