import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { NotePencil, Trash } from 'phosphor-react'

import { DeleteAlert } from '../DeleteAlert'
import { EditItemModal } from '../EditItemModal'
import { PostContent, PostTitle, PostWrapper } from '@/styles/components/post'

interface PostProps {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
  accountOwnerName: { username: string } | null
}

export function Post({
  id,
  username,
  // eslint-disable-next-line camelcase
  created_datetime,
  title,
  content,
  accountOwnerName,
}: PostProps) {
  return (
    <PostWrapper>
      <PostTitle>
        <h3>{title}</h3>
        {accountOwnerName?.username === username && (
          <span className="postButtonBox">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Trash size={22} weight="bold" />
              </Dialog.Trigger>
              <DeleteAlert postId={id} />
            </Dialog.Root>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <NotePencil size={22} weight="bold" />
              </Dialog.Trigger>
              <EditItemModal postId={id} />
            </Dialog.Root>
          </span>
        )}
      </PostTitle>
      <PostContent>
        <span>
          <strong>{username}</strong>
          <p>
            {formatDistanceToNow(new Date(created_datetime), {
              addSuffix: true,
            })}
          </p>
        </span>
        <p>{content}</p>
      </PostContent>
    </PostWrapper>
  )
}
