import React from 'react'
import View from './movie-view'

function Videolist() {

  const filename = ["https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=394&q=80", "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"];

  return (
    <div>
      <div>Video List</div>
      <div>
        {
          filename.map(
            (filename) => (
              <View name={filename} />
            )
          )
        }
      </div>
    </div>
  )
}

export default Videolist