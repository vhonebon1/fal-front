import React from 'react'

class Slideshow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visibleItem: null,
    }
  }

  componentDidMount() {
    const { items } = this.props
    this.setState({ items, visibleItem: items[0]})
  }

  createViewComponents = () => {
    return this.state.items.map(item => {
      return(<img src={item.image_file_name} />)
    })
  }

  render() {
    return(
      <div>{ this.createViewComponents() }</div>
    )
  }
}

export default Slideshow