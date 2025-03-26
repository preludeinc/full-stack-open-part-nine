const Content = ({ courseName, exerciseCount }: 
  { courseName: string, exerciseCount: number }) => {
    return (
      <p>
        {courseName} {exerciseCount}
      </p>
  )
}

export default Content;