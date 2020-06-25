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

  deleteWidget (index) {
    this.widgets.splice(index, 1)
  }
}

export class Section extends Content {
  constructor (n = 1, id) {
    super(id)
    this.title = 'Section ' + n
  }

  contentType = 'section'
}

export class Task extends Content {
  constructor (n = 1, id) {
    super(id)
    this.title = 'Task ' + n
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

  constructor (n, id) {
    this.title = 'Chapter ' + n
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

  addSection (n = this.sectionCount + 1, id = this.runningContentId) {
    this.content.push(new Section(n, id))
    this.sectionCount++
    this.runningContentId++
  }

  addTask (n = this.taskCount + 1, id = this.runningContentId) {
    this.content.push(new Task(n, id))
    this.taskCount++
    this.runningContentId++
  }

  deleteContent (index) {
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

  addChapter (n = 1, id = this.runningChapterId) {
    this.chapters.push(new Chapter(n, id))
    this.runningChapterId++
  }

  deleteChapter (i) {
    this.chapters.splice(i, 1)
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

  getChapter (index) {
    return this.courseStructure.chapters[index]
  }

  getContent (chapterIndex, contentIndex) {
    return this.courseStructure.chapters[chapterIndex].content[contentIndex]
  }

  chapterCount () { return this.courseStructure.chapters.length }
}
