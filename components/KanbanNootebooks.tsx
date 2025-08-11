'use client'
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/kibo-ui/kanban'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from './ui/button'

const columns = [
  { id: '1', name: 'Planned', color: '#6B7280' },
  { id: '2', name: 'In Progress', color: '#F59E0B' },
  { id: '3', name: 'Done', color: '#10B981' },
]
const users = [
  {
    id: '1',
    name: 'User',
    image: 'https://randomuser.me/api/portraits/men/0.jpg',
  },
]

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

type Notebook = {
  _id: string
  name: string
}

type KanbanNotebooksProps = {
  notebooks?: Notebook[]
}

const KanbanNotebooks = ({ notebooks = [] }: KanbanNotebooksProps) => {
  // Przekształć notebooki na format wymagany przez KanbanProvider
  const initialFeatures = notebooks.slice(0, 12).map((notebook) => ({
    id: notebook._id,
    name: notebook.name,
    startAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 dni temu
    endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 dni w przyszłość
    column: columns[Math.floor(Math.random() * columns.length)].id,
    owner: users[0],
  }))

  const [features, setFeatures] = useState(initialFeatures)
  const [edit, setEdit] = useState(false)
  return (
    <div className='w-full '> 

      <Button
        className={
          edit
            ? 'bg-blue-500 hover:bg-blue-500/80 mb-4 cursor-pointer text-white'
            : 'bg-green-500 hover:bg-green-500/80 mb-4 cursor-pointer text-white'
        }
        onClick={() => setEdit(!edit)}
      >
        {edit ? 'Drag and Drop ✋' : 'Edit by Id 👆'}
      </Button>

      <KanbanProvider
        columns={columns}
        data={features}
        onDataChange={setFeatures}
      >
        {(column) => (
          <KanbanBoard
            id={column.id}
            key={column.id}
          >
            <KanbanHeader>
              <div className='flex items-center gap-2'>
                <div
                  className='h-2 w-2 rounded-full'
                  style={{ backgroundColor: column.color }}
                />
                <span>{column.name}</span>
              </div>
            </KanbanHeader>
            <KanbanCards id={column.id}>
              {(feature: (typeof features)[number]) => (
                <div className='relative' key={feature.id}>
                  <KanbanCard
                    column={column.id}
                    id={feature.id}
                    name={feature.name}
                  >
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex flex-col gap-1'>
                        <p className='m-0 flex-1 font-medium text-sm'>
                          {feature.name}
                        </p>
                      </div>
                      {feature.owner && (
                        <Avatar className='h-4 w-4 shrink-0'>
                          <AvatarImage src={feature.owner.image} />
                          <AvatarFallback>
                            {feature.owner.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <p className='m-0 text-muted-foreground text-xs'>
                      {shortDateFormatter.format(feature.startAt)} -{' '}
                      {dateFormatter.format(feature.endAt)}
                    </p>
                  </KanbanCard>
                  {edit && (
                    <Link
                      href={`/dashboard/notebook/${feature.id}`}
                      className='absolute inset-0 z-10'
                      aria-label={`Edit notebook ${feature.name}`}
                    />
                  )}
                </div>
              )}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>
    </div>
  )
}
export default KanbanNotebooks
