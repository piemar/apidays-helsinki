import React from "react";
import PropTypes from "prop-types";

const EmbedVideo = ({ embedId }) => (
    <div>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sZEpWvQFXqQ?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen" allowfullscreen></iframe>  </div>

);

EmbedVideo.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default EmbedVideo;
