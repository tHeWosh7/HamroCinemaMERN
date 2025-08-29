import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-150">
                    <img alt="logo" className="h-25 -mx-11" src={assets.MainLogo} />
                    <p className="mt-5 text-sm mb-5">
                        Hamro Cinema has been the industry's standard cinema watching since the 2025s, when the gap between the entertainment came across and make people's life work loaded, Harmro Cinema started granting entertainment services.
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <img src={assets.googleplayic} alt="playstore" className="h-10 w-auto" />
                        <img src={assets.appstoreic} alt="appstore" className="h-10 w-auto" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Hamro Cinema</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+977-9862912069</p>
                            <p>hamrocinema@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © HamroCinema. All Right Reserved.
            </p>
        </footer>
  )
}

export default Footer