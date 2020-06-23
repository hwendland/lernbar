import { Type } from 'class-transformer'

export class Content {
  contentType
  title
  previewImage = '/img/placeholder.jpg'
}

export class Section extends Content {
  constructor (n = 1) {
    super()
    this.title = 'Section ' + n
  }

  contentType = 'section'
}

export class Task extends Content {
  constructor (n = 1) {
    super()
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
  content = [new Section(), new Task()]

  sectionCount = 1
  taskCount = 1
  constructor (n = 1) {
    this.title = 'Chapter ' + n
  }

  addSection (n = this.sectionCount + 1) {
    this.content.push(new Section(n))
    this.sectionCount++
  }

  addTask (n = this.taskCount + 1) {
    this.content.push(new Task(n))
    this.taskCount++
  }

  deleteContent (index) {
    const deletion = this.content.splice(index, 1)
    deletion.contentType === 'task' ? this.taskCount-- : this.sectionCount--
  }
}

export class CourseStructure {
  @Type(() => Chapter)
  chapters = [new Chapter()]

  addChapter (n) {
    this.chapters.push(new Chapter(n))
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
