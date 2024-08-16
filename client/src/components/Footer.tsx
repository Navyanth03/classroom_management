const Footer=()=>{
    return(
        <div className="pb-3 px-4 pt-1 bg-black text-white font-thin">
            <div className="text-center text-lg">Tailor made solutions for your problems</div>
            <div className="flex justify-between items-end">
                <ul className="flex gap-2">
                    <li>
                        <a className="hover:text-blue-700" href="https://www.linkedin.com/in/m-navyanth-bb475b288/" target="_blank">LinkedIn</a>
                    </li>
                    <li>
                        <a  className="hover:text-blue-700" href="https://github.com/Navyanth03" target="_blank">GitHub</a>
                    </li>
                </ul>
                <div className="flex flex-col">
                    <div className="font-medium text-lg text-blue-400 hover:text-blue-600">CONTACT US</div>
                    <div className="hover:text-blue-900">+91-9999999999</div>
                    <a className="hover:text-blue-600" href="mailto:mekalanavyanthyadav2003@gmail.com">Send Email</a>
                </div>
            </div>

        </div>
    )
}

export default Footer;