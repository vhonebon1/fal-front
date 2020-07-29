import React from 'react'
import Vimeo from '@u-wave/react-vimeo'
import ClipLoader from "react-spinners/ClipLoader"

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  stopLoading = () => {
    this.setState({ loading: false })
  }

  renderSpinner = () => {
    return(
      <div className="spinner">
        <ClipLoader
          size={36}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    )
  }

  renderVideo = () => {
    return(
      <Vimeo
        className="video"
        video={this.props.url}
        controls={false}
        loop={true}
        responsive={true}
        onReady={() => this.stopLoading()}
        autoplay
      />
    )
  }

  render() {
    return(
      <>
        { this.renderSpinner() }
        { this.renderVideo() }
      </>
    )
  }
}

export default VideoPlayer