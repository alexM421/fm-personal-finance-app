import * as React from "react"
const Ellipsis = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={4}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.75 2a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0zM2 .25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zm10 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5z"
    />
  </svg>
)
export default Ellipsis
