export class Widget {
  constructor (type, id) {
    this.type = type
    this.id = id
  }

  content = {
    text: '<h2>Hi there,</h2><p>This is a new text widget. Check out all the formatting options!</p>',
    url: '',
    question: '<h3>Question widget</h3> <p>You can enter and edit you question here.</p>',
    options: [
      { text: 'First option', isChecked: false, isCorrect: false },
      { text: 'Second option', isChecked: false, isCorrect: false }
    ]
  }

  columns = 3
}
