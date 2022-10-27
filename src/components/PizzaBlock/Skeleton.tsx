import React from "react"
import ContentLoader from "react-content-loader";



const MyLoader: React.FC<any> = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="200" rx="10" ry="10" width="196" height="NaN" /> 
    <rect x="0" y="297" rx="10" ry="10" width="280" height="17" /> 
    <rect x="0" y="338" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="445" rx="10" ry="10" width="95" height="30" /> 
    <rect x="126" y="446" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
)

export default MyLoader

