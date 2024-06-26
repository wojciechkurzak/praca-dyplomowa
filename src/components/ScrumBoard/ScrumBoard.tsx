import { useState } from 'react'
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'
import { useAppSelector } from '../../redux/hooks'
import { Task } from '../../interfaces/Project'
import BoardColumn from '../BoardColumn/BoardColumn'
import BoardItem from '../BoardItem/BoardItem'
import { Column, ScrumBoardProps } from './ScrumBoardTypes'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'

import './ScrumBoard.scss'

const columns: Column[] = [
  {
    id: 'to do',
    title: 'To do',
  },
  {
    id: 'in progress',
    title: 'In progress',
  },
  {
    id: 'done',
    title: 'Done',
  },
]

const ScrumBoard = ({ tasks, setTasks }: ScrumBoardProps) => {
  const { currentProject } = useOutletContext<ProjectOutlet>()
  const projects = useAppSelector((state) => state.projects)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  const onDragEnd = async () => {
    if (!currentProject.sprint.isRunning) return
    const newProject = {
      ...currentProject,
      tasks: tasks,
    }

    const isEqual = projects.some(
      (project) =>
        JSON.stringify(project.tasks) === JSON.stringify(newProject.tasks)
    )

    if (!isEqual) {
      try {
        const projectRef = doc(db, 'projects', currentProject.id)

        await updateDoc(projectRef, {
          tasks: tasks,
        })
      } catch (error) {
        toast.error('Something went wrong', toastOptions)
      }
    }
    setActiveTask(null)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        if (tasks[activeIndex].status != tasks[overIndex].status) {
          const newTasks = tasks.map((task, index) => {
            if (index == activeIndex)
              return {
                ...task,
                status: tasks[overIndex].status,
              }
            else return task
          })
          return arrayMove(newTasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId)
        const newTasks = tasks.map((task, index) => {
          if (index == activeIndex)
            return {
              ...task,
              status: overId as string,
            }
          else return task
        })
        return arrayMove(newTasks, activeIndex, activeIndex)
      })
    }
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        collisionDetection={closestCenter}
      >
        <div className='board-column-container'>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.status === col.id)}
            />
          ))}
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && <BoardItem task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default ScrumBoard
