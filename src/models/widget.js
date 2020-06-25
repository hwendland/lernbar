export class Widget {
  constructor (type, id) {
    this.type = type
    this.id = id
  }

  content = {
    text: `
          <h2>
            Hi there,
          </h2>
          <p>
            This is new text widget. Check out all the formatting options!
          </p>
        `,
    url: ''
  }

  columns = 3
}
