
class PlayerController {

  /*
   * The constructor initializes the Web Audio API with a brand new Audio Context
   * that we'll use to trigger audio.
   * 
   * All variables and information stored in here cannot in any way be used in 
   * the rendering of React components. If we want our React components to be
   * rendered in a certain way depending on the state of the PlayerController
   * class, we're going to have to use setState() to do this. I know that this means
   * that we're going to have to have duplicate types of information between the 
   * private class and the public view but that's OK. 
   */

  constructor () {
    // Find the AudioContext object. Different across browsers.
    window.audioCtx = (window.AudioContext || window.webkitAudioContext ||  window.mozAudioContext || window.oAudioContext || window.msAudioContext);
    
    // Create a new Audio Context.
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // SourceBuffer is used as the input stream to pipe data into the audio context.
    this.sourceBuffer = null;

    // Global buffer is used to keep the initial un-emptied sound source when it loads in
    // full so that we can restart the song.
    this.globalBuffer = null;

  }

  getCurrentTrack () {
    return this.currentTrack;
  }

  setCurrentTrack (track) {
    this.currentTrack = track;
  }

  getTimes () {

    if (this.sourceBuffer.buffer) {
      return {
        current: this.audioCtx.currentTime,
        duration: this.sourceBuffer.buffer.duration
      }
    }
    else {
      return {
        current: null,
        duration: null
      }
    }
    
  }

  /*
   * initAndPlay
   * 
   * Creates a new audio context and streams the AudioBuffer.
   * 
   * Calling React component should invoke a state change to indicate that a
   * track is playing.
   * 
   * @param {AudioBuffer} - audio stream.
   * @param {Function} - callback for what to do when the track completes.
   */

  initAndPlay (stream, onEnd) {
    
    /*
     * If we're in the middle of listening to something, we need to
     * kill the current audio context and create a new one.
     */
    
    if(this.sourceBuffer != null) {
      this.audioCtx = this.createNewAudioContext()
    }

    // Create Buffer Sourse
    this.sourceBuffer = this.audioCtx.createBufferSource()

    // TODO: decode this in chunks and start playing immediately
    this.audioCtx.decodeAudioData(stream, this.handleStream.bind(this, onEnd))
  }

  /*
   * handleStream
   * 
   * Connects the buffer to the stream after it has been fully loaded.
   * TODO: decode this in chunks and start playing immediately.
   */

  handleStream(onEnd, buffer) {

    // Preserve a copy of this buffer in case we want to start the song over.
    this.globalBuffer = buffer;

    this.sourceBuffer.buffer = buffer;
    this.sourceBuffer.connect(this.audioCtx.destination)
    this.sourceBuffer.start(0)

    // When the song is finished, we want to queue up the next song.
    this.sourceBuffer.onended = onEnd;

    console.log(this.audioCtx, "audio context")
    console.log(this.sourceBuffer, "buffer")
  }

  /*
   * pause
   * 
   * Calling React component should trigger a state change to depict
   * that the track is no longer playing.
   */

  pause () {
    this.audioCtx.suspend();
  }

  /*
   * resume
   * 
   * Calling React component should trigger a state change to depict
   * that the track is playing again.
   */

  resume () {
    this.audioCtx.resume();
  }

  /*
   * stop
   * 
   * Calling React component should trigger a state change to depict
   * that the track is no longer playing.
   */

  stop () {
    this.audioCtx.buffer = null;
  }

  next () {
    console.log("next")
  }

  restart (onEnd) {
    this.audioCtx = this.createNewAudioContext()

    this.sourceBuffer = this.audioCtx.createBufferSource();          

    // Set the source buffer to be the globalBuffer (initial)
    this.sourceBuffer.buffer = this.globalBuffer;                 
    
    // connect the source to the context's destination (the speakers)
    this.sourceBuffer.connect(this.audioCtx.destination);   
    
    // Play!
    this.sourceBuffer.start(0);  
  }

  /*
   * createNewAudioContext
   * 
   * This method actually kills whatever is currently playing and returns
   * a new Audio Context so that we can queue something else up.
   */

  createNewAudioContext() {
    this.audioCtx.suspend();
    this.audioCtx.close();
    return new (window.AudioContext || window.webkitAudioContext)();
  }

}

export default PlayerController