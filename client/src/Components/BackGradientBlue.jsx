const BackGradientBlue = ({top="auto", left="auto", right="auto",bottom="auto"}) => {
  return (
    <div className='absolute -z-50 h-500 w-500 aspect-square rounded-full bg-blue-500/30 blur-3xl'
     style={{top:top, left:left, right:right, bottom:bottom}}>
        
    </div>
  )
}

export default BackGradientBlue