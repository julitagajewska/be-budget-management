import Logo from '../../components/logo/Logo'

const WelcomePage = () => {
  return (
    <div className="w-full h-screen py-6 flex flex-col items-center justify-center">
      <div className="w-full fixed top-10 h-10 flex flex-row justify-between px-64 items-center">
        <div>
          <Logo />
        </div>
        <div className="flex flex-row justify-end gap-10">
          <a href="#">Strona główna</a>
          <a href="#">O aplikacji</a>
          <a href="/home">Rozpocznij</a>
        </div>
      </div>
      <div className="w-full react-light h-fit bg-primary-700 flex flex-row justify-center items-center px-64 gap-36 py-36">
        <div className="w-1/2 flex flex-col items-start justify-center gap-12">
          <h1 className="font-bold text-text-50 text-5xl font-slab">Budżet osobisty</h1>
          <p className="text-text-50 text-base leading-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quia cum velit!
            Dicta consequuntur excepturi minima debitis cupiditate culpa quo corporis, aut
            asperiores amet, maiores expedita illo reiciendis perspiciatis quibusdam.
          </p>
          <a
            className="bg-background-50 px-36 py-4 rounded-full shadow-lg hover:bg-primary-100 transition-all duration-300 ease-in-out cursor-pointer font-semibold text-base"
            href="/home"
          >
            Rozpocznij
          </a>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center gap-6"></div>
      </div>
    </div>
  )
}

export default WelcomePage
