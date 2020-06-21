import React from 'react'
import ReactPlayer from 'react-player/lazy'

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
    this.setState({ items, visibleItem: 0})
  }

  nextItem = () => {
    const { items, visibleItem } = this.state
    const lastItem = (items.length) - 1 === visibleItem
    const newIndex = lastItem ? 0 : visibleItem + 1
    this.setState({ visibleItem: newIndex })
  }

  previousItem = () => {
    const { items, visibleItem } = this.state
    const firstItem = visibleItem === 0
    const newIndex = firstItem ? items.length - 1 : visibleItem - 1
    this.setState({ visibleItem: newIndex })
  }

  renderArtworks = () => {
    const item = this.state.items[this.state.visibleItem]
    return(
      <div className="slideshow__inner">
        { item.isVideo ? this.renderVideoPlayer(item.video_url) : <img src={item.image_file_name} alt="" /> }
      </div>
    )
  }

  renderVideoPlayer = (url) => {
    return(
      <ReactPlayer
        url={url}
        controls={false}
        playing
      />
    )
  }

  renderNavArrows = () => {
    return(
      <>
        <div className="nav__arrow right" onClick={() => this.nextItem()}>{">"}</div>
        <div className="nav__arrow left" onClick={() => this.previousItem()}>{"<"}</div>
      </>
    )
  }

  render() {
    const { items, visibleItem } = this.state
    const { name, statement } = this.props
    return(
      <>
        { items.length > 0 &&
          <>
            <div className="slideshow__wrapper">
              { this.renderArtworks() }
              { items.length > 1 && this.renderNavArrows() }
            </div>          
            <div className="student-page__info">
              <div className="students__name">{name}</div>
              <div className="students__artworks-info">
                <span className="students__artworks-title">{items[visibleItem].title}</span>
                <span>{items[visibleItem].date ? `, ${items[visibleItem].date}` : ''}</span>
              </div>
              <div className="students__artworks-statement">{statement}</div>
            </div>
          </>
        }
      </>
    )
  }
}

export default Slideshow