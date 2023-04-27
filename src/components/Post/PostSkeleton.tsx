import { PostContent, PostTitle, PostWrapper } from '@/styles/components/post'
import { Skeleton } from '@mui/material'

export function PostSkeleton() {
  return (
    <PostWrapper>
      <PostTitle>
        <Skeleton
          variant="text"
          width={370}
          animation="wave"
          sx={{ fontSize: 22 }}
        />
      </PostTitle>
      <PostContent>
        <span>
          <Skeleton
            variant="text"
            width={80}
            animation="wave"
            sx={{ fontSize: 18 }}
          />
          <Skeleton
            variant="text"
            width={150}
            animation="wave"
            sx={{ fontSize: 18 }}
          />
        </span>
        <Skeleton
          variant="text"
          width="100%"
          height={164}
          animation="wave"
          sx={{ fontSize: 18 }}
        />
      </PostContent>
    </PostWrapper>
  )
}
