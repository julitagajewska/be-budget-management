import circleLarge from '../../assets/react-backgrounds/circle-large-light.svg'
import rectangleLarge from '../../assets/react-backgrounds/rectangle-large.png'
import rectangleSmall from '../../assets/react-backgrounds/rectangle-small.svg'
import dots from '../../assets/react-backgrounds/dots.svg'
import waves from '../../assets/react-backgrounds/waves.svg'

const BackgroundContainer = () => {
    // TODO: Get current theme
  return (
    <>
      <img src={circleLarge} alt="xyz" className="fixed z-0  scale-[2.05] right-[-22%] top-[25%]" />
      <img src={rectangleLarge} alt="xyz" className="fixed z-20 right-[-20%] top-[-15%] w-[50%]" />
      <img src={rectangleSmall} alt="xyz" className="fixed z-20 right-[14%] top-[-4%] w-[20%]" />
      <img src={dots} alt="xyz" className="fixed z-10 right-[-15%] top-[-17%] w-[65%]" />

      <img src={rectangleLarge} alt="xyz" className="fixed z-00 left-[-15%] bottom-[-15%] w-[50%]" />
      <img src={rectangleSmall} alt="xyz" className="fixed z-20 left-[20%] bottom-[-4%] w-[20%]" />
      
      <img src={dots} alt="xyz" className="fixed z-10 left-[-10%] bottom-[5%] w-[65%]" />
      <img src={waves} alt="xyz" className="fixed z-10 right-[-10%] bottom-[-2%] w-[45%]" />
    </>

  )
}

export default BackgroundContainer
