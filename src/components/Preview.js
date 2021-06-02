import React from 'react'
import { Remarkable } from 'remarkable';

export const Preview = (props) => {
  var md = new Remarkable();

  const getRawMarkup = () => {
    return { __html: md.render(props.text) };
  }

  return (
    <div className="content" dangerouslySetInnerHTML={getRawMarkup()}></div>
  )
}