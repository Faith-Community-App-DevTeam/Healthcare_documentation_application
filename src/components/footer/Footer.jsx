import './footer.css'
export default function Footer() {
    const today = new Date();
    return (
        <>
            <footer className=''>
                <div className="container">
                    <p>Copyright &copy; {today.getFullYear()}</p>
                </div>
            </footer>
        </>
    )


}