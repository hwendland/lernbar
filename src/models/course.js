import { Type } from 'class-transformer'
import { Widget } from './widget'

export class Content {
  contentType
  title
  id
  previewImage = '/img/placeholder.jpg'
  @Type(() => Widget)
  widgets = []

  runningWidgetId = 0

  constructor (id) {
    this.id = id
    if (this.widgets.length) {
      const maxId = Math.max(this.widgets.map(widget => widget.id))
      this.runningWidgetId = maxId + 1
    }
  }

  addWidget (widgetType) {
    this.widgets.push(new Widget(widgetType, this.runningWidgetId))
    this.runningWidgetId++
  }

  deleteWidget (id) {
    const index = this.widgets.findIndex(w => w.id === id)
    this.widgets.splice(index, 1)
  }
}

export class Section extends Content {
  constructor (id) {
    super(id)
    this.title = 'new Section'
  }

  contentType = 'section'
}

export class Task extends Content {
  constructor (id) {
    super(id)
    this.title = 'new Task'
  }

  contentType = 'task'
}

export class Chapter {
  @Type(() => Content, {
    discriminator: {
      property: 'contentType',
      subTypes: [
        { value: Task, name: 'task' },
        { value: Section, name: 'section' }
      ]
    }
  })
  content = []

  id
  sectionCount = 0
  taskCount = 0

  constructor (id) {
    this.title = 'new Chapter'
    this.id = id
    this.runningContentId = this.id * 10000000
    if (this.content.length) {
      const maxId = Math.max(this.content.map(content => content.id))
      this.runningContentId *= (maxId + 1)
    } else {
      this.addSection()
      this.addTask()
    }
  }

  getContent (id) {
    return this.content.find(el => el.id === id)
  }

  addSection (id = this.runningContentId) {
    this.content.push(new Section(id))
    this.sectionCount++
    this.runningContentId++
  }

  addTask (id = this.runningContentId) {
    this.content.push(new Task(id))
    this.taskCount++
    this.runningContentId++
  }

  deleteContent (id) {
    const index = this.content.findIndex(el => el.id === id)
    const deletion = this.content.splice(index, 1)
    deletion.contentType === 'task' ? this.taskCount-- : this.sectionCount--
  }
}

export class CourseStructure {
  constructor () {
    if (this.chapters.length) {
      const maxId = Math.max(this.chapters.map(chapter => chapter.id))
      this.runningChapterId = maxId + 1
    } else {
      this.addChapter()
    }
  }

  runningChapterId = 0

  @Type(() => Chapter)
  chapters = []

  addChapter (id = this.runningChapterId) {
    this.chapters.push(new Chapter(id))
    this.runningChapterId++
  }

  deleteChapter (id) {
    const index = this.chapters.findIndex(chapter => chapter.id === id)
    this.chapters.splice(index, 1)
  }

  getChapter (id) {
    return this.chapters.find(chapter => chapter.id === id)
  }

  getLastChapter () {
    return this.chapters[this.chapters.length - 1]
  }
}

export class Course {
  status = 'draft'
  description = undefined
  subject = undefined
  materialType = undefined
  interactivity = 'explanatory'
  language = 'English'
  duration = undefined
  ages = undefined
  author = ''
  created = new Date()
  previewImage = '/img/placeholder.jpg'

  @Type(() => CourseStructure)
  courseStructure = new CourseStructure()

  constructor (title = undefined, id = null) {
    this.title = title
    this.id = id
  }

  getChapter (id) {
    return this.courseStructure.getChapter(id)
  }

  getLastChapter () {
    return this.courseStructure.getLastChapter()
  }

  getContent (chapterId, contentId) {
    let result
    try {
      result = this.getChapter(chapterId).getContent(contentId)
    } catch {
      const allContent = []
      this.courseStructure.chapters.forEach(
        chapter => allContent.push(...chapter.content)
      )
      result = allContent.find(el => el.id === contentId)
    }
    return result
  }

  chapterCount () { return this.courseStructure.chapters.length }
}
