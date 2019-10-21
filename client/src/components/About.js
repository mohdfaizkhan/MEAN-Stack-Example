import React from 'react';

const About=(props)=> {
    setTimeout(()=>{
        props.history.push('/')
    },3000)
    return (
      <h1>I am About page</h1>
    )
  }
  export default About;